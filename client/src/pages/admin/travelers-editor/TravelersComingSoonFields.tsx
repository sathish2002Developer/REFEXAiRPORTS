import CmsImageField from '@/components/feature/CmsImageField';
import type { TravelersDraft } from './cmsDraft';
import { cmsInputCls, cmsLabelCls } from './cmsDraft';

export default function TravelersComingSoonFields({
  draft,
  setField,
}: {
  draft: TravelersDraft;
  setField: (key: keyof TravelersDraft, value: string) => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <p className="text-sm text-slate-500">
        Shown on the public airport page when Coming Soon is turned on. Leave the image empty to reuse the hero background.
      </p>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Headline</label>
        <input
          className={cmsInputCls}
          value={draft.comingSoonTitle}
          onChange={(e) => setField('comingSoonTitle', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Message</label>
        <textarea
          className={`${cmsInputCls} resize-none`}
          rows={4}
          value={draft.comingSoonMessage}
          onChange={(e) => setField('comingSoonMessage', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Footer line</label>
        <input
          className={cmsInputCls}
          value={draft.comingSoonFooter}
          onChange={(e) => setField('comingSoonFooter', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Background image (optional)</label>
        <CmsImageField
          value={draft.comingSoonImage || ''}
          onChange={(comingSoonImage) => setField('comingSoonImage', comingSoonImage)}
          fit="cover"
        />
      </div>
    </div>
  );
}
