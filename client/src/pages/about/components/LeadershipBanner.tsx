const LeadershipBanner = () => {
  return (
    <section className="w-full relative overflow-hidden">
      <div className="relative w-full h-[360px] md:h-[480px]">
        <img
          src="https://readdy.ai/api/search-image?query=Professional%20corporate%20team%20meeting%20in%20modern%20glass%20office%20with%20city%20skyline%20view%2C%20diverse%20business%20leaders%20collaborating%20around%20conference%20table%2C%20warm%20natural%20lighting%2C%20executive%20boardroom%20atmosphere%2C%20leadership%20and%20teamwork%20concept%2C%20editorial%20photography%20style%2C%20clean%20contemporary%20interior&width=1600&height=500&seq=leadership-hero-banner&orientation=landscape"
          alt="Leadership Team"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-2xl" data-aos="fade-right">
              <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Leadership Team
              </h2>
              <p className="text-white/90 text-base md:text-lg leading-relaxed font-medium">
                Conceptualized and created by two industry leaders
                <br className="hidden md:block" />
                guiding our vision with decades of expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadershipBanner;