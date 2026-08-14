const HeroSection = ({ data }: { data?: { title?: string } }) => {
  return (
    <section className="w-full bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 text-center" data-aos="fade-down">
          {data?.title || 'About us'}
        </h1>
      </div>
    </section>
  );
};

export default HeroSection;
