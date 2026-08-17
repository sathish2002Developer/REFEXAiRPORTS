import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import Hero from './components/Hero';
import Stats from './components/Stats';
import WhoWeAre from './components/WhoWeAre';
import TravelerExperiences from './components/TravelerExperiences';
import BrandPartners from './components/BrandPartners';
import GreatPlaceToWork from './components/GreatPlaceToWork';
import OurFootprints from './components/OurFootprints';
import Stories from './components/Stories';
import { useCms } from '@/lib/useCms';

export default function HomePage() {
  const cms = useCms('home');

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
        <Hero data={cms?.hero} />
        <Stats data={cms?.stats} />
        {/* <WhoWeAre data={cms?.whoWeAre} /> */}
        <TravelerExperiences data={cms?.travelerExperiences} />
        <BrandPartners data={cms?.brandPartners} />
        <GreatPlaceToWork data={cms?.gptw} />
        <OurFootprints data={cms?.footprints} />
        <Stories data={cms?.stories} />
      </main>
      <Footer />
    </>
  );
}

