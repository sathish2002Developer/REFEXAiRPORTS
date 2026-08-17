import CmsHtml from '@/components/feature/CmsHtml';

function visionParts(items: string[]) {
  const parts = items.map((item) => String(item || '').trim()).filter(Boolean);
  if (!parts.length) {
    return {
      lead: 'Enabling consumer journeys and creating lasting relationships at multiple transportation platforms.',
      platforms: ['Airports', 'Railways', 'Metro', 'Bus stations', 'Heliports'],
    };
  }
  const lead = parts[0];
  const rest = parts.slice(1).join(' ');
  const platforms = rest
    ? rest
        .replace(/\band\b/gi, ',')
        .split(',')
        .map((s) => s.replace(/[:.]/g, '').trim())
        .filter(Boolean)
    : [];
  return { lead, platforms };
}

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
  const { lead: visionLead, platforms } = visionParts(
    data?.visionItems?.length
      ? data.visionItems
      : [
          'Enabling consumer journeys and creating lasting relationships at multiple transportation platforms.',
          'Airports, Railways, Metro, Bus stations, and Heliports',
        ]
  );
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

  const visionTitle = data?.visionTitle || 'Our Vision';
  const visionWords = visionTitle.trim().split(/\s+/);
  const visionLast = visionWords.pop() || 'Vision';
  const visionFirst = visionWords.join(' ') || 'Our';

  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div
          className="bg-[#eaf6fc] rounded-[28px] px-6 py-10 sm:px-10 md:px-14 md:py-14 mb-10 md:mb-14 text-center"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">{visionFirst} </span>
            <span className="text-[#2879b1]">{visionLast}</span>
          </h2>
          <div className="w-16 h-1 bg-[#7bbf45] mx-auto mb-6 rounded-full"></div>
          <CmsHtml
            html={visionLead}
            as="p"
            className="max-w-3xl mx-auto text-gray-700 text-lg md:text-xl leading-relaxed font-medium"
          />
          {platforms.length > 0 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2.5">
              {platforms.map((platform) => (
                <span
                  key={platform}
                  className="px-4 py-2 rounded-full text-sm font-semibold text-[#2879b1] bg-white border border-[#2879b1]/20 shadow-sm"
                >
                  {platform}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          <div
            className="lg:col-span-5 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6 sm:p-8 md:p-10"
            data-aos="fade-up"
            data-aos-delay="80"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-full bg-[#2879b1] text-white flex items-center justify-center">
                <i className="ri-flag-2-line text-xl"></i>
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {data?.missionTitle || 'Our Mission'}
              </h3>
            </div>
            <ol className="space-y-3">
              {missionItems.map((item, i) => (
                <li key={i} className="flex items-start gap-4 bg-[#eaf6fc] rounded-[20px] px-4 py-3.5">
                  <span className="w-9 h-9 shrink-0 rounded-full bg-[#2879b1] text-white text-sm font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <CmsHtml html={item} className="text-gray-700 leading-relaxed pt-1.5" as="span" />
                </li>
              ))}
            </ol>
          </div>

          <div
            className="lg:col-span-7 bg-white rounded-[28px] border border-slate-100 shadow-sm p-6 sm:p-8 md:p-10"
            data-aos="fade-up"
            data-aos-delay="140"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="w-12 h-12 rounded-full bg-[#7bbf45] text-white flex items-center justify-center">
                <i className="ri-heart-line text-xl"></i>
              </span>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                {data?.valuesTitle || 'Our Values'}
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  key={v.name || v.letter || i}
                  className="rounded-[20px] bg-[#eaf6fc] p-5"
                >
                  <span
                    className={`w-11 h-11 mb-3 rounded-full text-white text-lg font-bold flex items-center justify-center ${
                      i % 2 === 0 ? 'bg-[#2879b1]' : 'bg-[#7bbf45]'
                    }`}
                  >
                    {v.letter}
                  </span>
                  <h4 className="text-base font-bold text-gray-900 mb-1.5">{v.name}</h4>
                  <CmsHtml html={v.desc || ''} className="text-sm text-gray-600 leading-relaxed" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
