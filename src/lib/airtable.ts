import Airtable from 'airtable';

// Validate environment variables and log their presence
const requiredEnvVars = {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME
};

console.log('Environment Variables Check:', {
  AIRTABLE_API_KEY: process.env.AIRTABLE_API_KEY ? `${process.env.AIRTABLE_API_KEY.slice(0, 10)}...` : undefined,
  AIRTABLE_BASE_ID: process.env.AIRTABLE_BASE_ID,
  AIRTABLE_TABLE_NAME: process.env.AIRTABLE_TABLE_NAME
});

Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`${key} is not defined`);
  }
});

// Initialize Airtable with explicit configuration
Airtable.configure({
  apiKey: process.env.AIRTABLE_API_KEY,
  endpointUrl: 'https://api.airtable.com'
});

const base = Airtable.base(process.env.AIRTABLE_BASE_ID!);

// Log configuration
console.log('Airtable Configuration:', {
  baseId: process.env.AIRTABLE_BASE_ID,
  tableName: process.env.AIRTABLE_TABLE_NAME,
  apiKeyPresent: !!process.env.AIRTABLE_API_KEY
});

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
    
    const records = await base(process.env.AIRTABLE_TABLE_NAME!)
      .select({
        view: 'Grid view'
      })
      .all();

    console.log(`Successfully fetched ${records.length} records`);

    // Log the structure of the first record if available
    if (records.length > 0) {
      console.log('First record fields:', {
        availableFields: Object.keys(records[0].fields),
        sampleValues: {
          name: records[0].fields['Recipe Name'],
          hasImage: !!records[0].fields['Image'],
          hasIngredients: !!records[0].fields['Ingredients']
        }
      });
    }

    return records.map(record => {
      const recipe = {
        id: record.id,
        name: record.fields['Recipe Name'] as string || '',
        image: (record.fields['Image'] as AirtableAttachment[]) || [],
        recipeCredits: record.fields['Recipe credits'] as string || '',
        duration: record.fields['Duration'] as string || '',
        ingredients: record.fields['Ingredients'] as string || '',
        intro: record.fields['Intro'] as string || '',
        preparation: record.fields['Preparation'] as string || '',
        created: record.fields['Created'] as string || '',
        categories: record.fields['Categories'] as string[] || [],
        author: record.fields['Author'] as string || ''
      };
      
      console.log(`Processed recipe: ${recipe.name}`);
      return recipe;
    });
  } catch (error: any) {
    console.error('Error fetching recipes:', {
      error: {
        name: error.name,
        message: error.message,
        status: error.statusCode,
        error: error.error
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
    
    // Convert slug to recipe name format (e.g., "chicken-quinoa-bowl" to "Chicken Quinoa Bowl")
    const recipeName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    console.log(`Looking for recipe with name: "${recipeName}"`);
    
    const records = await base(process.env.AIRTABLE_TABLE_NAME!)
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
      name: record.fields['Recipe Name'] as string || '',
      image: (record.fields['Image'] as AirtableAttachment[]) || [],
      recipeCredits: record.fields['Recipe credits'] as string || '',
      duration: record.fields['Duration'] as string || '',
      ingredients: record.fields['Ingredients'] as string || '',
      intro: record.fields['Intro'] as string || '',
      preparation: record.fields['Preparation'] as string || '',
      created: record.fields['Created'] as string || '',
      categories: record.fields['Categories'] as string[] || [],
      author: record.fields['Author'] as string || ''
    };
  } catch (error: any) {
    console.error('Error fetching recipe by slug:', {
      error: {
        name: error.name,
        message: error.message,
        status: error.statusCode,
        error: error.error
      },
      config: {
        baseId: process.env.AIRTABLE_BASE_ID,
        tableName: process.env.AIRTABLE_TABLE_NAME,
        slug
      }
    });
    throw error;
  }
} 