import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getRecipeBySlug } from '@/lib/airtable';
import { notFound } from 'next/navigation';

export const revalidate = 60; // Revalidate this page every 60 seconds

interface Props {
  params: {
    slug: string;
  };
}

export default async function RecipePage({ params }: Props) {
  const recipe = await getRecipeBySlug(params.slug);

  if (!recipe) {
    notFound();
  }

  // Convert newlines to HTML breaks for rich text fields
  const formattedIngredients = recipe.ingredients ? recipe.ingredients.replace(/\n/g, '<br />') : '';
  const formattedPreparation = recipe.preparation ? recipe.preparation.replace(/\n/g, '<br />') : '';

  return (
    <div className="pt-[120px]">
      {/* Breadcrumb */}
      <div className="container py-8 flex items-center gap-2">
        <Link href="/" className="text-base font-semibold text-[#595959]">
          Home
        </Link>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          className="opacity-60"
        >
          <path
            d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z"
            fill="#354439"
          />
        </svg>
        <Link href="/recipes" className="text-base font-semibold text-[#595959]">
          Recipes
        </Link>
        <svg
          width="16"
          height="17"
          viewBox="0 0 16 17"
          fill="none"
          className="opacity-60"
        >
          <path
            d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z"
            fill="#354439"
          />
        </svg>
        <span className="text-base font-semibold text-[#354439]">
          {recipe.name || 'Recipe Details'}
        </span>
      </div>

      {/* Recipe Content */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-[44px] font-semibold text-[#354439] mb-4">
              {recipe.name || 'Untitled Recipe'}
            </h1>
            {recipe.intro && (
              <p className="text-lg text-[#354439]/70 mb-8">
                {recipe.intro}
              </p>
            )}
            <div className="flex flex-wrap gap-6">
              {recipe.duration && (
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M12 8v4l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-[#354439]">{recipe.duration}</span>
                </div>
              )}
              {recipe.categories && Array.isArray(recipe.categories) && recipe.categories.length > 0 && (
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M4 9l9-7 9 7v11a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <div className="flex gap-2">
                    {recipe.categories.map((category, index) => (
                      <span 
                        key={index}
                        className="text-[#354439] bg-[#354439]/10 px-2 py-1 rounded text-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {recipe.author && (
                <div className="flex items-center gap-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-[#354439]">{recipe.author}</span>
                </div>
              )}
            </div>
          </div>

          {/* Recipe Image */}
          <div className="aspect-[16/9] relative mb-12 bg-white border border-[#e7e7e7] rounded-lg overflow-hidden">
            {recipe.image && Array.isArray(recipe.image) && recipe.image[0] && recipe.image[0].url ? (
              <Image
                src={recipe.image[0].url}
                alt={recipe.name || 'Recipe Image'}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-gray-400 text-sm">Recipe Image</div>
              </div>
            )}
          </div>

          {/* Recipe Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Ingredients */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-semibold mb-6">Ingredients</h2>
              <div className="prose prose-lg text-[#354439]">
                {recipe.ingredients ? (
                  <div dangerouslySetInnerHTML={{ __html: formattedIngredients }} />
                ) : (
                  <p>No ingredients listed</p>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-semibold mb-6">Instructions</h2>
              <div className="prose prose-lg text-[#354439]">
                {recipe.preparation ? (
                  <div dangerouslySetInnerHTML={{ __html: formattedPreparation }} />
                ) : (
                  <p>No instructions available</p>
                )}
              </div>
            </div>
          </div>

          {/* Recipe Credits */}
          {recipe.recipeCredits && (
            <div className="mt-16 pt-12 border-t border-[#354439]/10">
              <h2 className="text-2xl font-semibold mb-4">Recipe Credits</h2>
              <p className="text-[#354439]/70">{recipe.recipeCredits}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 