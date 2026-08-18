import { adminToast } from '@/lib/adminToast';

export type CmsContactLocation = {
  name: string;
  subtitle: string;
  phone: string;
  email: string;
  address: string;
};

const inputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';

export default function CmsContactLocationsList({
  locations,
  onChange,
}: {
  locations: CmsContactLocation[];
  onChange: (next: CmsContactLocation[]) => void;
}) {
  const update = (index: number, patch: Partial<CmsContactLocation>) => {
    onChange(locations.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          Airport office cards
          <span className="ml-2 text-xs font-normal text-slate-400">{locations.length} items</span>
        </p>
        <button
          type="button"
          onClick={() => {
            onChange([...locations, { name: '', subtitle: '', phone: '', email: '', address: '' }]);
            adminToast.added();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
        >
          <i className="ri-add-line"></i>
            Add card
        </button>
      </div>

      {locations.length === 0 && (
        <p className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
          No locations yet. Click Add location to create one.
        </p>
      )}

      {locations.map((loc, index) => (
        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-800 truncate">
              Location {index + 1}
              {loc.name ? ` — ${loc.name}` : ''}
            </span>
            <button
              type="button"
              onClick={() => {
                onChange(locations.filter((_, i) => i !== index));
                adminToast.deleted();
              }}
              className="text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
            >
              Remove
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Airport name</label>
              <input
                type="text"
                value={loc.name || ''}
                placeholder="e.g. Pune International Airport (PNQ)"
                onChange={(e) => update(index, { name: e.target.value })}
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Address</label>
              <textarea
                rows={3}
                value={loc.address || ''}
                placeholder="Full address shown on the card"
                onChange={(e) => update(index, { address: e.target.value })}
                className={`${inputCls} resize-none`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
