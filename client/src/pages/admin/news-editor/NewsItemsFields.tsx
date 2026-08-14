import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import type { NewsDraft } from './cmsDraft';
import { newsInputCls, newsLabelCls } from './cmsDraft';

export default function NewsItemsFields({
  draft,
  updateNews,
  addNews,
  removeNews,
}: {
  draft: NewsDraft;
  updateNews: (index: number, field: 'title' | 'date' | 'description' | 'image' | 'link', value: string) => void;
  addNews: () => void;
  removeNews: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button onClick={addNews} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">
          Add news
        </button>
      </div>
      <div className="p-6 space-y-6">
        {draft.newsItems.length === 0 && (
          <p className="text-sm text-slate-500 border border-dashed rounded-lg p-6 text-center">No news articles yet.</p>
        )}
        {draft.newsItems.map((item, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 flex justify-between">
              <span className="text-sm font-semibold">News {index + 1}{item.title ? ` — ${item.title}` : ''}</span>
              <button onClick={() => removeNews(index)} className="text-xs text-red-600 cursor-pointer">Delete</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={newsLabelCls}>Title</label>
                  <input className={newsInputCls} value={item.title} onChange={(e) => updateNews(index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className={newsLabelCls}>Date</label>
                  <input className={newsInputCls} value={item.date} onChange={(e) => updateNews(index, 'date', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={newsLabelCls}>Read more URL (optional)</label>
                <input className={newsInputCls} value={item.link} onChange={(e) => updateNews(index, 'link', e.target.value)} />
              </div>
              <div>
                <label className={newsLabelCls}>Description</label>
                <CmsRichTextField value={item.description} onChange={(v) => updateNews(index, 'description', v)} />
              </div>
              <div>
                <label className={newsLabelCls}>Image</label>
                <CmsImageField value={item.image} onChange={(v) => updateNews(index, 'image', v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
