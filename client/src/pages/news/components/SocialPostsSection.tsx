import { mediaUrl } from '@/lib/api';
import SocialEmbed from '@/components/feature/SocialEmbed';
import { isSocialPostUrl, resolveSocialPostUrl, socialPlatform } from '@/lib/socialPost';
import type { SocialPost } from '@/pages/admin/news-editor/newsData';

export default function SocialPostsSection({ items }: { items?: SocialPost[] }) {
  const posts = (items || []).filter((p) => p && (p.url || p.image || p.title || p.caption));

  if (!posts.length) {
    return <p className="text-center text-gray-500 py-12">No social posts yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {posts.map((post, index) => {
        const postUrl = resolveSocialPostUrl(post.url, post.image);
        const platform = socialPlatform(postUrl) || (post.platform === 'instagram' ? 'instagram' : 'linkedin');
        const cover = isSocialPostUrl(post.image) ? '' : post.image;
        const label = platform === 'instagram' ? 'View on Instagram' : 'View on LinkedIn';
        const icon = platform === 'instagram' ? 'ri-instagram-line' : 'ri-linkedin-fill';
        const accent = platform === 'instagram' ? 'text-pink-600 bg-pink-50' : 'text-[#0a66c2] bg-[#0a66c2]/10';

        return (
          <article
            key={`${postUrl}-${index}`}
            className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
            data-aos="fade-up"
            data-aos-delay={index * 80}
          >
            <div className="px-5 py-3 flex items-center justify-between border-b border-gray-100">
              <span className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${accent}`}>
                <i className={icon}></i>
                {platform}
              </span>
              {post.date ? <span className="text-xs text-gray-500">{post.date}</span> : null}
            </div>

            {postUrl ? (
              <div className="min-h-[480px] bg-gray-50">
                <SocialEmbed url={postUrl} title={post.title} image={cover} />
              </div>
            ) : cover ? (
              <img src={mediaUrl(cover)} alt={post.title} className="w-full h-64 object-cover" />
            ) : null}

            <div className="p-6 flex flex-col flex-1">
              {post.title ? <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3> : null}
              {post.caption ? <p className="text-gray-600 text-sm leading-relaxed mb-5">{post.caption}</p> : null}
              {postUrl ? (
                <a
                  href={postUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-[#2879b1] font-semibold hover:underline"
                >
                  <i className={icon}></i>
                  {label}
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}
