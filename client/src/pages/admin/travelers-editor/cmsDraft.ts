import { resolveComingSoon } from '@/lib/comingSoon';
import type { AirportTravelersData } from './travelersData';
import { travelersAirports } from './travelersData';

export type TravelersDraft = Pick<
  AirportTravelersData,
  | 'heroAirportName'
  | 'heroTagline'
  | 'heroBackground'
  | 'terminalTitle'
  | 'terminalSubtitle'
  | 'faqLabel'
  | 'faqTitle'
  | 'terminals'
  | 'faqs'
  | 'brands'
  | 'comingSoon'
  | 'comingSoonTitle'
  | 'comingSoonMessage'
  | 'comingSoonFooter'
  | 'comingSoonImage'
>;

export function toTravelersDraft(a: Partial<AirportTravelersData> & Record<string, any>): TravelersDraft {
  const f = travelersAirports.find((r) => r.id === a.id) || travelersAirports[0];
  return {
    heroAirportName: a.heroAirportName ?? f.heroAirportName,
    heroTagline: a.heroTagline ?? f.heroTagline,
    heroBackground: a.heroBackground ?? f.heroBackground,
    terminalTitle: a.terminalTitle ?? f.terminalTitle,
    terminalSubtitle: a.terminalSubtitle ?? f.terminalSubtitle,
    faqLabel: a.faqLabel ?? f.faqLabel,
    faqTitle: a.faqTitle ?? f.faqTitle,
    terminals: JSON.parse(JSON.stringify(a.terminals ?? f.terminals)),
    faqs: JSON.parse(JSON.stringify(a.faqs ?? f.faqs)),
    brands: JSON.parse(JSON.stringify(a.brands ?? f.brands)),
    comingSoon: resolveComingSoon(a, f.comingSoon),
    comingSoonTitle: a.comingSoonTitle ?? f.comingSoonTitle,
    comingSoonMessage: a.comingSoonMessage ?? f.comingSoonMessage,
    comingSoonFooter: a.comingSoonFooter ?? f.comingSoonFooter,
    comingSoonImage: a.comingSoonImage ?? f.comingSoonImage,
  };
}

export const cmsInputCls =
  'w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2879b1]/20 focus:border-[#2879b1]';
export const cmsLabelCls = 'block text-sm font-semibold text-slate-700 mb-2';
