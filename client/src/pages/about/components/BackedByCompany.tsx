import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const DEFAULT_LOGO = 'https://refexairports.com/wp-content/uploads/2023/08/REFEX-Logo@2x-8-1.png';
const DEFAULT_LINK = 'https://refexgroup.com/';
const DEFAULT_DESC =
  "Refex Group is a 23-year old diversified Indian conglomerate with deep expertise across energy, mobility, healthcare, and infrastructure sectors. Over the past two decades, the Group has grown into one of India's fastest-evolving business groups, championing innovation and sustainability across its operations.";

const BackedByCompany = ({
  data,
}: {
  data?: {
    titleBefore?: string;
    titleEmphasis?: string;
    logo?: string;
    label?: string;
    desc?: string;
    link?: string;
  };
}) => {
  const heading = `${data?.titleBefore || 'Backed by'} ${data?.titleEmphasis || 'Refex Group'}`.trim();
  const href = data?.link || DEFAULT_LINK;

  return (
    <section className="w-full bg-white py-16 md:py-20 border-b-4 border-black">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <div className="flex justify-center mb-10 md:mb-12" data-aos="fade-down">
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#2879b1] text-white text-2xl md:text-3xl font-bold px-8 py-3 text-center cursor-pointer hover:bg-[#20618e] transition-colors"
          >
            {heading}
          </a>
        </div>

        <div
          className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
          data-aos="fade-up"
        >
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex flex-col items-center w-full md:w-auto md:min-w-[220px] cursor-pointer"
          >
            <img
              src={mediaUrl(data?.logo || DEFAULT_LOGO)}
              alt={data?.label || 'Refex Group'}
              className="h-14 md:h-16 w-auto mb-3"
            />
            <span className="text-sm text-gray-400 font-medium tracking-[0.2em] uppercase">
              {data?.label || 'Refex Group'}
            </span>
          </a>

          <div className="hidden md:block w-px bg-gray-300 self-stretch min-h-[88px]" />

          <div className="flex-1">
            <CmsHtml html={data?.desc || DEFAULT_DESC} className="text-gray-600 leading-relaxed text-base md:text-[17px]" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedByCompany;
