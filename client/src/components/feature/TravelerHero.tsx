import { mediaUrl } from '@/lib/api';

interface TravelerHeroProps {
  airportName: string;
  tagline: string;
  backgroundImage: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export default function TravelerHero({
  airportName,
  tagline,
  backgroundImage,
  searchTerm,
  onSearchChange,
}: TravelerHeroProps) {
  return (
    <section className="relative w-full min-h-[420px] h-[58vh] md:h-[64vh] flex items-center justify-center overflow-hidden">
      <img
        src={mediaUrl(backgroundImage)}
        alt={airportName}
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative z-10 text-center px-4 md:px-6 w-full max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          {airportName}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-white mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed">
          {tagline}
        </p>

        <div className="relative w-full max-w-2xl mx-auto">
          <i className="ri-search-line absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none"></i>
          <input
            type="search"
            placeholder={`Search brands at ${airportName}...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-6 py-3.5 sm:py-4 text-sm sm:text-base bg-white rounded-full border-0 outline-none text-gray-800 placeholder:text-gray-400 shadow-lg focus:ring-2 focus:ring-white/70"
          />
        </div>
      </div>
    </section>
  );
}
