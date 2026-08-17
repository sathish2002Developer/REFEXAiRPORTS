import { useEffect, useState } from "react";
import { cmsGet } from "@/lib/api";

export type NavItemType = "link" | "dropdown" | "nested" | "anchor";

export type NavChild = { label: string; to: string };

export type NavGroup = { label: string; to?: string; children: NavChild[] };

export type NavItem = {
  type: NavItemType;
  label: string;
  to: string;
  children?: NavChild[];
  groups?: NavGroup[];
};

export type NavbarCms = {
  logo_url: string;
  logo_alt: string;
  nav_links: NavItem[];
};

const DEFAULT_LOGO =
  "https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png";

const airports = [
  { key: "pune", name: "Pune Airport" },
  { key: "srinagar", name: "Srinagar Airport" },
  { key: "trichy", name: "Trichy Airport" },
  { key: "aurangabad", name: "Aurangabad Airport" },
  { key: "shirdi", name: "Shirdi Airport" },
];

function travelersGroupsFromAirports(list = airports): NavGroup[] {
  return [
    {
      label: "Travelers",
      children: list.map((a) => ({ label: a.name, to: `/${a.key}-airport` })),
    },
    {
      label: "Retail",
      children: list.map((a) => ({ label: a.name, to: `/${a.key}-airport-assets` })),
    },
    {
      label: "Lounge",
      children: list.map((a) => ({ label: a.name, to: `/${a.key}-airport-lounge` })),
    },
  ];
}

function travelersNavItem(label = "For Travelers"): NavItem {
  return {
    type: "nested",
    label,
    to: "",
    groups: travelersGroupsFromAirports(),
  };
}

export const DEFAULT_NAVBAR: NavbarCms = {
  logo_url: DEFAULT_LOGO,
  logo_alt: "Refex Airports",
  nav_links: [
    { type: "link", label: "Home", to: "/" },
    {
      type: "dropdown",
      label: "About Us",
      to: "/about",
      children: [
        { label: "Who We Are", to: "/about#intro" },
        { label: "Leadership", to: "/leadership" },
      ],
    },
    {
      type: "nested",
      label: "Our Assets",
      to: "",
      groups: [
        {
          label: "Retail",
          children: airports.map((a) => ({ label: a.name, to: `/${a.key}-airport-assets` })),
        },
        {
          label: "Lounge",
          children: airports.map((a) => ({ label: a.name, to: `/${a.key}-airport-lounge` })),
        },
      ],
    },
    travelersNavItem(),
    { type: "link", label: "News & Updates", to: "/news" },
    { type: "link", label: "Partner with Us", to: "/partner-with-us" },
  ],
};

const TYPES: NavItemType[] = ["link", "dropdown", "nested", "anchor"];

function str(v: unknown) {
  return v === undefined || v === null ? "" : String(v);
}

function childOf(c: any): NavChild {
  return { label: str(c?.label), to: str(c?.to) };
}

export function normalizeNavbar(raw: any): NavbarCms {
  const src = raw && typeof raw === "object" ? raw : {};
  const hasLinks = Array.isArray(src.nav_links);
  const links = hasLinks ? src.nav_links : [];
  const nav_links: NavItem[] = links
    .map((item: any) => {
      const label = str(item?.label).trim();
      if (!label) return null;
      let type: NavItemType = TYPES.includes(item?.type) ? item.type : "link";
      if (!TYPES.includes(item?.type)) {
        if (Array.isArray(item?.groups)) type = "nested";
        else if (Array.isArray(item?.children)) type = "dropdown";
        else if (str(item?.to).startsWith("#")) type = "anchor";
      }
      const next: NavItem = { type, label, to: str(item?.to) };
      if (next.to === "#contact" || next.to === "/#contact" || next.to.endsWith("#contact")) {
        next.to = "/partner-with-us";
        if (next.type === "anchor") next.type = "link";
      }
      if (type === "dropdown") {
        next.children = Array.isArray(item.children) ? item.children.map(childOf) : [];
      }
      if (type === "nested") {
        next.groups = Array.isArray(item.groups)
          ? item.groups
              .map((g: any) => ({
                label: str(g?.label).trim(),
                to: str(g?.to),
                children: Array.isArray(g?.children) ? g.children.map(childOf).filter((c: NavChild) => c.label) : [],
              }))
              .filter((g: NavGroup) => g.label)
          : [];
      }
      return next;
    })
    .filter(Boolean) as NavItem[];

  return {
    logo_url: str(src.logo_url) || DEFAULT_NAVBAR.logo_url,
    logo_alt: str(src.logo_alt) || DEFAULT_NAVBAR.logo_alt,
    nav_links: hasLinks ? nav_links : DEFAULT_NAVBAR.nav_links,
  };
}

export function useNavbarCms() {
  const [navbar, setNavbar] = useState<NavbarCms>(DEFAULT_NAVBAR);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      cmsGet<{ navbar?: unknown }>("site-chrome")
        .then((data) => {
          if (!cancelled) setNavbar(normalizeNavbar(data?.navbar));
        })
        .catch(() => {
          /* keep current / defaults */
        });
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
    };
  }, []);

  return navbar;
}

export function emptyNavItem(type: NavItemType = "link"): NavItem {
  if (type === "dropdown") return { type, label: "New menu", to: "", children: [] };
  if (type === "nested") return { type, label: "New menu", to: "", groups: [] };
  return { type, label: "New menu", to: "/" };
}
