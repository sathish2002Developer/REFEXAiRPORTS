import { useEffect, useState, useRef } from 'react';
import { mediaUrl } from '@/lib/api';

interface StatData {
  image: string;
  count: number;
  suffix: string;
  label: string;
  delay: string;
}

const STATS: StatData[] = [
  {
    image:
      'https://readdy.ai/api/search-image?query=Expansive%20modern%20airport%20terminal%20concourse%20with%20glass%20curtain%20walls%2C%20polished%20stone%20floors%2C%20retail%20storefronts%20lining%20a%20wide%20walkway%2C%20soft%20morning%20daylight%20streaming%20in%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-01&orientation=portrait',
    count: 2,
    suffix: '',
    label: 'Airports with Active Retail Zones',
    delay: '0',
  },
  {
    image:
      'https://readdy.ai/api/search-image?query=Busy%20modern%20airport%20terminal%20with%20travelers%20walking%20with%20luggage%20near%20tall%20panoramic%20windows%20overlooking%20an%20airplane%20on%20the%20tarmac%2C%20bright%20natural%20daylight%2C%20clean%20minimalist%20architectural%20design%2C%20soft%20neutral%20color%20palette%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-02&orientation=portrait',
    count: 15,
    suffix: 'M+',
    label: 'Annual Passengers in Addressable Zones',
    delay: '100',
  },
  {
    image:
      'https://readdy.ai/api/search-image?query=Elegant%20airport%20duty-free%20retail%20shops%20with%20illuminated%20displays%20and%20luxury%20goods%20on%20shelves%2C%20wide%20shopping%20concourse%2C%20bright%20interior%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20soft%20neutral%20color%20palette%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-03&orientation=portrait',
    count: 70,
    suffix: '+',
    label: 'Retail Outlets Supported',
    delay: '200',
  },
  {
    image:
      'https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20shopping%20district%20with%20branded%20storefronts%20and%20boutique%20retail%20facades%20along%20a%20spacious%20walkway%2C%20glass%20ceiling%20letting%20in%20warm%20natural%20light%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-04&orientation=portrait',
    count: 50,
    suffix: '+',
    label: 'Brand Partnerships Across Terminals',
    delay: '300',
  },
  {
    image:
      'https://readdy.ai/api/search-image?query=Wide%20open%20modern%20airport%20retail%20concourse%20with%20polished%20terrazzo%20floors%2C%20curved%20ceiling%2C%20rows%20of%20elegant%20storefronts%20and%20seating%20areas%2C%20soft%20ambient%20daylight%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-05&orientation=portrait',
    count: 15,
    suffix: 'K+',
    label: 'sq. ft. of Retail Space Curated',
    delay: '400',
  },
];

function StatNumber({ target, suffix }: { target: number; suffix: string }) {
  const [value, setValue] = useState(0);
  const numberRef = useRef<HTMLSpanElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = numberRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasStarted.current) return;
          hasStarted.current = true;

          const duration = 2000;
          const steps = 60;
          const stepValue = target / steps;
          const stepDuration = duration / steps;
          let current = 0;

          const interval = setInterval(() => {
            current += stepValue;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            setValue(Math.floor(current));
          }, stepDuration);

          observer.disconnect();
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={numberRef}>
      {value}
      {suffix}
    </span>
  );
}

export default function Stats({ data }: { data?: { title?: string; items?: Array<{ image?: string; count?: number; suffix?: string; countDisplay?: string; label?: string }> } }) {
  const title = data?.title || 'Our Impact in Numbers';
  const stats: StatData[] =
    data?.items && data.items.length
      ? data.items.map((item, index) => ({
          image: item.image || STATS[index]?.image || '',
          count: Number(item.count ?? 0),
          suffix: item.suffix || '',
          label: item.label || '',
          delay: String(index * 100),
        }))
      : STATS;
  // Wave pattern: cards translate in X and Y directions as they appear
  const animationDirections = [
    'fade-up-right',
    'fade-up',
    'fade-up-left',
    'fade-up-right',
    'fade-up',
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="group flex flex-col"
              data-aos={animationDirections[index]}
              data-aos-delay={stat.delay}
            >
              <div className="w-full aspect-[4/5] overflow-hidden rounded-[20px]">
                <img
                  src={mediaUrl(stat.image)}
                  alt={stat.label}
                  title={`${stat.label}`}
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-110"
                />
              </div>
              <div className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-500 leading-none">
                <StatNumber target={stat.count} suffix={stat.suffix} />
              </div>
              <div className="mt-3 text-sm font-bold text-gray-900 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}