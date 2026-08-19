import { loungeAirports, type AirportLoungeData } from './loungeData';
import { resolveComingSoon } from '@/lib/comingSoon';

export function toLoungeDraft(a: Partial<AirportLoungeData> & Record<string, any>): AirportLoungeData {
  const f = loungeAirports.find((r) => r.id === a.id) || loungeAirports[0];
  return {
    ...f,
    ...a,
    id: a.id || f.id,
    comingSoon: resolveComingSoon(a, f.comingSoon),
    comingSoonTitle: a.comingSoonTitle ?? f.comingSoonTitle ?? '',
    comingSoonMessage: a.comingSoonMessage ?? f.comingSoonMessage ?? '',
    comingSoonFooter: a.comingSoonFooter ?? f.comingSoonFooter ?? '',
    comingSoonImage: a.comingSoonImage ?? f.comingSoonImage ?? '',
    amenities: JSON.parse(JSON.stringify(a.amenities ?? f.amenities)),
    accessOptions: JSON.parse(JSON.stringify(a.accessOptions ?? f.accessOptions)),
  };
}
