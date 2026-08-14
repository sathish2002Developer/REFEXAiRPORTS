import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';
import type { NewsItem } from '@/pages/admin/news-editor/newsData';

export default function NewsSection({ items }: { items?: NewsItem[] }) {
  const newsItems = items?.length ? items : [];

  return (
    <div className="space-y-8">
      {newsItems.map((item, index) => (
        <article
          key={index}
          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-500 ease-out hover:-translate-y-1"
          data-aos="fade-up"
          data-aos-delay={index * 150}
        >
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-2/5 overflow-hidden">
              <div className="relative h-64 lg:h-full">
                <img
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  src={mediaUrl(item.image)}
                />
              </div>
            </div>
            <div className="lg:w-3/5 p-8 lg:p-10">
              {item.date && <p className="text-sm text-gray-500 mb-2">{item.date}</p>}
              <h3 className="text-2xl font-bold text-gray-900 mb-4 line-clamp-2">{item.title}</h3>
              <CmsHtml html={item.description} className="text-gray-600 mb-6" />
              {item.link ? (
                <a
                  href={item.link}
                  className="inline-flex items-center gap-2 text-[#2879b1] hover:text-[#1b598a] font-semibold transition-colors cursor-pointer"
                >
                  <span>Read More</span>
                  <i className="ri-arrow-right-line"></i>
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
