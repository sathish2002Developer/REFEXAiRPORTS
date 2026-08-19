import { useState } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

interface Airport {
  name: string;
  link: string;
  marker: { top: string; left: string };
}

export default function OurFootprints({
  data,
}: {
  data?: {
    title?: string;
    subtitle?: string;
    mapImage?: string;
    airports?: Airport[];
  };
}) {
  const [activeAirport, setActiveAirport] = useState<number | null>(null);

  const defaultAirports: Airport[] = [
    {
      name: 'Srinagar Airport',
      link: '/srinagar-airport',
      marker: { top: '18%', left: '30%' },
    },
    {
      name: 'Aurangabad Airport',
      link: '/aurangabad-airport',
      marker: { top: '53%', left: '33%' },
    },
    {
      name: 'Shirdi Airport',
      link: '/shirdi-airport',
      marker: { top: '50%', left: '30%' },
    },
    {
      name: 'Pune Airport',
      link: '/pune-airport',
      marker: { top: '58%', left: '28%' },
    },
    {
      name: 'Trichy Airport',
      link: '/trichy-airport',
      marker: { top: '78%', left: '48%' },
    },
  ];

  const airports = data?.airports?.length ? data.airports : defaultAirports;
  const title = data?.title || 'OUR FOOTPRINTS';
  const subtitle =
    data?.subtitle || 'Strategically located across India, connecting travelers to every corner of the nation';
  const mapImage =
    data?.mapImage ||
    'https://readdy.ai/api/search-image?query=Clean%20blue%20silhouette%20map%20of%20India%20on%20pure%20white%20background%2C%20simple%20flat%20design%2C%20no%20markers%20no%20text%20no%20labels%2C%20solid%20blue%20color%20fill%20with%20smooth%20edges%2C%20minimalist%20vector%20style%2C%20high%20resolution&width=900&height=1200&seq=india-map-clean-002&orientation=portrait';

  const handleLearnMore = (link: string) => {
    window.REACT_APP_NAVIGATE(link);
  };

  return (
    <section id="ourvenues" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">{title}</h2>
          <CmsHtml html={subtitle} className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto" />
        </div>

        {/* Full-width Map */}
        <div className="relative w-full max-w-3xl mx-auto" data-aos="zoom-in">
          <div className="relative w-full aspect-[3/4]">
            <img
              src={mediaUrl(mapImage)}
              alt="India Map showing all Refex airport locations"
              className="w-full h-full object-contain"
            />

            {/* Map Markers */}
            {airports.map((airport, index) => (
              <button
                key={index}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                style={{ top: airport.marker.top, left: airport.marker.left }}
                onMouseEnter={() => setActiveAirport(index)}
                onMouseLeave={() => setActiveAirport(null)}
                onClick={() => handleLearnMore(airport.link)}
                aria-label={airport.name}
              >
                <span className="relative flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#d93025] border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-110" />
                {/* Tooltip */}
                <span
                  className={`absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-xs font-semibold whitespace-nowrap transition-all duration-200 pointer-events-none shadow-lg ${
                    activeAirport === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'
                  }`}
                >
                  {airport.name}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full -mt-1 border-4 border-transparent border-t-gray-900" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}