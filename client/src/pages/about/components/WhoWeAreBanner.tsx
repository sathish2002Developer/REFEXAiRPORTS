import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const WhoWeAreBanner = ({
  data,
}: {
  data?: { image?: string; title?: string; subtitle?: string };
}) => {
  const image =
    data?.image ||
    'https://readdy.ai/api/search-image?query=Modern%20airport%20restaurant%20lounge%20interior%20with%20warm%20pendant%20lighting%2C%20chefs%20working%20behind%20counter%2C%20diners%20enjoying%20meals%20at%20elegant%20tables%2C%20greenery%20hanging%20from%20ceiling%2C%20warm%20copper%20and%20wood%20tones%2C%20editorial%20interior%20photography%2C%20soft%20ambient%20light%2C%20high-end%20dining%20atmosphere&width=1600&height=500&seq=about-who-we-are-banner&orientation=landscape';
  const title = data?.title || 'Who We Are';
  const subtitle =
    data?.subtitle ||
    'We create memorable journeys through thoughtfully curated culinary experiences for travellers every day.';
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full h-[360px] md:h-[480px]">
        <img
          src={mediaUrl(image)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl" data-aos="fade-right">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {title}
              </h2>
              <CmsHtml html={subtitle} className="text-white/90 text-base md:text-lg leading-relaxed font-medium" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAreBanner;