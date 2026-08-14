import { useEffect, useState } from 'react';
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
import Contact from './components/Contact';
import { cmsGet } from '@/lib/api';

export default function HomePage() {
  const [cms, setCms] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
    cmsGet<Record<string, any>>('home')
      .then((data) => {
        const { updated_at: _u, ...payload } = data;
        setCms(payload);
      })
      .catch(() => {
        setCms(null);
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
        <Contact data={cms?.contact} />
      </main>
      <Footer />
    </>
  );
}
