import CmsImageField from '@/components/feature/CmsImageField';
import CmsRichTextField from '@/components/feature/CmsRichTextField';
import type { NewsDraft } from './cmsDraft';
import { newsInputCls, newsLabelCls } from './cmsDraft';

export default function NewsStoriesFields({
  draft,
  updateStory,
  addStory,
  removeStory,
}: {
  draft: NewsDraft;
  updateStory: (index: number, field: 'title' | 'subtitle' | 'description' | 'image', value: string) => void;
  addStory: () => void;
  removeStory: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button onClick={addStory} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">
          Add story
        </button>
      </div>
      <div className="p-6 space-y-6">
        {draft.stories.length === 0 && (
          <p className="text-sm text-slate-500 border border-dashed rounded-lg p-6 text-center">No stories yet.</p>
        )}
        {draft.stories.map((item, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 flex justify-between">
              <span className="text-sm font-semibold">Story {index + 1}{item.title ? ` — ${item.title}` : ''}</span>
              <button onClick={() => removeStory(index)} className="text-xs text-red-600 cursor-pointer">Delete</button>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={newsLabelCls}>Title</label>
                  <input className={newsInputCls} value={item.title} onChange={(e) => updateStory(index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className={newsLabelCls}>Subtitle</label>
                  <input className={newsInputCls} value={item.subtitle} onChange={(e) => updateStory(index, 'subtitle', e.target.value)} />
                </div>
              </div>
              <div>
                <label className={newsLabelCls}>Description</label>
                <CmsRichTextField value={item.description} onChange={(v) => updateStory(index, 'description', v)} />
              </div>
              <div>
                <label className={newsLabelCls}>Image</label>
                <CmsImageField value={item.image} onChange={(v) => updateStory(index, 'image', v)} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
