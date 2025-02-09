import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function OurStoryPage() {
  return (
    <div className="pt-[120px]">
      {/* Hero Section */}
      <section className="container py-10">
        <h1 className="text-center mb-16">Our Story</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="flex flex-col gap-8">
            <div className="aspect-[4/3] relative bg-[rgb(248,248,248)]">
              <Image
                src="/about/kitchen.jpg"
                alt="Our Kitchen"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[26px] font-semibold">Our Beginning</h2>
              <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80">
                Founded in 2024, Burner Market Co. began with a simple mission: to make healthy cooking accessible, enjoyable, and sustainable for everyone. We believe that good food is the foundation of a healthy life, and everyone deserves access to nutritious, delicious meals.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="aspect-[4/3] relative bg-[rgb(248,248,248)]">
              <Image
                src="/about/ingredients.jpg"
                alt="Fresh Ingredients"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-[26px] font-semibold">Our Approach</h2>
              <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80">
                We carefully source the finest ingredients and create recipes that balance nutrition with flavor. Our team of chefs and nutritionists work together to develop meals that are not only healthy but also satisfying and easy to prepare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-[rgb(248,248,248)] py-16 mt-16">
        <div className="container">
          <h2 className="text-[32px] font-semibold mb-12 text-center">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4">
              <h3 className="text-[22px] font-semibold">Quality</h3>
              <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80">
                We never compromise on the quality of our ingredients or recipes. Every meal is crafted to meet our high standards.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[22px] font-semibold">Sustainability</h3>
              <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80">
                We're committed to sustainable practices in our sourcing and packaging to minimize our environmental impact.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-[22px] font-semibold">Community</h3>
              <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80">
                We believe in building a community of food lovers who share our passion for healthy, delicious cooking.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="container py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[32px] font-semibold mb-6">Join Our Journey</h2>
          <p className="text-[18px] leading-relaxed text-[rgb(53,68,57)]/80 mb-8">
            We're on a mission to transform how people think about healthy cooking. Whether you're a seasoned chef or just starting your culinary journey, there's a place for you in our community.
          </p>
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-[18px] font-bold hover:text-[#c06654] link-transition"
          >
            Explore Our Products
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M5.417 14.083h10.834l-3.568 3.568 1.532 1.532 4.65-4.65a2 2 0 000-2.828l-4.65-4.65-1.532 1.531 3.568 3.568H5.417v2.167z" fill="currentColor"/>
            </svg>
          </Link>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[rgb(248,248,248)] py-10">
        <div className="container">
          <h2 className="text-[32px] font-semibold mb-8">
            Stay updated with our latest news and recipes.
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
    </div>
  );
}