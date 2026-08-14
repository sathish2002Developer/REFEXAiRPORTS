import React from 'react';

interface TravelerHeroProps {
  airportName: string;
  tagline: string;
  backgroundImage: string;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const TravelerHero: React.FC<TravelerHeroProps> = ({
  airportName,
  tagline,
  backgroundImage,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background-50 to-transparent" />

      <div className="relative z-10 text-center px-4 md:px-6 w-full max-w-5xl mx-auto pb-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-5 tracking-tight leading-tight">
          {airportName}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
          {tagline}
        </p>

        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <div className="w-5 h-5 flex items-center justify-center">
              <i className="ri-search-line text-lg text-foreground-400"></i>
            </div>
          </div>
          <input
            type="text"
            placeholder={`Search brands at ${airportName}...`}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-14 pr-6 py-4 text-base bg-white/95 rounded-full border-0 outline-none text-foreground-950 placeholder:text-foreground-400 focus:ring-2 focus:ring-white/60 transition-all duration-300"
          />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-down-line text-white/50 text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default TravelerHero;