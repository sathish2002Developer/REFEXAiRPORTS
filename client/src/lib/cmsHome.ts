export function parseStatCount(display: string) {
  const raw = String(display ?? "").trim();
  const m = raw.match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!m) return { count: 0, suffix: raw, countDisplay: raw };
  return { count: Number(m[1]), suffix: m[2] || "", countDisplay: raw };
}

function str(v: unknown, fallback = "") {
  return v === undefined || v === null ? fallback : String(v);
}

export function flattenHome(payload: Record<string, any> = {}): Record<string, string> {
  const fields: Record<string, string> = {};
  const hero = payload.hero || {};
  fields.hero_line1 = str(hero.line1);
  fields.hero_line2 = str(hero.line2);
  fields.hero_line3 = str(hero.line3);
  fields.hero_line4 = str(hero.line4);
  fields.hero_video = str(hero.video);

  const stats = payload.stats || {};
  fields.stats_title = str(stats.title);

  const wwa = payload.whoWeAre || {};
  fields.wwa_title = str(wwa.title);
  fields.wwa_desc = str(wwa.desc);
  fields.wwa_btn = str(wwa.btn);
  fields.wwa_img1 = str((wwa.images || [])[0]);
  fields.wwa_img2 = str((wwa.images || [])[1]);

  const te = payload.travelerExperiences || {};
  fields.te_title_line1 = str(te.titleLine1);
  fields.te_title_line2 = str(te.titleLine2);
  fields.te_highlight = str(te.highlight);
  (te.items || []).forEach((item: any, i: number) => {
    const n = i + 1;
    fields[`te${n}_title`] = str(item.title);
    fields[`te${n}_desc`] = str(item.description);
    fields[`te${n}_img`] = str(item.image);
  });

  const brands = payload.brandPartners || {};
  fields.brands_title = str(brands.title);
  fields.brands_subtitle = str(brands.subtitle);

  const gptw = payload.gptw || {};
  fields.gptw_img = str(gptw.image);
  fields.gptw_alt = str(gptw.alt);

  const fp = payload.footprints || {};
  fields.fp_title = str(fp.title);
  fields.fp_subtitle = str(fp.subtitle);
  fields.fp_map_img = str(fp.mapImage);
  (fp.airports || []).forEach((a: any, i: number) => {
    const n = i + 1;
    fields[`fp_airport${n}_name`] = str(a.name);
    fields[`fp_airport${n}_desc`] = str(a.desc);
    fields[`fp_airport${n}_stat1`] = str(a.stat1);
    fields[`fp_airport${n}_stat2`] = str(a.stat2);
    fields[`fp_airport${n}_stat3`] = str(a.stat3);
    fields[`fp_airport${n}_link`] = str(a.link);
    fields[`fp_airport${n}_top`] = str(a.marker?.top);
    fields[`fp_airport${n}_left`] = str(a.marker?.left);
  });

  const stories = payload.stories || {};
  fields.stories_title = str(stories.title);
  fields.stories_subtitle = str(stories.subtitle);

  const contact = payload.contact || {};
  fields.contact_title = str(contact.title);
  fields.contact_subtitle = str(contact.subtitle);
  fields.contact_form_title = str(contact.formTitle);

  return fields;
}

export function applyHomeFields(payload: Record<string, any>, fields: Record<string, string>) {
  const next = JSON.parse(JSON.stringify(payload || {}));
  next.hero = next.hero || {};
  next.hero.line1 = fields.hero_line1 ?? next.hero.line1;
  next.hero.line2 = fields.hero_line2 ?? next.hero.line2;
  next.hero.line3 = fields.hero_line3 ?? next.hero.line3;
  next.hero.line4 = fields.hero_line4 ?? next.hero.line4;
  next.hero.video = fields.hero_video ?? next.hero.video;

  next.stats = next.stats || { items: [] };
  next.stats.title = fields.stats_title ?? next.stats.title;
  if (Array.isArray(payload.stats?.items)) {
    next.stats.items = payload.stats.items.map((item: any) => {
      const parsed = parseStatCount(str(item?.countDisplay ?? item?.count));
      return {
        ...parsed,
        label: str(item?.label),
        image: str(item?.image),
      };
    });
  }

  next.whoWeAre = next.whoWeAre || {};
  next.whoWeAre.title = fields.wwa_title ?? next.whoWeAre.title;
  next.whoWeAre.desc = fields.wwa_desc ?? next.whoWeAre.desc;
  next.whoWeAre.btn = fields.wwa_btn ?? next.whoWeAre.btn;
  const imgs = [...(next.whoWeAre.images || [])];
  if (fields.wwa_img1 !== undefined) imgs[0] = fields.wwa_img1;
  if (fields.wwa_img2 !== undefined) imgs[1] = fields.wwa_img2;
  next.whoWeAre.images = imgs.filter((v) => v !== undefined);

  next.travelerExperiences = next.travelerExperiences || { items: [] };
  next.travelerExperiences.titleLine1 = fields.te_title_line1 ?? next.travelerExperiences.titleLine1;
  next.travelerExperiences.titleLine2 = fields.te_title_line2 ?? next.travelerExperiences.titleLine2;
  next.travelerExperiences.highlight = fields.te_highlight ?? next.travelerExperiences.highlight;
  next.travelerExperiences.items = Array.isArray(next.travelerExperiences.items)
    ? next.travelerExperiences.items
    : [];
  for (let i = 0; i < 2; i++) {
    const n = i + 1;
    const item = { ...(next.travelerExperiences.items[i] || {}) };
    if (fields[`te${n}_title`] !== undefined) item.title = fields[`te${n}_title`];
    if (fields[`te${n}_desc`] !== undefined) item.description = fields[`te${n}_desc`];
    if (fields[`te${n}_img`] !== undefined) item.image = fields[`te${n}_img`];
    next.travelerExperiences.items[i] = item;
  }

  next.brandPartners = next.brandPartners || {};
  next.brandPartners.title = fields.brands_title ?? next.brandPartners.title;
  next.brandPartners.subtitle = fields.brands_subtitle ?? next.brandPartners.subtitle;
  if (Array.isArray(payload.brandPartners?.brands)) {
    next.brandPartners.brands = payload.brandPartners.brands.map((b: any) => ({
      name: str(b?.name),
      image: str(b?.image),
      url: str(b?.url),
    }));
  }

  next.gptw = next.gptw || {};
  next.gptw.image = fields.gptw_img ?? next.gptw.image;
  next.gptw.alt = fields.gptw_alt ?? next.gptw.alt;

  next.footprints = next.footprints || { airports: [] };
  next.footprints.title = fields.fp_title ?? next.footprints.title;
  next.footprints.subtitle = fields.fp_subtitle ?? next.footprints.subtitle;
  next.footprints.mapImage = fields.fp_map_img ?? next.footprints.mapImage;
  next.footprints.airports = Array.isArray(next.footprints.airports) ? next.footprints.airports : [];
  for (let i = 0; i < 5; i++) {
    const n = i + 1;
    const a = { ...(next.footprints.airports[i] || {}), marker: { ...(next.footprints.airports[i]?.marker || {}) } };
    if (fields[`fp_airport${n}_name`] !== undefined) a.name = fields[`fp_airport${n}_name`];
    if (fields[`fp_airport${n}_desc`] !== undefined) a.desc = fields[`fp_airport${n}_desc`];
    if (fields[`fp_airport${n}_stat1`] !== undefined) a.stat1 = fields[`fp_airport${n}_stat1`];
    if (fields[`fp_airport${n}_stat2`] !== undefined) a.stat2 = fields[`fp_airport${n}_stat2`];
    if (fields[`fp_airport${n}_stat3`] !== undefined) a.stat3 = fields[`fp_airport${n}_stat3`];
    if (fields[`fp_airport${n}_link`] !== undefined) a.link = fields[`fp_airport${n}_link`];
    if (fields[`fp_airport${n}_top`] !== undefined) a.marker.top = fields[`fp_airport${n}_top`];
    if (fields[`fp_airport${n}_left`] !== undefined) a.marker.left = fields[`fp_airport${n}_left`];
    next.footprints.airports[i] = a;
  }

  next.stories = next.stories || { items: [] };
  next.stories.title = fields.stories_title ?? next.stories.title;
  next.stories.subtitle = fields.stories_subtitle ?? next.stories.subtitle;
  if (Array.isArray(payload.stories?.items)) {
    next.stories.items = payload.stories.items.map((s: any) => ({
      tag: str(s?.tag),
      title: str(s?.title),
      description: str(s?.description),
      image: str(s?.image),
    }));
  }

  next.contact = next.contact || { locations: [] };
  next.contact.title = fields.contact_title ?? next.contact.title;
  next.contact.subtitle = fields.contact_subtitle ?? next.contact.subtitle;
  next.contact.formTitle = fields.contact_form_title ?? next.contact.formTitle;
  if (Array.isArray(payload.contact?.locations)) {
    next.contact.locations = payload.contact.locations.map((loc: any) => ({
      name: str(loc?.name),
      subtitle: str(loc?.subtitle),
      phone: str(loc?.phone),
      email: str(loc?.email),
      address: str(loc?.address),
    }));
  }

  return next;
}
