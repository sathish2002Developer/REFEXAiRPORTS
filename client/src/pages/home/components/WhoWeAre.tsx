import { useState, useEffect } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

export default function WhoWeAre({
  data,
}: {
  data?: { title?: string; desc?: string; btn?: string; images?: string[] };
}) {
  const [currentImage, setCurrentImage] = useState(0);
  const defaultImages = [
    'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg',
    'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-2.jpg',
  ];
  const images = data?.images?.filter(Boolean).length ? data.images.filter(Boolean) : defaultImages;
  const title = data?.title || 'Who We Are';
  const desc =
    data?.desc ||
    'Refex Airports and Transportation is transport and commercial platform created to be a best-in-class developer and operator of airports and allied transportation services infrastructure. Having successfully managed retail master concessions at Pune and Srinagar airports, RATPL has introduced premium global brands and services that add value and vibrancy to airport spaces. Building on this foundation, the company is expanding its presence across bus terminals, metro rail, heliports, railways, and wayside amenities developing integrated mobility and commercial hubs that connect people, places, and possibilities.';
  const btn = data?.btn || 'Know more';

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const handleKnowMore = () => {
    window.REACT_APP_NAVIGATE('/about');
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
            <CmsHtml html={desc} className="text-gray-600 text-lg leading-relaxed mb-8" />
            <button
              onClick={handleKnowMore}
              className="inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 cursor-pointer whitespace-nowrap border border-[#2879b1] text-[#2879b1] hover:bg-[#2879b1] hover:text-white px-6 py-3 text-base"
            >
              {btn}
            </button>
          </div>
          <div className="relative" data-aos="fade-left">
            <div className="relative h-96 rounded-lg overflow-hidden">
              {images.map((img, index) => (
                <img
                  key={index}
                  alt={`Pune Airport ${index + 1}`}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    currentImage === index ? 'opacity-100' : 'opacity-0'
                  }`}
                  src={mediaUrl(img)}
                />
              ))}
            </div>
            <div className="flex justify-center mt-4 space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                    currentImage === index ? 'bg-[#2879b1]' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
