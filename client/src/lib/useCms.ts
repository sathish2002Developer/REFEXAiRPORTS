import { useEffect, useState } from "react";
import { cmsGet, cmsGetPartner } from "@/lib/api";

/** Live CMS payload. Reloads when the window is focused so admin saves show on the site. */
export function useCms(resource: string | null) {
  const [cms, setCms] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    if (!resource) return;
    let cancelled = false;
    const load = () => {
      const request =
        resource === "partner" ? cmsGetPartner() : cmsGet<Record<string, any>>(resource);
      request
        .then((data) => {
          if (cancelled || !data || typeof data !== "object") return;
          const { updated_at: _u, airport_key: _k, ...payload } = data;
          setCms(payload);
        })
        .catch(() => {
          if (!cancelled) setCms(null);
        });
    };
    load();
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      window.removeEventListener("focus", load);
    };
  }, [resource]);

  return cms;
}
