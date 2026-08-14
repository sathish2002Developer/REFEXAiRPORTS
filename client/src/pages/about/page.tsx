import { useEffect, useState } from 'react';
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
import LeadershipTeam from './components/LeadershipTeam';
import RefexGroup from './components/RefexGroup';
import { cmsGet } from '@/lib/api';

export default function AboutPage() {
  const [cms, setCms] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
    cmsGet<Record<string, any>>('about')
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
        <OurFocus data={cms?.ourFocus} />
        {/* <LeadershipTeam data={cms?.leadership} /> */}
        {/* <RefexGroup data={cms?.refexGroup} /> */}
        <BackedByCompany data={cms?.backedBy} />
      </main>
      <Footer />
    </>
  );
}
