import CmsHtml from '@/components/feature/CmsHtml';

const VisionMission = ({
  data,
}: {
  data?: {
    visionTitle?: string;
    visionItems?: string[];
    missionTitle?: string;
    missionItems?: string[];
    valuesTitle?: string;
    values?: { letter?: string; name?: string; desc?: string }[];
  };
}) => {
  const visionItems = data?.visionItems?.length
    ? data.visionItems
    : [
        'Enabling consumer journey and creating lasting relationships at multiple transportation platform',
        'Airports, Railways, Metro, Bus station, and Heliports',
      ];
  const missionItems = data?.missionItems?.length
    ? data.missionItems
    : [
        'Creating delightful travel experiences',
        'Achieving highest standards of operations',
        'Leadership in technology and process Simplification',
      ];
  const values = data?.values?.length
    ? data.values
    : [
        { letter: 'P', name: 'Principled Excellence', desc: "Doing what's right, with integrity and intention" },
        { letter: 'A', name: 'Authenticity', desc: 'Bringing your true self to work, and honouring that in others' },
        { letter: 'C', name: 'Customer Value', desc: 'Keeping our customers at the heart of everything we do' },
        { letter: 'E', name: 'Esteem Culture', desc: 'Fostering a workplace where respect, dignity, and belonging are everyday experiences' },
      ];

  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="0">
            <div className="h-2 bg-gradient-to-r from-[#0891b2] to-[#06b6d4]"></div>
            <div className="p-6 sm:p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{data?.visionTitle || 'Our Vision'}</h3>
              <ul className="space-y-4 text-gray-600">
                {visionItems.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="w-2 h-2 bg-[#0891b2] rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <CmsHtml html={item} className="leading-relaxed" as="span" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 relative overflow-hidden hover:shadow-xl transition-shadow duration-300" data-aos="fade-up" data-aos-delay="100">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#d97706]/10 to-transparent rounded-bl-full"></div>
            <div className="relative">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{data?.missionTitle || 'Our Mission'}</h3>
              <ul className="space-y-4 text-gray-600">
                {missionItems.map((item, i) => (
                  <li key={i} className="flex items-start">
                    <i className="ri-checkbox-circle-fill text-[#d97706] text-xl mr-3 mt-0.5 flex-shrink-0"></i>
                    <CmsHtml html={item} className="leading-relaxed" as="span" />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-100 hover:border-[#e11d48] hover:shadow-xl transition-all duration-300" data-aos="fade-up" data-aos-delay="200">
            <div className="p-6 sm:p-8 relative">
              <div className="absolute left-0 top-8 w-1 h-20 bg-gradient-to-b from-[#e11d48] to-[#f43f5e]"></div>
              <h3 className="text-2xl font-bold text-gray-800 mb-6">{data?.valuesTitle || 'Our Values'}</h3>
              <ul className="space-y-4 text-gray-600">
                {values.map((v) => (
                  <li key={v.name} className="flex items-start bg-gray-50 rounded-lg p-3 hover:bg-[#e11d48]/5 transition-colors duration-200">
                    <span className="text-[#e11d48] font-bold text-lg mr-3 flex-shrink-0">{v.letter}</span>
                    <span className="leading-relaxed">
                      <strong className="text-gray-800">{v.name}</strong> - <CmsHtml html={v.desc || ''} className="inline" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
