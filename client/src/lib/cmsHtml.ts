const ALLOWED = new Set(["P", "BR", "STRONG", "B", "EM", "I", "U", "UL", "OL", "LI", "A"]);

export function looksLikeHtml(value: string) {
  return /<[a-z][\s\S]*>/i.test(value || "");
}

export function sanitizeCmsHtml(input: string) {
  if (!input) return "";
  if (typeof window === "undefined" || typeof DOMParser === "undefined") return input;
  const doc = new DOMParser().parseFromString(input, "text/html");

  const walk = (node: Node) => {
    const children = Array.from(node.childNodes);
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        if (!ALLOWED.has(el.tagName)) {
          const text = doc.createTextNode(el.textContent || "");
          node.replaceChild(text, el);
          continue;
        }
        if (el.tagName === "A") {
          const href = el.getAttribute("href") || "";
          [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
          if (/^https?:\/\//i.test(href) || href.startsWith("/")) el.setAttribute("href", href);
          el.setAttribute("target", "_blank");
          el.setAttribute("rel", "noopener noreferrer");
        } else {
          [...el.attributes].forEach((attr) => el.removeAttribute(attr.name));
        }
        walk(el);
      }
    }
  };

  walk(doc.body);
  return doc.body.innerHTML;
}

export function toEditorHtml(value: string) {
  const v = String(value || "").trim();
  if (!v) return "<p><br></p>";
  if (looksLikeHtml(v)) return v;
  return v
    .split(/\n+/)
    .map((line) => `<p>${line.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</p>`)
    .join("");
}
