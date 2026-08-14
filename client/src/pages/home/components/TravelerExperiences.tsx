import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

interface ExperienceItem {
  image: string;
  title: string;
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    image:
      'https://readdy.ai/api/search-image?query=Modern%20airport%20quick-service%20restaurant%20QSR%20with%20elegant%20dining%20seating%2C%20warm%20wooden%20accents%2C%20colorful%20cultural%20wall%20decorations%2C%20polished%20floors%2C%20bright%20interior%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=1200&height=800&seq=experience-qsr-01&orientation=landscape',
    title: 'Travel QSR',
    description:
      "Our Travel QSR business comprises a range of curated F&B concepts across cuisines, brands and formats, which have been adapted to cater to customers' demands for speed and convenience within travel environments.",
  },
  {
    image:
      'https://readdy.ai/api/search-image?query=Luxurious%20airport%20lounge%20interior%20with%20plush%20seating%2C%20elegant%20wooden%20paneling%2C%20intricate%20ceiling%20art%2C%20floor-to-ceiling%20windows%20overlooking%20runway%2C%20warm%20ambient%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=1200&height=800&seq=experience-lounge-02&orientation=landscape',
    title: 'Lounges',
    description:
      'Our Lounge business comprises designated areas within airport terminals, thoughtfully curated to provide travellers with an oasis of comfort and culinary excellence, tailored to enhance their journey with quality, convenience, and diverse offerings.',
  },
];

export default function TravelerExperiences({
  data,
}: {
  data?: {
    titleLine1?: string;
    titleLine2?: string;
    highlight?: string;
    items?: ExperienceItem[];
  };
}) {
  const items = data?.items?.length ? data.items : EXPERIENCES;
  const titleLine1 = data?.titleLine1 || 'Creating Unparalleled';
  const titleLine2 = data?.titleLine2 || 'Experiences';
  const highlight = data?.highlight || 'For Travellers';
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-14 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 leading-tight">
            {titleLine1}
            <br />
            {titleLine2}{' '}
            <span className="text-primary-500">{highlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {items.map((item, index) => {
            // Ultra wave entrance: alternating diagonal directions
            const aosDir = index % 2 === 0 ? 'fade-up-right' : 'fade-up-left';
            return (
              <div
                key={item.title}
                className="group flex flex-col cursor-pointer"
                data-aos={aosDir}
                data-aos-delay={String(index * 200)}
                data-aos-duration="900"
                data-aos-easing="cubic-bezier(0.22, 1, 0.36, 1)"
              >
                {/* Image Container */}
                <div className="relative w-full aspect-[3/2] overflow-hidden rounded-[20px] shadow-md transition-all duration-700 ease-out group-hover:shadow-2xl group-hover:-translate-y-2">
                  <img
                    src={mediaUrl(item.image)}
                    alt={item.title}
                    title={`${item.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 transition-all duration-700 ease-out group-hover:bg-black/10" />
                  {/* Corner Accent on Hover */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-t-[0px] border-r-[0px] border-t-primary-500 border-r-primary-500 transition-all duration-500 ease-out group-hover:border-t-[48px] group-hover:border-r-[48px] opacity-80 rounded-tr-[20px]"></div>
                </div>

                {/* Title */}
                <h3 className="mt-6 text-2xl lg:text-3xl font-bold text-gray-900 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:text-primary-500">
                  {item.title}
                </h3>

                {/* Description */}
                <CmsHtml
                  html={item.description}
                  className="mt-3 text-base text-gray-600 leading-relaxed transition-all duration-500 ease-out group-hover:-translate-y-0.5 group-hover:text-gray-700"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}