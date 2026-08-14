import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const ThreePillars = ({
  data,
}: {
  data?: {
    title?: string;
    subtitle?: string;
    retailTitle?: string;
    retailImg?: string;
    retailPara1?: string;
    retailPara2?: string;
    commTitle?: string;
    commImg?: string;
    commPara1?: string;
    commPara2?: string;
  };
}) => {
  return (
    <section className="w-full bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {data?.title || 'Our Three Pillars'}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2879b1] to-[#20618e] mx-auto mb-6"></div>
          <CmsHtml
            html={data?.subtitle || 'Transforming airport experiences through strategic excellence'}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          />
        </div>

        <div className="mb-16" data-aos="fade-up">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-80 lg:h-auto">
                <img
                  src={mediaUrl(
                    data?.retailImg ||
                    'https://readdy.ai/api/search-image?query=Modern%20luxury%20airport%20retail%20shopping%20area%20with%20premium%20brand%20stores%2C%20elegant%20interior%20design%2C%20bright%20lighting%2C%20contemporary%20architecture%2C%20travelers%20browsing%20high-end%20boutiques%2C%20sophisticated%20commercial%20space%20with%20clean%20minimalist%20aesthetic&width=800&height=600&seq=retail-exp-001&orientation=landscape'
                  )}
                  alt={data?.retailTitle || 'Retail Experience'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#667eea]/20 to-transparent"></div>
              </div>
              <div className="p-10 lg:p-12 flex flex-col justify-center">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {data?.retailTitle || 'Retail Experience'}
                </h3>
                <CmsHtml
                  html={data?.retailPara1 || 'Refex curates and manages premium retail experiences within airports, bringing together global and homegrown brands to enhance passenger satisfaction and non-aero revenue.'}
                  className="text-gray-600 leading-relaxed text-lg mb-6"
                />
                <CmsHtml
                  html={data?.retailPara2 || 'Our focus is on creating vibrant, consumer-centric spaces that transform airports into lifestyle destinations.'}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <div data-aos="fade-up">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-10 lg:p-12 flex flex-col justify-center order-2 lg:order-1">
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {data?.commTitle || 'Commercial as a Service'}
                </h3>
                <CmsHtml
                  html={data?.commPara1 || 'Refex offers end-to-end commercial management solutions for airport operators from space planning and tenant mix optimization to revenue management and operational efficiency.'}
                  className="text-gray-600 leading-relaxed text-lg mb-6"
                />
                <CmsHtml
                  html={data?.commPara2 || 'We aim to build sustainable, value-driven partnerships that maximize commercial potential while enriching traveler experiences.'}
                  className="text-gray-600 leading-relaxed text-lg"
                />
              </div>
              <div className="relative h-80 lg:h-auto order-1 lg:order-2">
                <img
                  src={mediaUrl(
                    data?.commImg ||
                    'https://readdy.ai/api/search-image?query=Professional%20airport%20commercial%20management%20team%20analyzing%20data%20on%20digital%20screens%2C%20modern%20office%20environment%2C%20business%20analytics%20dashboard%2C%20strategic%20planning%20meeting%2C%20contemporary%20workspace%20with%20technology%20integration%20and%20clean%20design&width=800&height=600&seq=comm-serv-001&orientation=landscape'
                  )}
                  alt={data?.commTitle || 'Commercial Services'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#2879b1]/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThreePillars;
