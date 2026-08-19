import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

export default function OurFootprints({
  data,
}: {
  data?: {
    title?: string;
    subtitle?: string;
    mapImage?: string;
  };
}) {
  const title = data?.title || 'OUR FOOTPRINTS';
  const subtitle =
    data?.subtitle || 'Strategically located across India, connecting travelers to every corner of the nation';
  const mapImage =
    data?.mapImage ||
    'https://readdy.ai/api/search-image?query=Clean%20blue%20silhouette%20map%20of%20India%20on%20pure%20white%20background%2C%20simple%20flat%20design%2C%20no%20markers%20no%20text%20no%20labels%2C%20solid%20blue%20color%20fill%20with%20smooth%20edges%2C%20minimalist%20vector%20style%2C%20high%20resolution&width=900&height=1200&seq=india-map-clean-002&orientation=landscape';

  return (
    <section id="ourvenues" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-10 md:mb-14" data-aos="fade-up">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">{title}</h2>
          <CmsHtml html={subtitle} className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto" />
        </div>

        <div className="relative w-full max-w-3xl mx-auto overflow-hidden" data-aos="zoom-in">
          <img
            src={mediaUrl(mapImage)}
            alt="India Map showing all Refex airport locations"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
