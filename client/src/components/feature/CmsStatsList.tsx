import CmsImageField from '@/components/feature/CmsImageField';
import { adminToast } from '@/lib/adminToast';

export type CmsStatItem = {
  countDisplay: string;
  label: string;
  image: string;
};

export default function CmsStatsList({
  items,
  onChange,
}: {
  items: CmsStatItem[];
  onChange: (next: CmsStatItem[]) => void;
}) {
  const update = (index: number, patch: Partial<CmsStatItem>) => {
    onChange(items.map((item, i) => (i === index ? { ...item, ...patch } : item)));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          Stat rows
          <span className="ml-2 text-xs font-normal text-slate-400">{items.length} items</span>
        </p>
        <button
          type="button"
          onClick={() => {
            onChange([...items, { countDisplay: '', label: '', image: '' }]);
            adminToast.added();
          }}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
        >
          <i className="ri-add-line"></i>
          Add row
        </button>
      </div>

      {items.length === 0 && (
        <p className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
          No stats yet. Click Add row to create one.
        </p>
      )}

      {items.map((item, index) => (
        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-800 truncate">
              Stat {index + 1}
              {item.label ? ` — ${item.label}` : ''}
            </span>
            <button
              type="button"
              onClick={() => {
                onChange(items.filter((_, i) => i !== index));
                adminToast.deleted();
              }}
              className="text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
            >
              Remove
            </button>
          </div>
          <div className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Count</label>
                <input
                  type="text"
                  value={item.countDisplay || ''}
                  placeholder="e.g. 15M+"
                  onChange={(e) => update(index, { countDisplay: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Label</label>
                <input
                  type="text"
                  value={item.label || ''}
                  placeholder="e.g. Airports with Active Retail Zones"
                  onChange={(e) => update(index, { label: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Image (upload or paste URL)</label>
              <CmsImageField value={item.image || ''} onChange={(image) => update(index, { image })} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
