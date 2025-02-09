import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const recipes = [
  {
    title: 'Sirloin & Sherry Shallot Sauce',
    date: 'August 8, 2024',
    image: '/recipes/sirloin.png'
  },
  {
    title: 'Shrimp & Honey Miso Broccoli Donburi',
    date: 'August 8, 2024',
    image: '/recipes/shrimp.png'
  },
  {
    title: 'Raspberry-Ricotta Cake',
    date: 'August 8, 2024',
    image: '/recipes/cake.png'
  },
  {
    title: 'One-Pot Chicken and Rice',
    date: 'August 8, 2024',
    image: '/recipes/chicken.png'
  }
];

export default function Home() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="container py-10">
        <h1 className="text-center mb-8">Recipes</h1>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="bg-[rgb(53,68,57)] text-white nav-link px-8 py-2">
            Batch Cooking
          </button>
          <button className="bg-[rgb(53,68,57)]/[0.08] nav-link px-8 py-2">
            Food Prep
          </button>
          <button className="bg-[rgb(53,68,57)]/[0.08] nav-link px-8 py-2">
            Recipes
          </button>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {recipes.map((recipe, index) => (
            <Link 
              key={index}
              href="/recipes/[slug]" 
              as={`/recipes/${recipe.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col gap-3"
            >
              <div className="aspect-[4/3] relative bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Recipe Image</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.date}</span>
                <h3 className="text-[22px] font-semibold">{recipe.title}</h3>
              </div>
            </Link>
          ))}
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
          {recipes.map((recipe, index) => (
            <Link 
              key={`more-${index}`}
              href="/recipes/[slug]" 
              as={`/recipes/${recipe.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex flex-col gap-5"
            >
              <div className="aspect-[4/3] relative bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Recipe Image</div>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-[rgb(53,68,57)]/70">{recipe.date}</span>
                <h3 className="text-[22px] font-semibold">{recipe.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}