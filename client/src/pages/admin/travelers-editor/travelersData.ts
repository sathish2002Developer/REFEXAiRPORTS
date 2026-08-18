export interface TravelerBrand {
  name: string;
  description: string;
  category: string;
  location: string;
  logo: string;
}

export interface TravelerTerminal {
  name: string;
  count: number;
}

export interface TravelerFaq {
  question: string;
  answer: string;
}

export interface AirportTravelersData {
  id: string;
  name: string;
  slug: string;
  route: string;
  heroAirportName: string;
  heroTagline: string;
  heroBackground: string;
  terminalTitle: string;
  terminalSubtitle: string;
  faqLabel: string;
  faqTitle: string;
  terminals: TravelerTerminal[];
  faqs: TravelerFaq[];
  brands: TravelerBrand[];
  comingSoon: boolean;
}

export const travelersAirports: AirportTravelersData[] = [
  {
    id: 'pune',
    name: 'Pune Airport — For Travelers',
    slug: 'Pune',
    route: '/pune-airport',
    comingSoon: false,
    heroAirportName: 'Pune Airport',
    heroTagline: 'Your Gateway to Premium Shopping Experience',
    heroBackground: 'https://readdy.ai/api/search-image?query=Dramatic%20exterior%20of%20Pune%20International%20Airport%20modern%20terminal%20building%20at%20twilight%2C%20warm%20ambient%20glow%20from%20terminal%20windows%2C%20Maharashtra%20landscape%2C%20dramatic%20sky%20with%20purple%20and%20orange%20hues%2C%20wide%20cinematic%20composition%2C%20professional%20architectural%20photography&width=1920&height=1080&seq=pune-hero-full&orientation=landscape',
    terminalTitle: 'Terminal Locations',
    terminalSubtitle: 'Find stores across different terminal areas',
    faqLabel: 'F.A.Q.',
    faqTitle: 'Getting to Know More About Partnering',
    terminals: [
      { name: 'Check-in', count: 1 },
      { name: 'Security Check', count: 5 },
      { name: 'Arrival', count: 1 },
      { name: 'Gate 2 & 3', count: 11 },
      { name: 'Gate 4 & 5', count: 6 },
      { name: 'Gate 5A & 5B', count: 1 },
      { name: 'Gate 6 & 7', count: 3 },
    ],
    faqs: [
      { question: 'How can I connect with Refex Airports for space?', answer: 'Please click here to Contact us or fill up enquiry form.' },
      { question: 'Can I have a site visit?', answer: 'Yes, connect with the team to align for a schedule.' },
      { question: 'Where will you offer the space, after security check or before?', answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.' },
      { question: 'What is the rent I need to pay to Refex?', answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.' },
      { question: 'When will the new terminal go live?', answer: 'The New terminal will go live end of January 2024.' },
      { question: 'What is the business model?', answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.' },
      { question: 'How will the Terminal look like?', answer: 'The terminal will have smart, compact, efficient, integrated layout for passengers\' journey and retail experience.' },
    ],
    brands: [
      {
        name: 'Accessorize London',
        logo: 'https://readdy.ai/api/search-image?query=Accessorize%20London%20brand%20logo%20on%20white%20background%2C%20clean%20minimalist%20fashion%20accessories%20brand%20identity%2C%20professional%20product%20photography&width=120&height=120&seq=acc-logo-1&orientation=squarish',
        description: 'A British fashion brand for trendy bags, jewellery, hair, and kids\' accessories to complete every ensemble with panache.',
        location: 'Gate 4 & 5',
        category: 'Fashion & Accessories',
      },
      {
        name: 'Bastar Arts',
        logo: 'https://readdy.ai/api/search-image?query=Bastar%20Arts%20traditional%20Indian%20handicraft%20brand%20logo%2C%20tribal%20art%20motifs%2C%20cultural%20heritage%20design%20on%20white%20background&width=120&height=120&seq=bastar-logo-2&orientation=squarish',
        description: 'An India-based manufacturer, supplier, and exporter of handcrafted Bell Metal and Wrought Iron products.',
        location: 'Gate 2 & 3',
        category: 'Handicrafts',
      },
      {
        name: 'Bata',
        logo: 'https://readdy.ai/api/search-image?query=Bata%20footwear%20brand%20logo%20on%20white%20background%2C%20iconic%20shoe%20company%20branding%2C%20clean%20professional%20design&width=120&height=120&seq=bata-logo-3&orientation=squarish',
        description: 'A global footwear brand offering stylish and comfortable shoes for men, women, and children.',
        location: 'Gate 6 & 7',
        category: 'Footwear',
      },
      {
        name: 'Cafe Coffee Day',
        logo: 'https://readdy.ai/api/search-image?query=Cafe%20Coffee%20Day%20CCD%20brand%20logo%20on%20white%20background%2C%20Indian%20coffee%20chain%20branding%2C%20modern%20cafe%20identity&width=120&height=120&seq=ccd-logo-4&orientation=squarish',
        description: 'India\'s favorite coffee chain serving freshly brewed coffee, snacks, and beverages in a relaxed ambiance.',
        location: 'Security Check',
        category: 'Food & Beverage',
      },
      {
        name: 'Crossword',
        logo: 'https://readdy.ai/api/search-image?query=Crossword%20bookstore%20brand%20logo%20on%20white%20background%2C%20book%20retail%20chain%20branding%2C%20literary%20design%20identity&width=120&height=120&seq=cross-logo-5&orientation=squarish',
        description: 'A premium bookstore chain offering a wide range of books, magazines, and stationery products.',
        location: 'Gate 2 & 3',
        category: 'Books & Stationery',
      },
      {
        name: 'Forest Essentials',
        logo: 'https://readdy.ai/api/search-image?query=Forest%20Essentials%20luxury%20ayurvedic%20brand%20logo%20on%20white%20background%2C%20natural%20beauty%20products%20branding%2C%20elegant%20botanical%20design&width=120&height=120&seq=forest-logo-6&orientation=squarish',
        description: 'Luxury Ayurvedic beauty and wellness brand offering natural skincare and haircare products.',
        location: 'Gate 4 & 5',
        category: 'Beauty & Wellness',
      },
      {
        name: 'Hidesign',
        logo: 'https://readdy.ai/api/search-image?query=Hidesign%20leather%20goods%20brand%20logo%20on%20white%20background%2C%20premium%20leather%20accessories%20branding%2C%20sophisticated%20design&width=120&height=120&seq=hide-logo-7&orientation=squarish',
        description: 'Premium leather goods brand known for handcrafted bags, wallets, and accessories.',
        location: 'Gate 2 & 3',
        category: 'Fashion & Accessories',
      },
      {
        name: 'Levi\'s',
        logo: 'https://readdy.ai/api/search-image?query=Levis%20denim%20brand%20logo%20on%20white%20background%2C%20iconic%20jeans%20company%20branding%2C%20classic%20American%20fashion%20identity&width=120&height=120&seq=levis-logo-8&orientation=squarish',
        description: 'Iconic American denim brand offering jeans, jackets, and casual wear for all ages.',
        location: 'Gate 4 & 5',
        category: 'Fashion & Accessories',
      },
      {
        name: 'McDonald\'s',
        logo: 'https://readdy.ai/api/search-image?query=McDonalds%20golden%20arches%20brand%20logo%20on%20white%20background%2C%20fast%20food%20chain%20branding%2C%20iconic%20restaurant%20identity&width=120&height=120&seq=mcd-logo-9&orientation=squarish',
        description: 'World\'s leading fast-food chain serving burgers, fries, and beverages loved by millions.',
        location: 'Security Check',
        category: 'Food & Beverage',
      },
      {
        name: 'Naturals',
        logo: 'https://readdy.ai/api/search-image?query=Naturals%20ice%20cream%20brand%20logo%20on%20white%20background%2C%20Indian%20dessert%20chain%20branding%2C%20fresh%20natural%20ingredients%20design&width=120&height=120&seq=nat-logo-10&orientation=squarish',
        description: 'Popular ice cream chain offering natural and fresh fruit-based ice creams and desserts.',
        location: 'Gate 6 & 7',
        category: 'Food & Beverage',
      },
      {
        name: 'Relay',
        logo: 'https://readdy.ai/api/search-image?query=Relay%20travel%20retail%20brand%20logo%20on%20white%20background%2C%20airport%20convenience%20store%20branding%2C%20modern%20retail%20identity&width=120&height=120&seq=relay-logo-11&orientation=squarish',
        description: 'Travel retail store offering books, magazines, snacks, and travel essentials for passengers.',
        location: 'Check-in',
        category: 'Books & Stationery',
      },
      {
        name: 'Tanishq',
        logo: 'https://readdy.ai/api/search-image?query=Tanishq%20jewelry%20brand%20logo%20on%20white%20background%2C%20Indian%20gold%20jewellery%20branding%2C%20elegant%20luxury%20design&width=120&height=120&seq=tan-logo-12&orientation=squarish',
        description: 'India\'s most trusted jewelry brand offering exquisite gold, diamond, and gemstone jewelry.',
        location: 'Gate 2 & 3',
        category: 'Jewelry',
      },
      {
        name: 'The Body Shop',
        logo: 'https://readdy.ai/api/search-image?query=The%20Body%20Shop%20brand%20logo%20on%20white%20background%2C%20natural%20beauty%20products%20branding%2C%20ethical%20cosmetics%20identity&width=120&height=120&seq=body-logo-13&orientation=squarish',
        description: 'Global beauty brand offering natural and ethically sourced skincare and cosmetic products.',
        location: 'Gate 5A & 5B',
        category: 'Beauty & Wellness',
      },
      {
        name: 'W',
        logo: 'https://readdy.ai/api/search-image?query=W%20fashion%20brand%20logo%20on%20white%20background%2C%20contemporary%20clothing%20retail%20branding%2C%20modern%20style%20identity&width=120&height=120&seq=w-logo-14&orientation=squarish',
        description: 'Contemporary fashion brand offering trendy clothing and accessories for women.',
        location: 'Gate 4 & 5',
        category: 'Fashion & Accessories',
      },
      {
        name: 'Westside',
        logo: 'https://readdy.ai/api/search-image?query=Westside%20retail%20brand%20logo%20on%20white%20background%2C%20Indian%20fashion%20chain%20branding%2C%20lifestyle%20store%20identity&width=120&height=120&seq=west-logo-15&orientation=squarish',
        description: 'Leading fashion and lifestyle retail chain offering clothing, accessories, and home products.',
        location: 'Arrival',
        category: 'Fashion & Accessories',
      },
    ],
  },
  {
    id: 'srinagar',
    name: 'Srinagar Airport — For Travelers',
    slug: 'Srinagar',
    route: '/srinagar-airport',
    comingSoon: false,
    heroAirportName: 'Srinagar Airport',
    heroTagline: 'Gateway to Kashmir - Discover Authentic Kashmiri Heritage',
    heroBackground: 'https://readdy.ai/api/search-image?query=Dramatic%20exterior%20of%20Srinagar%20International%20Airport%20terminal%20with%20snow-capped%20Himalayan%20mountains%20in%20distance%2C%20golden%20hour%20warm%20lighting%2C%20modern%20glass%20architecture%2C%20wide%20cinematic%20composition%2C%20professional%20travel%20photography%2C%208K%20ultra%20detailed&width=1920&height=1080&seq=srinagar-hero-full&orientation=landscape',
    terminalTitle: 'Terminal Locations',
    terminalSubtitle: 'Find stores across different terminal areas',
    faqLabel: 'F.A.Q.',
    faqTitle: 'Getting to Know More About Partnering',
    terminals: [
      { name: 'Security Check', count: 3 },
      { name: 'Departure Hall', count: 4 },
      { name: 'Arrival', count: 2 },
      { name: 'Gate 1 & 2', count: 4 },
      { name: 'Gate 3 & 4', count: 2 },
    ],
    faqs: [
      { question: 'How can I connect with Refex Airports for space?', answer: 'Please click here to Contact us or fill up enquiry form.' },
      { question: 'Can I have a site visit?', answer: 'Yes, connect with the team to align for a schedule.' },
      { question: 'Where will you offer the space, after security check or before?', answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.' },
      { question: 'What is the rent I need to pay to Refex?', answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.' },
      { question: 'When will the new terminal go live?', answer: 'The New terminal will go live end of January 2024.' },
      { question: 'What is the business model?', answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.' },
      { question: 'How will the Terminal look like?', answer: 'The terminal will have smart, compact, efficient, integrated layout for passengers\' journey and retail experience.' },
    ],
    brands: [
      {
        name: 'Kashmir Crafts',
        description: 'Authentic Kashmiri handicrafts including Pashmina shawls, hand-woven carpets, and traditional papier-mâché items showcasing the rich heritage of Kashmir.',
        location: 'Gate 1 & 2',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Kashmir%20Crafts%20brand%20logo%20elegant%20traditional%20Kashmiri%20handicrafts%20emblem%20with%20intricate%20patterns%20simple%20clean%20design%20on%20white%20background&width=200&height=200&seq=kashmir-crafts-logo&orientation=squarish',
      },
      {
        name: 'Saffron House',
        description: 'Premium Kashmiri saffron and traditional spices, offering the finest quality products sourced directly from local farmers.',
        location: 'Security Check',
        category: 'Food & Beverages',
        logo: 'https://readdy.ai/api/search-image?query=Saffron%20House%20brand%20logo%20premium%20saffron%20spice%20company%20emblem%20with%20golden%20saffron%20threads%20elegant%20design%20on%20white%20background&width=200&height=200&seq=saffron-house-logo&orientation=squarish',
      },
      {
        name: 'Walnut Wood Gallery',
        description: 'Exquisite hand-carved walnut wood furniture and decorative items, representing centuries-old Kashmiri woodworking traditions.',
        location: 'Gate 1 & 2',
        category: 'Arts & Lifestyle',
        logo: 'https://readdy.ai/api/search-image?query=Walnut%20Wood%20Gallery%20brand%20logo%20artisan%20woodworking%20emblem%20with%20carved%20walnut%20wood%20texture%20elegant%20craftsmanship%20design%20on%20white%20background&width=200&height=200&seq=walnut-wood-logo&orientation=squarish',
      },
      {
        name: 'Pashmina Palace',
        description: 'Authentic Kashmiri Pashmina shawls, stoles, and scarves made from the finest quality wool, handwoven by skilled artisans.',
        location: 'Departure Hall',
        category: 'Fashion & Accessories',
        logo: 'https://readdy.ai/api/search-image?query=Pashmina%20Palace%20brand%20logo%20luxury%20pashmina%20shawl%20company%20emblem%20with%20elegant%20fabric%20texture%20sophisticated%20design%20on%20white%20background&width=200&height=200&seq=pashmina-palace-logo&orientation=squarish',
      },
      {
        name: 'Kahwa Corner',
        description: 'Traditional Kashmiri Kahwa tea and herbal blends, offering a taste of authentic Kashmiri hospitality.',
        location: 'Gate 3 & 4',
        category: 'Food & Beverages',
        logo: 'https://readdy.ai/api/search-image?query=Kahwa%20Corner%20brand%20logo%20traditional%20Kashmiri%20tea%20company%20emblem%20with%20tea%20cup%20and%20spices%20warm%20inviting%20design%20on%20white%20background&width=200&height=200&seq=kahwa-corner-logo&orientation=squarish',
      },
      {
        name: 'Heritage Carpets',
        description: 'Hand-knotted Kashmiri carpets and rugs featuring intricate designs and patterns, crafted by master weavers.',
        location: 'Arrival',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Heritage%20Carpets%20brand%20logo%20traditional%20carpet%20weaving%20company%20emblem%20with%20intricate%20Persian%20patterns%20elegant%20design%20on%20white%20background&width=200&height=200&seq=heritage-carpets-logo&orientation=squarish',
      },
      {
        name: 'Crossword',
        description: 'One of India\'s leading bookstore chains, offering a curated selection of books, stationery, toys, and gifts.',
        location: 'Security Check',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Crossword%20bookstore%20brand%20logo%20modern%20book%20retail%20company%20emblem%20with%20stylized%20book%20design%20contemporary%20clean%20look%20on%20white%20background&width=200&height=200&seq=crossword-logo&orientation=squarish',
      },
      {
        name: 'Beaute Luxe',
        description: 'Premium beauty and cosmetics featuring leading international brands in fragrances, skincare, and luxury accessories.',
        location: 'Departure Hall',
        category: 'Beauty & Cosmetics',
        logo: 'https://readdy.ai/api/search-image?query=Beaute%20Luxe%20brand%20logo%20luxury%20beauty%20cosmetics%20company%20emblem%20with%20elegant%20perfume%20bottle%20silhouette%20sophisticated%20design%20on%20white%20background&width=200&height=200&seq=beaute-luxe-logo&orientation=squarish',
      },
      {
        name: 'Embroidery Emporium',
        description: 'Traditional Kashmiri embroidered garments, shawls, and home textiles featuring Sozni and Aari work.',
        location: 'Gate 1 & 2',
        category: 'Fashion & Lifestyle',
        logo: 'https://readdy.ai/api/search-image?query=Embroidery%20Emporium%20brand%20logo%20traditional%20embroidery%20company%20emblem%20with%20needle%20and%20thread%20intricate%20stitch%20patterns%20elegant%20design%20on%20white%20background&width=200&height=200&seq=embroidery-emporium-logo&orientation=squarish',
      },
      {
        name: 'Dry Fruit Bazaar',
        description: 'Premium quality Kashmiri dry fruits including almonds, walnuts, and dried apricots sourced from local orchards.',
        location: 'Gate 3 & 4',
        category: 'Food & Beverages',
        logo: 'https://readdy.ai/api/search-image?query=Dry%20Fruit%20Bazaar%20brand%20logo%20premium%20nuts%20and%20dried%20fruits%20company%20emblem%20with%20almonds%20walnuts%20natural%20organic%20design%20on%20white%20background&width=200&height=200&seq=dry-fruit-bazaar-logo&orientation=squarish',
      },
      {
        name: 'Papier-Mâché Art',
        description: 'Colorful hand-painted papier-mâché boxes, vases, and decorative items showcasing traditional Kashmiri artistry.',
        location: 'Security Check',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Papier-M%C3%A2ch%C3%A9%20Art%20brand%20logo%20traditional%20Kashmiri%20art%20company%20emblem%20with%20colorful%20painted%20patterns%20artistic%20design%20on%20white%20background&width=200&height=200&seq=papier-mache-logo&orientation=squarish',
      },
      {
        name: 'Lavie Sport',
        description: 'Trendy and functional travel gear including backpacks, duffel bags, and luggage for modern travelers.',
        location: 'Departure Hall',
        category: 'Travel & Luggage',
        logo: 'https://readdy.ai/api/search-image?query=Lavie%20Sport%20brand%20logo%20modern%20travel%20luggage%20company%20emblem%20with%20backpack%20silhouette%20sporty%20contemporary%20design%20on%20white%20background&width=200&height=200&seq=lavie-sport-logo&orientation=squarish',
      },
      {
        name: 'Kashmir Jewelry',
        description: 'Traditional Kashmiri silver jewelry and ornaments featuring intricate filigree work and precious stones.',
        location: 'Gate 1 & 2',
        category: 'Jewelry',
        logo: 'https://readdy.ai/api/search-image?query=Kashmir%20Jewelry%20brand%20logo%20traditional%20silver%20jewelry%20company%20emblem%20with%20filigree%20patterns%20precious%20stones%20elegant%20design%20on%20white%20background&width=200&height=200&seq=kashmir-jewelry-logo&orientation=squarish',
      },
      {
        name: 'Shawl Weaving Studio',
        description: 'Handwoven Kashmiri shawls in various designs and patterns, demonstrating the traditional weaving techniques.',
        location: 'Arrival',
        category: 'Fashion & Accessories',
        logo: 'https://readdy.ai/api/search-image?query=Shawl%20Weaving%20Studio%20brand%20logo%20artisan%20weaving%20company%20emblem%20with%20loom%20and%20fabric%20texture%20traditional%20craftsmanship%20design%20on%20white%20background&width=200&height=200&seq=shawl-weaving-logo&orientation=squarish',
      },
      {
        name: 'Forest Essentials',
        description: 'Authentic Ayurvedic skincare and beauty products rooted in ancient Indian wellness traditions.',
        location: 'Departure Hall',
        category: 'Beauty & Personal Care',
        logo: 'https://readdy.ai/api/search-image?query=Forest%20Essentials%20brand%20logo%20ayurvedic%20beauty%20company%20emblem%20with%20natural%20herbs%20and%20botanical%20elements%20organic%20wellness%20design%20on%20white%20background&width=200&height=200&seq=forest-essentials-logo&orientation=squarish',
      },
    ],
  },
  {
    id: 'trichy',
    name: 'Trichy Airport — For Travelers',
    slug: 'Trichy',
    route: '/trichy-airport',
    comingSoon: true,
    heroAirportName: 'Trichy Airport',
    heroTagline: 'Gateway to Tamil Nadu\'s Cultural Heartland',
    heroBackground: 'https://readdy.ai/api/search-image?query=Dramatic%20exterior%20of%20Tiruchirappalli%20International%20Airport%20terminal%20at%20sunset%2C%20Tamil%20Nadu%20cultural%20elements%2C%20palm%20trees%20framing%20the%20modern%20building%2C%20golden%20hour%20warm%20lighting%2C%20wide%20cinematic%20composition%2C%20professional%20architectural%20photography&width=1920&height=1080&seq=trichy-hero-full&orientation=landscape',
    terminalTitle: 'Terminal Locations',
    terminalSubtitle: 'Find stores across different terminal areas',
    faqLabel: 'F.A.Q.',
    faqTitle: 'Getting to Know More About Partnering',
    terminals: [
      { name: 'Check-in', count: 1 },
      { name: 'Security Check', count: 1 },
      { name: 'Departure Hall', count: 2 },
      { name: 'Gate 1 & 2', count: 2 },
      { name: 'Gate 3 & 4', count: 1 },
    ],
    faqs: [
      { question: 'How can I connect with Refex Airports for space?', answer: 'Please click here to Contact us or fill up enquiry form.' },
      { question: 'Can I have a site visit?', answer: 'Yes, connect with the team to align for a schedule.' },
      { question: 'Where will you offer the space, after security check or before?', answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.' },
      { question: 'What is the rent I need to pay to Refex?', answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.' },
      { question: 'What is the business model?', answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.' },
    ],
    brands: [
      {
        name: 'Cafe Coffee Day',
        description: 'India\'s favorite coffee chain serving freshly brewed coffee, snacks, and beverages in a relaxed ambiance.',
        location: 'Security Check',
        category: 'Food & Beverage',
        logo: 'https://readdy.ai/api/search-image?query=Cafe%20Coffee%20Day%20CCD%20brand%20logo%20on%20white%20background%2C%20Indian%20coffee%20chain%20branding%2C%20modern%20cafe%20identity&width=200&height=200&seq=ccd-trichy-logo&orientation=squarish',
      },
      {
        name: 'Crossword',
        description: 'A premium bookstore chain offering a wide range of books, magazines, and stationery products.',
        location: 'Departure Hall',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Crossword%20bookstore%20brand%20logo%20on%20white%20background%2C%20book%20retail%20chain%20branding%2C%20literary%20design%20identity&width=200&height=200&seq=cross-trichy-logo&orientation=squarish',
      },
      {
        name: 'Tamil Nadu Handicrafts',
        description: 'Traditional Tamil handicrafts including Tanjore paintings, bronze sculptures, and handloom textiles.',
        location: 'Gate 1 & 2',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Tamil%20Nadu%20handicrafts%20brand%20logo%20with%20traditional%20Indian%20art%20motifs%2C%20cultural%20heritage%20craft%20identity%20on%20white%20background&width=200&height=200&seq=tn-crafts-logo&orientation=squarish',
      },
      {
        name: 'Forest Essentials',
        description: 'Luxury Ayurvedic beauty and wellness brand offering natural skincare and haircare products.',
        location: 'Departure Hall',
        category: 'Beauty & Wellness',
        logo: 'https://readdy.ai/api/search-image?query=Forest%20Essentials%20luxury%20ayurvedic%20brand%20logo%20on%20white%20background%2C%20natural%20beauty%20products%20branding%2C%20elegant%20botanical%20design&width=200&height=200&seq=forest-trichy-logo&orientation=squarish',
      },
      {
        name: 'South Spice',
        description: 'Premium South Indian spices, coffee, and tea sourced from the finest plantations of Tamil Nadu.',
        location: 'Gate 1 & 2',
        category: 'Food & Beverage',
        logo: 'https://readdy.ai/api/search-image?query=South%20Spice%20premium%20Indian%20spices%20brand%20logo%20with%20traditional%20spice%20motifs%2C%20elegant%20food%20branding%20on%20white%20background&width=200&height=200&seq=south-spice-logo&orientation=squarish',
      },
      {
        name: 'Relay',
        description: 'Travel retail store offering books, magazines, snacks, and travel essentials for passengers.',
        location: 'Check-in',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Relay%20travel%20retail%20brand%20logo%20on%20white%20background%2C%20airport%20convenience%20store%20branding%2C%20modern%20retail%20identity&width=200&height=200&seq=relay-trichy-logo&orientation=squarish',
      },
      {
        name: 'Silk Route',
        description: 'Authentic Kanchipuram silk sarees and traditional Tamil handloom textiles.',
        location: 'Gate 3 & 4',
        category: 'Fashion & Accessories',
        logo: 'https://readdy.ai/api/search-image?query=Silk%20Route%20traditional%20Indian%20silk%20brand%20logo%20with%20elegant%20saree%20motifs%2C%20luxury%20textile%20branding%20on%20white%20background&width=200&height=200&seq=silk-route-logo&orientation=squarish',
      },
    ],
  },
  {
    id: 'aurangabad',
    name: 'Aurangabad Airport — For Travelers',
    slug: 'Aurangabad',
    route: '/aurangabad-airport',
    comingSoon: true,
    heroAirportName: 'Aurangabad Airport',
    heroTagline: 'Gateway to Ajanta &amp; Ellora - Maharashtra\'s Heritage City',
    heroBackground: 'https://readdy.ai/api/search-image?query=Dramatic%20exterior%20of%20Aurangabad%20Airport%20terminal%2C%20Deccan%20plateau%20backdrop%2C%20dramatic%20sunset%20sky%20with%20orange%20and%20pink%20hues%2C%20modern%20Indian%20airport%20architecture%2C%20warm%20amber%20lighting%2C%20wide%20cinematic%20composition%2C%20professional%20architectural%20photography&width=1920&height=1080&seq=aurangabad-hero-full&orientation=landscape',
    terminalTitle: 'Terminal Locations',
    terminalSubtitle: 'Find stores across different terminal areas',
    faqLabel: 'F.A.Q.',
    faqTitle: 'Getting to Know More About Partnering',
    terminals: [
      { name: 'Check-in', count: 1 },
      { name: 'Security Check', count: 1 },
      { name: 'Departure Hall', count: 2 },
      { name: 'Gate 1 & 2', count: 2 },
    ],
    faqs: [
      { question: 'How can I connect with Refex Airports for space?', answer: 'Please click here to Contact us or fill up enquiry form.' },
      { question: 'Can I have a site visit?', answer: 'Yes, connect with the team to align for a schedule.' },
      { question: 'Where will you offer the space, after security check or before?', answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.' },
      { question: 'What is the rent I need to pay to Refex?', answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.' },
      { question: 'What is the business model?', answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.' },
    ],
    brands: [
      {
        name: 'Cafe Coffee Day',
        description: 'India\'s favorite coffee chain serving freshly brewed coffee, snacks, and beverages in a relaxed ambiance.',
        location: 'Security Check',
        category: 'Food & Beverage',
        logo: 'https://readdy.ai/api/search-image?query=Cafe%20Coffee%20Day%20CCD%20brand%20logo%20on%20white%20background%2C%20Indian%20coffee%20chain%20branding%2C%20modern%20cafe%20identity&width=200&height=200&seq=ccd-aurangabad-logo&orientation=squarish',
      },
      {
        name: 'Himroo Weaves',
        description: 'Traditional Aurangabad Himroo shawls and fabrics, showcasing the rich weaving heritage of Maharashtra.',
        location: 'Gate 1 & 2',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Himroo%20Weaves%20traditional%20Indian%20textile%20brand%20logo%20with%20intricate%20woven%20patterns%2C%20heritage%20craft%20identity%20on%20white%20background&width=200&height=200&seq=himroo-logo&orientation=squarish',
      },
      {
        name: 'Crossword',
        description: 'A premium bookstore chain offering a wide range of books, magazines, and stationery products.',
        location: 'Departure Hall',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Crossword%20bookstore%20brand%20logo%20on%20white%20background%2C%20book%20retail%20chain%20branding%2C%20literary%20design%20identity&width=200&height=200&seq=cross-aurangabad-logo&orientation=squarish',
      },
      {
        name: 'Ajanta Artifacts',
        description: 'Replicas and souvenirs inspired by the world-famous Ajanta and Ellora caves, celebrating Maharashtra\'s artistic heritage.',
        location: 'Gate 1 & 2',
        category: 'Arts & Crafts',
        logo: 'https://readdy.ai/api/search-image?query=Ajanta%20Artifacts%20heritage%20crafts%20brand%20logo%20with%20ancient%20cave%20art%20motifs%2C%20cultural%20souvenir%20identity%20on%20white%20background&width=200&height=200&seq=ajanta-logo&orientation=squarish',
      },
      {
        name: 'Forest Essentials',
        description: 'Luxury Ayurvedic beauty and wellness brand offering natural skincare and haircare products.',
        location: 'Departure Hall',
        category: 'Beauty & Wellness',
        logo: 'https://readdy.ai/api/search-image?query=Forest%20Essentials%20luxury%20ayurvedic%20brand%20logo%20on%20white%20background%2C%20natural%20beauty%20products%20branding%2C%20elegant%20botanical%20design&width=200&height=200&seq=forest-aurangabad-logo&orientation=squarish',
      },
      {
        name: 'Relay',
        description: 'Travel retail store offering books, magazines, snacks, and travel essentials for passengers.',
        location: 'Check-in',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Relay%20travel%20retail%20brand%20logo%20on%20white%20background%2C%20airport%20convenience%20store%20branding%2C%20modern%20retail%20identity&width=200&height=200&seq=relay-aurangabad-logo&orientation=squarish',
      },
    ],
  },
  {
    id: 'shirdi',
    name: 'Shirdi Airport — For Travelers',
    slug: 'Shirdi',
    route: '/shirdi-airport',
    comingSoon: true,
    heroAirportName: 'Shirdi Airport',
    heroTagline: 'Gateway to the Sacred Land of Sai Baba',
    heroBackground: 'https://readdy.ai/api/search-image?query=Dramatic%20exterior%20of%20Shirdi%20International%20Airport%20terminal%20at%20dawn%2C%20peaceful%20spiritual%20atmosphere%2C%20soft%20morning%20light%2C%20modern%20architecture%20blending%20with%20traditional%20Indian%20elements%2C%20serene%20wide%20composition%2C%20gentle%20warm%20tones%2C%20professional%20architectural%20photography&width=1920&height=1080&seq=shirdi-hero-full&orientation=landscape',
    terminalTitle: 'Terminal Locations',
    terminalSubtitle: 'Find stores across different terminal areas',
    faqLabel: 'F.A.Q.',
    faqTitle: 'Getting to Know More About Partnering',
    terminals: [
      { name: 'Check-in', count: 1 },
      { name: 'Security Check', count: 1 },
      { name: 'Departure Hall', count: 2 },
      { name: 'Gate 1 & 2', count: 2 },
    ],
    faqs: [
      { question: 'How can I connect with Refex Airports for space?', answer: 'Please click here to Contact us or fill up enquiry form.' },
      { question: 'Can I have a site visit?', answer: 'Yes, connect with the team to align for a schedule.' },
      { question: 'Where will you offer the space, after security check or before?', answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.' },
      { question: 'What is the rent I need to pay to Refex?', answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.' },
      { question: 'What is the business model?', answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.' },
    ],
    brands: [
      {
        name: 'Cafe Coffee Day',
        description: 'India\'s favorite coffee chain serving freshly brewed coffee, snacks, and beverages in a relaxed ambiance.',
        location: 'Security Check',
        category: 'Food & Beverage',
        logo: 'https://readdy.ai/api/search-image?query=Cafe%20Coffee%20Day%20CCD%20brand%20logo%20on%20white%20background%2C%20Indian%20coffee%20chain%20branding%2C%20modern%20cafe%20identity&width=200&height=200&seq=ccd-shirdi-logo&orientation=squarish',
      },
      {
        name: 'Sai Spiritual Store',
        description: 'Spiritual souvenirs, books, and devotional items inspired by the teachings of Sai Baba of Shirdi.',
        location: 'Gate 1 & 2',
        category: 'Spiritual & Wellness',
        logo: 'https://readdy.ai/api/search-image?query=Sai%20Spiritual%20Store%20devotional%20brand%20logo%20with%20sacred%20Indian%20spiritual%20motifs%2C%20serene%20and%20peaceful%20design%20on%20white%20background&width=200&height=200&seq=sai-store-logo&orientation=squarish',
      },
      {
        name: 'Crossword',
        description: 'A premium bookstore chain offering a wide range of books, magazines, and stationery products.',
        location: 'Departure Hall',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Crossword%20bookstore%20brand%20logo%20on%20white%20background%2C%20book%20retail%20chain%20branding%2C%20literary%20design%20identity&width=200&height=200&seq=cross-shirdi-logo&orientation=squarish',
      },
      {
        name: 'Forest Essentials',
        description: 'Luxury Ayurvedic beauty and wellness brand offering natural skincare and haircare products.',
        location: 'Departure Hall',
        category: 'Beauty & Wellness',
        logo: 'https://readdy.ai/api/search-image?query=Forest%20Essentials%20luxury%20ayurvedic%20brand%20logo%20on%20white%20background%2C%20natural%20beauty%20products%20branding%2C%20elegant%20botanical%20design&width=200&height=200&seq=forest-shirdi-logo&orientation=squarish',
      },
      {
        name: 'Maharashtrian Delights',
        description: 'Traditional Maharashtrian snacks, sweets, and local delicacies including Shrewsbury biscuits and chivda.',
        location: 'Gate 1 & 2',
        category: 'Food & Beverage',
        logo: 'https://readdy.ai/api/search-image?query=Maharashtrian%20Delights%20traditional%20Indian%20food%20brand%20logo%20with%20regional%20cuisine%20motifs%2C%20authentic%20culinary%20branding%20on%20white%20background&width=200&height=200&seq=maha-delights-logo&orientation=squarish',
      },
      {
        name: 'Relay',
        description: 'Travel retail store offering books, magazines, snacks, and travel essentials for passengers.',
        location: 'Check-in',
        category: 'Books & Stationery',
        logo: 'https://readdy.ai/api/search-image?query=Relay%20travel%20retail%20brand%20logo%20on%20white%20background%2C%20airport%20convenience%20store%20branding%2C%20modern%20retail%20identity&width=200&height=200&seq=relay-shirdi-logo&orientation=squarish',
      },
    ],
  },
];