import React from 'react';

interface AssetsHeroStat {
  icon: string;
  value: string;
  label: string;
}

interface AssetsHeroProps {
  airportName: string;
  airportCode: string;
  tagline: string;
  backgroundImage: string;
  stats: AssetsHeroStat[];
}

const AssetsHero: React.FC<AssetsHeroProps> = ({
  airportName,
  airportCode,
  tagline,
  backgroundImage,
  stats,
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background-50 to-transparent" />

      <div className="relative z-10 text-center px-4 md:px-6 w-full max-w-6xl mx-auto pb-20">
        <div className="mb-4">
          <span className="inline-block px-4 py-1.5 bg-white/15 backdrop-blur-md rounded-full text-white/80 text-sm font-medium tracking-widest border border-white/15">
            {airportCode}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-5 tracking-tight leading-tight">
          {airportName}
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-white/70 mb-16 max-w-2xl mx-auto leading-relaxed font-light">
          {tagline}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group bg-white/8 backdrop-blur-lg rounded-2xl p-5 md:p-6 border border-white/10 hover:bg-white/14 hover:border-white/25 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="flex items-center justify-center mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl bg-white/10 group-hover:bg-white/20 transition-colors duration-500">
                  <i className={`${stat.icon} text-xl md:text-2xl text-white`}></i>
                </div>
              </div>
              <div className="text-2xl md:text-3xl font-bold text-white mb-1.5 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/50 leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-6 flex items-center justify-center">
          <i className="ri-arrow-down-line text-white/40 text-2xl"></i>
        </div>
      </div>
    </div>
  );
};

export default AssetsHero;