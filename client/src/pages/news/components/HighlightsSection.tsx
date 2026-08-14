import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';
import type { HighlightItem } from '@/pages/admin/news-editor/newsData';

export default function HighlightsSection({ items }: { items?: HighlightItem[] }) {
  const highlights = items?.length ? items : [];

  return (
    <div className="space-y-12">
      {highlights.map((highlight, index) => (
        <article
          key={index}
          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300"
          data-aos="fade-up"
          data-aos-delay={index * 150}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2">
              <div className="relative h-80 lg:h-full">
                <img alt={highlight.title} className="w-full h-full object-cover" src={mediaUrl(highlight.image)} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
            </div>
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              {highlight.date && <p className="text-sm text-gray-500 mb-3">{highlight.date}</p>}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{highlight.title}</h2>
              <CmsHtml html={highlight.description} className="text-lg text-gray-600 leading-relaxed" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
