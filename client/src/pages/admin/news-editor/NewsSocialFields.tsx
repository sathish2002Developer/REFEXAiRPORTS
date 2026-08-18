import CmsImageField from '@/components/feature/CmsImageField';
import SocialEmbed from '@/components/feature/SocialEmbed';
import type { NewsDraft } from './cmsDraft';
import { newsInputCls, newsLabelCls } from './cmsDraft';
import type { SocialPost } from './newsData';
import { isSocialPostUrl, resolveSocialPostUrl, socialPlatform } from '@/lib/socialPost';

export default function NewsSocialFields({
  draft,
  updateSocial,
  patchSocial,
  addSocial,
  removeSocial,
}: {
  draft: NewsDraft;
  updateSocial: (index: number, field: keyof SocialPost, value: string) => void;
  patchSocial: (index: number, patch: Partial<SocialPost>) => void;
  addSocial: () => void;
  removeSocial: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          Paste the LinkedIn or Instagram post URL. The image or video from that post will embed on the website.
        </p>
        <button
          type="button"
          onClick={addSocial}
          className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer whitespace-nowrap"
        >
          Add post
        </button>
      </div>
      <div className="p-6 space-y-6">
        {(draft.socialPosts || []).length === 0 && (
          <p className="text-sm text-slate-500 border border-dashed rounded-lg p-6 text-center">
            No social posts yet.
          </p>
        )}
        {(draft.socialPosts || []).map((item, index) => {
          const postUrl = resolveSocialPostUrl(item.url, item.image);
          const cover = isSocialPostUrl(item.image) ? '' : item.image;
          return (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 flex justify-between">
                <span className="text-sm font-semibold">
                  Post {index + 1}
                  {item.title ? ` — ${item.title}` : ''}
                </span>
                <button type="button" onClick={() => removeSocial(index)} className="text-xs text-red-600 cursor-pointer">
                  Delete
                </button>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={newsLabelCls}>Platform</label>
                    <select
                      className={newsInputCls}
                      value={socialPlatform(postUrl) || item.platform || 'linkedin'}
                      onChange={(e) => updateSocial(index, 'platform', e.target.value)}
                    >
                      <option value="linkedin">LinkedIn</option>
                      <option value="instagram">Instagram</option>
                    </select>
                  </div>
                  <div>
                    <label className={newsLabelCls}>Date</label>
                    <input className={newsInputCls} value={item.date} onChange={(e) => updateSocial(index, 'date', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className={newsLabelCls}>Post URL (LinkedIn or Instagram)</label>
                  <input
                    className={newsInputCls}
                    placeholder="https://www.linkedin.com/posts/... or Instagram post / reel URL"
                    value={postUrl}
                    onChange={(e) => {
                      const next = e.target.value;
                      const platform = socialPlatform(next) || item.platform || 'linkedin';
                      patchSocial(index, { url: next, platform, image: cover });
                    }}
                  />
                </div>
                {postUrl ? (
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-white min-h-[420px]">
                    <SocialEmbed url={postUrl} title={item.title} image={cover} />
                  </div>
                ) : null}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={newsLabelCls}>Title</label>
                    <input className={newsInputCls} value={item.title} onChange={(e) => updateSocial(index, 'title', e.target.value)} />
                  </div>
                  <div>
                    <label className={newsLabelCls}>Show on traveler airport (optional)</label>
                    <select
                      className={newsInputCls}
                      value={item.airport || ''}
                      onChange={(e) => updateSocial(index, 'airport', e.target.value)}
                    >
                      <option value="">All airports</option>
                      <option value="pune">Pune</option>
                      <option value="srinagar">Srinagar</option>
                      <option value="trichy">Trichy</option>
                      <option value="aurangabad">Aurangabad</option>
                      <option value="shirdi">Shirdi</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className={newsLabelCls}>Caption</label>
                  <textarea
                    className={`${newsInputCls} resize-none`}
                    rows={3}
                    value={item.caption}
                    onChange={(e) => updateSocial(index, 'caption', e.target.value)}
                  />
                </div>
                <div>
                  <label className={newsLabelCls}>Optional extra cover photo (only if you want a photo besides the embed)</label>
                  <CmsImageField
                    value={cover}
                    onChange={(v) => {
                      if (isSocialPostUrl(v)) {
                        const platform = socialPlatform(v) || 'linkedin';
                        patchSocial(index, { url: v, platform, image: '' });
                        return;
                      }
                      updateSocial(index, 'image', v);
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
