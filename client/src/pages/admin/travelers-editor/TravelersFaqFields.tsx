import type { TravelersDraft } from './cmsDraft';
import { cmsInputCls, cmsLabelCls } from './cmsDraft';

export default function TravelersFaqFields({
  draft,
  setField,
  updateFaq,
  addFaq,
  removeFaq,
}: {
  draft: TravelersDraft;
  setField: (key: keyof TravelersDraft, value: string) => void;
  updateFaq: (index: number, field: keyof TravelersDraft['faqs'][number], value: string) => void;
  addFaq: () => void;
  removeFaq: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button onClick={addFaq} className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer">Add FAQ</button>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border border-slate-100 rounded-lg p-4">
            <label className={cmsLabelCls}>Label (top-left text)</label>
            <input className={cmsInputCls} value={draft.faqLabel} onChange={(e) => setField('faqLabel', e.target.value)} />
          </div>
          <div className="border border-slate-100 rounded-lg p-4">
            <label className={cmsLabelCls}>Heading</label>
            <input className={cmsInputCls} value={draft.faqTitle} onChange={(e) => setField('faqTitle', e.target.value)} />
          </div>
        </div>
        {draft.faqs.map((faq, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 flex justify-between">
              <span className="text-sm font-semibold">Question {index + 1}</span>
              <button onClick={() => removeFaq(index)} className="text-xs text-red-600 cursor-pointer">Remove</button>
            </div>
            <div className="p-5 space-y-4">
              <div><label className={cmsLabelCls}>Question</label><input className={cmsInputCls} value={faq.question} onChange={(e) => updateFaq(index, 'question', e.target.value)} /></div>
              <div><label className={cmsLabelCls}>Answer</label><textarea className={`${cmsInputCls} resize-none`} rows={3} value={faq.answer} onChange={(e) => updateFaq(index, 'answer', e.target.value)} /></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
