import { getAllFarmers, Farmer } from '@/lib/directory';
import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
  title: 'Farmer Directory | BurnerMarket',
  description: 'Discover our network of local farmers and producers.',
};

export default async function FarmersDirectoryPage() {
  let farmers: Farmer[] = [];
  try {
    farmers = await getAllFarmers();
    console.log('Farmers loaded:', farmers.length);
    
    if (farmers.length === 0) {
      console.log('No farmers found');
    } else {
      console.log('Sample farmer:', farmers[0]);
    }
  } catch (error) {
    console.error('Error loading farmers:', error);
    farmers = [];
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      <div className="mb-12">
        <div className="flex justify-start items-center gap-2 text-sm mb-8">
          <Link href="/" className="text-base font-semibold text-[#595959]">Home</Link>
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" className="opacity-60">
            <path d="M8.62986 8.50033L5.91436 5.785C5.82214 5.69267 5.77492 5.57661 5.7727 5.43683C5.77059 5.29717 5.81781 5.179 5.91436 5.08233C6.01103 4.98578 6.12814 4.9375 6.2657 4.9375C6.40325 4.9375 6.52036 4.98578 6.61703 5.08233L9.6132 8.0785C9.67553 8.14094 9.71953 8.20678 9.7452 8.276C9.77086 8.34522 9.7837 8.42 9.7837 8.50033C9.7837 8.58067 9.77086 8.65544 9.7452 8.72467C9.71953 8.79389 9.67553 8.85972 9.6132 8.92217L6.61703 11.9183C6.5247 12.0106 6.40864 12.0578 6.26886 12.06C6.1292 12.0621 6.01103 12.0149 5.91436 11.9183C5.81781 11.8217 5.76953 11.7046 5.76953 11.567C5.76953 11.4294 5.81781 11.3123 5.91436 11.2157L8.62986 8.50033Z" fill="#354439"/>
          </svg>
          <span className="text-base font-semibold text-[#354439]">Farmers</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">Search for farmer</h1>
        <p className="text-lg text-gray-600">
          Meet the passionate farmers and producers who bring fresh, sustainable ingredients to your table.
        </p>
      </div>

      <div className="flex justify-start items-center w-full h-[77px] gap-3 px-[30px] rounded-[40px] bg-[#354439]/[0.06] border border-[#354439]/20 mb-12">
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" className="opacity-50">
          <path d="M24 23.1137L19.3689 18.4826C20.1137 17.5935 20.6982 16.6134 21.1152 15.5817C21.6497 14.2614 21.917 12.8608 21.917 11.4585C21.917 10.0579 21.6497 8.65562 21.1152 7.33525C20.5806 6.01489 19.7752 4.77827 18.7078 3.70915C17.6405 2.64181 16.4021 1.8364 15.0817 1.30184C13.7614 0.76728 12.359 0.5 10.9585 0.5C9.55795 0.5 8.15562 0.76728 6.83525 1.30184C5.51489 1.8364 4.27827 2.64181 3.20915 3.70915C2.14181 4.77649 1.3364 6.01489 0.801841 7.33525C0.26728 8.65562 0 10.0579 0 11.4585C0 12.859 0.26728 14.2614 0.801841 15.5817C1.3364 16.9021 2.14181 18.1387 3.20915 19.2078C4.27649 20.2752 5.51489 21.0806 6.83525 21.6152C8.15562 22.1497 9.55617 22.417 10.9585 22.417C12.359 22.417 13.7614 22.1497 15.0817 21.6152C16.1134 21.1964 17.0935 20.612 17.9826 19.8689L22.6137 24.5L24 23.1137Z" fill="#354439"/>
        </svg>
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent w-full text-lg font-semibold text-[#354439] placeholder-[#354439]/50 focus:outline-none"
        />
      </div>

      <div className="flex justify-between items-start w-[1200px] h-[379px]">
        {farmers.map((farmer) => (
          <Link
            key={farmer.id}
            href={`/directory/farmers/${farmer.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="flex flex-col justify-start items-start w-[285px] relative gap-[19px]"
          >
            <div className="w-[285px] h-[211px] relative bg-[#354439]/5 border border-[#e7e7e7]">
              {farmer.image && farmer.image[0] ? (
                <Image
                  src={farmer.image[0].url}
                  alt={farmer.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <p className="w-[221px] absolute left-8 top-[76px] text-[29px] font-semibold text-center text-[#354439]">
                  {farmer.name}
                </p>
              )}
            </div>
            
            <div className="flex flex-col justify-start items-start self-stretch gap-2.5">
              <div className="flex flex-col justify-start items-start self-stretch relative">
                <p className="self-stretch w-[285px] text-[22px] font-semibold text-left text-[#354439]">
                  {farmer.name}
                </p>
                <p className="self-stretch w-[285px] opacity-70 text-sm font-bold text-left uppercase text-[#354439]">
                  {farmer.specialties && farmer.specialties.length > 0 
                    ? farmer.specialties.join(' & ')
                    : 'Specialty not specified'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
