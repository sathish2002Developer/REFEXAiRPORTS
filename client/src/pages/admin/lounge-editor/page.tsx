import { useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';
import { useLoungeCms } from './useLoungeCms';
import LoungeEditorChrome from './LoungeEditorChrome';
import LoungeHeroFields from './LoungeHeroFields';
import LoungeComingSoonFields from './LoungeComingSoonFields';
import LoungeOverviewFields from './LoungeOverviewFields';
import LoungeAmenityFields from './LoungeAmenityFields';
import LoungeAccessFields from './LoungeAccessFields';

export default function AdminLoungeEditorPage() {
  const cms = useLoungeCms();
  const [activeSection, setActiveSection] = useState('hero');
  return (
    <AdminLayout>
      <LoungeEditorChrome {...cms} activeSection={activeSection} setActiveSection={setActiveSection}>
        {activeSection === 'hero' && <LoungeHeroFields draft={cms.draft} setField={cms.setField} />}
        {activeSection === 'comingsoon' && <LoungeComingSoonFields draft={cms.draft} setField={cms.setField} />}
        {activeSection === 'overview' && <LoungeOverviewFields draft={cms.draft} setField={cms.setField} />}
        {activeSection === 'amenities' && (
          <LoungeAmenityFields draft={cms.draft} setField={cms.setField} updateAmenity={cms.updateAmenity} addAmenity={cms.addAmenity} removeAmenity={cms.removeAmenity} />
        )}
        {activeSection === 'access' && (
          <LoungeAccessFields draft={cms.draft} setField={cms.setField} updateAccess={cms.updateAccess} addAccess={cms.addAccess} removeAccess={cms.removeAccess} />
        )}
      </LoungeEditorChrome>
    </AdminLayout>
  );
}
