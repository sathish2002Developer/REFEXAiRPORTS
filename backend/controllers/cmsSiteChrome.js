const path = require("path");
const { CmsSiteChrome } = require("../models");
const { responseStatus } = require("../helpers/response");
const { archiveCurrentRevision } = require("../helpers/cmsRevisionHelper");

const DEFAULT_LOGO =
  "https://refexairports.com/wp-content/uploads/2023/08/Refex-Airports-Logo.png";

const NAV_TYPES = new Set(["link", "dropdown", "nested", "anchor"]);

function isPlainObject(o) {
  return o !== null && typeof o === "object" && !Array.isArray(o);
}

function deepMerge(base, overlay) {
  if (!overlay) return base;
  const out = { ...base };
  for (const k of Object.keys(overlay)) {
    const bv = base[k];
    const ov = overlay[k];
    if (ov === undefined) continue;
    if (isPlainObject(bv) && isPlainObject(ov)) {
      out[k] = deepMerge(bv, ov);
    } else {
      out[k] = ov;
    }
  }
  return out;
}

function defaultPayload() {
  const airports = [
    { key: "pune", name: "Pune Airport" },
    { key: "srinagar", name: "Srinagar Airport" },
    { key: "trichy", name: "Trichy Airport" },
    { key: "aurangabad", name: "Aurangabad Airport" },
    { key: "shirdi", name: "Shirdi Airport" },
  ];
  return {
    navbar: {
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
              children: airports.map((a) => ({
                label: a.name,
                to: `/${a.key}-airport-assets`,
              })),
            },
            {
              label: "Lounge",
              children: airports.map((a) => ({
                label: a.name,
                to: `/${a.key}-airport-lounge`,
              })),
            },
          ],
        },
        {
          type: "dropdown",
          label: "For Travelers",
          to: "",
          children: airports.map((a) => ({
            label: a.name,
            to: `/${a.key}-airport`,
          })),
        },
        { type: "link", label: "News & Updates", to: "/news" },
        { type: "anchor", label: "Partner with Us", to: "#contact" },
      ],
    },
    footer: {
      logo_url: DEFAULT_LOGO,
      logo_alt: "Refex Airports",
      line_left: "Bringing World-Class Retail to Airports.",
      line_right: "© Refex Airports",
    },
  };
}

function sanitizeChild(c) {
  if (!c || typeof c !== "object") return null;
  const label = String(c.label || "").trim();
  if (!label) return null;
  return { label, to: String(c.to || "").trim() };
}

function sanitizeGroup(g) {
  if (!g || typeof g !== "object") return null;
  const label = String(g.label || "").trim();
  const children = Array.isArray(g.children)
    ? g.children.map(sanitizeChild).filter(Boolean)
    : [];
  if (!label && !children.length) return null;
  return { label, children };
}

function inferType(item) {
  if (NAV_TYPES.has(item?.type)) return item.type;
  if (Array.isArray(item?.groups)) return "nested";
  if (Array.isArray(item?.children)) return "dropdown";
  if (String(item?.to || "").startsWith("#")) return "anchor";
  return "link";
}

function sanitizeNavItem(item) {
  if (!item || typeof item !== "object") return null;
  const label = String(item.label || "").trim();
  if (!label) return null;
  const type = inferType(item);
  const out = { type, label, to: String(item.to || "").trim() };
  if (type === "dropdown") {
    out.children = Array.isArray(item.children)
      ? item.children.map(sanitizeChild).filter(Boolean)
      : [];
  }
  if (type === "nested") {
    out.groups = Array.isArray(item.groups)
      ? item.groups.map(sanitizeGroup).filter(Boolean)
      : [];
  }
  return out;
}

function resolveAssetUrl(raw, req) {
  const s = typeof raw === "string" ? raw.trim() : "";
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  const p = s.startsWith("/") ? s : `/${s}`;
  return `${req.protocol}://${req.get("host")}${p}`;
}

function mergePayload(dbPayload, incoming) {
  let next = deepMerge(defaultPayload(), dbPayload || {});
  next = deepMerge(next, incoming || {});
  const source = Array.isArray(incoming?.navbar?.nav_links)
    ? incoming.navbar.nav_links
    : next.navbar.nav_links;
  const n = (Array.isArray(source) ? source : []).map(sanitizeNavItem).filter(Boolean);
  next.navbar.nav_links = n.length > 0 ? n : defaultPayload().navbar.nav_links;
  return next;
}

function serializePayload(payload, req) {
  const p = mergePayload(payload, {});
  const navLogo = resolveAssetUrl(p.navbar?.logo_url, req);
  const footLogo = resolveAssetUrl(p.footer?.logo_url, req);
  return {
    navbar: {
      ...p.navbar,
      logo_url: p.navbar?.logo_url || DEFAULT_LOGO,
      logo_resolved_url: navLogo || p.navbar?.logo_url || DEFAULT_LOGO,
    },
    footer: {
      ...p.footer,
      logo_url: p.footer?.logo_url || DEFAULT_LOGO,
      logo_resolved_url: footLogo || p.footer?.logo_url || DEFAULT_LOGO,
    },
  };
}

function pickUploaded(relPath) {
  if (!relPath) return "";
  return `/uploads/cms/${path.basename(relPath)}`;
}

async function getOrCreateRow() {
  let row = await CmsSiteChrome.findOne({ where: { singleton_key: "main" } });
  if (!row) {
    row = await CmsSiteChrome.create({
      singleton_key: "main",
      payload: defaultPayload(),
    });
  }
  return row;
}

const getPublicSiteChrome = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    const plain = row.get({ plain: true });
    const data = serializePayload(plain.payload || {}, req);
    return responseStatus(res, 200, "OK", data);
  } catch (e) {
    console.error("getPublicSiteChrome:", e);
    return responseStatus(res, 500, "Failed to load site chrome CMS");
  }
};

const patchAdminSiteChrome = async (req, res) => {
  try {
    const row = await getOrCreateRow();
    let incoming = {};
    try {
      if (typeof req.body?.payload === "string" && req.body.payload.trim()) {
        incoming = JSON.parse(req.body.payload);
      } else if (req.body?.payload && typeof req.body.payload === "object") {
        incoming = req.body.payload;
      }
    } catch (parseErr) {
      console.error("patchAdminSiteChrome parse:", parseErr);
      return responseStatus(res, 400, "Invalid JSON payload");
    }

    const files = req.files || {};
    if (files.navbarLogo?.[0]?.filename) {
      incoming = deepMerge(incoming, {
        navbar: { logo_url: pickUploaded(files.navbarLogo[0].path) },
      });
    }
    if (files.footerLogo?.[0]?.filename) {
      incoming = deepMerge(incoming, {
        footer: { logo_url: pickUploaded(files.footerLogo[0].path) },
      });
    }

    await archiveCurrentRevision("site-chrome", req);
    row.payload = mergePayload(row.payload || {}, incoming);
    await row.save();

    const out = serializePayload(row.payload, req);
    return responseStatus(res, 200, "Saved", out);
  } catch (e) {
    console.error("patchAdminSiteChrome:", e);
    return responseStatus(res, 500, "Failed to save site chrome CMS");
  }
};

module.exports = {
  getPublicSiteChrome,
  patchAdminSiteChrome,
  defaultPayload,
  serializePayload,
};
