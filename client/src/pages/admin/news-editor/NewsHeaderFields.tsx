import CmsRichTextField from '@/components/feature/CmsRichTextField';
import type { NewsDraft } from './cmsDraft';
import { newsInputCls, newsLabelCls } from './cmsDraft';

export default function NewsHeaderFields({
  draft,
  setField,
  updateTab,
}: {
  draft: NewsDraft;
  setField: (key: 'pageTitle' | 'pageSubtitle', value: string) => void;
  updateTab: (index: number, field: 'label' | 'icon', value: string) => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <div>
        <label className={newsLabelCls}>Page title</label>
        <input className={newsInputCls} value={draft.pageTitle} onChange={(e) => setField('pageTitle', e.target.value)} />
      </div>
      <div>
        <label className={newsLabelCls}>Page subtitle</label>
        <CmsRichTextField value={draft.pageSubtitle} onChange={(v) => setField('pageSubtitle', v)} />
      </div>
      {draft.tabs.map((tab, index) => (
        <div key={tab.id} className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-slate-100 rounded-lg p-4">
          <div>
            <label className={newsLabelCls}>Tab {index + 1} name</label>
            <input className={newsInputCls} value={tab.label} onChange={(e) => updateTab(index, 'label', e.target.value)} />
          </div>
          <div>
            <label className={newsLabelCls}>Tab {index + 1} icon class</label>
            <input className={newsInputCls} value={tab.icon} onChange={(e) => updateTab(index, 'icon', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
}
