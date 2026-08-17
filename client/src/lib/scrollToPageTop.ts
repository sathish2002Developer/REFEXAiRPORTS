/** Jump to the top of the page (used on every route change and nav click). */
export function scrollToPageTop() {
  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

const TOP_HASHES = new Set(["", "intro", "who-we-are", "hero"]);

export function hashShouldStayOnSection(hash: string) {
  const id = String(hash || "").replace(/^#/, "").trim();
  return Boolean(id) && !TOP_HASHES.has(id);
}
