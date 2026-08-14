export interface NewsTab {
  id: string;
  label: string;
  icon: string;
}

export interface NewsItem {
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
}

export interface StoryItem {
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface HighlightItem {
  title: string;
  description: string;
  image: string;
  date: string;
  icon: string;
}

export interface NewsPageData {
  id: string;
  pageTitle: string;
  pageSubtitle: string;
  tabs: NewsTab[];
  newsItems: NewsItem[];
  stories: StoryItem[];
  highlights: HighlightItem[];
}

export const newsPageData: NewsPageData = {
  id: 'news',
  pageTitle: 'News & Updates',
  pageSubtitle:
    'Stay informed about our latest developments, stories, and achievements across our airport operations',
  tabs: [
    { id: 'news', label: 'News', icon: 'ri-newspaper-line' },
    { id: 'stories', label: 'Stories', icon: 'ri-book-open-line' },
    { id: 'highlights', label: 'Highlights', icon: 'ri-star-line' },
  ],
  newsItems: [
    {
      title: 'Completion of 1 Year at Pune Airport',
      date: 'December 2024',
      description:
        'Refex Airports & Transportation proudly completes one year of operations at Pune Airport. Over the past year, we have worked closely with our brand partners and airport stakeholders to enhance the passenger retail experience from curating an exciting mix of stores to improving on-ground engagement and service standards.',
      image:
        'https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20interior%20celebrating%20one%20year%20anniversary%20with%20retail%20stores%2C%20passengers%20walking%20through%20bright%20spacious%20corridors%2C%20contemporary%20architecture%20with%20glass%20and%20steel%20elements%2C%20professional%20commercial%20photography%20style%2C%20celebration%20banners%20and%20decorations&width=800&height=500&seq=pune-1year-news&orientation=landscape',
      link: '',
    },
    {
      title: "What's New on Your Next Journey? - Store Openings at Pune & Srinagar",
      date: 'November 2024',
      description:
        'Refex Airports continues to expand its retail footprint with the addition of new stores across Pune and Srinagar airports. The new outlets bring a mix of popular brands and local favourites, offering travellers more variety and convenience on the go. Each opening marks another step towards creating vibrant, engaging spaces that enhance the overall passenger experience.',
      image:
        'https://readdy.ai/api/search-image?query=New%20retail%20store%20grand%20opening%20in%20modern%20airport%20terminal%2C%20ribbon%20cutting%20ceremony%2C%20contemporary%20store%20front%20design%20with%20brand%20displays%2C%20airport%20retail%20expansion%2C%20professional%20business%20photography%20with%20excited%20customers%20and%20staff&width=800&height=500&seq=store-opening-news&orientation=landscape',
      link: '/travelers',
    },
  ],
  stories: [
    {
      title: 'Tramboo Bats - A Legacy of Kashmir Cricket',
      subtitle: 'Local Brand Spotlight',
      description:
        'Discover the story of Tramboo Bats, a renowned local brand from Kashmir that has been crafting premium cricket bats for generations. Now available at Srinagar Airport, travelers can take home a piece of Kashmiri craftsmanship and sporting heritage.',
      image:
        'https://readdy.ai/api/search-image?query=Traditional%20Kashmir%20cricket%20bat%20craftsmanship%2C%20artisan%20making%20wooden%20cricket%20bats%20in%20workshop%2C%20premium%20handcrafted%20sports%20equipment%2C%20cultural%20heritage%20product%20display%20in%20modern%20airport%20retail%20store%2C%20professional%20product%20photography&width=700&height=450&seq=tramboo-bats&orientation=landscape',
    },
    {
      title: 'Celebrating Local Flavors at Our Terminals',
      subtitle: 'Regional Brands Partnership',
      description:
        'We take pride in partnering with local brands that represent the unique culture and craftsmanship of each region. From traditional handicrafts to regional delicacies, our stores offer travelers an authentic taste of local excellence.',
      image:
        'https://readdy.ai/api/search-image?query=Airport%20retail%20store%20showcasing%20local%20regional%20products%2C%20traditional%20handicrafts%20and%20regional%20specialties%20on%20display%2C%20travelers%20shopping%20for%20local%20souvenirs%2C%20modern%20airport%20terminal%20with%20cultural%20product%20displays%2C%20warm%20inviting%20retail%20environment&width=700&height=450&seq=local-brands&orientation=landscape',
    },
    {
      title: 'From Local to Global - Empowering Regional Entrepreneurs',
      subtitle: 'Partnership Success',
      description:
        'Our commitment to supporting local businesses has created opportunities for regional entrepreneurs to showcase their products to a global audience. These partnerships not only enhance the traveler experience but also contribute to local economic growth.',
      image:
        'https://readdy.ai/api/search-image?query=Successful%20local%20business%20owner%20in%20modern%20airport%20retail%20store%2C%20entrepreneur%20showcasing%20regional%20products%20to%20international%20travelers%2C%20professional%20business%20partnership%20photography%2C%20contemporary%20airport%20retail%20environment%20with%20local%20products&width=700&height=450&seq=local-entrepreneurs&orientation=landscape',
    },
  ],
  highlights: [
    {
      title: 'Turning Airport Walks into Shopping Journeys',
      description:
        "Refex Airports introduced the 'Fly Buy Summer' campaign this season, transforming airport spaces into vibrant, engaging hubs for travellers. The campaign was designed to encourage customer interaction through attractive shopping offers and vibrant store displays.",
      image:
        'https://readdy.ai/api/search-image?query=Vibrant%20airport%20retail%20summer%20campaign%20with%20colorful%20promotional%20displays%2C%20shopping%20banners%20and%20decorations%2C%20travelers%20engaging%20with%20stores%2C%20bright%20modern%20airport%20interior%20with%20summer%20themed%20marketing%20materials%2C%20professional%20commercial%20photography&width=900&height=550&seq=fly-buy-highlight&orientation=landscape',
      date: 'Summer 2024',
      icon: 'ri-shopping-bag-3-line',
    },
    {
      title: "GAME ON! 'When Brands Compete, Shoppers Win!'",
      description:
        "In a bid to recognize and celebrate outstanding retail performance, Refex Airports introduced 'Brand Wars', an internal incentive program aimed at rewarding excellence and fostering collaboration among our retail partners. It helped brands to engage in a healthy competition while encouraging them to perform better and fostering growth into their everyday performance.",
      image:
        'https://readdy.ai/api/search-image?query=Airport%20retail%20competition%20event%20with%20brand%20displays%20and%20awards%2C%20retail%20partners%20celebrating%20achievements%2C%20modern%20airport%20terminal%20with%20competitive%20retail%20environment%2C%20professional%20business%20event%20photography%20with%20trophies%20and%20recognition%20ceremony&width=900&height=550&seq=brand-wars-highlight&orientation=landscape',
      date: 'Q3 2024',
      icon: 'ri-trophy-line',
    },
  ],
};