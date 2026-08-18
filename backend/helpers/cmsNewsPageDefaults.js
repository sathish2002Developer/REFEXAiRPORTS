const { deepMerge } = require("./cmsJson");

function defaultNewsPayload() {
  return {
    pageTitle: "News & Updates",
    pageSubtitle:
      "Stay informed about our latest developments, stories, and achievements across our airport operations",
    tabs: [
      { id: "news", label: "News", icon: "ri-newspaper-line" },
      { id: "stories", label: "Stories", icon: "ri-book-open-line" },
      { id: "highlights", label: "Highlights", icon: "ri-star-line" },
      { id: "social", label: "Social", icon: "ri-share-line" },
    ],
    newsItems: [
      {
        title: "Completion of 1 Year at Pune Airport",
        date: "December 2024",
        description:
          "Refex Airports & Transportation proudly completes one year of operations at Pune Airport. Over the past year, we have worked closely with our brand partners and airport stakeholders to enhance the passenger retail experience from curating an exciting mix of stores to improving on-ground engagement and service standards.",
        image:
          "https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20interior%20celebrating%20one%20year%20anniversary%20with%20retail%20stores%2C%20passengers%20walking%20through%20bright%20spacious%20corridors%2C%20contemporary%20architecture%20with%20glass%20and%20steel%20elements%2C%20professional%20commercial%20photography%20style%2C%20celebration%20banners%20and%20decorations&width=800&height=500&seq=pune-1year-news&orientation=landscape",
        link: "",
      },
      {
        title: "What's New on Your Next Journey? - Store Openings at Pune & Srinagar",
        date: "November 2024",
        description:
          "Refex Airports continues to expand its retail footprint with the addition of new stores across Pune and Srinagar airports. The new outlets bring a mix of popular brands and local favourites, offering travellers more variety and convenience on the go. Each opening marks another step towards creating vibrant, engaging spaces that enhance the overall passenger experience.",
        image:
          "https://readdy.ai/api/search-image?query=New%20retail%20store%20grand%20opening%20in%20modern%20airport%20terminal%2C%20ribbon%20cutting%20ceremony%2C%20contemporary%20store%20front%20design%20with%20brand%20displays%2C%20airport%20retail%20expansion%2C%20professional%20business%20photography%20with%20excited%20customers%20and%20staff&width=800&height=500&seq=store-opening-news&orientation=landscape",
        link: "",
      },
    ],
    stories: [
      {
        title: "Tramboo Bats - A Legacy of Kashmir Cricket",
        subtitle: "Local Brand Spotlight",
        description:
          "Discover the story of Tramboo Bats, a renowned local brand from Kashmir that has been crafting premium cricket bats for generations. Now available at Srinagar Airport, travelers can take home a piece of Kashmiri craftsmanship and sporting heritage.",
        image:
          "https://readdy.ai/api/search-image?query=Traditional%20Kashmir%20cricket%20bat%20craftsmanship%2C%20artisan%20making%20wooden%20cricket%20bats%20in%20workshop%2C%20premium%20handcrafted%20sports%20equipment%2C%20cultural%20heritage%20product%20display%20in%20modern%20airport%20retail%20store%2C%20professional%20product%20photography&width=700&height=450&seq=tramboo-bats&orientation=landscape",
      },
      {
        title: "Celebrating Local Flavors at Our Terminals",
        subtitle: "Regional Brands Partnership",
        description:
          "We take pride in partnering with local brands that represent the unique culture and craftsmanship of each region. From traditional handicrafts to regional delicacies, our stores offer travelers an authentic taste of local excellence.",
        image:
          "https://readdy.ai/api/search-image?query=Airport%20retail%20store%20showcasing%20local%20regional%20products%2C%20traditional%20handicrafts%20and%20regional%20specialties%20on%20display%2C%20travelers%20shopping%20for%20local%20souvenirs%2C%20modern%20airport%20terminal%20with%20cultural%20product%20displays%2C%20warm%20inviting%20retail%20environment&width=700&height=450&seq=local-brands&orientation=landscape",
      },
      {
        title: "From Local to Global - Empowering Regional Entrepreneurs",
        subtitle: "Partnership Success",
        description:
          "Our commitment to supporting local businesses has created opportunities for regional entrepreneurs to showcase their products to a global audience. These partnerships not only enhance the traveler experience but also contribute to local economic growth.",
        image:
          "https://readdy.ai/api/search-image?query=Successful%20local%20business%20owner%20in%20modern%20airport%20retail%20store%2C%20entrepreneur%20showcasing%20regional%20products%20to%20international%20travelers%2C%20professional%20business%20partnership%20photography%2C%20contemporary%20airport%20retail%20environment%20with%20local%20products&width=700&height=450&seq=local-entrepreneurs&orientation=landscape",
      },
    ],
    highlights: [
      {
        title: "Turning Airport Walks into Shopping Journeys",
        description:
          "Refex Airports introduced the 'Fly Buy Summer' campaign this season, transforming airport spaces into vibrant, engaging hubs for travellers. The campaign was designed to encourage customer interaction through attractive shopping offers and vibrant store displays.",
        image:
          "https://readdy.ai/api/search-image?query=Vibrant%20airport%20retail%20summer%20campaign%20with%20colorful%20promotional%20displays%2C%20shopping%20banners%20and%20decorations%2C%20travelers%20engaging%20with%20stores%2C%20bright%20modern%20airport%20interior%20with%20summer%20themed%20marketing%20materials%2C%20professional%20commercial%20photography&width=900&height=550&seq=fly-buy-highlight&orientation=landscape",
        date: "Summer 2024",
        icon: "ri-shopping-bag-3-line",
      },
      {
        title: "GAME ON! 'When Brands Compete, Shoppers Win!'",
        description:
          "In a bid to recognize and celebrate outstanding retail performance, Refex Airports introduced 'Brand Wars', an internal incentive program aimed at rewarding excellence and fostering collaboration among our retail partners. It helped brands to engage in a healthy competition while encouraging them to perform better and fostering growth into their everyday performance.",
        image:
          "https://readdy.ai/api/search-image?query=Airport%20retail%20competition%20event%20with%20brand%20displays%20and%20awards%2C%20retail%20partners%20celebrating%20achievements%2C%20modern%20airport%20terminal%20with%20competitive%20retail%20environment%2C%20professional%20business%20event%20photography%20with%20trophies%20and%20recognition%20ceremony&width=900&height=550&seq=brand-wars-highlight&orientation=landscape",
        date: "Q3 2024",
        icon: "ri-trophy-line",
      },
    ],
    socialPosts: [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/posts/refex-group_puneairport-retailrevolution-beyondtravel-activity-7369963220855554048-5xLE",
        title: "Shop at city prices from Pune Airport",
        caption:
          "Bappa boards his flight back, but blessings and great deals stay on — shop at city prices and fly happy from Pune Airport! Stores inside our terminals bring festive offers and a luxury shopping experience beyond travel.",
        image:
          "https://readdy.ai/api/search-image?query=Festive%20Ganesh%20Chaturthi%20retail%20displays%20inside%20a%20modern%20Pune%20airport%20terminal%20with%20luxury%20shopping%20stores%2C%20travelers%20walking%20past%20bright%20storefronts%2C%20warm%20celebration%20lighting%2C%20professional%20airport%20retail%20photography&width=900&height=560&seq=pune-linkedin-ganesh-retail&orientation=landscape",
        date: "September 2025",
        airport: "pune",
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/refexgroup/",
        title: "Stores inside our terminals",
        caption:
          "Discover brands and festive shopping inside Refex airport terminals. Follow us on Instagram for the latest store moments from Pune, Srinagar and more.",
        image:
          "https://readdy.ai/api/search-image?query=Bright%20airport%20terminal%20retail%20street%20with%20fashion%20and%20lifestyle%20stores%2C%20travelers%20shopping%20with%20luggage%2C%20Instagram-style%20lifestyle%20photography%2C%20modern%20glass%20architecture&width=900&height=560&seq=refex-instagram-terminal-stores&orientation=landscape",
        date: "2025",
        airport: "",
      },
    ],
  };
}

function str(v) {
  return v === undefined || v === null ? "" : String(v);
}

function sanitizeNewsItems(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      title: str(item.title),
      date: str(item.date),
      description: str(item.description),
      image: str(item.image),
      link: str(item.link),
    }));
}

function sanitizeStories(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      title: str(item.title),
      subtitle: str(item.subtitle),
      description: str(item.description),
      image: str(item.image),
    }));
}

function sanitizeHighlights(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      title: str(item.title),
      description: str(item.description),
      image: str(item.image),
      date: str(item.date),
      icon: str(item.icon) || "ri-star-line",
    }));
}

function sanitizeSocialPosts(list) {
  if (!Array.isArray(list)) return [];
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const urlRaw = str(item.url);
      const imageRaw = str(item.image);
      const isSocial = (u) => /linkedin\.com|instagram\.com/i.test(u);
      const url = isSocial(urlRaw) ? urlRaw : isSocial(imageRaw) ? imageRaw : urlRaw;
      const image = isSocial(imageRaw) ? "" : imageRaw;
      const platform =
        str(item.platform).toLowerCase() === "instagram" || /instagram\.com/i.test(url)
          ? "instagram"
          : "linkedin";
      return {
        platform,
        url,
        title: str(item.title),
        caption: str(item.caption),
        image,
        date: str(item.date),
        airport: str(item.airport).toLowerCase().replace(/[^a-z]/g, ""),
      };
    });
}

function sanitizeTabs(list) {
  const fallback = defaultNewsPayload().tabs;
  if (!Array.isArray(list) || !list.length) return fallback;
  return list
    .filter((item) => item && typeof item === "object")
    .map((item, i) => ({
      id: str(item.id) || fallback[i]?.id || `tab-${i + 1}`,
      label: str(item.label) || fallback[i]?.label || "Tab",
      icon: str(item.icon) || fallback[i]?.icon || "ri-newspaper-line",
    }));
}

function mergeNewsPayload(current, incoming) {
  let next = deepMerge(defaultNewsPayload(), current && typeof current === "object" ? current : {});
  next = deepMerge(next, incoming && typeof incoming === "object" ? incoming : {});
  const src = incoming && typeof incoming === "object" ? incoming : {};
  next.tabs = sanitizeTabs(Array.isArray(src.tabs) ? src.tabs : next.tabs);
  next.newsItems = sanitizeNewsItems(Array.isArray(src.newsItems) ? src.newsItems : next.newsItems);
  next.stories = sanitizeStories(Array.isArray(src.stories) ? src.stories : next.stories);
  next.highlights = sanitizeHighlights(
    Array.isArray(src.highlights) ? src.highlights : next.highlights
  );
  next.socialPosts = sanitizeSocialPosts(
    Array.isArray(src.socialPosts) ? src.socialPosts : next.socialPosts
  );
  if (!next.tabs.some((t) => t.id === "social")) {
    next.tabs.push({ id: "social", label: "Social", icon: "ri-share-line" });
  }
  next.pageTitle = str(next.pageTitle) || defaultNewsPayload().pageTitle;
  next.pageSubtitle = str(next.pageSubtitle);
  return next;
}

module.exports = { defaultNewsPayload, mergeNewsPayload };
