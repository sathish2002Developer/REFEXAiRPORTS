import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const BackedByCompany = ({
  data,
}: {
  data?: { titleBefore?: string; titleEmphasis?: string; logo?: string; label?: string; desc?: string };
}) => {
  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          data-aos="fade-down"
        >
          {data?.titleBefore || 'Backed by'}{' '}
          <span className="text-[#2879b1]">{data?.titleEmphasis || 'Leading Companies'}</span>
        </h2>

        <div
          className="flex flex-col md:flex-row items-start gap-10 md:gap-16 max-w-4xl mx-auto"
          data-aos="fade-up"
        >
          {/* Logo */}
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <img
              src={mediaUrl(data?.logo || 'https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png')}
              alt={data?.label || 'Refex Group'}
              className="h-16 w-auto mb-4"
            />
            <span className="text-sm text-gray-500 font-medium tracking-wider uppercase">
              {data?.label || 'Refex Group'}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

          {/* Description */}
          <div className="flex-1">
            <CmsHtml
              html={
                data?.desc ||
                'Refex Group is a diversified business conglomerate with deep expertise across energy, aviation, and infrastructure sectors. With decades of operational excellence and a strong commitment to innovation, the group empowers Refex Airports & Transportation to deliver world-class airport commercial services and redefine passenger experiences across India and beyond.'
              }
              className="text-gray-600 leading-relaxed text-base"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BackedByCompany;