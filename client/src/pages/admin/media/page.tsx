import { useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';

const mockImages = [
  { id: 1, name: 'hero-pune.jpg', url: 'https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20exterior&width=1600&height=900&seq=pune-hero&orientation=landscape', size: '245 KB', uploaded: '2 days ago' },
  { id: 2, name: 'hero-srinagar.jpg', url: 'https://readdy.ai/api/search-image?query=Airport%20terminal%20with%20Himalayan%20mountains%20background&width=1600&height=900&seq=srinagar-hero&orientation=landscape', size: '198 KB', uploaded: '3 days ago' },
  { id: 3, name: 'hero-trichy.jpg', url: 'https://readdy.ai/api/search-image?query=Airport%20terminal%20in%20tropical%20setting&width=1600&height=900&seq=trichy-hero&orientation=landscape', size: '312 KB', uploaded: '1 week ago' },
  { id: 4, name: 'hero-aurangabad.jpg', url: 'https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20at%20sunset&width=1600&height=900&seq=aurangabad-hero&orientation=landscape', size: '278 KB', uploaded: '1 week ago' },
  { id: 5, name: 'hero-shirdi.jpg', url: 'https://readdy.ai/api/search-image?query=Spiritual%20airport%20terminal%20at%20dawn&width=1600&height=900&seq=shirdi-hero&orientation=landscape', size: '256 KB', uploaded: '2 weeks ago' },
  { id: 6, name: 'about-team.jpg', url: 'https://readdy.ai/api/search-image?query=Professional%20business%20team%20in%20modern%20office&width=800&height=600&seq=about-team&orientation=landscape', size: '189 KB', uploaded: '3 weeks ago' },
];

export default function AdminMediaPage() {
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    setUploading(true);
    setTimeout(() => setUploading(false), 1500);
  };

  return (
    <AdminLayout>
      <div className="max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Media Library</h1>
            <p className="text-slate-500 mt-1">Manage images used across your website</p>
          </div>
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#2879b1] hover:bg-[#20618e] text-white font-medium rounded-lg transition-all cursor-pointer disabled:opacity-50"
          >
            {uploading ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="ri-upload-cloud-line"></i>
                Upload Image
              </>
            )}
          </button>
        </div>

        {/* Upload Zone */}
        <div className="bg-white rounded-xl border border-dashed border-slate-300 p-8 mb-6 text-center hover:border-[#2879b1] transition-colors cursor-pointer">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ri-image-add-line text-slate-400 text-2xl"></i>
          </div>
          <p className="text-slate-700 font-medium">Drop images here or click to upload</p>
          <p className="text-sm text-slate-400 mt-1">Supports JPG, PNG, WebP up to 5MB</p>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockImages.map((img) => (
            <div
              key={img.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden group hover:shadow-md transition-all"
            >
              <div className="aspect-video bg-slate-100 relative overflow-hidden">
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-lg text-slate-700 hover:text-[#2879b1] cursor-pointer">
                      <i className="ri-eye-line"></i>
                    </button>
                    <button className="p-2 bg-white rounded-lg text-slate-700 hover:text-red-500 cursor-pointer">
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-slate-700 truncate">{img.name}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-slate-400">{img.size}</span>
                  <span className="text-xs text-slate-400">{img.uploaded}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}