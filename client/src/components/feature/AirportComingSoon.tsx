import { mediaUrl } from '@/lib/api';

export const DEFAULT_COMING_SOON = {
  title: 'Coming Soon!',
  message: 'We are preparing something exceptional for you.\nOur new airport experience is taking off soon.',
  footer: 'Stay tuned for a world-class journey.',
};

export default function AirportComingSoon({
  airportName,
  backgroundImage,
  title,
  message,
  footer,
}: {
  airportName: string;
  backgroundImage: string;
  title?: string;
  message?: string;
  footer?: string;
}) {
  const heading = title?.trim() || DEFAULT_COMING_SOON.title;
  const body = message?.trim() || DEFAULT_COMING_SOON.message;
  const closing = footer?.trim() || DEFAULT_COMING_SOON.footer;

  return (
    <main className="relative min-h-[calc(100vh-80px)] overflow-hidden">
      <img
        src={mediaUrl(backgroundImage)}
        alt={airportName}
        className="absolute inset-0 w-full h-full object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/55" />

      <div className="relative z-10 min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-3xl mx-auto text-center">
          <div className="mx-auto mb-7 w-[72px] h-[72px] sm:w-[84px] sm:h-[84px] rounded-full bg-[#2879b1] flex items-center justify-center shadow-[0_8px_24px_rgba(40,121,177,0.5)]">
            <i className="ri-flight-takeoff-line text-white text-4xl sm:text-[42px] leading-none"></i>
          </div>

          <p className="text-white text-[17px] sm:text-xl font-medium mb-4">{airportName}</p>

          <h1 className="text-white text-[42px] sm:text-6xl md:text-[72px] font-bold tracking-tight leading-none mb-6">
            {heading}
          </h1>

          <p className="text-white text-[16px] sm:text-[19px] md:text-[21px] font-normal leading-relaxed max-w-2xl mx-auto whitespace-pre-line">
            {body}
          </p>

          <div className="flex items-center justify-center gap-3 my-8 max-w-lg mx-auto">
            <span className="h-[1.5px] flex-1 bg-white" />
            <i className="ri-plane-fill text-white text-lg -rotate-90 leading-none"></i>
            <span className="h-[1.5px] flex-1 bg-white" />
          </div>

          <p className="text-white text-[17px] sm:text-xl font-bold">{closing}</p>
        </div>
      </div>
    </main>
  );
}
