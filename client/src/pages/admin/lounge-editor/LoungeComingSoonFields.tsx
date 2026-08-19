import CmsImageField from '@/components/feature/CmsImageField';
import type { AirportLoungeData } from './loungeTypes';

const cmsInputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
const cmsLabelCls = 'block text-sm font-semibold text-slate-700 mb-2';

export default function LoungeComingSoonFields({
  draft,
  setField,
}: {
  draft: AirportLoungeData;
  setField: (key: keyof AirportLoungeData, value: string) => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <p className="text-sm text-slate-500">
        Shown on the public lounge page when Coming Soon is turned on. Leave fields empty to reuse the Our Assets Coming Soon banner for this airport, or the lounge hero image.
      </p>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Headline</label>
        <input
          className={cmsInputCls}
          value={draft.comingSoonTitle || ''}
          onChange={(e) => setField('comingSoonTitle', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Message</label>
        <textarea
          className={`${cmsInputCls} resize-none`}
          rows={4}
          value={draft.comingSoonMessage || ''}
          onChange={(e) => setField('comingSoonMessage', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Footer line</label>
        <input
          className={cmsInputCls}
          value={draft.comingSoonFooter || ''}
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
