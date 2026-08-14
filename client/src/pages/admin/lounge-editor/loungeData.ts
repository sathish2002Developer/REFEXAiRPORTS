import pune from './airports/pune';
import srinagar from './airports/srinagar';
import trichy from './airports/trichy';
import aurangabad from './airports/aurangabad';
import shirdi from './airports/shirdi';
import type { AirportLoungeData } from './loungeTypes';

export type { AirportLoungeData, LoungeAmenity, LoungeAccessOption } from './loungeTypes';

export const loungeAirports: AirportLoungeData[] = [pune, srinagar, trichy, aurangabad, shirdi];
