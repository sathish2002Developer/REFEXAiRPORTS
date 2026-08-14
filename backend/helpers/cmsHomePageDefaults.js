const { parseStatCount } = require("./cmsJson");

function defaultHomePayload() {
  const stats = [
    {
      image:
        "https://readdy.ai/api/search-image?query=Expansive%20modern%20airport%20terminal%20concourse%20with%20glass%20curtain%20walls%2C%20polished%20stone%20floors%2C%20retail%20storefronts%20lining%20a%20wide%20walkway%2C%20soft%20morning%20daylight%20streaming%20in%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-01&orientation=portrait",
      countDisplay: "2",
      label: "Airports with Active Retail Zones",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Busy%20modern%20airport%20terminal%20with%20travelers%20walking%20with%20luggage%20near%20tall%20panoramic%20windows%20overlooking%20an%20airplane%20on%20the%20tarmac%2C%20bright%20natural%20daylight%2C%20clean%20minimalist%20architectural%20design%2C%20soft%20neutral%20color%20palette%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-02&orientation=portrait",
      countDisplay: "15M+",
      label: "Annual Passengers in Addressable Zones",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Elegant%20airport%20duty-free%20retail%20shops%20with%20illuminated%20displays%20and%20luxury%20goods%20on%20shelves%2C%20wide%20shopping%20concourse%2C%20bright%20interior%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20soft%20neutral%20color%20palette%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-03&orientation=portrait",
      countDisplay: "70+",
      label: "Retail Outlets Supported",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20shopping%20district%20with%20branded%20storefronts%20and%20boutique%20retail%20facades%20along%20a%20spacious%20walkway%2C%20glass%20ceiling%20letting%20in%20warm%20natural%20light%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-04&orientation=portrait",
      countDisplay: "50+",
      label: "Brand Partnerships Across Terminals",
    },
    {
      image:
        "https://readdy.ai/api/search-image?query=Wide%20open%20modern%20airport%20retail%20concourse%20with%20polished%20terrazzo%20floors%2C%20curved%20ceiling%2C%20rows%20of%20elegant%20storefronts%20and%20seating%20areas%2C%20soft%20ambient%20daylight%2C%20bright%20airy%20atmosphere%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=800&height=1000&seq=impact-airport-05&orientation=portrait",
      countDisplay: "15K+",
      label: "sq. ft. of Retail Space Curated",
    },
  ].map((item) => ({ ...item, ...parseStatCount(item.countDisplay) }));

  return {
    hero: {
      line1: "Where World-Class",
      line2: "Retail",
      line3: "Meets Global",
      line4: "Travellers...",
      video: "https://refexairports.com/wp-content/uploads/2023/08/Hero-BG-Video.mp4",
    },
    stats: {
      title: "Our Impact in Numbers",
      items: stats,
    },
    whoWeAre: {
      title: "Who We Are",
      desc: "Refex Airports and Transportation is transport and commercial platform created to be a best-in-class developer and operator of airports and allied transportation services infrastructure. Having successfully managed retail master concessions at Pune and Srinagar airports, RATPL has introduced premium global brands and services that add value and vibrancy to airport spaces. Building on this foundation, the company is expanding its presence across bus terminals, metro rail, heliports, railways, and wayside amenities developing integrated mobility and commercial hubs that connect people, places, and possibilities.",
      btn: "Know more",
      images: [
        "https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg",
        "https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-2.jpg",
      ],
    },
    travelerExperiences: {
      titleLine1: "Creating Unparalleled",
      titleLine2: "Experiences",
      highlight: "For Travellers",
      items: [
        {
          image:
            "https://readdy.ai/api/search-image?query=Modern%20airport%20quick-service%20restaurant%20QSR%20with%20elegant%20dining%20seating%2C%20warm%20wooden%20accents%2C%20colorful%20cultural%20wall%20decorations%2C%20polished%20floors%2C%20bright%20interior%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=1200&height=800&seq=experience-qsr-01&orientation=landscape",
          title: "Travel QSR",
          description:
            "Our Travel QSR business comprises a range of curated F&B concepts across cuisines, brands and formats, which have been adapted to cater to customers' demands for speed and convenience within travel environments.",
        },
        {
          image:
            "https://readdy.ai/api/search-image?query=Luxurious%20airport%20lounge%20interior%20with%20plush%20seating%2C%20elegant%20wooden%20paneling%2C%20intricate%20ceiling%20art%2C%20floor-to-ceiling%20windows%20overlooking%20runway%2C%20warm%20ambient%20lighting%2C%20clean%20minimalist%20architectural%20design%2C%20premium%20editorial%20commercial%20photography%2C%20high%20detail%2C%20no%20text&width=1200&height=800&seq=experience-lounge-02&orientation=landscape",
          title: "Lounges",
          description:
            "Our Lounge business comprises designated areas within airport terminals, thoughtfully curated to provide travellers with an oasis of comfort and culinary excellence, tailored to enhance their journey with quality, convenience, and diverse offerings.",
        },
      ],
    },
    brandPartners: {
      title: "Brand Partners",
      subtitle: "A portfolio of 50+ brands, united by a single vision",
      brands: [
        { name: "Travel Food Services", image: "https://readdy.ai/api/search-image?query=Modern%20airport%20food%20court%20with%20multiple%20cuisine%20stalls%20and%20bright%20warm%20lighting%2C%20clean%20interior%20design%2C%20diverse%20food%20counters%2C%20bustling%20atmosphere%2C%20editorial%20photography%2C%20simple%20neutral%20background&width=400&height=280&seq=partner-tfs&orientation=landscape" },
        { name: "Jubilant FoodWorks", image: "https://readdy.ai/api/search-image?query=Colorful%20spread%20of%20diverse%20Indian%20and%20international%20fast%20food%20dishes%20on%20a%20clean%20white%20table%2C%20warm%20studio%20lighting%2C%20vibrant%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-jubilant&orientation=landscape" },
        { name: "SSP Group", image: "https://readdy.ai/api/search-image?query=Premium%20airport%20dining%20restaurant%20with%20elegant%20table%20setting%2C%20modern%20interior%2C%20warm%20ambient%20lighting%2C%20sophisticated%20food%20service%20environment%2C%20editorial%20photography%2C%20clean%20background&width=400&height=280&seq=partner-ssp&orientation=landscape" },
        { name: "Keventers", image: "https://readdy.ai/api/search-image?query=Classic%20milkshake%20bar%20with%20tall%20glass%20milkshakes%20in%20pastel%20colors%2C%20retro%20diner%20ambiance%2C%20warm%20cozy%20lighting%2C%20vintage%20style%20milk%20bottles%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-keventers&orientation=landscape" },
        { name: "Cafe Coffee Day", image: "https://readdy.ai/api/search-image?query=Cozy%20coffee%20shop%20interior%20with%20steaming%20coffee%20cups%20on%20wooden%20tables%2C%20warm%20ambient%20lighting%2C%20comfortable%20seating%2C%20barista%20station%20in%20background%2C%20editorial%20cafe%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-ccd&orientation=landscape" },
        { name: "Biriyani By Kilo", image: "https://readdy.ai/api/search-image?query=Aromatic%20biryani%20dish%20in%20traditional%20handi%20pot%20with%20saffron%20rice%2C%20caramelized%20onions%2C%20fresh%20herbs%20garnish%2C%20warm%20golden%20lighting%2C%20premium%20food%20photography%2C%20simple%20dark%20background&width=400&height=280&seq=partner-bbk&orientation=landscape" },
        { name: "Wow! Momo", image: "https://readdy.ai/api/search-image?query=Steaming%20hot%20momos%20dumplings%20in%20bamboo%20steamer%20basket%20with%20red%20chili%20dipping%20sauce%2C%20fresh%20herbs%2C%20warm%20steam%20rising%2C%20editorial%20Asian%20street%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-wowmomo&orientation=landscape" },
        { name: "Chai Point", image: "https://readdy.ai/api/search-image?query=Traditional%20Indian%20tea%20chai%20in%20clay%20kulhad%20cups%20with%20ginger%20and%20spices%2C%20warm%20golden%20lighting%2C%20aromatic%20steam%2C%20rustic%20wooden%20surface%2C%20editorial%20beverage%20photography%2C%20simple%20background&width=400&height=280&seq=partner-chaipoint&orientation=landscape" },
        { name: "Barbeque Nation", image: "https://readdy.ai/api/search-image?query=Sizzling%20grilled%20meats%20and%20vegetables%20on%20live%20charcoal%20grill%20with%20flames%20and%20smoke%2C%20warm%20fiery%20lighting%2C%20premium%20barbecue%20spread%2C%20editorial%20food%20photography%2C%20simple%20dark%20background&width=400&height=280&seq=partner-bbq&orientation=landscape" },
        { name: "Haldiram's", image: "https://readdy.ai/api/search-image?query=Colorful%20assortment%20of%20Indian%20snacks%20and%20sweets%20in%20decorative%20bowls%2C%20namkeen%20and%20mithai%20spread%2C%20warm%20festive%20lighting%2C%20traditional%20Indian%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-haldirams&orientation=landscape" },
        { name: "Street Foods by Punjab Grill", image: "https://readdy.ai/api/search-image?query=North%20Indian%20street%20food%20platter%20with%20tandoori%20items%20and%20rich%20curries%2C%20vibrant%20spices%2C%20warm%20rustic%20lighting%2C%20clay%20serving%20dishes%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-punjabgrill&orientation=landscape" },
        { name: "Andhra Dosas", image: "https://readdy.ai/api/search-image?query=Crispy%20golden%20dosa%20on%20banana%20leaf%20with%20coconut%20chutney%20and%20sambar%2C%20south%20Indian%20breakfast%20spread%2C%20warm%20morning%20lighting%2C%20traditional%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-andhra&orientation=landscape" },
        { name: "Sagar Ratna", image: "https://readdy.ai/api/search-image?query=South%20Indian%20vegetarian%20thali%20with%20idli%20vada%20sambar%20rasam%20and%20rice%20in%20brass%20vessels%2C%20banana%20leaf%20base%2C%20warm%20traditional%20lighting%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-sagarratna&orientation=landscape" },
        { name: "O2 Rise Cafe", image: "https://readdy.ai/api/search-image?query=Modern%20minimalist%20cafe%20interior%20with%20oxygen%20plant%20decor%2C%20green%20plants%2C%20contemporary%20furniture%2C%20bright%20natural%20lighting%2C%20fresh%20and%20airy%20atmosphere%2C%20editorial%20architecture%20photography%2C%20clean%20background&width=400&height=280&seq=partner-o2rise&orientation=landscape" },
        { name: "Tibetan Kitchen", image: "https://readdy.ai/api/search-image?query=Tibetan%20momos%20and%20thukpa%20noodle%20soup%20in%20traditional%20bowls%2C%20Himalayan%20herbs%20and%20spices%2C%20warm%20cozy%20lighting%2C%20rustic%20wooden%20table%2C%20editorial%20Asian%20cuisine%20photography%2C%20simple%20background&width=400&height=280&seq=partner-tibetan&orientation=landscape" },
        { name: "Wagh Bakri Tea Lounge", image: "https://readdy.ai/api/search-image?query=Premium%20tea%20lounge%20with%20elegant%20porcelain%20tea%20cups%20and%20premium%20tea%20leaves%2C%20warm%20golden%20ambient%20lighting%2C%20sophisticated%20cafe%20setting%2C%20editorial%20beverage%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-waghbakri&orientation=landscape" },
        { name: "Ferns N Petals", image: "https://readdy.ai/api/search-image?query=Beautiful%20floral%20arrangement%20with%20fresh%20roses%20and%20mixed%20flowers%20in%20elegant%20wrapping%2C%20gift%20store%20setting%2C%20warm%20soft%20lighting%2C%20editorial%20floral%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-fnp&orientation=landscape" },
        { name: "WhSmith", image: "https://readdy.ai/api/search-image?query=Modern%20bookstore%20retail%20store%20with%20neatly%20arranged%20books%20magazines%20and%20stationery%2C%20warm%20wood%20shelving%2C%20bright%20inviting%20lighting%2C%20editorial%20retail%20interior%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-whsmith&orientation=landscape" },
        { name: "Ather Energy", image: "https://readdy.ai/api/search-image?query=Sleek%20modern%20electric%20scooter%20in%20premium%20showroom%20with%20clean%20lines%2C%20futuristic%20lighting%2C%20technology%20display%2C%20editorial%20product%20photography%2C%20minimal%20simple%20background&width=400&height=280&seq=partner-ather&orientation=landscape" },
        { name: "Bose", image: "https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20on%20elegant%20display%20stand%20with%20soft%20bokeh%20lighting%2C%20high-end%20audio%20equipment%2C%20sleek%20modern%20design%2C%20editorial%20product%20photography%2C%20clean%20dark%20background&width=400&height=280&seq=partner-bose&orientation=landscape" },
      ],
    },
    gptw: {
      image: "https://www.travelfoodservices.com/assets/images/careers/linkedIn-banner-feb-2026-2027.png",
      alt: "Great Place To Work Certified MAR 2026 - MAR 2027 India - Travel Food Services Limited",
    },
    footprints: {
      title: "OUR FOOTPRINTS",
      subtitle: "Strategically located across India, connecting travelers to every corner of the nation",
      mapImage:
        "https://readdy.ai/api/search-image?query=Clean%20blue%20silhouette%20map%20of%20India%20on%20pure%20white%20background%2C%20simple%20flat%20design%2C%20no%20markers%20no%20text%20no%20labels%2C%20solid%20blue%20color%20fill%20with%20smooth%20edges%2C%20minimalist%20vector%20style%2C%20high%20resolution&width=900&height=1200&seq=india-map-clean-002&orientation=portrait",
      airports: [
        {
          name: "Pune Airport",
          desc: "Pune Airport is one of India's busiest and fastest-growing airports, serving as a key gateway for both business and leisure travelers. Located in the heart of Maharashtra's industrial and cultural hub, the airport reflects the city's progressive spirit and modern outlook.",
          stat1: "8.5M+ Annual Passengers",
          stat2: "25+ Brand Partners",
          stat3: "45,000 sq ft Retail Space",
          link: "/pune-airport",
          marker: { top: "58%", left: "28%" },
        },
        {
          name: "Srinagar Airport",
          desc: "Srinagar Airport serves as the primary gateway to the beautiful Kashmir Valley, welcoming tourists and business travelers from across the globe. The airport combines modern facilities with warm hospitality, reflecting the rich cultural heritage of the region.",
          stat1: "6.5M+ Annual Passengers",
          stat2: "20+ Brand Partners",
          stat3: "35,000 sq ft Retail Space",
          link: "/srinagar-airport",
          marker: { top: "18%", left: "30%" },
        },
        {
          name: "Aurangabad Airport",
          desc: "",
          stat1: "",
          stat2: "",
          stat3: "",
          link: "/aurangabad-airport",
          marker: { top: "53%", left: "33%" },
        },
        {
          name: "Shirdi Airport",
          desc: "",
          stat1: "",
          stat2: "",
          stat3: "",
          link: "/shirdi-airport",
          marker: { top: "50%", left: "30%" },
        },
        {
          name: "Trichy Airport",
          desc: "",
          stat1: "",
          stat2: "",
          stat3: "",
          link: "/trichy-airport",
          marker: { top: "78%", left: "48%" },
        },
      ],
    },
    stories: {
      title: "Stories from our Terminals",
      subtitle: "Discover the latest updates, campaigns, and milestones from our airport operations across India",
      items: [
        {
          tag: "Milestone",
          title: "Completion of 1 Year at Pune Airport",
          description:
            "Refex Airports & Transportation proudly completes one year of operations at Pune Airport. Over the past year, we have worked closely with our brand partners and airport stakeholders to enhance the passenger retail experience from curating an exciting mix of stores to improving on-ground engagement and service standards.",
          image:
            "https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20interior%20with%20retail%20stores%2C%20passengers%20walking%20through%20bright%20spacious%20corridors%2C%20contemporary%20architecture%20with%20glass%20and%20steel%20elements%2C%20professional%20commercial%20photography%20style&width=800&height=500&seq=pune-anniversary-v2&orientation=landscape",
        },
        {
          tag: "Campaign",
          title: "Fly Buy Summer Campaign",
          description:
            "Refex Airports introduced the 'Fly Buy Summer' campaign this season, transforming airport spaces into vibrant, engaging hubs for travellers. The campaign was designed to encourage customer interaction through attractive shopping offers and vibrant store displays, making every journey a memorable retail experience.",
          image:
            "https://readdy.ai/api/search-image?query=Vibrant%20airport%20retail%20campaign%20with%20colorful%20summer%20displays%2C%20shopping%20promotional%20banners%2C%20travelers%20engaging%20with%20stores%2C%20bright%20modern%20airport%20interior%20with%20summer%20themed%20decorations&width=800&height=500&seq=fly-buy-summer-v2&orientation=landscape",
        },
        {
          tag: "Program",
          title: "Brand Wars Initiative",
          description:
            "In a bid to recognize and celebrate outstanding retail performance, Refex Airports introduced 'Brand Wars', an internal incentive program aimed at rewarding excellence and fostering collaboration among our retail partners. It helped brands to engage in a healthy competition while encouraging them to perform better.",
          image:
            "https://readdy.ai/api/search-image?query=Airport%20retail%20competition%20event%20with%20brand%20displays%2C%20award%20ceremony%20setup%2C%20retail%20partners%20celebrating%2C%20modern%20airport%20terminal%20with%20competitive%20retail%20environment%2C%20professional%20business%20photography&width=800&height=500&seq=brand-wars-v2&orientation=landscape",
        },
        {
          tag: "Celebration",
          title: "Diwali Celebrations at Terminals",
          description:
            "From beautifully decorated store fronts to small gestures of celebration, the festive mood could be felt throughout the terminals. The Diwali season reminded us once again that our spaces are not just transit points, but places where people connect, share moments, and experience the joy of togetherness.",
          image:
            "https://readdy.ai/api/search-image?query=Airport%20terminal%20decorated%20for%20Diwali%20festival%20with%20traditional%20Indian%20decorations%2C%20colorful%20lights%2C%20festive%20store%20displays%2C%20passengers%20enjoying%20celebrations%2C%20warm%20lighting%20and%20cultural%20elements&width=800&height=500&seq=diwali-celebration-v2&orientation=landscape",
        },
        {
          tag: "Expansion",
          title: "New Store Openings at Pune & Srinagar",
          description:
            "Refex Airports continues to expand its retail footprint with the addition of new stores across Pune and Srinagar airports. The new outlets bring a mix of popular brands and local favourites, offering travellers more variety and convenience on the go. Each opening marks another step towards creating vibrant, engaging spaces.",
          image:
            "https://readdy.ai/api/search-image?query=New%20retail%20store%20opening%20in%20airport%20terminal%2C%20modern%20store%20front%20design%2C%20ribbon%20cutting%20ceremony%2C%20airport%20retail%20expansion%2C%20contemporary%20commercial%20space%20with%20brand%20displays&width=800&height=500&seq=store-opening-v2&orientation=landscape",
        },
      ],
    },
    contact: {
      title: "Contact us",
      subtitle: "Your journey to retail excellence begins here. Drop us a message and we'll guide the way.",
      formTitle: "Let's Elevate Your Retail Business Together",
      locations: [
        {
          name: "Pune International Airport (PNQ)",
          subtitle: "Lohegaon, Pune, Maharashtra",
          phone: "+91 95388 82531",
          email: "debamita.n@refex.co.in",
          address:
            "Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.",
        },
        {
          name: "Srinagar International Airport (SXR)",
          subtitle: "Humhama, Srinagar, Jammu & Kashmir",
          phone: "+91 91497 68998",
          email: "showkatahmad.m@refex.co.in",
          address: "Srinagar International Airport, Ground floor, Humhama-Srinagar 190007",
        },
        {
          name: "Tiruchirappalli International Airport (TRZ)",
          subtitle: "Tiruchirappalli, Tamil Nadu",
          phone: "+91 95388 82531",
          email: "debamita.n@refex.co.in",
          address: "Tiruchirappalli International Airport, Trichy - 620007, Tamil Nadu.",
        },
        {
          name: "Aurangabad Airport (IXU)",
          subtitle: "Chikalthana, Aurangabad, Maharashtra",
          phone: "+91 95388 82531",
          email: "debamita.n@refex.co.in",
          address: "Aurangabad Airport, Chikalthana, Aurangabad - 431007, Maharashtra.",
        },
        {
          name: "Shirdi International Airport (SAG)",
          subtitle: "Kakadi, Shirdi, Maharashtra",
          phone: "+91 95388 82531",
          email: "debamita.n@refex.co.in",
          address: "Shirdi International Airport, Kakadi, Shirdi - 423109, Maharashtra.",
        },
      ],
    },
  };
}

function str(v, fallback = "") {
  return v === undefined || v === null ? fallback : String(v);
}

function sanitizeStoryItems(list) {
  if (!Array.isArray(list)) return null;
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      tag: str(item.tag),
      title: str(item.title),
      description: str(item.description),
      image: str(item.image),
    }));
}

function sanitizeStatItems(list) {
  if (!Array.isArray(list)) return null;
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => {
      const parsed = parseStatCount(str(item.countDisplay ?? item.count));
      return {
        ...parsed,
        label: str(item.label),
        image: str(item.image),
      };
    });
}

function sanitizeBrandItems(list) {
  if (!Array.isArray(list)) return null;
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: str(item.name),
      image: str(item.image),
      url: str(item.url),
    }));
}

function sanitizeContactLocations(list) {
  if (!Array.isArray(list)) return null;
  return list
    .filter((item) => item && typeof item === "object")
    .map((item) => ({
      name: str(item.name),
      subtitle: str(item.subtitle),
      phone: str(item.phone),
      email: str(item.email),
      address: str(item.address),
    }));
}

function mergeHomePayload(current, incoming) {
  const { deepMerge } = require("./cmsJson");
  let next = deepMerge(defaultHomePayload(), current && typeof current === "object" ? current : {});
  if (incoming && typeof incoming === "object") {
    next = deepMerge(next, incoming);
  }

  const storySrc = incoming?.stories?.items ?? next.stories?.items;
  const stories = sanitizeStoryItems(storySrc);
  if (stories) {
    next.stories = next.stories || {};
    next.stories.items = stories;
  }

  const statSrc = incoming?.stats?.items ?? next.stats?.items;
  const stats = sanitizeStatItems(statSrc);
  if (stats) {
    next.stats = next.stats || {};
    next.stats.items = stats;
  }

  const brandSrc = incoming?.brandPartners?.brands ?? next.brandPartners?.brands;
  const brands = sanitizeBrandItems(brandSrc);
  if (brands) {
    next.brandPartners = next.brandPartners || {};
    next.brandPartners.brands = brands;
  }

  const locSrc = incoming?.contact?.locations ?? next.contact?.locations;
  const locations = sanitizeContactLocations(locSrc);
  if (locations) {
    next.contact = next.contact || {};
    next.contact.locations = locations;
  }

  return next;
}

module.exports = { defaultHomePayload, mergeHomePayload };
