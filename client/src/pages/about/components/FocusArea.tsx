import CmsHtml from '@/components/feature/CmsHtml';

export default function FocusArea({
  data,
}: {
  data?: { intro?: string; cards?: { title?: string; items?: string[] }[] };
}) {
  const defaultCards = [
    {
      title: 'Retail Spaces',
      bgColor: 'bg-[#2879b1]',
      items: [
        'Exclusive brand outlets',
        'Multi brand outlets',
        'Retail plazas',
        'Airports, Highways, Metro stations, Bus terminals, etc.',
      ],
    },
    {
      title: 'Services',
      bgColor: 'bg-[#8bc34a]',
      items: [
        'Store design',
        'Project management',
        'Staffing & Training',
        'Marketing & Events',
        'Storage management & Inventory control',
        'Store operations',
      ],
    },
    {
      title: 'Technology & Analytics',
      bgColor: 'bg-[#ff7043]',
      items: ['POS integration', 'Analytics', 'Optimization'],
    },
  ];
  const colors = ['bg-[#2879b1]', 'bg-[#8bc34a]', 'bg-[#ff7043]'];
  const borders = ['border-[#2879b1]', 'border-[#8bc34a]', 'border-[#ff7043]'];
  const focusAreas = data?.cards?.length
    ? data.cards.map((card, i) => ({
        title: card.title || defaultCards[i]?.title || '',
        bgColor: colors[i] || colors[0],
        items: card.items?.length ? card.items : defaultCards[i]?.items || [],
      }))
    : defaultCards;

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12" data-aos="fade-down">
          <CmsHtml
            html={
              data?.intro ||
              'At Refex Airports & Transportation, we offer Commercial as a Service (CaaS) - integrating prime retail spaces, comprehensive operational services, and advanced analytics to deliver high-performance retail environments at airports and other transit hubs.'
            }
            className="text-lg text-gray-700 leading-relaxed mb-12"
          />
        </div>

        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-0">
          <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#2879b1] bg-white flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#2879b1]"></div>
          </div>
          <div className="hidden lg:block w-12 h-0.5 bg-[#2879b1] flex-shrink-0"></div>
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-0 w-full lg:w-auto">
            {focusAreas.map((area, index) => (
              <div key={`${area.title}-${index}`} className="flex items-center">
                <div
                  className={`${area.bgColor} rounded-3xl p-8 text-white shadow-lg flex-1 lg:w-72 border-4 ${borders[index] || borders[0]} transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer`}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <h3 className="text-2xl font-bold mb-6 text-center">{area.title}</h3>
                  <ul className="space-y-3">
                    {area.items.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="mr-3 mt-1 flex-shrink-0">•</span>
                        <span className="text-base leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                {index < focusAreas.length - 1 && (
                  <div className="hidden lg:block relative w-12 flex-shrink-0">
                    <div className={`h-0.5 w-full ${index === 0 ? 'bg-[#8bc34a]' : 'bg-[#ff7043]'}`}></div>
                    <div
                      className={`absolute right-0 top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent ${
                        index === 0 ? 'border-l-[8px] border-l-[#8bc34a]' : 'border-l-[8px] border-l-[#ff7043]'
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden lg:block w-12 h-0.5 bg-[#ff7043] flex-shrink-0"></div>
          <div className="hidden lg:flex items-center justify-center w-8 h-8 rounded-full border-4 border-[#ff7043] bg-white flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-[#ff7043]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
