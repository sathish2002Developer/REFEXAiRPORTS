export default function Hero({ data }: { data?: { line1?: string; line2?: string; line3?: string; line4?: string; video?: string } }) {
  const line1 = data?.line1 || 'Where World-Class';
  const line2 = data?.line2 || 'Retail';
  const line3 = data?.line3 || 'Meets Global';
  const line4 = data?.line4 || 'Travellers...';
  const video = data?.video || 'https://refexairports.com/wp-content/uploads/2023/08/Hero-BG-Video.mp4';

  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      <div className="absolute inset-0 w-full h-full">
        <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 w-full px-4 md:px-6 py-16 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl" data-aos="fade-right">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {line1}<br />
              {line2}<br />
              {line3}<br />
              {line4}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
