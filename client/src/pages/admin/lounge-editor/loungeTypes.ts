export interface LoungeAmenity {
  icon: string;
  title: string;
  description: string;
}

export interface LoungeAccessOption {
  type: string;
  desc: string;
  icon: string;
}

export interface AirportLoungeData {
  id: string;
  name: string;
  slug: string;
  route: string;
  comingSoon: boolean;
  heroTitle: string;
  heroSubtitle: string;
  heroTagline: string;
  heroBackground: string;
  overviewTitle: string;
  overviewPara1: string;
  overviewPara2: string;
  hoursTitle: string;
  hoursDesc: string;
  capacityTitle: string;
  capacityDesc: string;
  amenitiesTitle: string;
  amenities: LoungeAmenity[];
  accessTitle: string;
  accessOptions: LoungeAccessOption[];
  infoTitle: string;
  infoDesc: string;
}
