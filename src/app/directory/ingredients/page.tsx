import { getAllIngredients, Ingredient } from '@/lib/directory';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Ingredient Directory | BurnerMarket',
  description: 'Explore our curated selection of high-quality, sustainable ingredients.',
};

export default async function IngredientsDirectoryPage() {
  let ingredients: Ingredient[] = [];
  let error: string | null = null;

  try {
    ingredients = await getAllIngredients();
    console.log('Ingredients loaded:', ingredients.length);
    
    if (ingredients.length === 0) {
      console.log('No ingredients found');
    } else {
      console.log('Sample ingredient:', ingredients[0]);
    }
  } catch (error) {
    console.error('Error loading ingredients:', error);
    error = error instanceof Error ? error.message : 'Failed to load ingredients';
  }

  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <div className="bg-[#354439] text-white">
        <div className="max-w-[1440px] mx-auto px-[120px] py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-12">
            <Link href="/" className="text-white/70 hover:text-white transition-colors">
              Home
            </Link>
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="opacity-60">
              <path d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z" fill="currentColor"/>
            </svg>
            <span className="text-white">Ingredients</span>
          </div>

          <div className="max-w-2xl">
            <h1 className="text-[44px] font-bold mb-6">
              Discover Our Ingredients
            </h1>
            <p className="text-xl text-white/80">
              Explore our carefully curated selection of high-quality, sustainable ingredients. Each ingredient is chosen for its exceptional quality, flavor, and environmental impact.
            </p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-[1440px] mx-auto px-[120px] py-12">
        <div className="flex justify-start items-center w-full h-[77px] gap-3 px-[30px] rounded-[40px] bg-[#354439]/[0.06] border border-[#354439]/20">
          <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="opacity-50">
            <path d="M24 23.1137L19.3689 18.4826C20.1137 17.5935 20.6982 16.6134 21.1152 15.5817C21.6497 14.2614 21.917 12.8608 21.917 11.4585C21.917 10.0579 21.6497 8.65562 21.1152 7.33525C20.5806 6.01489 19.7752 4.77827 18.7078 3.70915C17.6405 2.64181 16.4021 1.8364 15.0817 1.30184C13.7614 0.76728 12.359 0.5 10.9585 0.5C9.55795 0.5 8.15562 0.76728 6.83525 1.30184C5.51489 1.8364 4.27827 2.64181 3.20915 3.70915C2.14181 4.77649 1.3364 6.01489 0.801841 7.33525C0.26728 8.65562 0 10.0579 0 11.4585C0 12.859 0.26728 14.2614 0.801841 15.5817C1.3364 16.9021 2.14181 18.1387 3.20915 19.2078C4.27649 20.2752 5.51489 21.0806 6.83525 21.6152C8.15562 22.1497 9.55617 22.417 10.9585 22.417C12.359 22.417 13.7614 22.1497 15.0817 21.6152C16.1134 21.1964 17.0935 20.612 17.9826 19.8689L22.6137 24.5L24 23.1137Z" fill="#354439"/>
          </svg>
          <input
            type="text"
            placeholder="Search ingredients..."
            className="bg-transparent w-full text-lg font-medium text-[#354439] placeholder-[#354439]/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Ingredients Grid */}
      <div className="max-w-[1440px] mx-auto px-[120px] pb-20">
        {error ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[#354439] mb-4">
              Error Loading Ingredients
            </h2>
            <p className="text-[#354439]/70 mb-8">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-6 py-3 bg-[#354439] text-white font-medium rounded-lg hover:bg-[#2a3630] transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : ingredients.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-[#354439] mb-4">
              No Ingredients Found
            </h2>
            <p className="text-[#354439]/70">
              Please check back later for our latest ingredients.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {ingredients.map((ingredient) => {
              if (!ingredient.name) return null;

              const slug = ingredient.name.toLowerCase().replace(/\s+/g, '-');

              return (
                <Link
                  key={ingredient.id}
                  href={`/directory/ingredients/${slug}`}
                  className="group"
                >
                  <div className="flex flex-col gap-[19px]">
                    <div className="aspect-square relative bg-white border border-[#e7e7e7] flex items-center justify-center overflow-hidden group-hover:border-[#354439]/20 transition-all duration-300">
                      {ingredient.image && ingredient.image[0] ? (
                        <div className="relative w-4/5 h-4/5 transition-transform duration-300 group-hover:scale-105">
                          <Image
                            src={ingredient.image[0].url}
                            alt={ingredient.name}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                      ) : (
                        <div className="w-4/5 h-4/5 flex items-center justify-center bg-[#354439]/5">
                          <span className="text-[#354439]/40 text-sm">No image available</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2.5">
                      <h2 className="text-[22px] font-semibold text-[#354439] group-hover:text-[#c06654] transition-colors">
                        {ingredient.name}
                      </h2>
                      {ingredient.description && (
                        <p className="text-[#354439]/70 line-clamp-2">
                          {ingredient.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
