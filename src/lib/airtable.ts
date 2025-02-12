import Airtable from 'airtable';

// Validate environment variables and log their presence
const requiredEnvVars = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME
};

// Log configuration details (safely)
console.log('Airtable Configuration:', {
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME,
  apiKeyPresent: !!process.env.AIRTABLE_API_KEY,
  apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10)
});

// Enhanced environment variable validation
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    const error = `Missing environment variable: ${key}`;
    console.error(error);
    throw new Error(error);
  }
  if (key === 'AIRTABLE_API_KEY' && !value.startsWith('pat')) {
    const error = 'Invalid API key format. API key should start with "pat"';
    console.error(error);
    throw new Error(error);
  }
});

// Initialize Airtable with explicit configuration
const airtableClient = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com'
});

const airtableBase = airtableClient.base(process.env.AIRTABLE_BASE_ID!);

interface AirtableAttachment {
  id: string;
  width: number;
  height: number;
  url: string;
  filename: string;
  size: number;
  type: string;
}

export interface Recipe {
  id: string;
  name: string;
  image: AirtableAttachment[];
  recipeCredits: string;
  duration: string;
  ingredients: string;
  intro: string;
  preparation: string;
  created: string;
  categories: string[];
  author: string;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    console.log('Starting recipe fetch from Airtable...');
    console.log('Using table:', process.env.AIRTABLE_TABLE_NAME);
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    const table = airtableBase(process.env.AIRTABLE_TABLE_NAME!);
    console.log('Table reference created successfully');

    // Test the connection with a simple query first
    try {
      console.log('Testing table connection with config:', {
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME,
        apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10)
      });

      const testRecord = await table
        .select({
          maxRecords: 1,
          view: 'Grid view'
        })
        .firstPage();
      
      if (testRecord.length > 0) {
        console.log('Test query successful, found fields:', Object.keys(testRecord[0].fields));
        console.log('Sample record data:', testRecord[0].fields);
      } else {
        console.log('Table exists but no records found. This might be expected for an empty table.');
      }
    } catch (error: any) {
      console.error('Error testing table connection:', {
        error: error.message,
        status: error.statusCode,
        type: error.type,
        details: error.detail
      });
      throw new Error(`Failed to connect to Airtable table: ${error.message}. Please verify your table ID and permissions.`);
    }

    // Now fetch all records
    const allRecords = await table
      .select({
        view: 'Grid view'
      })
      .all();

    console.log(`Successfully fetched ${allRecords.length} records`);

    const recipes = allRecords.map(record => {
      // Log raw record data for debugging
      console.log('Processing record:', {
        id: record.id,
        fields: Object.keys(record.fields)
      });

      return {
        id: record.id,
        name: record.fields['Name'] as string || record.fields['Recipe Name'] as string || '',
        image: (record.fields['Image'] as AirtableAttachment[]) || [],
        recipeCredits: record.fields['Recipe Credits'] as string || record.fields['Recipe credits'] as string || '',
        duration: record.fields['Duration'] as string || '',
        ingredients: record.fields['Ingredients'] as string || '',
        intro: record.fields['Intro'] as string || record.fields['Introduction'] as string || '',
        preparation: record.fields['Preparation'] as string || record.fields['Instructions'] as string || '',
        created: record.fields['Created'] as string || record.fields['Date'] as string || '',
        categories: (record.fields['Categories'] as string[]) || [],
        author: record.fields['Author'] as string || ''
      };
    });

    return recipes;
  } catch (error: any) {
    console.error('Error fetching recipes:', {
      error: {
        name: error.name,
        message: error.message,
        status: error.statusCode,
        error: error.error,
        stack: error.stack
      },
      config: {
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME,
        apiKeyPresent: !!process.env.AIRTABLE_API_KEY
      }
    });
    throw error;
  }
}

export async function getRecipeBySlug(slug: string): Promise<Recipe | null> {
  try {
    console.log(`Fetching recipe with slug: ${slug}`);
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    // Convert slug to recipe name format (e.g., "chicken-quinoa-bowl" to "Chicken Quinoa Bowl")
    const recipeName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    console.log(`Looking for recipe with name: "${recipeName}"`);
    
    const table = airtableBase(process.env.AIRTABLE_TABLE_NAME!);
    console.log('Table reference created successfully');

    const records = await table
      .select({
        filterByFormula: `{Recipe Name} = '${recipeName}'`,
        maxRecords: 1
      })
      .all();

    if (records.length === 0) {
      console.log(`No recipe found with name: ${recipeName}`);
      return null;
    }

    const record = records[0];
    console.log('Found recipe record:', {
      id: record.id,
      fields: Object.keys(record.fields)
    });

    return {
      id: record.id,
      name: record.fields['Name'] as string || record.fields['Recipe Name'] as string || '',
      image: (record.fields['Image'] as AirtableAttachment[]) || [],
      recipeCredits: record.fields['Recipe Credits'] as string || record.fields['Recipe credits'] as string || '',
      duration: record.fields['Duration'] as string || '',
      ingredients: record.fields['Ingredients'] as string || '',
      intro: record.fields['Intro'] as string || record.fields['Introduction'] as string || '',
      preparation: record.fields['Preparation'] as string || record.fields['Instructions'] as string || '',
      created: record.fields['Created'] as string || record.fields['Date'] as string || '',
      categories: (record.fields['Categories'] as string[]) || [],
      author: record.fields['Author'] as string || ''
    };
  } catch (error: any) {
    console.error('Error fetching recipe by slug:', {
      error: {
        name: error.name,
        message: error.message,
        status: error.statusCode,
        error: error.error,
        stack: error.stack
      },
      config: {
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME,
        slug,
        apiKeyPresent: !!process.env.AIRTABLE_API_KEY,
        apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10)
      }
    });
    throw error;
  }
}
