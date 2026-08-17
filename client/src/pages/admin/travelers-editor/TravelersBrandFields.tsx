import CmsImageField from '@/components/feature/CmsImageField';
import type { TravelersDraft } from './cmsDraft';
import { cmsInputCls, cmsLabelCls } from './cmsDraft';

export default function TravelersBrandFields({
  draft,
  updateBrand,
  addBrand,
  removeBrand,
}: {
  draft: TravelersDraft;
  updateBrand: (index: number, field: keyof TravelersDraft['brands'][number], value: string) => void;
  addBrand: () => void;
  removeBrand: (index: number) => void;
}) {
  return (
    <div>
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-end">
        <button
          type="button"
          onClick={addBrand}
          className="px-4 py-2 text-sm font-medium text-[#2879b1] bg-[#2879b1]/10 rounded-lg cursor-pointer"
        >
          Add Brand
        </button>
      </div>
      <div className="p-6 space-y-6">
        {draft.brands.map((brand, index) => (
          <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
            <div className="px-5 py-3 bg-slate-50 flex justify-between">
              <span className="text-sm font-semibold">
                Brand {index + 1}
                {brand.name ? ` — ${brand.name}` : ''}
              </span>
              <button
                type="button"
                onClick={() => removeBrand(index)}
                className="text-xs text-red-600 cursor-pointer"
              >
                Remove
              </button>
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={cmsLabelCls}>Brand Name</label>
                <input
                  className={cmsInputCls}
                  value={brand.name}
                  onChange={(e) => updateBrand(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className={cmsLabelCls}>Category</label>
                <input
                  className={cmsInputCls}
                  value={brand.category}
                  onChange={(e) => updateBrand(index, 'category', e.target.value)}
                />
              </div>
              <div>
                <label className={cmsLabelCls}>Location</label>
                <input
                  className={cmsInputCls}
                  value={brand.location}
                  onChange={(e) => updateBrand(index, 'location', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <label className={cmsLabelCls}>Brand image (upload or paste URL)</label>
                <CmsImageField
                  value={brand.logo || ''}
                  onChange={(logo) => updateBrand(index, 'logo', logo)}
                  fit="contain"
                />
              </div>
              <div className="md:col-span-2">
                <label className={cmsLabelCls}>Description</label>
                <textarea
                  className={`${cmsInputCls} resize-none`}
                  rows={3}
                  value={brand.description}
                  onChange={(e) => updateBrand(index, 'description', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
