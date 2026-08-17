import CmsHtml from '@/components/feature/CmsHtml';
import { GreenIcon } from './GreenIcon';

type B2BEmail = { label: string; email: string };

type Office = {
  title?: string;
  subtitle?: string;
  address?: string;
  phone?: string;
  email?: string;
};

const DEFAULT_EMAILS: B2BEmail[] = [
  { label: 'For Business Development', email: 'debamita.n@refex.co.in' },
  { label: 'For Airport Operations', email: 'showkatahmad.m@refex.co.in' },
  { label: 'For Customer Service', email: 'info@refexairports.com' },
  { label: 'For Media Queries', email: 'media@refexairports.com' },
];

const DEFAULT_OFFICE: Office = {
  title: 'Registered & Corporate Office',
  subtitle: 'Lohegaon, Pune, Maharashtra',
  address:
    'Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.',
  phone: '+91 95388 82531',
  email: 'debamita.n@refex.co.in',
};

export default function B2BCollaborations({
  data,
}: {
  data?: {
    title?: string;
    intro?: string;
    emails?: B2BEmail[];
    office?: Office;
  };
}) {
  const emails = (data?.emails?.length ? data.emails : DEFAULT_EMAILS).filter((row) => row.label || row.email);
  const office = { ...DEFAULT_OFFICE, ...(data?.office || {}) };

  return (
    <div data-aos="fade-right">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">{data?.title || 'B2B Collaborations'}</h2>
      <CmsHtml
        html={
          data?.intro ||
          'Every great partnership starts with a conversation. Reach out, and let’s explore how we can grow together.'
        }
        className="text-gray-600 text-lg mb-12"
      />

      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <GreenIcon name="plane" className="w-6 h-6" />
          {office.title}
        </h3>
        {office.subtitle && <p className="text-sm text-gray-500 mb-3 ml-8">{office.subtitle}</p>}
        <div className="space-y-3">
          {office.phone && (
            <div className="flex items-center gap-3">
              <GreenIcon name="phone" />
              <a href={`tel:${office.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-[#7bbf45]">
                {office.phone}
              </a>
            </div>
          )}
          {office.email && (
            <div className="flex items-center gap-3">
              <GreenIcon name="mail" />
              <a href={`mailto:${office.email}`} className="text-gray-700 hover:text-[#7bbf45]">
                {office.email}
              </a>
            </div>
          )}
          {office.address && (
            <div className="flex items-start gap-3">
              <GreenIcon name="pin" className="w-5 h-5 mt-0.5" />
              <p className="text-gray-700 text-sm leading-relaxed">{office.address}</p>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-5">
        {emails.map((row, index) => (
          <div key={`${row.email}-${index}`}>
            <h3 className="text-base font-semibold mb-2 flex items-center gap-2">
              <GreenIcon name="plane" className="w-5 h-5" />
              {row.label}
            </h3>
            <div className="flex items-center gap-3">
              <GreenIcon name="mail" />
              <a href={`mailto:${row.email}`} className="text-gray-700 hover:text-[#7bbf45]">
                {row.email}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
