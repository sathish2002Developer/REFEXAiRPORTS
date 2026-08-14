import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const IntroSection = ({
  data,
}: {
  data?: { title?: string; image?: string; para1?: string; para2?: string };
}) => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex justify-center" data-aos="fade-right">
            <img
              src={mediaUrl(data?.image || 'https://refexairports.com/wp-content/uploads/2023/09/About-Airport.png')}
              alt={data?.title || 'About Airport'}
              className="w-full max-w-md h-auto"
            />
          </div>
          <div className="space-y-6" data-aos="fade-left">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {data?.title || 'Refex Airport & Transportation'}
            </h2>
            <CmsHtml
              html={data?.para1 || 'Refex Airports and Transportation is a commercial and transport platform created to be a best-in-class developer and operator of airports and allied transportation services infrastructure'}
              className="text-lg text-gray-700 leading-relaxed"
            />
            <CmsHtml
              html={data?.para2 || 'Join our journey as we redefine the landscape of global transit…'}
              className="text-lg text-gray-700 leading-relaxed"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
