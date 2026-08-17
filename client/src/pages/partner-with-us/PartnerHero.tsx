import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const DEFAULT_IMAGE =
  'https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg';

export default function PartnerHero({
  data,
}: {
  data?: { image?: string; title?: string; subtitle?: string };
}) {
  const title = data?.title || 'Partner with Us';
  const subtitle =
    data?.subtitle ||
    'Every great partnership starts with a conversation. Reach out, and let’s explore how we can grow together.';

  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full h-[360px] md:h-[480px]">
        <img
          src={mediaUrl(data?.image || DEFAULT_IMAGE)}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.src =
              'https://refexairports.com/wp-content/uploads/2023/09/About-Airport.png';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/55 to-black/25"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl" data-aos="fade-right">
              <p className="text-white/80 text-sm font-semibold tracking-[0.2em] uppercase mb-4">
                Collaborate with Refex
              </p>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {title}
              </h1>
              <CmsHtml html={subtitle} className="text-white/90 text-base md:text-lg leading-relaxed font-medium" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
