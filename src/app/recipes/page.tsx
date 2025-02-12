import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getAllRecipes, Recipe } from '@/lib/airtable';

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function RecipesPage() {
  let recipes: Recipe[] = [];
  let error: string | null = null;

  try {
    recipes = await getAllRecipes();
    
    // Basic validation of recipe data
    recipes = recipes.filter(recipe => {
      const isValid = recipe.name && typeof recipe.name === 'string';
      if (!isValid) {
        console.warn('Filtered out invalid recipe:', recipe);
      }
      return isValid;
    });

    console.log(`Loaded ${recipes.length} valid recipes`);
  } catch (e) {
    console.error('Error in recipe page:', e);
    error = e instanceof Error ? e.message : 'Failed to load recipes';
  }

  // Function to safely convert recipe name to slug
  const createSlug = (name: string) => {
    return name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : '';
  };

  // Early return for error state
  if (error) {
    return (
      <div className="pt-[120px]">
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[rgb(53,68,57)] mb-4">Error Loading Recipes</h1>
            <p className="text-[rgb(53,68,57)]/70 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="bg-[rgb(53,68,57)] text-white px-6 py-2 rounded-lg hover:bg-[rgb(53,68,57)]/90"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="pt-[120px]">
        <div className="container py-16">
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-[rgb(53,68,57)] mb-4">No Recipes Found</h1>
            <p className="text-[rgb(53,68,57)]/70">
              No recipes are currently available. Please check back later.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="container py-10">
        <h1 className="text-center mb-8">Recipes</h1>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-[rgb(53,68,57)] text-white nav-link px-8 py-2">
            All Recipes
          </button>
          {/* Add category tabs dynamically if needed */}
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe) => {
            const slug = createSlug(recipe.name);
            
            return (
              <Link 
                key={recipe.id}
                href={`/recipes/${slug}`}
                className="flex flex-col gap-3"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  {recipe.image && Array.isArray(recipe.image) && recipe.image[0] && recipe.image[0].url ? (
                    <Image
                      src={recipe.image[0].url}
                      alt={recipe.name || 'Recipe Image'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={recipes.indexOf(recipe) === 0}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Recipe Image</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    {recipe.created && (
                      <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.created}</span>
                    )}
                    {recipe.duration && (
                      <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.duration}</span>
                    )}
                  </div>
                  <h3 className="text-[22px] font-semibold">{recipe.name || 'Untitled Recipe'}</h3>
                  {recipe.intro && (
                    <p className="text-[rgb(53,68,57)]/70 line-clamp-2">{recipe.intro}</p>
                  )}
                  {recipe.categories && Array.isArray(recipe.categories) && recipe.categories.length > 0 && (
                    <div className="flex gap-2 mt-2">
                      {recipe.categories.map((category, index) => (
                        <span 
                          key={index}
                          className="text-xs bg-[rgb(53,68,57)]/10 text-[rgb(53,68,57)] px-2 py-1 rounded"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[rgb(248,248,248)] py-10 mt-16">
        <div className="container">
          <h2 className="text-[32px] font-semibold mb-8">
            Inspired? Follow us for more recipes.
          </h2>
          
          <div className="flex flex-col gap-4 max-w-3xl">
            <div className="flex justify-between items-center border-b border-[rgb(53,68,57)]/40 py-4">
              <span className="text-[20px] opacity-40">Your Email</span>
              <button className="flex items-center gap-2 font-bold">
                Sign up
                <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
                </svg>
              </button>
            </div>
            <p className="text-[18px] font-semibold">
              Check our <Link href="/privacy" className="underline">privacy policy</Link> on how we collect and process your information.
            </p>
          </div>
        </div>
      </section>

      {/* More Recipes Section */}
      <section className="container py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-[27px] font-semibold">More great recipes</h2>
          <button className="flex items-center gap-2 font-bold">
            View all Recipes
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recipes.slice(0, 4).map((recipe) => {
            const slug = createSlug(recipe.name);
            
            return (
              <Link 
                key={`more-${recipe.id}`}
                href={`/recipes/${slug}`}
                className="flex flex-col gap-5"
              >
                <div className="aspect-[4/3] relative bg-gray-100">
                  {recipe.image && Array.isArray(recipe.image) && recipe.image[0] && recipe.image[0].url ? (
                    <Image
                      src={recipe.image[0].url}
                      alt={recipe.name || 'Recipe Image'}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Recipe Image</div>
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    {recipe.created && (
                      <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.created}</span>
                    )}
                    {recipe.duration && (
                      <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.duration}</span>
                    )}
                  </div>
                  <h3 className="text-[22px] font-semibold">{recipe.name || 'Untitled Recipe'}</h3>
                  {recipe.intro && (
                    <p className="text-[rgb(53,68,57)]/70 line-clamp-2">{recipe.intro}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
