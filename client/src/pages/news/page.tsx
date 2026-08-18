import { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import NewsSection from './components/NewsSection';
import StoriesSection from './components/StoriesSection';
import HighlightsSection from './components/HighlightsSection';
import SocialPostsSection from './components/SocialPostsSection';
import Footer from '../../components/feature/Footer';
import CmsHtml from '@/components/feature/CmsHtml';
import { cmsGet } from '@/lib/api';
import { toNewsDraft, type NewsDraft } from '@/pages/admin/news-editor/cmsDraft';

export default function NewsPage() {
  const [activeTab, setActiveTab] = useState('news');
  const [cms, setCms] = useState<NewsDraft>(() => toNewsDraft({}));

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
    });
  }, []);

  useEffect(() => {
    let cancelled = false;
    const load = () => {
      cmsGet<Record<string, any>>('news')
        .then((data) => {
          if (!cancelled) setCms(toNewsDraft(data));
        })
        .catch(() => {
          /* keep defaults */
        });
    };
    load();
    window.addEventListener('focus', load);
    return () => {
      cancelled = true;
      window.removeEventListener('focus', load);
    };
  }, []);

  const tabs = cms.tabs?.length
    ? cms.tabs
    : [
        { id: 'news', label: 'News', icon: 'ri-newspaper-line' },
        { id: 'stories', label: 'Stories', icon: 'ri-book-open-line' },
        { id: 'highlights', label: 'Highlights', icon: 'ri-star-line' },
        { id: 'social', label: 'Social', icon: 'ri-share-line' },
      ];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-12" data-aos="fade-down">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4">
              {cms.pageTitle || 'News & Updates'}
            </h1>
            <CmsHtml
              html={
                cms.pageSubtitle ||
                'Stay informed about our latest developments, stories, and achievements across our airport operations'
              }
              className="text-lg text-gray-600 text-center max-w-3xl mx-auto"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex justify-center mb-12" data-aos="fade-up">
            <div className="inline-flex bg-white rounded-xl shadow-md p-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col items-center justify-center px-6 py-4 rounded-lg transition-all duration-200 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#7bbf45] text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <div className="w-10 h-10 flex items-center justify-center mb-2">
                    <i className={`${tab.icon} text-2xl`}></i>
                  </div>
                  <span className="font-semibold text-sm">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8" data-aos="fade-up" data-aos-delay="200">
            {activeTab === 'news' && <NewsSection items={cms.newsItems} />}
            {activeTab === 'stories' && <StoriesSection items={cms.stories} />}
            {activeTab === 'highlights' && <HighlightsSection items={cms.highlights} />}
            {activeTab === 'social' && <SocialPostsSection items={cms.socialPosts} />}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
