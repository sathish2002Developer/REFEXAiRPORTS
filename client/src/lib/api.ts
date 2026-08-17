const API_BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, "") || "";

export function apiUrl(path: string) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE}${p}`;
}

export function adminToken() {
  return localStorage.getItem("admin_token") || "";
}

export async function parseApiJson(res: Response) {
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.success === false || json.status === false) {
    const message = json.message || json.error || `Request failed (${res.status})`;
    throw new Error(typeof message === "string" ? message : "Request failed");
  }
  return json;
}

async function fetchJson(path: string, init?: RequestInit) {
  const res = await fetch(apiUrl(path), { cache: "no-store", ...init });
  const json = await res.json().catch(() => ({} as Record<string, unknown>));
  return { res, json };
}

function isApiOk(res: Response, json: Record<string, any>) {
  return res.ok && json.success !== false && json.status !== false;
}

export async function cmsGet<T>(resource: string): Promise<T> {
  const res = await fetch(apiUrl(`/api/cms/${resource}?_=${Date.now()}`), { cache: "no-store" });
  const json = await parseApiJson(res);
  return json.data as T;
}

export async function cmsAdminPatch<T>(resource: string, payload: unknown): Promise<T> {
  const res = await fetch(apiUrl(`/api/admin/cms/${resource}`), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken()}`,
    },
    body: JSON.stringify({ payload }),
  });
  const json = await parseApiJson(res);
  return json.data as T;
}

function partnerFromHome(home: Record<string, any> | null | undefined) {
  if (home?.partner && typeof home.partner === "object") return home.partner as Record<string, any>;
  const contact = home?.contact && typeof home.contact === "object" ? home.contact : {};
  return {
    hero: {
      title: contact.title || "Partner with Us",
      subtitle:
        contact.subtitle ||
        "Every great partnership starts with a conversation. Reach out, and let’s explore how we can grow together.",
      image: "https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg",
    },
    connect: {
      title: "Connect",
      highlight: "with us",
      subtitle:
        contact.formTitle ||
        contact.subtitle ||
        "Your feedback is valuable in helping us enhance your travel experience.",
      image: "/images/partner-connect.jpg",
    },
    addresses: {
      title: "Our",
      highlight: "Addresses",
      intro: contact.subtitle || "Reach us at any of our airport offices. We would love to hear from you.",
    },
    locations: Array.isArray(contact.locations) ? contact.locations : [],
  };
}

/** Partner CMS: use /api/cms/partner when it exists, otherwise Home CMS (UAT fallback). */
export async function cmsGetPartner(): Promise<Record<string, any>> {
  const partner = await fetchJson(`/api/cms/partner?_=${Date.now()}`);
  if (isApiOk(partner.res, partner.json) && partner.json.data && typeof partner.json.data === "object") {
    return partner.json.data as Record<string, any>;
  }
  const home = await cmsGet<Record<string, any>>("home");
  return partnerFromHome(home);
}

export async function cmsSavePartner(draft: unknown): Promise<Record<string, any>> {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${adminToken()}`,
  };
  const body = JSON.stringify({ payload: draft });
  const partner = await fetchJson("/api/admin/cms/partner", { method: "PATCH", headers, body });
  if (isApiOk(partner.res, partner.json) && partner.json.data && typeof partner.json.data === "object") {
    return partner.json.data as Record<string, any>;
  }

  const d = draft && typeof draft === "object" ? (draft as Record<string, any>) : {};
  const savedHome = await cmsAdminPatch<Record<string, any>>("home", {
    partner: d,
    contact: {
      title: d.hero?.title,
      subtitle: d.hero?.subtitle,
      formTitle: d.connect?.subtitle,
      locations: Array.isArray(d.locations) ? d.locations : [],
    },
  });
  return partnerFromHome(savedHome);
}

export async function cmsUploadImage(file: File): Promise<string> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(apiUrl("/api/upload/image"), {
    method: "POST",
    headers: { Authorization: `Bearer ${adminToken()}` },
    body: form,
  });
  const json = await parseApiJson(res);
  const url = (json.imageUrl || json.data?.imageUrl || json.url) as string;
  if (!url) throw new Error("Upload did not return an image URL");
  return url;
}

export function mediaUrl(url: string) {
  if (!url) return "";
  if (/^(https?:|data:|blob:)/i.test(url)) return url;
  return apiUrl(url);
}

export async function adminLogin(email: string, password: string) {
  const res = await fetch(apiUrl("/auth/login"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const json = await parseApiJson(res);
  const token = json.token as string;
  if (!token) throw new Error("Login did not return a token");
  localStorage.setItem("admin_token", token);
  return json;
}

export async function adminRegister(payload: {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}) {
  const res = await fetch(apiUrl("/auth/register"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return parseApiJson(res);
}

export async function adminListUsers() {
  const res = await fetch(apiUrl("/api/admin/users"), {
    headers: { Authorization: `Bearer ${adminToken()}` },
  });
  const json = await parseApiJson(res);
  return (json.data || []) as Array<{
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
    is_active: boolean;
  }>;
}

export async function adminCreateUser(payload: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  mobileNumber?: string;
}) {
  const res = await fetch(apiUrl("/api/admin/users"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken()}`,
    },
    body: JSON.stringify({
      ...payload,
      mobileNumber: payload.mobileNumber || "0000000000",
      userType: "Admin",
    }),
  });
  return parseApiJson(res);
}
