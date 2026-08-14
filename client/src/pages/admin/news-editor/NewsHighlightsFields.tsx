import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import type { NewsDraft } from './cmsDraft';
import { newsInputCls, newsLabelCls } from './cmsDraft';

const iconOptions = [
  'ri-shopping-bag-3-line',
  'ri-trophy-line',
  'ri-star-line',
  'ri-newspaper-line',
  'ri-award-line',
  'ri-megaphone-line',
  'ri-rocket-line',
];

export default function NewsHighlightsFields({
  draft,
  updateHighlight,
  addHighlight,
  removeHighlight,
}: {
  draft: NewsDraft;
  updateHighlight: (index: number, field: 'title' | 'description' | 'image' | 'date' | 'icon', value: string) => void;
  addHighlight: () => void;
  removeHighlight: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button onClick={addHighlight} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">
          Add highlight
        </button>
      </div>
      <div className="p-6 space-y-6">
        {draft.highlights.length === 0 && (
          <p className="text-sm text-slate-500 border border-dashed rounded-lg p-6 text-center">No highlights yet.</p>
        )}
        {draft.highlights.map((item, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 flex justify-between">
              <span className="text-sm font-semibold">Highlight {index + 1}{item.title ? ` — ${item.title}` : ''}</span>
              <button onClick={() => removeHighlight(index)} className="text-xs text-red-600 cursor-pointer">Delete</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className={newsLabelCls}>Title</label>
                  <input className={newsInputCls} value={item.title} onChange={(e) => updateHighlight(index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className={newsLabelCls}>Date</label>
                  <input className={newsInputCls} value={item.date} onChange={(e) => updateHighlight(index, 'date', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={newsLabelCls}>Icon</label>
                <select className={newsInputCls} value={item.icon} onChange={(e) => updateHighlight(index, 'icon', e.target.value)}>
                  {iconOptions.map((icon) => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={newsLabelCls}>Description</label>
                <CmsRichTextField value={item.description} onChange={(v) => updateHighlight(index, 'description', v)} />
              </div>
              <div>
                <label className={newsLabelCls}>Image</label>
                <CmsImageField value={item.image} onChange={(v) => updateHighlight(index, 'image', v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
