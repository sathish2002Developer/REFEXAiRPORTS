import { useState } from 'react';
import AdminLayout from '@/components/feature/AdminLayout';
import { useNewsCms } from './useNewsCms';
import NewsEditorChrome from './NewsEditorChrome';
import NewsHeaderFields from './NewsHeaderFields';
import NewsItemsFields from './NewsItemsFields';
import NewsStoriesFields from './NewsStoriesFields';
import NewsHighlightsFields from './NewsHighlightsFields';

export default function AdminNewsEditorPage() {
  const cms = useNewsCms();
  const [activeSection, setActiveSection] = useState<'header' | 'news' | 'stories' | 'highlights'>('header');
  return (
    <AdminLayout>
      <NewsEditorChrome {...cms} activeSection={activeSection} setActiveSection={setActiveSection}>
        {activeSection === 'header' && (
          <NewsHeaderFields draft={cms.draft} setField={cms.setField} updateTab={cms.updateTab} />
        )}
        {activeSection === 'news' && (
          <NewsItemsFields draft={cms.draft} updateNews={cms.updateNews} addNews={cms.addNews} removeNews={cms.removeNews} />
        )}
        {activeSection === 'stories' && (
          <NewsStoriesFields draft={cms.draft} updateStory={cms.updateStory} addStory={cms.addStory} removeStory={cms.removeStory} />
        )}
        {activeSection === 'highlights' && (
          <NewsHighlightsFields
            draft={cms.draft}
            updateHighlight={cms.updateHighlight}
            addHighlight={cms.addHighlight}
            removeHighlight={cms.removeHighlight}
          />
        )}
      </NewsEditorChrome>
    </AdminLayout>
  );
}
