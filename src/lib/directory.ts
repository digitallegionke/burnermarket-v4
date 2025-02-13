import Airtable from 'airtable';

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

export interface Farmer {
  id: string;
  name: string;
  location: string;
  description: string;
  specialties: string[];
  image: AirtableAttachment[];
  contactEmail?: string;
  contactPhone?: string;
  website?: string;
  certifications?: string[];
  farmSize?: string;
  yearEstablished?: string;
  sustainabilityPractices?: string[];
}

export interface Ingredient {
  id: string;
  name: string;
  category: string;
  description: string;
  nutritionalInfo: string;
  seasonality: string[];
  image: AirtableAttachment[];
  origin?: string;
  storageInstructions?: string;
  culinaryUses?: string;
  price?: string;
  unit?: string;
  inStock?: boolean;
  suppliers?: string[];
}

export async function getAllFarmers(): Promise<Farmer[]> {
  try {
    console.log('Starting farmers fetch from Airtable...');
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    const table = airtableBase(process.env.AIRTABLE_FARMERS_TABLE_ID!);
    
    const records = await table
      .select({
        view: 'Grid view'
      })
      .all();

    console.log(`Successfully fetched ${records.length} farmers`);

    // Log the raw records for debugging
    records.forEach((record: any) => {
      console.log('Raw farmer record:', {
        id: record.id,
        fields: record.fields,
        fieldNames: Object.keys(record.fields)
      });
    });

    const farmers = records.map(record => ({
      id: record.id,
      name: record.fields['Farm Name'] as string || '',
      location: record.fields['Location'] as string || '',
      description: record.fields['Story'] as string || '',
      specialties: record.fields['Produce Type'] as string[] || [],
      image: record.fields['Image'] as AirtableAttachment[] || [],
      contactEmail: record.fields['Email'] as string || '',
      contactPhone: record.fields['Phone'] as string || '',
      website: record.fields['Website'] as string || '',
      certifications: record.fields['Certifications'] as string[] || [],
      farmSize: record.fields['Farm Size'] as string || '',
      yearEstablished: record.fields['Year Established'] as string || '',
      sustainabilityPractices: record.fields['Practices'] as string[] || []
    }));

    return farmers;
  } catch (error: any) {
    console.error('Error fetching farmers:', error);
    throw error;
  }
}

export async function getFarmerBySlug(slug: string): Promise<Farmer | null> {
  try {
    console.log(`Fetching farmer with slug: ${slug}`);
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    const table = airtableBase(process.env.AIRTABLE_FARMERS_TABLE_ID!);
    
    // Convert slug to name format (e.g., "green-valley-farm" to "Green Valley Farm")
    const farmerName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const records = await table
      .select({
        filterByFormula: `{Farm Name} = '${farmerName}'`,
        maxRecords: 1
      })
      .all();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];

    return {
      id: record.id,
      name: record.fields['Farm Name'] as string || '',
      location: record.fields['Location'] as string || '',
      description: record.fields['Story'] as string || '',
      specialties: record.fields['Produce Type'] as string[] || [],
      image: record.fields['Image'] as AirtableAttachment[] || [],
      contactEmail: record.fields['Email'] as string || '',
      contactPhone: record.fields['Phone'] as string || '',
      website: record.fields['Website'] as string || '',
      certifications: record.fields['Certifications'] as string[] || [],
      farmSize: record.fields['Farm Size'] as string || '',
      yearEstablished: record.fields['Year Established'] as string || '',
      sustainabilityPractices: record.fields['Practices'] as string[] || []
    };
  } catch (error: any) {
    console.error('Error fetching farmer by slug:', error);
    throw error;
  }
}

export async function getAllIngredients(): Promise<Ingredient[]> {
  try {
    console.log('Starting ingredients fetch from Airtable...');
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    if (!process.env.AIRTABLE_INGREDIENTS_TABLE_ID) {
      throw new Error('AIRTABLE_INGREDIENTS_TABLE_ID is not defined');
    }

    console.log('Airtable config:', {
      baseId: process.env.AIRTABLE_BASE_ID,
      tableId: process.env.AIRTABLE_INGREDIENTS_TABLE_ID,
      apiKeyPresent: !!process.env.AIRTABLE_API_KEY,
      apiKeyPrefix: process.env.AIRTABLE_API_KEY?.substring(0, 10)
    });

    const table = airtableBase(process.env.AIRTABLE_INGREDIENTS_TABLE_ID);
    console.log('Table reference created');

    // Test the connection with a simple query first
    try {
      const testRecord = await table
        .select({
          maxRecords: 1,
          view: 'Grid view'
        })
        .firstPage();
      
      if (testRecord.length > 0) {
        console.log('Test query successful, found fields:', Object.keys(testRecord[0].fields));
      } else {
        console.log('Table exists but no records found');
      }
    } catch (error: any) {
      console.error('Error testing table connection:', {
        error: error.message,
        status: error.statusCode,
        type: error.type,
        details: error.detail
      });
      throw new Error(`Failed to connect to Airtable table: ${error.message}`);
    }
    
    const records = await table
      .select({
        view: 'Grid view'
      })
      .all()
      .catch((error: any) => {
        console.error('Error fetching records:', {
          error: error.message,
          status: error.statusCode,
          type: error.type,
          details: error.detail
        });
        throw error;
      });

    console.log(`Successfully fetched ${records.length} ingredients`);
    
    // Log the raw records for debugging
    records.forEach((record: any) => {
      console.log('Raw record:', {
        id: record.id,
        fields: record.fields,
        fieldNames: Object.keys(record.fields)
      });
    });

    const ingredients = records.map((record: any) => ({
      id: record.id,
      name: record.fields['Name'] as string,
      category: (record.fields['Name (from Item type)'] as string[])?.[0] || 'Uncategorized',
      description: record.fields['Description'] as string || '',
      nutritionalInfo: record.fields['Nutritional Information'] as string || '',
      seasonality: record.fields['Seasonality'] as string[] || [],
      image: record.fields['Image'] as AirtableAttachment[] || [],
      origin: record.fields['Origin'] as string || '',
      storageInstructions: record.fields['Storage Instructions'] as string || '',
      culinaryUses: record.fields['Culinary Uses'] as string || '',
      price: record.fields['Price'] as string || '',
      unit: record.fields['Unit'] as string || '',
      inStock: record.fields['In Stock'] as boolean || false,
      suppliers: record.fields['Suppliers'] as string[] || []
    }));

    return ingredients;
  } catch (error: any) {
    console.error('Error fetching ingredients:', error);
    throw error;
  }
}

export async function getIngredientBySlug(slug: string): Promise<Ingredient | null> {
  try {
    console.log(`Fetching ingredient with slug: ${slug}`);
    
    if (!airtableBase) {
      throw new Error('Airtable base is not initialized');
    }

    const table = airtableBase(process.env.AIRTABLE_INGREDIENTS_TABLE_ID!);
    
    // Convert slug to name format (e.g., "basmati-rice" to "Basmati Rice")
    const ingredientName = slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const records = await table
      .select({
        filterByFormula: `{Name} = '${ingredientName}'`,
        maxRecords: 1
      })
      .all();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];

    return {
      id: record.id,
      name: record.fields['Name'] as string,
      category: (record.fields['Name (from Item type)'] as string[])?.[0] || 'Uncategorized',
      description: record.fields['Description'] as string || '',
      nutritionalInfo: record.fields['Nutritional Information'] as string || '',
      seasonality: record.fields['Seasonality'] as string[] || [],
      image: record.fields['Image'] as AirtableAttachment[] || [],
      origin: record.fields['Origin'] as string || '',
      storageInstructions: record.fields['Storage Instructions'] as string || '',
      culinaryUses: record.fields['Culinary Uses'] as string || '',
      price: record.fields['Price'] as string || '',
      unit: record.fields['Unit'] as string || '',
      inStock: record.fields['In Stock'] as boolean || false,
      suppliers: record.fields['Suppliers'] as string[] || []
    };
  } catch (error: any) {
    console.error('Error fetching ingredient by slug:', error);
    throw error;
  }
}
