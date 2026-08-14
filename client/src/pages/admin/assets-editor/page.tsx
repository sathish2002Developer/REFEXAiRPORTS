import { useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';
import { useAssetsCms } from './useAssetsCms';
import AssetsEditorChrome from './AssetsEditorChrome';
import AssetsFields from './AssetsFields';

export default function AdminAssetsEditorPage() {
  const cms = useAssetsCms();
  const [activeSection, setActiveSection] = useState('hero');
  return (
    <AdminLayout>
      <AssetsEditorChrome {...cms} activeSection={activeSection} setActiveSection={setActiveSection}>
        <AssetsFields activeSection={activeSection} values={cms.values} handleChange={cms.handleChange} />
      </AssetsEditorChrome>
    </AdminLayout>
  );
}
