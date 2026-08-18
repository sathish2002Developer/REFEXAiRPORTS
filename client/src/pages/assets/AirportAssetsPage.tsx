import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AssetsHero from '../../components/feature/AssetsHero';
import AirportComingSoon from '../../components/feature/AirportComingSoon';
import { cmsGet, mediaUrl } from '@/lib/api';
import { resolveComingSoon } from '@/lib/comingSoon';
import { assetsAirports, type AirportAssetsData } from '../admin/assets-editor/assetsData';

const HERO_STAT_ICONS = [
  'ri-building-line',
  'ri-user-line',
  'ri-checkbox-multiple-line',
  'ri-store-3-line',
];
const OV_FEATURE_ICONS = [
  'ri-building-line',
  'ri-global-line',
  'ri-shopping-bag-line',
  'ri-checkbox-multiple-line',
];
const FAC_ICONS = [
  'ri-building-line',
  'ri-user-line',
  'ri-checkbox-multiple-line',
  'ri-shopping-bag-line',
  'ri-store-3-line',
  'ri-building-2-line',
];
const ABOUT_ICONS = [
  'ri-book-open-line',
  'ri-building-2-line',
  'ri-rocket-line',
  'ri-ancient-gate-line',
];

function highlightIcon(title: string, cmsIcon?: string) {
  const custom = String(cmsIcon || '').trim();
  if (custom) return custom;
  const t = String(title || '').toLowerCase();
  if (t.includes('amenit')) return 'ri-hotel-line';
  if (t.includes('cultur')) return 'ri-ancient-gate-line';
  return 'ri-star-smile-line';
}

function fallbackFor(airportKey: string): AirportAssetsData {
  return assetsAirports.find((a) => a.id === airportKey) || assetsAirports[0];
}

function normalizeCms(airportKey: string, payload: Record<string, any> | null): AirportAssetsData {
  const fallback = fallbackFor(airportKey);
  if (!payload) return fallback;
  return {
    ...fallback,
    ...payload,
    id: airportKey,
    values: { ...fallback.values, ...(payload.values || {}) },
    comingSoon: resolveComingSoon(payload, fallback.comingSoon),
  };
}

function v(values: Record<string, string>, key: string) {
  return values[key] || '';
}

export default function AirportAssetsPage({ airportKey }: { airportKey: string }) {
  const [data, setData] = useState<AirportAssetsData>(() => fallbackFor(airportKey));
  const [activeTab, setActiveTab] = useState<'overview' | 'facilities' | 'about'>('overview');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
  }, []);

  useEffect(() => {
    setData(fallbackFor(airportKey));
    setActiveTab('overview');

    let cancelled = false;
    const load = () => {
      cmsGet<Record<string, any>>(`assets/${airportKey}`)
        .then((cms) => {
          if (cancelled) return;
          const { updated_at: _u, airport_key: _k, ...payload } = cms;
          setData(normalizeCms(airportKey, payload));
        })
        .catch(() => {
          if (!cancelled) setData(fallbackFor(airportKey));
        });
    };
    load();
    window.addEventListener('focus', load);

    return () => {
      cancelled = true;
      window.removeEventListener('focus', load);
    };
  }, [airportKey]);

  const values = data.values || {};
  const heroStats = [1, 2, 3, 4]
    .map((n, i) => ({
      icon: HERO_STAT_ICONS[i],
      value: v(values, `hero_stat${n}_value`),
      label: v(values, `hero_stat${n}_label`),
    }))
    .filter((s) => s.value || s.label);

  const overviewFeatures = [1, 2, 3, 4]
    .map((n, i) => ({
      icon: OV_FEATURE_ICONS[i],
      title: v(values, `ov_feature${n}_title`),
      description: v(values, `ov_feature${n}_desc`),
    }))
    .filter((f) => f.title || f.description);

  const facilities = [1, 2, 3, 4, 5, 6]
    .map((n, i) => ({
      icon: FAC_ICONS[i],
      title: v(values, `fac_item${n}_title`),
      description: v(values, `fac_item${n}_desc`),
    }))
    .filter((f) => f.title || f.description);

  const aboutBlocks = [1, 2, 3]
    .map((n, i) => ({
      icon: ABOUT_ICONS[i],
      title: v(values, `about_block${n}_title`),
      description: v(values, `about_block${n}_desc`),
    }))
    .filter((b) => b.title || b.description);

  const aboutList = [1, 2, 3, 4, 5, 6]
    .map((n) => v(values, `about_list${n}`))
    .filter(Boolean);

  const tabCls = (tab: typeof activeTab) =>
    `px-4 md:px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
      activeTab === tab
        ? 'bg-primary-500 text-white shadow-md'
        : 'text-foreground-600 hover:text-foreground-900'
    }`;

  return (
    <>
      <Header />
      {data.comingSoon ? (
        <AirportComingSoon
          airportName={v(values, 'hero_airport_name') || data.name}
          backgroundImage={v(values, 'hero_bg')}
        />
      ) : (
      <div className="min-h-screen bg-background-50">
        <AssetsHero
          airportName={v(values, 'hero_airport_name') || data.name}
          airportCode={v(values, 'hero_airport_code')}
          tagline={v(values, 'hero_tagline')}
          backgroundImage={v(values, 'hero_bg')}
          stats={heroStats}
        />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
          <div className="mb-12 w-full overflow-x-auto no-scrollbar" data-aos="fade-up">
            <div className="inline-flex bg-foreground-100 rounded-full p-1 w-max mx-auto">
              <button onClick={() => setActiveTab('overview')} className={tabCls('overview')}>
                Airport Overview
              </button>
              <button onClick={() => setActiveTab('facilities')} className={tabCls('facilities')}>
                Facilities & Infrastructure
              </button>
              <button onClick={() => setActiveTab('about')} className={tabCls('about')}>
                {v(values, 'about_title') || `About ${data.slug}`}
              </button>
            </div>
          </div>

          <div className="bg-background-50 rounded-2xl border border-foreground-200 p-6 md:p-12" data-aos="fade-up">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-foreground-950 mb-6">Airport Overview</h3>
                <div className="prose max-w-none mb-8">
                  {v(values, 'ov_para1') && (
                    <p className="text-foreground-700 leading-relaxed mb-4">{v(values, 'ov_para1')}</p>
                  )}
                  {v(values, 'ov_para2') && (
                    <p className="text-foreground-700 leading-relaxed">{v(values, 'ov_para2')}</p>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {overviewFeatures.map((feature, index) => (
                    <div
                      key={`${feature.title}-${index}`}
                      className="flex items-start p-6 bg-background-100 rounded-xl border border-foreground-200 hover:border-primary-300 transition-colors"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="w-12 h-12 flex items-center justify-center bg-primary-500 rounded-lg mr-4 flex-shrink-0">
                        <i className={`${feature.icon} text-2xl text-white`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-950 mb-2">{feature.title}</h4>
                        <p className="text-sm text-foreground-600 leading-relaxed">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'facilities' && (
              <div>
                <h3 className="text-2xl font-bold text-foreground-950 mb-6">Facilities & Infrastructure</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {facilities.map((item, index) => (
                    <div
                      key={`${item.title}-${index}`}
                      className="flex items-start"
                      data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
                      data-aos-delay={(Math.floor(index / 2) + 1) * 100}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-primary-500 rounded-lg mr-4 flex-shrink-0">
                        <i className={`${item.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-950 mb-1">{item.title}</h4>
                        <p className="text-foreground-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {(v(values, 'fac_highlight_title') || v(values, 'fac_highlight_desc')) && (
                  <div
                    className="mt-8 p-6 bg-accent-100/50 rounded-xl border border-accent-200"
                    data-aos="fade-up"
                    data-aos-delay="400"
                  >
                    <div className="flex items-start">
                      <div className="w-10 h-10 flex items-center justify-center bg-background-50 rounded-lg mr-4 flex-shrink-0 shadow-sm">
                        <i
                          className={`${highlightIcon(
                            v(values, 'fac_highlight_title'),
                            v(values, 'fac_highlight_icon')
                          )} text-xl text-accent-600`}
                        ></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground-950 mb-2">
                          {v(values, 'fac_highlight_title')}
                        </h4>
                        <p className="text-foreground-700 leading-relaxed">
                          {v(values, 'fac_highlight_desc')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h3 className="text-2xl font-bold text-foreground-950 mb-6">
                  {v(values, 'about_title') || `About ${data.slug}`}
                </h3>
                <div className="prose max-w-none">
                  {v(values, 'about_img') && (
                    <div className="mb-8" data-aos="zoom-in">
                      <img
                        src={mediaUrl(v(values, 'about_img'))}
                        alt={v(values, 'about_title') || data.slug}
                        className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
                      />
                    </div>
                  )}

                  <div className="space-y-6">
                    {aboutBlocks.map((block, index) => (
                      <div key={`${block.title}-${index}`} data-aos="fade-up" data-aos-delay={(index + 1) * 100}>
                        <h4 className="text-xl font-semibold text-foreground-950 mb-3 flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-primary-500 rounded-lg mr-3">
                            <i className={`${block.icon} text-white`}></i>
                          </div>
                          {block.title}
                        </h4>
                        <p className="text-foreground-700 leading-relaxed">{block.description}</p>
                      </div>
                    ))}

                    {(v(values, 'about_block4_title') || v(values, 'about_block4_desc') || aboutList.length > 0) && (
                      <div
                        className="bg-accent-100/50 rounded-xl p-6 border border-accent-200"
                        data-aos="fade-up"
                        data-aos-delay="400"
                      >
                        <h4 className="text-xl font-semibold text-foreground-950 mb-3 flex items-center">
                          <div className="w-8 h-8 flex items-center justify-center bg-accent-500 rounded-lg mr-3">
                            <i className={`${ABOUT_ICONS[3]} text-white`}></i>
                          </div>
                          {v(values, 'about_block4_title')}
                        </h4>
                        {v(values, 'about_block4_desc') && (
                          <p className="text-foreground-700 leading-relaxed mb-3">
                            {v(values, 'about_block4_desc')}
                          </p>
                        )}
                        {aboutList.length > 0 && (
                          <ul className="list-disc list-inside text-foreground-700 space-y-2 ml-4">
                            {aboutList.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      )}
      <Footer />
    </>
  );
}
