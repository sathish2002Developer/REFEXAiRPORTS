export type SocialPlatform = 'linkedin' | 'instagram' | null;

export function socialPlatform(url: string): SocialPlatform {
  const u = String(url || '').toLowerCase();
  if (u.includes('linkedin.com')) return 'linkedin';
  if (u.includes('instagram.com')) return 'instagram';
  return null;
}

export function isSocialPostUrl(url: string) {
  return Boolean(socialPlatform(url));
}

export function linkedinEmbedSrc(url: string) {
  const m =
    String(url || '').match(/activity-(\d+)/i) || String(url || '').match(/activity[:/](\d+)/i);
  return m ? `https://www.linkedin.com/embed/feed/update/urn:li:activity:${m[1]}` : '';
}

export function isInstagramMediaUrl(url: string) {
  return /instagram\.com\/(p|reel|tv)\//i.test(String(url || ''));
}

export function splitStoryMedia(image?: string, socialLink?: string) {
  const rawImage = String(image || '').trim();
  const rawSocial = String(socialLink || '').trim();
  if (isSocialPostUrl(rawSocial)) {
    return { image: isSocialPostUrl(rawImage) ? '' : rawImage, socialLink: rawSocial };
  }
  if (isSocialPostUrl(rawImage)) {
    return { image: '', socialLink: rawImage };
  }
  return { image: rawImage, socialLink: '' };
}

export function resolveSocialPostUrl(url?: string, image?: string) {
  const u = String(url || '').trim();
  const img = String(image || '').trim();
  if (isSocialPostUrl(u)) return u;
  if (isSocialPostUrl(img)) return img;
  return u;
}
