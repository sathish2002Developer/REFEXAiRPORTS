export function isComingSoonFlag(value: unknown): boolean {
  if (value === true || value === 1) return true;
  if (typeof value === 'string') {
    const t = value.trim().toLowerCase();
    return t === 'true' || t === '1' || t === 'yes';
  }
  return false;
}

export function resolveComingSoon(payload: unknown, fallback = false): boolean {
  const src = payload && typeof payload === 'object' ? (payload as Record<string, unknown>) : {};
  if (src.comingSoon !== undefined && src.comingSoon !== null && src.comingSoon !== '') {
    return isComingSoonFlag(src.comingSoon);
  }
  return Boolean(fallback);
}
