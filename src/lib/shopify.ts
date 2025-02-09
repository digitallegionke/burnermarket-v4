import Client from 'shopify-buy';

// Initialize the Shopify client
const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || 'zqwxs5-rr.myshopify.com';
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '6a3b14182db4a5b49b073ea7ffdfd4db';

console.log('Initializing Shopify client with:', {
  domain,
  token: storefrontAccessToken.slice(0, 5) + '...',
  apiVersion: '2024-01'
});

const client = Client.buildClient({
  domain,
  storefrontAccessToken,
  apiVersion: '2024-01',
  language: 'en-US'
}) as Client & { graphQLClient: any };

export async function getAllProducts() {
  try {
    console.log('Fetching products...');
    
    const products = await client.product.fetchAll();
    
    if (!products) {
      console.error('No products returned from Shopify');
      throw new Error('No products returned from Shopify');
    }
    
    // Convert the GraphModel objects to plain objects with proper image handling
    const plainProducts = products.map(product => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      images: product.images.map(image => ({
        src: image.src,
        alt: image.altText || product.title,
        width: image.width || 800,
        height: image.height || 800
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: String(variant.price.amount || '0'),
          currencyCode: variant.price.currencyCode || 'USD'
        },
        image: variant.image ? {
          src: variant.image.src,
          alt: variant.image.altText || `${product.title} - ${variant.title}`,
          width: variant.image.width || 800,
          height: variant.image.height || 800
        } : null
      }))
    }));
    
    return plainProducts;
  } catch (error: any) {
    console.error('Error fetching products:', {
      message: error.message,
      errors: error.errors,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
      extraInfo: error.extraInfo
    });
    
    if (error.message.includes('Access denied')) {
      throw new Error('Access denied. Please check your Shopify access token and permissions.');
    }
    
    throw error;
  }
}

export async function getProductByHandle(handle: string) {
  try {
    console.log(`Fetching product with handle: ${handle}`);
    const product = await client.product.fetchByHandle(handle);
    
    if (!product) {
      console.error('Product not found:', handle);
      return null;
    }
    
    // Convert the GraphModel object to a plain object with proper image handling
    const plainProduct = {
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      descriptionHtml: product.descriptionHtml,
      images: product.images.map(image => ({
        src: image.src,
        alt: image.altText || product.title,
        width: image.width || 800,
        height: image.height || 800
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: String(variant.price.amount || '0'),
          currencyCode: variant.price.currencyCode || 'USD'
        },
        image: variant.image ? {
          src: variant.image.src,
          alt: variant.image.altText || `${product.title} - ${variant.title}`,
          width: variant.image.width || 800,
          height: variant.image.height || 800
        } : null
      })),
      options: product.options.map(option => ({
        id: option.id,
        name: option.name,
        values: option.values
      }))
    };
    
    console.log('Successfully fetched product:', plainProduct.title);
    return plainProduct;
  } catch (error: any) {
    console.error('Error fetching product by handle:', {
      handle,
      message: error.message,
      errors: error.errors,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError
    });
    throw error;
  }
}

export async function getAllCollections() {
  try {
    console.log('Fetching collections...');
    
    const collections = await client.collection.fetchAll();
    
    if (!collections) {
      console.error('No collections returned from Shopify');
      throw new Error('No collections returned from Shopify');
    }
    
    // Convert the GraphModel objects to plain objects
    const plainCollections = collections.map(collection => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      description: collection.description,
      image: collection.image ? {
        src: collection.image.src,
        alt: collection.image.altText || collection.title,
        width: collection.image.width || 800,
        height: collection.image.height || 800
      } : null
    }));
    
    return plainCollections;
  } catch (error: any) {
    console.error('Error fetching collections:', {
      message: error.message,
      errors: error.errors,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError,
      extraInfo: error.extraInfo
    });
    throw error;
  }
}

export async function getProductsByCollection(collectionId: string) {
  try {
    console.log(`Fetching products for collection: ${collectionId}`);
    
    const collection = await client.collection.fetchWithProducts(collectionId);
    
    if (!collection) {
      console.error('Collection not found:', collectionId);
      return [];
    }
    
    // Convert the GraphModel objects to plain objects
    const plainProducts = collection.products.map(product => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      description: product.description,
      images: product.images.map(image => ({
        src: image.src,
        alt: image.altText || product.title,
        width: image.width || 800,
        height: image.height || 800
      })),
      variants: product.variants.map(variant => ({
        id: variant.id,
        title: variant.title,
        price: {
          amount: String(variant.price.amount || '0'),
          currencyCode: variant.price.currencyCode || 'USD'
        },
        image: variant.image ? {
          src: variant.image.src,
          alt: variant.image.altText || `${product.title} - ${variant.title}`,
          width: variant.image.width || 800,
          height: variant.image.height || 800
        } : null
      }))
    }));
    
    return plainProducts;
  } catch (error: any) {
    console.error('Error fetching products by collection:', {
      collectionId,
      message: error.message,
      errors: error.errors,
      graphQLErrors: error.graphQLErrors,
      networkError: error.networkError
    });
    throw error;
  }
}

export default client; 