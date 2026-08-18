import { useEffect } from 'react';
import { mediaUrl } from '@/lib/api';
import {
  isInstagramMediaUrl,
  linkedinEmbedSrc,
  socialPlatform,
} from '@/lib/socialPost';

export default function SocialEmbed({
  url,
  title,
  image,
  className = '',
}: {
  url: string;
  title?: string;
  image?: string;
  className?: string;
}) {
  const platform = socialPlatform(url);
  const li = platform === 'linkedin' ? linkedinEmbedSrc(url) : '';
  const ig = platform === 'instagram' && isInstagramMediaUrl(url);

  useEffect(() => {
    if (!ig) return;
    const src = 'https://www.instagram.com/embed.js';
    const existing = document.querySelector(`script[src="${src}"]`);
    if (!existing) {
      const script = document.createElement('script');
      script.async = true;
      script.src = src;
      document.body.appendChild(script);
    } else if ((window as any).instgrm?.Embeds?.process) {
      (window as any).instgrm.Embeds.process();
    }
  }, [ig, url]);

  if (li) {
    return (
      <iframe
        title={title || 'LinkedIn post'}
        src={li}
        className={`w-full h-full min-h-[480px] bg-white ${className}`}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  if (ig) {
    return (
      <div className={`w-full h-full overflow-auto bg-white p-3 ${className}`}>
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={url}
          data-instgrm-version="14"
          style={{ margin: '0 auto', maxWidth: '100%' }}
        />
      </div>
    );
  }

  if (image) {
    return <img src={mediaUrl(image)} alt={title || ''} className={`w-full h-full object-cover ${className}`} />;
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className={`flex h-full min-h-[220px] items-center justify-center gap-2 bg-slate-50 text-[#2879b1] font-semibold ${className}`}
    >
      <i className={platform === 'instagram' ? 'ri-instagram-line text-2xl' : 'ri-linkedin-fill text-2xl'}></i>
      {platform === 'instagram' ? 'View on Instagram' : 'View on LinkedIn'}
    </a>
  );
}
