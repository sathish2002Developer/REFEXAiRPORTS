import type { ReactNode } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';

type ContactLocation = {
  name?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
};

const DEFAULT_LOCATIONS: ContactLocation[] = [
  {
    name: 'Pune International Airport (PNQ)',
    subtitle: 'Lohegaon, Pune, Maharashtra',
    phone: '+91 95388 82531',
    email: 'debamita.n@refex.co.in',
    address:
      'Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.',
  },
  {
    name: 'Srinagar International Airport (SXR)',
    subtitle: 'Humhama, Srinagar, Jammu & Kashmir',
    phone: '+91 91497 68998',
    email: 'showkatahmad.m@refex.co.in',
    address: 'Srinagar International Airport, Ground floor, Humhama-Srinagar 190007',
  },
  {
    name: 'Tiruchirappalli International Airport (TRZ)',
    subtitle: 'Tiruchirappalli, Tamil Nadu',
    phone: '+91 95388 82531',
    email: 'debamita.n@refex.co.in',
    address: 'Tiruchirappalli International Airport, Trichy - 620007, Tamil Nadu.',
  },
  {
    name: 'Aurangabad Airport (IXU)',
    subtitle: 'Chikalthana, Aurangabad, Maharashtra',
    phone: '+91 95388 82531',
    email: 'debamita.n@refex.co.in',
    address: 'Aurangabad Airport, Chikalthana, Aurangabad - 431007, Maharashtra.',
  },
  {
    name: 'Shirdi International Airport (SAG)',
    subtitle: 'Kakadi, Shirdi, Maharashtra',
    phone: '+91 95388 82531',
    email: 'debamita.n@refex.co.in',
    address: 'Shirdi International Airport, Kakadi, Shirdi - 423109, Maharashtra.',
  },
];

function hasLocationContent(loc: ContactLocation) {
  return Boolean(loc.name || loc.phone || loc.email || loc.address);
}

function IconCircle({ children }: { children: ReactNode }) {
  return (
    <span className="w-11 h-11 shrink-0 rounded-full bg-[#2879b1] text-white flex items-center justify-center">
      {children}
    </span>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 21s7-6.2 7-11.2A7 7 0 005 9.8C5 14.8 12 21 12 21z" strokeLinejoin="round" />
      <circle cx="12" cy="9.8" r="2.2" />
    </svg>
  );
}

const DEFAULT_EMAIL = 'info@refexairports.com';
const DEFAULT_OFFICE_HEADING = 'Registered & Corporate Office';
const DEFAULT_LOCATIONS_HEADING = 'Airport Office Address';
const DEFAULT_OFFICE_ADDRESS =
  'Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.';

const cardCls =
  'flex items-start gap-4 bg-white rounded-[28px] px-3 py-3 sm:px-4 sm:py-4 border border-gray-100 shadow-sm';
const headingCls = 'text-gray-600 font-medium px-1 min-h-7 flex items-end';

export default function PartnerAddressSection({
  data,
}: {
  data?: {
    title?: string;
    highlight?: string;
    intro?: string;
    email?: string;
    emailLabel?: string;
    officeLabel?: string;
    officeAddress?: string;
    locationsHeading?: string;
    locations?: ContactLocation[];
  };
}) {
  const incoming = (Array.isArray(data?.locations) ? data.locations : []).filter(hasLocationContent);
  const locations = incoming.length ? incoming : DEFAULT_LOCATIONS;
  const email = String(data?.email || DEFAULT_EMAIL).trim();
  const emailLabel = String(data?.emailLabel || 'Email').trim() || 'Email';
  const officeHeading = String(data?.officeLabel || DEFAULT_OFFICE_HEADING).trim() || DEFAULT_OFFICE_HEADING;
  const officeAddress = String(data?.officeAddress || DEFAULT_OFFICE_ADDRESS).trim();
  const locationsHeading =
    String(data?.locationsHeading || DEFAULT_LOCATIONS_HEADING).trim() || DEFAULT_LOCATIONS_HEADING;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="bg-[#eaf6fc] rounded-[28px] p-6 sm:p-10 md:p-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span className="text-gray-900">{data?.title || 'Our'}</span>{' '}
            <span className="text-[#2879b1]">{data?.highlight || 'Addresses'}</span>
          </h2>
          <CmsHtml
            html={data?.intro || 'Reach us at any of our airport offices. We would love to hear from you.'}
            className="text-gray-600 text-base md:text-lg max-w-3xl mb-10"
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
            <div className="flex flex-col gap-4">
              <p className={headingCls}>{officeHeading}</p>
              <div className="flex flex-col gap-4 flex-1">
                {email && (
                  <a
                    href={`mailto:${email}`}
                    className={`${cardCls} shrink-0 hover:shadow-md hover:border-[#2879b1]/20 transition-all`}
                  >
                    <IconCircle>
                      <MailIcon />
                    </IconCircle>
                    <span className="min-w-0 pr-2 self-center">
                      <span className="block text-xs text-gray-500 mb-0.5">{emailLabel}</span>
                      <span className="block text-sm sm:text-base font-semibold text-gray-800 break-all">{email}</span>
                    </span>
                  </a>
                )}
                {officeAddress && (
                  <div className={`${cardCls} flex-1 min-h-[220px]`}>
                    <IconCircle>
                      <PinIcon />
                    </IconCircle>
                    <span className="min-w-0 pr-2">
                      <span className="block text-xs text-gray-500 mb-0.5">Address</span>
                      <span className="block text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                        {officeAddress}
                      </span>
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <p className={headingCls}>{locationsHeading}</p>
              <div className="flex flex-col gap-4 flex-1">
                {locations.map((loc, index) => (
                  <div key={`${loc.name || 'loc'}-${index}`} className={cardCls}>
                    <IconCircle>
                      <PinIcon />
                    </IconCircle>
                    <span className="min-w-0 pr-2">
                      <span className="block text-xs text-gray-500 mb-0.5">{loc.name || loc.subtitle || 'Office'}</span>
                      <span className="block text-sm sm:text-base font-semibold text-gray-800 leading-relaxed">
                        {loc.address || loc.subtitle}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
