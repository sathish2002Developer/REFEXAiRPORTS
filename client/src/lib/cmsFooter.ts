import { useEffect, useState } from "react";
import { cmsGet } from "@/lib/api";

export type FooterLink = { label: string; to: string };

export type FooterCms = {
  logo_url: string;
  logo_alt: string;
  tagline: string;
  quick_links_title: string;
  links: FooterLink[];
  cta_title: string;
  cta_button: string;
  cta_to: string;
  copyright: string;
};

const DEFAULT_LOGO =
  "https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png";

export const DEFAULT_FOOTER: FooterCms = {
  logo_url: DEFAULT_LOGO,
  logo_alt: "Refex Airports",
  tagline: "Bringing World-Class\nRetail to Pune Airport.",
  quick_links_title: "Quick Links",
  links: [
    { label: "Home", to: "/" },
    { label: "About Us", to: "/about" },
    { label: "Our Assets", to: "#" },
    { label: "For Travelers", to: "#" },
    { label: "News & Updates", to: "/news" },
    { label: "Partner with Us", to: "/partner-with-us" },
  ],
  cta_title: "Let's Elevate Your Retail Business Together",
  cta_button: "Enquire now",
  cta_to: "/partner-with-us",
  copyright: "© 2024 Refex Airports & Transports",
};

function str(v: unknown) {
  return v === undefined || v === null ? "" : String(v);
}

export function normalizeFooter(raw: any): FooterCms {
  const src = raw && typeof raw === "object" ? raw : {};
  const links = Array.isArray(src.links)
    ? src.links
        .filter((item: any) => item && typeof item === "object")
        .map((item: any) => ({ label: str(item.label), to: str(item.to) }))
        .filter((item: FooterLink) => item.label.trim())
    : [];

  return {
    logo_url: str(src.logo_url) || DEFAULT_FOOTER.logo_url,
    logo_alt: str(src.logo_alt) || DEFAULT_FOOTER.logo_alt,
    tagline: str(src.tagline) || str(src.line_left) || DEFAULT_FOOTER.tagline,
    quick_links_title: str(src.quick_links_title) || DEFAULT_FOOTER.quick_links_title,
    links: (links.length ? links : DEFAULT_FOOTER.links).map((item) =>
      item.to === "#contact" || item.to === "/#contact" || item.to.endsWith("#contact")
        ? { ...item, to: "/partner-with-us" }
        : item
    ),
    cta_title: str(src.cta_title) || DEFAULT_FOOTER.cta_title,
    cta_button: str(src.cta_button) || DEFAULT_FOOTER.cta_button,
    cta_to:
      str(src.cta_to) === "#contact" || str(src.cta_to).endsWith("#contact")
        ? "/partner-with-us"
        : str(src.cta_to) || DEFAULT_FOOTER.cta_to,
    copyright: str(src.copyright) || str(src.line_right) || DEFAULT_FOOTER.copyright,
  };
}

export function useFooterCms() {
  const [footer, setFooter] = useState<FooterCms>(DEFAULT_FOOTER);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      cmsGet<{ footer?: unknown }>("site-chrome")
        .then((data) => {
          if (!cancelled) setFooter(normalizeFooter(data?.footer));
        })
        .catch(() => {
          /* keep defaults */
        });
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
    };
  }, []);

  return footer;
}
