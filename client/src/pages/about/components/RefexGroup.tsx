import { useState, useEffect } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const RefexGroup = ({
  data,
}: {
  data?: {
    logo?: string;
    title?: string;
    subtitle?: string;
    desc?: string;
    btnText?: string;
    btnLink?: string;
    slides?: string[];
  };
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = data?.slides?.length
    ? data.slides
    : [
        'https://refexairports.com/wp-content/uploads/2023/08/Pune-airport-Aerial-view-1.jpeg',
        'https://refexairports.com/wp-content/uploads/2023/08/Pune-Airport-Images-1-Medium.jpeg',
        'https://refexairports.com/wp-content/uploads/2023/08/Pune-Airport-33-1.jpg',
      ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="w-full relative py-24 overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={mediaUrl(image)}
              alt={`Refex Group ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="flex justify-center mb-8" data-aos="fade-down">
          <img
            src={mediaUrl(data?.logo || 'https://refexairports.com/wp-content/uploads/2023/08/REFEX-Logo@2x-8-1.png')}
            alt="Refex Logo"
            className="h-14 brightness-0 invert"
          />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-8" data-aos="fade-up">
          {data?.title || 'Refex Group, the parent company of Refex Airports and Transportation'}
        </h2>

        {/* Slider Navigation Dots - Enhanced Visibility */}
        <div className="flex justify-center items-center gap-4 mb-12" data-aos="fade-up">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-4 rounded-full transition-all duration-300 cursor-pointer border-2 ${
                currentSlide === index
                  ? 'bg-[#7bbf45] border-[#7bbf45] w-12'
                  : 'bg-white border-white w-4 hover:bg-white/80'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto space-y-6" data-aos="fade-up">
          <CmsHtml
            html={
              data?.subtitle ||
              'A leading conglomerate that has diversified into various industries over the past two decades.'
            }
            className="text-2xl font-bold text-white"
          />

          <CmsHtml
            html={
              data?.desc ||
              "Refex Group is a 23-year-old diversified Indian conglomerate with a strong presence across multiple sectors, including Airports, Green Mobility, Healthcare (Medical Technology & Pharmaceuticals), Renewables (Solar, Wind Turbine Manufacturing, Compressed Biogas), and Ash & Coal utilization. We have a pan-India presence and operations spanning 15+ regions across India. We are India's 2nd largest electric four-wheeler fleet operator with 1300+ vehicles across major cities. We are also the largest organized player in ash and coal logistics and a pioneer in Make-in-India Magnetic Resonance imaging (MRI) technology. Over the past two decades, Refex Group has evolved into one of the India's fastest-growing conglomerates, driving innovation and sustainability across sectors."
            }
            className="text-white/90 text-lg leading-relaxed"
          />

          <div className="pt-4 text-center">
            <a
              href={data?.btnLink || 'http://www.refex.group'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#7bbf45] hover:bg-[#5a9933] text-white px-6 py-3 rounded-lg font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <span>{data?.btnText || 'More about Refex Group'}</span>
              <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RefexGroup;
