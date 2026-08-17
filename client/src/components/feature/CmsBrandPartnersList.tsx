import CmsImageField from '@/components/feature/CmsImageField';
import { adminToast } from '@/lib/adminToast';

export type CmsBrandPartner = {
  name: string;
  image: string;
  url?: string;
};

export default function CmsBrandPartnersList({
  brands,
  onChange,
}: {
  brands: CmsBrandPartner[];
  onChange: (next: CmsBrandPartner[]) => void;
}) {
  const update = (index: number, patch: Partial<CmsBrandPartner>) => {
    onChange(brands.map((brand, i) => (i === index ? { ...brand, ...patch } : brand)));
  };

  const addBrand = () => {
    onChange([...brands, { name: '', image: '', url: '' }]);
    adminToast.added();
  };

  const removeBrand = (index: number) => {
    onChange(brands.filter((_, i) => i !== index));
    adminToast.deleted();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">
          Brand partners
          <span className="ml-2 text-xs font-normal text-slate-400">{brands.length} items</span>
        </p>
        <button
          type="button"
          onClick={addBrand}
          className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 hover:bg-[#2879b1]/20 rounded-lg cursor-pointer"
        >
          <i className="ri-add-line"></i>
          Add brand
        </button>
      </div>

      {brands.length === 0 && (
        <p className="text-sm text-slate-500 border border-dashed border-slate-200 rounded-lg p-6 text-center">
          No brand partners yet. Click Add brand to create one.
        </p>
      )}

      {brands.map((brand, index) => (
        <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-4 py-3 bg-slate-50 flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-slate-800 truncate">
              Brand {index + 1}
              {brand.name ? ` — ${brand.name}` : ''}
            </span>
            <button
              type="button"
              onClick={() => removeBrand(index)}
              className="text-xs font-medium text-red-600 hover:text-red-700 cursor-pointer whitespace-nowrap"
            >
              Remove
            </button>
          </div>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Brand name</label>
              <input
                type="text"
                value={brand.name || ''}
                onChange={(e) => update(index, { name: e.target.value })}
                placeholder="e.g. Ather Energy"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL (optional)</label>
              <input
                type="text"
                value={brand.url || ''}
                onChange={(e) => update(index, { url: e.target.value })}
                placeholder="https://..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Image (upload or paste URL)</label>
              <CmsImageField
                value={brand.image || ''}
                onChange={(image) => update(index, { image })}
                fit="contain"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
