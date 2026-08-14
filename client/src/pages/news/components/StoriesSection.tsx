import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';
import type { StoryItem } from '@/pages/admin/news-editor/newsData';

export default function StoriesSection({ items }: { items?: StoryItem[] }) {
  const stories = items?.length ? items : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stories.map((story, index) => (
        <article
          key={index}
          className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-700 ease-out hover:-translate-y-2"
          data-aos="fade-up"
          data-aos-delay={index * 150}
        >
          <div className="relative h-64 overflow-hidden">
            <img
              alt={story.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-115"
              src={mediaUrl(story.image)}
            />
            {story.subtitle && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out flex items-end p-4">
                <span className="text-white text-sm font-semibold">{story.subtitle}</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{story.title}</h3>
            <CmsHtml html={story.description} className="text-gray-600 leading-relaxed mb-4" />
          </div>
        </article>
      ))}
    </div>
  );
}
