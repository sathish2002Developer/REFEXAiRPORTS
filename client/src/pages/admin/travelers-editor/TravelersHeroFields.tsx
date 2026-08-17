import CmsImageField from '@/components/feature/CmsImageField';
import type { TravelersDraft } from './cmsDraft';
import { cmsInputCls, cmsLabelCls } from './cmsDraft';

export default function TravelersHeroFields({
  draft,
  setField,
}: {
  draft: TravelersDraft;
  setField: (key: keyof TravelersDraft, value: string) => void;
}) {
  return (
    <div className="p-6 space-y-4">
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Airport Name</label>
        <input
          className={cmsInputCls}
          value={draft.heroAirportName}
          onChange={(e) => setField('heroAirportName', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Tagline</label>
        <textarea
          className={`${cmsInputCls} resize-none`}
          rows={3}
          value={draft.heroTagline}
          onChange={(e) => setField('heroTagline', e.target.value)}
        />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Hero background image (upload or paste URL)</label>
        <CmsImageField
          value={draft.heroBackground || ''}
          onChange={(heroBackground) => setField('heroBackground', heroBackground)}
          fit="cover"
        />
      </div>
    </div>
  );
}
