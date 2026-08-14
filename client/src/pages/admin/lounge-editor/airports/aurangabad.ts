import type { AirportLoungeData } from '../loungeTypes';

const aurangabad: AirportLoungeData = {
  id: 'aurangabad',
  name: 'Aurangabad Airport Lounge',
  slug: 'Aurangabad',
  route: '/aurangabad-airport-lounge',
  heroTitle: 'Aurangabad Airport Lounge',
  heroSubtitle: 'Aurangabad Airport (IXU)',
  heroTagline: "Unwind in comfort before exploring Maharashtra's heritage treasures",
  heroBackground: 'https://readdy.ai/api/search-image?query=Cozy%20airport%20lounge%20interior%20with%20comfortable%20seating%2C%20warm%20ambient%20lighting%2C%20heritage%20Maharashtra%20design%20elements%2C%20modern%20yet%20inviting%20travel%20atmosphere%2C%20clean%20sophisticated%20interior%20design&width=1920&height=500&seq=aurangabad-lounge-hero&orientation=landscape',
  overviewTitle: 'Welcome to Aurangabad Airport Lounge',
  overviewPara1: 'The Aurangabad Airport Lounge by Refex Airports provides a comfortable and welcoming space for travelers passing through this heritage city. Designed to offer a peaceful retreat, the lounge combines modern amenities with warm hospitality.',
  overviewPara2: 'Located in the Departure Hall, the lounge spans 1,800 square feet and can accommodate up to 40 guests. Whether visiting the Ajanta-Ellora caves or traveling for business, start your journey refreshed and relaxed.',
  hoursTitle: 'Operating Hours',
  hoursDesc: '6:00 AM - 9:00 PM daily, aligned with flight schedules',
  capacityTitle: 'Capacity',
  capacityDesc: '40 guests maximum, with comfortable seating and work areas',
  amenitiesTitle: 'Lounge Amenities',
  amenities: [
    { icon: 'ri-wifi-line', title: 'High-Speed WiFi', description: 'Complimentary high-speed internet access throughout the lounge' },
    { icon: 'ri-restaurant-line', title: 'Maharashtrian Dining', description: 'Local Maharashtrian cuisine and international dishes' },
    { icon: 'ri-cup-line', title: 'Beverage Service', description: 'Premium teas, coffee, and select beverages' },
    { icon: 'ri-computer-line', title: 'Business Corner', description: 'Workstations with computers and charging facilities' },
    { icon: 'ri-rest-time-line', title: 'Relaxation Zone', description: 'Comfortable seating for rest between flights' },
    { icon: 'ri-tv-line', title: 'Entertainment', description: 'LED TVs with news and entertainment channels' },
    { icon: 'ri-wheelchair-line', title: 'Accessibility', description: 'Fully accessible facility with dedicated assistance' },
  ],
  accessTitle: 'Access & Pricing',
  accessOptions: [
    { type: 'Business Class', desc: 'Complimentary access for business class passengers of partner airlines', icon: 'ri-vip-crown-line' },
    { type: 'Credit Card', desc: 'Access for premium credit card holders of participating banks', icon: 'ri-bank-card-line' },
    { type: 'Priority Pass', desc: 'Accepted for Priority Pass members', icon: 'ri-pass-valid-line' },
    { type: 'Walk-in', desc: 'Walk-in access available at ₹1,500 + taxes per person', icon: 'ri-user-add-line' },
  ],
  infoTitle: 'Important Information',
  infoDesc: 'Maximum stay is 3 hours. Children under 2 years enter free. Smart casual dress code applies. The lounge reserves the right to refuse entry. Please present a valid boarding pass and access credential at reception.',
};

export default aurangabad;
