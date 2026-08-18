import { useRef, useState } from 'react';
import { cmsUploadImage, mediaUrl } from '@/lib/api';
import { isSocialPostUrl, socialPlatform } from '@/lib/socialPost';

export default function CmsImageField({
  value,
  onChange,
  fit = 'cover',
}: {
  value: string;
  onChange: (next: string) => void;
  fit?: 'cover' | 'contain';
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const social = socialPlatform(value);

  const handleUpload = async (file?: File) => {
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const url = await cmsUploadImage(file);
      onChange(url);
    } catch (err: any) {
      setError(err.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]"
          placeholder="Image URL..."
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="px-4 py-3 bg-[#2879b1] text-white rounded-lg text-sm font-medium whitespace-nowrap disabled:opacity-50 cursor-pointer"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            handleUpload(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      {value && <p className="text-xs text-slate-500 break-all font-mono">{value}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
      {social ? (
        <div className="flex items-start gap-2 px-3 py-3 rounded-lg border border-slate-200 bg-slate-50 text-sm font-medium text-slate-700">
          <i className={social === 'instagram' ? 'ri-instagram-line text-pink-600 text-lg' : 'ri-linkedin-fill text-[#0a66c2] text-lg'}></i>
          <span>
            {social === 'instagram' ? 'Instagram post link' : 'LinkedIn post link'} — this is not an image.
            Paste it in the Post URL field, or upload a cover photo here.
          </span>
        </div>
      ) : value && !isSocialPostUrl(value) ? (
        <div className="w-40 h-24 rounded-lg overflow-hidden border border-slate-200 bg-white flex items-center justify-center p-2">
          <img
            src={mediaUrl(value)}
            alt="Preview"
            className={`max-w-full max-h-full ${fit === 'contain' ? 'object-contain' : 'w-full h-full object-cover'}`}
          />
        </div>
      ) : null}
    </div>
  );
}
