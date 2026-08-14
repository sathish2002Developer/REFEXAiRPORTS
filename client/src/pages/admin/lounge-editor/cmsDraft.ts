import { loungeAirports, type AirportLoungeData } from './loungeData';

export function toLoungeDraft(a: Partial<AirportLoungeData> & Record<string, any>): AirportLoungeData {
  const f = loungeAirports.find((r) => r.id === a.id) || loungeAirports[0];
  return {
    ...f,
    ...a,
    id: a.id || f.id,
    amenities: JSON.parse(JSON.stringify(a.amenities ?? f.amenities)),
    accessOptions: JSON.parse(JSON.stringify(a.accessOptions ?? f.accessOptions)),
  };
}
