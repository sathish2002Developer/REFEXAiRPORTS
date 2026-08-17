import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import PartnerHero from './PartnerHero';
import ConnectWithUs from './ConnectWithUs';
import PartnerAddressSection from './PartnerAddressSection';
import { useCms } from '@/lib/useCms';

export default function PartnerWithUsPage() {
  const cms = useCms('partner');

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <Header />
      <main>
        <PartnerHero data={cms?.hero} />
        <ConnectWithUs data={cms?.connect} />
        <PartnerAddressSection
          data={{
            title: cms?.addresses?.title,
            highlight: cms?.addresses?.highlight,
            intro: cms?.addresses?.intro,
            locations: cms?.locations,
          }}
        />
      </main>
      <Footer />
    </>
  );
}
