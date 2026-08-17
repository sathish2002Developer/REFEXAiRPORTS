import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '@/components/feature/Header';
import Footer from '@/components/feature/Footer';
import LeadershipBanner from '@/pages/about/components/LeadershipBanner';
import LeadershipTeam from '@/pages/about/components/LeadershipTeam';
import { useCms } from '@/lib/useCms';

export default function LeadershipPage() {
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
        <LeadershipBanner data={cms?.leadership} />
        <div id="leadership">
          <LeadershipTeam data={cms?.leadership} />
        </div>
      </main>
      <Footer />
    </>
  );
}
