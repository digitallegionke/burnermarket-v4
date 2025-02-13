import { getFarmerBySlug, Farmer } from '@/lib/directory';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const farmer = await getFarmerBySlug(params.slug);
    if (!farmer) {
      console.log('No farmer found for metadata:', params.slug);
      return {};
    }

    return {
      title: `${farmer.name} | BurnerMarket Farmers`,
      description: farmer.description || 'Meet our local farmers who bring fresh, sustainable ingredients to your table.',
    };
  } catch (error) {
    console.error('Error generating farmer metadata:', error);
    return {};
  }
}

export default async function FarmerPage({ params }: { params: { slug: string } }) {
  let farmer: Farmer | null = null;
  try {
    farmer = await getFarmerBySlug(params.slug);
    console.log('Farmer loaded:', farmer?.name);
    
    if (!farmer) {
      console.log('No farmer found for slug:', params.slug);
      notFound();
    }
  } catch (error) {
    console.error('Error loading farmer:', error);
    notFound();
  }

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-12">
      {/* Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-gray-600 hover:text-green-600">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link href="/directory/farmers" className="text-gray-600 hover:text-green-600">
            Farmers
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{farmer.name}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div>
          {farmer.image && farmer.image[0] ? (
            <div className="relative aspect-square rounded-lg overflow-hidden bg-white shadow-md">
              <Image
                src={farmer.image[0].url}
                alt={farmer.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{farmer.name}</h1>
          
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium">
              {farmer.location}
            </span>
          </div>

          <div className="space-y-8">
            {/* Description */}
            <div>
              <h2 className="text-xl font-semibold mb-2">About the Farm</h2>
              <p className="text-gray-600">{farmer.description}</p>
            </div>

            {/* Specialties */}
            {farmer.specialties && farmer.specialties.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Specialties</h2>
                <div className="flex flex-wrap gap-2">
                  {farmer.specialties.map((specialty, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Farm Details */}
            <div className="grid grid-cols-2 gap-6">
              {farmer.farmSize && (
                <div>
                  <h3 className="font-semibold mb-1">Farm Size</h3>
                  <p className="text-gray-600">{farmer.farmSize}</p>
                </div>
              )}
              {farmer.yearEstablished && (
                <div>
                  <h3 className="font-semibold mb-1">Established</h3>
                  <p className="text-gray-600">{farmer.yearEstablished}</p>
                </div>
              )}
            </div>

            {/* Certifications */}
            {farmer.certifications && farmer.certifications.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Certifications</h2>
                <div className="flex flex-wrap gap-2">
                  {farmer.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Sustainability Practices */}
            {farmer.sustainabilityPractices && farmer.sustainabilityPractices.length > 0 && (
              <div>
                <h2 className="text-xl font-semibold mb-2">Sustainability Practices</h2>
                <div className="flex flex-wrap gap-2">
                  {farmer.sustainabilityPractices.map((practice, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full"
                    >
                      {practice}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
              <div className="space-y-3">
                {farmer.contactEmail && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Email:</span>
                    <a 
                      href={`mailto:${farmer.contactEmail}`}
                      className="text-green-600 hover:underline"
                    >
                      {farmer.contactEmail}
                    </a>
                  </div>
                )}
                {farmer.contactPhone && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Phone:</span>
                    <a 
                      href={`tel:${farmer.contactPhone}`}
                      className="text-green-600 hover:underline"
                    >
                      {farmer.contactPhone}
                    </a>
                  </div>
                )}
                {farmer.website && (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">Website:</span>
                    <a 
                      href={farmer.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline"
                    >
                      {farmer.website}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
