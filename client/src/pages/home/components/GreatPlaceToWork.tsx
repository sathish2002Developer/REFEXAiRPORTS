import { useEffect, useRef, useState } from 'react';
import { mediaUrl } from '@/lib/api';

export default function GreatPlaceToWork({
  data,
}: {
  data?: { image?: string; alt?: string };
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 bg-white"
    >
      <div
        className={`max-w-7xl mx-auto px-4 md:px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="bg-background-100 rounded-2xl overflow-hidden">
          <img
            src={mediaUrl(data?.image || "https://www.travelfoodservices.com/assets/images/careers/linkedIn-banner-feb-2026-2027.png")}
            alt={data?.alt || "Great Place To Work Certified MAR 2026 - MAR 2027 India - Travel Food Services Limited"}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}