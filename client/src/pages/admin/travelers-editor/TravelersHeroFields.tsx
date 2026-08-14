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
        <input className={cmsInputCls} value={draft.heroAirportName} onChange={(e) => setField('heroAirportName', e.target.value)} />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Tagline</label>
        <textarea className={`${cmsInputCls} resize-none`} rows={3} value={draft.heroTagline} onChange={(e) => setField('heroTagline', e.target.value)} />
      </div>
      <div className="border border-slate-100 rounded-lg p-4">
        <label className={cmsLabelCls}>Hero Background Image URL</label>
        <input className={cmsInputCls} value={draft.heroBackground} onChange={(e) => setField('heroBackground', e.target.value)} />
        {draft.heroBackground && (
          <div className="mt-2 w-full h-40 rounded-lg overflow-hidden border border-slate-200">
            <img src={draft.heroBackground} alt="Hero preview" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );
}
