function str(v: unknown, fallback = "") {
  return v === undefined || v === null ? fallback : String(v);
}

export function flattenAbout(payload: Record<string, any> = {}): Record<string, string> {
  const fields: Record<string, string> = {};
  const banner = payload.banner || {};
  fields.banner_title = str(banner.title);
  fields.banner_subtitle = str(banner.subtitle);
  fields.banner_img = str(banner.image);

  fields.hero_title = str(payload.hero?.title);

  const intro = payload.intro || {};
  fields.intro_title = str(intro.title);
  fields.intro_img = str(intro.image);
  fields.intro_para1 = str(intro.para1);
  fields.intro_para2 = str(intro.para2);

  const vm = payload.visionMission || {};
  fields.vm_vision_title = str(vm.visionTitle);
  fields.vm_mission_title = str(vm.missionTitle);
  fields.vm_values_title = str(vm.valuesTitle);

  const fa = payload.focusArea || {};
  fields.fa_intro = str(fa.intro);

  const tp = payload.threePillars || {};
  fields.tp_title = str(tp.title);
  fields.tp_subtitle = str(tp.subtitle);
  fields.tp_retail_title = str(tp.retailTitle);
  fields.tp_retail_img = str(tp.retailImg);
  fields.tp_retail_para1 = str(tp.retailPara1);
  fields.tp_retail_para2 = str(tp.retailPara2);
  fields.tp_comm_title = str(tp.commTitle);
  fields.tp_comm_img = str(tp.commImg);
  fields.tp_comm_para1 = str(tp.commPara1);
  fields.tp_comm_para2 = str(tp.commPara2);

  const of = payload.ourFocus || {};
  fields.of_key_title = str(of.keyTitle);

  const lt = payload.leadership || {};
  fields.lt_hero_title = str(lt.title);
  fields.lt_hero_subtitle = str(lt.subtitle);
  fields.lt_hero_img = str(lt.image);
  fields.lt_founders_title = str(lt.foundersTitle);
  fields.lt_mgmt_title = str(lt.mgmtTitle);

  const rg = payload.refexGroup || {};
  fields.rg_logo_img = str(rg.logo);
  fields.rg_title = str(rg.title);
  fields.rg_subtitle = str(rg.subtitle);
  fields.rg_desc = str(rg.desc);
  fields.rg_btn_text = str(rg.btnText);
  fields.rg_btn_link = str(rg.btnLink);

  const bb = payload.backedBy || {};
  fields.bb_title_before = str(bb.titleBefore);
  fields.bb_title_emphasis = str(bb.titleEmphasis);
  fields.bb_logo = str(bb.logo);
  fields.bb_label = str(bb.label);
  fields.bb_desc = str(bb.desc);
  fields.bb_link = str(bb.link);

  return fields;
}

export function applyAboutFields(payload: Record<string, any>, fields: Record<string, string>) {
  const next = JSON.parse(JSON.stringify(payload || {}));

  next.banner = next.banner || {};
  next.banner.title = fields.banner_title ?? next.banner.title;
  next.banner.subtitle = fields.banner_subtitle ?? next.banner.subtitle;
  next.banner.image = fields.banner_img ?? next.banner.image;

  next.hero = next.hero || {};
  next.hero.title = fields.hero_title ?? next.hero.title;

  next.intro = next.intro || {};
  next.intro.title = fields.intro_title ?? next.intro.title;
  next.intro.image = fields.intro_img ?? next.intro.image;
  next.intro.para1 = fields.intro_para1 ?? next.intro.para1;
  next.intro.para2 = fields.intro_para2 ?? next.intro.para2;

  next.visionMission = next.visionMission || {};
  next.visionMission.visionTitle = fields.vm_vision_title ?? next.visionMission.visionTitle;
  next.visionMission.missionTitle = fields.vm_mission_title ?? next.visionMission.missionTitle;
  next.visionMission.valuesTitle = fields.vm_values_title ?? next.visionMission.valuesTitle;
  if (Array.isArray(payload.visionMission?.visionItems)) {
    next.visionMission.visionItems = payload.visionMission.visionItems.map((v: any) => str(v));
  }
  if (Array.isArray(payload.visionMission?.missionItems)) {
    next.visionMission.missionItems = payload.visionMission.missionItems.map((v: any) => str(v));
  }
  if (Array.isArray(payload.visionMission?.values)) {
    next.visionMission.values = payload.visionMission.values.map((v: any) => ({
      letter: str(v?.letter),
      name: str(v?.name),
      desc: str(v?.desc),
    }));
  }

  next.focusArea = next.focusArea || { cards: [] };
  next.focusArea.intro = fields.fa_intro ?? next.focusArea.intro;
  if (Array.isArray(payload.focusArea?.cards)) {
    next.focusArea.cards = payload.focusArea.cards.map((c: any) => ({
      title: str(c?.title),
      items: Array.isArray(c?.items) ? c.items.map((item: any) => str(item)) : [],
    }));
  }

  next.threePillars = next.threePillars || {};
  next.threePillars.title = fields.tp_title ?? next.threePillars.title;
  next.threePillars.subtitle = fields.tp_subtitle ?? next.threePillars.subtitle;
  next.threePillars.retailTitle = fields.tp_retail_title ?? next.threePillars.retailTitle;
  next.threePillars.retailImg = fields.tp_retail_img ?? next.threePillars.retailImg;
  next.threePillars.retailPara1 = fields.tp_retail_para1 ?? next.threePillars.retailPara1;
  next.threePillars.retailPara2 = fields.tp_retail_para2 ?? next.threePillars.retailPara2;
  next.threePillars.commTitle = fields.tp_comm_title ?? next.threePillars.commTitle;
  next.threePillars.commImg = fields.tp_comm_img ?? next.threePillars.commImg;
  next.threePillars.commPara1 = fields.tp_comm_para1 ?? next.threePillars.commPara1;
  next.threePillars.commPara2 = fields.tp_comm_para2 ?? next.threePillars.commPara2;

  next.ourFocus = next.ourFocus || { keys: [] };
  next.ourFocus.keyTitle = fields.of_key_title ?? next.ourFocus.keyTitle;
  if (Array.isArray(payload.ourFocus?.keys)) {
    next.ourFocus.keys = payload.ourFocus.keys.map((k: any) => ({
      title: str(k?.title),
      description: str(k?.description),
      icon: str(k?.icon),
      color: str(k?.color),
    }));
  }

  next.leadership = next.leadership || { founders: [], management: [] };
  next.leadership.title = fields.lt_hero_title ?? next.leadership.title;
  next.leadership.subtitle = fields.lt_hero_subtitle ?? next.leadership.subtitle;
  next.leadership.image = fields.lt_hero_img ?? next.leadership.image;
  next.leadership.foundersTitle = fields.lt_founders_title ?? next.leadership.foundersTitle;
  next.leadership.mgmtTitle = fields.lt_mgmt_title ?? next.leadership.mgmtTitle;
  if (Array.isArray(payload.leadership?.founders)) {
    next.leadership.founders = payload.leadership.founders.map((m: any) => ({
      name: str(m?.name),
      position: str(m?.position),
      image: str(m?.image),
      bio: str(m?.bio),
    }));
  }
  if (Array.isArray(payload.leadership?.management)) {
    next.leadership.management = payload.leadership.management.map((m: any) => ({
      name: str(m?.name),
      position: str(m?.position),
      image: str(m?.image),
      bio: str(m?.bio),
    }));
  }

  next.refexGroup = next.refexGroup || { slides: [] };
  next.refexGroup.logo = fields.rg_logo_img ?? next.refexGroup.logo;
  next.refexGroup.title = fields.rg_title ?? next.refexGroup.title;
  next.refexGroup.subtitle = fields.rg_subtitle ?? next.refexGroup.subtitle;
  next.refexGroup.desc = fields.rg_desc ?? next.refexGroup.desc;
  next.refexGroup.btnText = fields.rg_btn_text ?? next.refexGroup.btnText;
  next.refexGroup.btnLink = fields.rg_btn_link ?? next.refexGroup.btnLink;
  if (Array.isArray(payload.refexGroup?.slides)) {
    next.refexGroup.slides = payload.refexGroup.slides.map((s: any) => str(s)).filter(Boolean);
  }

  next.backedBy = next.backedBy || {};
  next.backedBy.titleBefore = fields.bb_title_before ?? next.backedBy.titleBefore;
  next.backedBy.titleEmphasis = fields.bb_title_emphasis ?? next.backedBy.titleEmphasis;
  next.backedBy.logo = fields.bb_logo ?? next.backedBy.logo;
  next.backedBy.label = fields.bb_label ?? next.backedBy.label;
  next.backedBy.desc = fields.bb_desc ?? next.backedBy.desc;
  next.backedBy.link = fields.bb_link ?? next.backedBy.link;

  return next;
}
