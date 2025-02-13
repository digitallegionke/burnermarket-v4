import { getIngredientBySlug, Ingredient } from '@/lib/directory';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const ingredient = await getIngredientBySlug(params.slug);
    if (!ingredient) {
      console.log('No ingredient found for metadata:', params.slug);
      return {};
    }

    return {
      title: `${ingredient.name} | BurnerMarket Ingredients`,
      description: ingredient.description || 'Explore our high-quality, sustainable ingredients.',
    };
  } catch (error) {
    console.error('Error generating ingredient metadata:', error);
    return {};
  }
}

export default async function IngredientPage({ params }: { params: { slug: string } }) {
  let ingredient: Ingredient | null = null;
  try {
    ingredient = await getIngredientBySlug(params.slug);
    console.log('Ingredient loaded:', ingredient?.name);
    
    if (!ingredient) {
      console.log('No ingredient found for slug:', params.slug);
      notFound();
    }
  } catch (error) {
    console.error('Error loading ingredient:', error);
    notFound();
  }

  return (
    <div className="w-[1440px] relative overflow-hidden bg-white">
      {/* Navigation */}
      <div className="flex flex-col justify-start items-start w-[1440px] absolute left-0 top-0 bg-[#f6f6f4]">
        <div className="flex justify-start items-center self-stretch h-[120px] gap-[54px] px-[120px] border-b border-[#354439]/20">
          <Link href="/" className="flex justify-start items-center gap-[54px]">
            <Image src="/images/BM logo.svg" alt="BurnerMarket" width={181} height={58} />
          </Link>
          <div className="flex justify-start items-center relative gap-10">
            <Link href="/" className="text-lg font-medium text-[#354439]">Home</Link>
            <Link href="/shop" className="text-lg font-medium text-[#354439]">Shop</Link>
            <Link href="/recipes" className="text-lg font-medium text-[#354439]">Recipes</Link>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="flex justify-start items-center absolute left-[122px] top-[183px] gap-[7px]">
        <Link href="/" className="text-base font-semibold text-[#595959]">Home</Link>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="opacity-60">
          <path d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z" fill="#354439"/>
        </svg>
        <Link href="/directory/ingredients" className="text-base font-semibold text-[#595959]">Ingredients</Link>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="opacity-60">
          <path d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z" fill="#354439"/>
        </svg>
        <span className="text-base font-semibold text-[#354439]">{ingredient.name}</span>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-start items-start w-[1200px] absolute left-[120px] top-[481px] gap-11">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image */}
          <div className="w-[285px] h-[285px] relative bg-white border border-[#e7e7e7] flex items-center justify-center">
            {ingredient.image && ingredient.image[0] ? (
              <div className="relative w-4/5 h-4/5">
                <Image
                  src={ingredient.image[0].url}
                  alt={ingredient.name}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <span className="text-gray-400">No image available</span>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="flex flex-col gap-8">
            <div>
              <h1 className="text-[38px] font-semibold text-[#354439] mb-4">{ingredient.name}</h1>
              <span className="inline-block px-4 py-2 bg-[#354439]/[0.06] text-[#354439] text-sm font-medium rounded-full">
                {ingredient.category}
              </span>
            </div>

            {ingredient.description && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#354439]">About this Ingredient</h2>
                <p className="text-[#354439]/80">{ingredient.description}</p>
              </div>
            )}

            {ingredient.nutritionalInfo && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#354439]">Nutritional Information</h2>
                <p className="text-[#354439]/80">{ingredient.nutritionalInfo}</p>
              </div>
            )}

            {ingredient.seasonality && ingredient.seasonality.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#354439]">Seasonality</h2>
                <div className="flex flex-wrap gap-2">
                  {ingredient.seasonality.map((season, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#354439]/[0.06] text-[#354439] text-sm rounded-full"
                    >
                      {season}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ingredient.storageInstructions && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#354439]">Storage Instructions</h2>
                <p className="text-[#354439]/80">{ingredient.storageInstructions}</p>
              </div>
            )}

            {ingredient.culinaryUses && (
              <div>
                <h2 className="text-xl font-semibold mb-2 text-[#354439]">Culinary Uses</h2>
                <p className="text-[#354439]/80">{ingredient.culinaryUses}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="w-[1440px] h-[552px] absolute left-0 top-[1884px]">
        <div className="w-full h-full bg-[#354439] px-[120px] py-[57px]">
          <Image src="/images/BM logo.svg" alt="BurnerMarket" width={201} height={62} className="mb-[196px]" />
          
          <div className="flex gap-11 mb-[51px]">
            <div className="flex flex-col gap-4 text-lg font-medium text-white">
              <Link href="/gift-card">Give Gift Card</Link>
              <Link href="/redeem">Redeem Gift Card</Link>
              <Link href="/careers">Careers</Link>
            </div>
            <div className="flex flex-col gap-4 text-lg font-medium text-white">
              <Link href="/supply-chain">CA Supply Chain</Link>
              <Link href="/sitemap">Sitemap</Link>
              <Link href="/privacy">Privacy Policy</Link>
            </div>
            <div className="flex flex-col gap-4 text-lg font-medium text-white">
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy#do-not-sell">Do Not Sell or Share My Information</Link>
              <Link href="/snap-ebt">SNAP EBT</Link>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-base text-white">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>
            <div className="flex items-center gap-[29px]">
              <p className="text-xl font-semibold text-white">Follow us</p>
              <div className="flex gap-[26px]">
                <Link href="#" className="text-white">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M18 0C8.05896 0 0 8.05896 0 18C0 26.4413 5.81184 33.5246 13.6519 35.4701V23.5008H9.94032V18H13.6519V15.6298C13.6519 9.50328 16.4246 6.6636 22.4395 6.6636C23.58 6.6636 25.5478 6.88752 26.3527 7.11072V12.0967C25.9279 12.0521 25.1899 12.0298 24.2734 12.0298C21.3221 12.0298 20.1816 13.1479 20.1816 16.0546V18H26.0611L25.051 23.5008H20.1816V35.8682C29.0945 34.7918 36.0007 27.203 36.0007 18C36 8.05896 27.941 0 18 0Z" fill="currentColor"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M18 3.24141C22.8094 3.24141 23.3789 3.2625 25.2703 3.34687C27.0281 3.42422 27.9773 3.71953 28.6102 3.96563C29.4469 4.28906 30.0516 4.68281 30.6773 5.30859C31.3102 5.94141 31.6969 6.53906 32.0203 7.37578C32.2664 8.00859 32.5617 8.96484 32.6391 10.7156C32.7234 12.6141 32.7445 13.1836 32.7445 17.9859C32.7445 22.7953 32.7234 23.3648 32.6391 25.2563C32.5617 27.0141 32.2664 27.9633 32.0203 28.5961C31.6969 29.4328 31.3031 30.0375 30.6773 30.6633C30.0445 31.2961 29.4469 31.6828 28.6102 32.0062C27.9773 32.2523 27.0211 32.5477 25.2703 32.625C23.3719 32.7094 22.8023 32.7305 18 32.7305C13.1906 32.7305 12.6211 32.7094 10.7297 32.625C8.97188 32.5477 8.02266 32.2523 7.38984 32.0062C6.55313 31.6828 5.94844 31.2891 5.32266 30.6633C4.68984 30.0305 4.30312 29.4328 3.97969 28.5961C3.73359 27.9633 3.43828 27.007 3.36094 25.2563C3.27656 23.3578 3.25547 22.7883 3.25547 17.9859C3.25547 13.1766 3.27656 12.607 3.36094 10.7156C3.43828 8.95781 3.73359 8.00859 3.97969 7.37578C4.30312 6.53906 4.69688 5.93437 5.32266 5.30859C5.95547 4.67578 6.55313 4.28906 7.38984 3.96563C8.02266 3.71953 8.97891 3.42422 10.7297 3.34687C12.6211 3.2625 13.1906 3.24141 18 3.24141ZM18 0C13.1133 0 12.5016 0.0210937 10.582 0.105469C8.66953 0.189844 7.35469 0.499219 6.21563 0.942187C5.02734 1.40625 4.02188 2.01797 3.02344 3.02344C2.01797 4.02187 1.40625 5.02734 0.942188 6.20859C0.499219 7.35469 0.189844 8.6625 0.105469 10.575C0.0210938 12.5016 0 13.1133 0 18C0 22.8867 0.0210938 23.4984 0.105469 25.418C0.189844 27.3305 0.499219 28.6453 0.942188 29.7844C1.40625 30.9727 2.01797 31.9781 3.02344 32.9766C4.02188 33.975 5.02734 34.5937 6.20859 35.0508C7.35469 35.4937 8.6625 35.8031 10.575 35.8875C12.4945 35.9719 13.1062 35.993 17.993 35.993C22.8797 35.993 23.4914 35.9719 25.4109 35.8875C27.3234 35.8031 28.6383 35.4937 29.7773 35.0508C30.9586 34.5937 31.9641 33.975 32.9625 32.9766C33.9609 31.9781 34.5797 30.9727 35.0367 29.7914C35.4797 28.6453 35.7891 27.3375 35.8734 25.425C35.9578 23.5055 35.9789 22.8937 35.9789 18.007C35.9789 13.1203 35.9578 12.5086 35.8734 10.5891C35.7891 8.67656 35.4797 7.36172 35.0367 6.22266C34.5938 5.02734 33.982 4.02187 32.9766 3.02344C31.9781 2.025 30.9727 1.40625 29.7914 0.949219C28.6453 0.50625 27.3375 0.196875 25.425 0.1125C23.4984 0.0210938 22.8867 0 18 0Z" fill="currentColor"/>
                    <path d="M18 8.75391C12.8953 8.75391 8.75391 12.8953 8.75391 18C8.75391 23.1047 12.8953 27.2461 18 27.2461C23.1047 27.2461 27.2461 23.1047 27.2461 18C27.2461 12.8953 23.1047 8.75391 18 8.75391ZM18 23.9977C14.6883 23.9977 12.0023 21.3117 12.0023 18C12.0023 14.6883 14.6883 12.0023 18 12.0023C21.3117 12.0023 23.9977 14.6883 23.9977 18C23.9977 21.3117 21.3117 23.9977 18 23.9977Z" fill="currentColor"/>
                    <path d="M29.7703 8.38809C29.7703 9.5834 28.8 10.5467 27.6117 10.5467C26.4164 10.5467 25.4531 9.57637 25.4531 8.38809C25.4531 7.19277 26.4234 6.22949 27.6117 6.22949C28.8 6.22949 29.7703 7.19981 29.7703 8.38809Z" fill="currentColor"/>
                  </svg>
                </Link>
                <Link href="#" className="text-white">
                  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                    <path d="M25.6088 0H19.5417V24.5217C19.5417 27.4435 17.2083 29.8435 14.3044 29.8435C11.4005 29.8435 9.06703 27.4435 9.06703 24.5217C9.06703 21.6522 11.3487 19.3043 14.1489 19.2V13.0435C7.97808 13.1478 3 18.2087 3 24.5217C3 30.887 8.08178 36 14.3563 36C20.6307 36 25.7124 30.8348 25.7124 24.5217V11.9478C27.9941 13.6174 30.7942 14.6087 33.75 14.6609V8.50435C29.1868 8.34783 25.6088 4.5913 25.6088 0Z" fill="currentColor"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
