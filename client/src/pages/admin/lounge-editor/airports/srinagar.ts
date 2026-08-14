import type { AirportLoungeData } from '../loungeTypes';

const srinagar: AirportLoungeData = {
  id: 'srinagar',
  name: 'Srinagar Airport Lounge',
  slug: 'Srinagar',
  route: '/srinagar-airport-lounge',
  heroTitle: 'Srinagar Airport Lounge',
  heroSubtitle: 'Srinagar International Airport (SXR)',
  heroTagline: 'Experience Kashmiri hospitality in a serene and luxurious setting',
  heroBackground: 'https://readdy.ai/api/search-image?query=Luxury%20airport%20lounge%20with%20panoramic%20Himalayan%20mountain%20views%20through%20floor-to-ceiling%20windows%2C%20elegant%20Kashmiri-inspired%20interior%20design%20with%20warm%20wood%20accents%20and%20traditional%20motifs%2C%20comfortable%20premium%20seating%2C%20sophisticated%20hospitality%20atmosphere&width=1920&height=500&seq=srinagar-lounge-hero&orientation=landscape',
  overviewTitle: 'Welcome to Srinagar Airport Lounge',
  overviewPara1: 'The Srinagar Airport Lounge by Refex Airports offers a truly unique pre-flight experience, blending world-class amenities with the warmth of traditional Kashmiri hospitality. Set against the breathtaking backdrop of the Himalayas, this lounge provides a serene sanctuary for travelers.',
  overviewPara2: 'Located in the Departure Hall, the lounge spans 3,000 square feet and can accommodate up to 60 guests. Featuring Kashmiri-inspired interiors with walnut wood accents and panoramic views, it offers a memorable start to your journey.',
  hoursTitle: 'Operating Hours',
  hoursDesc: '6:00 AM - 10:00 PM daily, aligned with flight schedules',
  capacityTitle: 'Capacity',
  capacityDesc: '60 guests maximum, with panoramic Himalayan views',
  amenitiesTitle: 'Lounge Amenities',
  amenities: [
    { icon: 'ri-wifi-line', title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the lounge' },
    { icon: 'ri-restaurant-line', title: 'Kashmiri Cuisine', description: 'Authentic Kashmiri dishes including Wazwan specialties, alongside international fare' },
    { icon: 'ri-cup-line', title: 'Kahwa Bar', description: 'Traditional Kashmiri Kahwa tea and beverage service with local specialties' },
    { icon: 'ri-computer-line', title: 'Business Corner', description: 'Workstations with computers and printing facilities for business travelers' },
    { icon: 'ri-drop-line', title: 'Shower Facilities', description: 'Private shower suites with premium toiletries and fresh towels' },
    { icon: 'ri-rest-time-line', title: 'Relaxation Zone', description: 'Comfortable seating with stunning views of the Himalayan backdrop' },
    { icon: 'ri-tv-line', title: 'Entertainment', description: 'LED TVs with news, sports, and entertainment channels' },
    { icon: 'ri-wheelchair-line', title: 'Accessibility', description: 'Fully accessible facility with dedicated assistance for special needs' },
  ],
  accessTitle: 'Access & Pricing',
  accessOptions: [
    { type: 'Business Class', desc: 'Complimentary access for business and first-class passengers of partner airlines', icon: 'ri-vip-crown-line' },
    { type: 'Credit Card', desc: 'Access for premium credit card holders of participating banks', icon: 'ri-bank-card-line' },
    { type: 'Priority Pass', desc: 'Accepted for Priority Pass, LoungeKey, and DragonPass members', icon: 'ri-pass-valid-line' },
    { type: 'Walk-in', desc: 'Walk-in access available at ₹1,800 + taxes per person', icon: 'ri-user-add-line' },
  ],
  infoTitle: 'Important Information',
  infoDesc: 'Maximum stay is 3 hours. Children under 2 years enter free. Smart casual dress code applies. The lounge reserves the right to refuse entry. Please present a valid boarding pass and access credential at reception.',
};

export default srinagar;
