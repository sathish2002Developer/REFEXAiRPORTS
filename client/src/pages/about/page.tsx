import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import HeroSection from './components/HeroSection';
import WhoWeAreBanner from './components/WhoWeAreBanner';
import IntroSection from './components/IntroSection';
import VisionMission from './components/VisionMission';
import BackedByCompany from './components/BackedByCompany';
import OurFocus from './components/OurFocus';
import FocusArea from './components/FocusArea';
import ThreePillars from './components/ThreePillars';
import RefexGroup from './components/RefexGroup';
import { useCms } from '@/lib/useCms';

export default function AboutPage() {
  const cms = useCms('about');

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
        <WhoWeAreBanner data={cms?.banner} />
        <HeroSection data={cms?.hero} />
        <div id="intro">
          <IntroSection data={cms?.intro} />
        </div>
        <div id="vision-mission">
          <VisionMission data={cms?.visionMission} />
        </div>
        {/* <FocusArea data={cms?.focusArea} /> */}
        {/* <ThreePillars data={cms?.threePillars} /> */}
        <div id="our-focus">
          <OurFocus data={cms?.ourFocus} />
        </div>
        <div id="refex-group">
          {/* <RefexGroup data={cms?.refexGroup} /> */}
        </div>
        <BackedByCompany data={cms?.backedBy} />
      </main>
      <Footer />
    </>
  );
}
