import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const resources = [
  {
    title: 'Our Farmers',
    description: 'Meet the local farmers who grow your food with care and dedication',
    link: '/directory/farmers',
    image: '/images/collections/produce.jpg'
  },
  {
    title: 'Ingredients',
    description: 'Explore our curated selection of high-quality, sustainable ingredients',
    link: '/directory/ingredients',
    image: '/images/collections/produce.jpg'
  },
  {
    title: 'Cooking Guides',
    description: 'Learn essential cooking techniques and kitchen basics',
    link: '#',
    links: [
      'Basic Knife Skills',
      'Kitchen Equipment Guide',
      'Meal Planning 101',
      'Food Storage Tips'
    ]
  },
  {
    title: 'Seasonal Ingredients',
    description: 'Discover what\'s in season and how to use it',
    link: '#',
    links: [
      'Spring Produce Guide',
      'Summer Fruits & Vegetables',
      'Fall Harvest Guide',
      'Winter Ingredients'
    ]
  }
];

export default function DirectoryPage() {
  return (
    <div className="pt-[120px]">
      <section className="container py-10">
        <h1 className="text-center mb-16">Directory</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16">
          {resources.map((resource, index) => (
            <Link 
              key={index} 
              href={resource.link}
              className="flex flex-col gap-5 group"
            >
              <div className="aspect-[16/9] relative bg-[rgb(248,248,248)] overflow-hidden">
                {resource.image ? (
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-[26px] font-semibold">{resource.title}</h2>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-4">
                <h2 className="text-[26px] font-semibold group-hover:text-[#c06654] transition-colors">
                  {resource.title}
                </h2>
                <p className="text-[18px] text-[rgb(53,68,57)]/70">
                  {resource.description}
                </p>
                {resource.links && (
                  <ul className="space-y-2">
                    {resource.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <span className="text-[18px] font-semibold hover:text-[#c06654] link-transition">
                          {link}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[rgb(248,248,248)] py-10 mt-16">
        <div className="container">
          <h2 className="text-[32px] font-semibold mb-8">
            Want to learn more? Join our community.
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
