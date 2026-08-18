const { deepMerge } = require("./cmsJson");

function str(v, fallback = "") {
  return v === undefined || v === null ? fallback : String(v);
}

function defaultLocations() {
  return [
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
  ];
}

function defaultPartnerPayload() {
  return {
    hero: {
      title: "Partner with Us",
      subtitle:
        "Every great partnership starts with a conversation. Reach out, and let’s explore how we can grow together.",
      image: "https://refexairports.com/wp-content/uploads/2023/11/Pune-Airport-Refex-Airports-1.jpg",
    },
    connect: {
      title: "Connect",
      highlight: "with us",
      subtitle:
        "Your feedback is valuable in helping us enhance your travel experience. Whether you have a question, suggestion, or simply want to share your thoughts, we're here to listen. Get in touch with our team, and let us know how we will be the best part of your journey.",
      image: "/images/partner-connect.jpg",
    },
    addresses: {
      title: "Our",
      highlight: "Addresses",
      intro: "Reach us at any of our airport offices. We would love to hear from you.",
      email: "info@refexairports.com",
      emailLabel: "Email",
      officeLabel: "Registered & Corporate Office",
      officeAddress:
        "Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.",
      locationsHeading: "Airport Office Address",
    },
    locations: defaultLocations(),
  };
}

function sanitizeLocations(list) {
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

function mergePartnerPayload(current, incoming) {
  let next = deepMerge(defaultPartnerPayload(), current && typeof current === "object" ? current : {});
  next = deepMerge(next, incoming && typeof incoming === "object" ? incoming : {});
  const src = incoming && typeof incoming === "object" ? incoming : {};
  const locations = sanitizeLocations(Array.isArray(src.locations) ? src.locations : next.locations);
  next.locations = locations && locations.length ? locations : defaultLocations();
  next.hero = next.hero || {};
  next.connect = next.connect || {};
  next.addresses = next.addresses || {};
  const addressDefaults = defaultPartnerPayload().addresses;
  next.addresses.email = str(next.addresses.email, addressDefaults.email);
  next.addresses.emailLabel = str(next.addresses.emailLabel, addressDefaults.emailLabel);
  next.addresses.officeLabel = str(next.addresses.officeLabel, addressDefaults.officeLabel);
  next.addresses.officeAddress = str(next.addresses.officeAddress, addressDefaults.officeAddress);
  next.addresses.locationsHeading = str(next.addresses.locationsHeading, addressDefaults.locationsHeading);
  return next;
}

module.exports = { defaultPartnerPayload, mergePartnerPayload };
