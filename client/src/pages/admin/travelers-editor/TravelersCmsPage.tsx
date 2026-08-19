import { useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';
import { useTravelersCms } from './useTravelersCms';
import TravelersEditorChrome from './TravelersEditorChrome';
import TravelersHeroFields from './TravelersHeroFields';
import TravelersComingSoonFields from './TravelersComingSoonFields';
import TravelersBrandFields from './TravelersBrandFields';
import TravelersTerminalFields from './TravelersTerminalFields';
import TravelersFaqFields from './TravelersFaqFields';

export default function AdminTravelersEditorPage() {
  const cms = useTravelersCms();
  const [activeSection, setActiveSection] = useState<'hero' | 'comingsoon' | 'brands' | 'terminals' | 'faq'>('hero');
  return (
    <AdminLayout>
      <TravelersEditorChrome {...cms} activeSection={activeSection} setActiveSection={setActiveSection}>
        {activeSection === 'hero' && <TravelersHeroFields draft={cms.draft} setField={cms.setField} />}
        {activeSection === 'comingsoon' && <TravelersComingSoonFields draft={cms.draft} setField={cms.setField} />}
        {activeSection === 'brands' && <TravelersBrandFields draft={cms.draft} updateBrand={cms.updateBrand} addBrand={cms.addBrand} removeBrand={cms.removeBrand} />}
        {activeSection === 'terminals' && <TravelersTerminalFields draft={cms.draft} setField={cms.setField} updateTerminal={cms.updateTerminal} addTerminal={cms.addTerminal} removeTerminal={cms.removeTerminal} />}
        {activeSection === 'faq' && <TravelersFaqFields draft={cms.draft} setField={cms.setField} updateFaq={cms.updateFaq} addFaq={cms.addFaq} removeFaq={cms.removeFaq} />}
      </TravelersEditorChrome>
    </AdminLayout>
  );
}
