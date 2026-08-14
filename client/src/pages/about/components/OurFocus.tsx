import CmsHtml from '@/components/feature/CmsHtml';

const OurFocus = ({
  data,
}: {
  data?: {
    title?: string;
    cards?: { title?: string; desc?: string; image?: string; link?: string }[];
    keyTitle?: string;
    keys?: { title?: string; description?: string; icon?: string; color?: string }[];
  };
}) => {
  const keyFocusAreas = data?.keys?.length
    ? data.keys
    : [
        {
          title: 'Commercial Concessions',
          description:
            'Operate and manage commercial assets across major transit hubs, enabling local, global, and digital-first brands to expand their offline footprint. We create value through flexible operating models and strong partnerships.',
          icon: 'ri-store-3-line',
          color: 'from-[#2879b1] to-[#1a5a8a]',
        },
        {
          title: 'Airports',
          description:
            'Develop, operate, and manage greenfield/brownfield airports, general aviation/jet terminals. We lead infrastructure development through efficient management and capital investments.',
          icon: 'ri-plane-line',
          color: 'from-[#8bc34a] to-[#689f38]',
        },
        {
          title: 'Allied Transportation Services and Infrastructure',
          description:
            'Operate and maintain brownfield assets such as integrated bus terminals, wayside amenities, heliports, and seaplane terminals. We drive growth by enhancing regional and last-mile connectivity.',
          icon: 'ri-roadster-line',
          color: 'from-[#ff7043] to-[#e64a19]',
        },
      ];

  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16 text-center" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data?.keyTitle || 'Our Key Focus Areas'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2879b1] to-[#ff7043] mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {keyFocusAreas.map((area, index) => (
            <div
              key={`${area.title}-${index}`}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div
                className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-br ${area.color || 'from-[#2879b1] to-[#1a5a8a]'} mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`${area.icon || 'ri-focus-3-line'} text-3xl text-white`}></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{area.title}</h3>
              <CmsHtml html={area.description} className="text-gray-600 leading-relaxed" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurFocus;
