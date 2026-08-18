import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import Footer from '../../components/feature/Footer';
import AirportComingSoon from '../../components/feature/AirportComingSoon';
import { cmsGet } from '@/lib/api';
import { resolveComingSoon } from '@/lib/comingSoon';
import { loungeAirports, type AirportLoungeData } from '../admin/lounge-editor/loungeData';

function fallbackFor(airportKey: string): AirportLoungeData {
  return loungeAirports.find((a) => a.id === airportKey) || loungeAirports[0];
}

function normalizeCms(airportKey: string, payload: Record<string, any> | null): AirportLoungeData {
  const fallback = fallbackFor(airportKey);
  if (!payload) return fallback;
  return {
    ...fallback,
    ...payload,
    id: airportKey,
    amenities: Array.isArray(payload.amenities) ? payload.amenities : fallback.amenities,
    accessOptions: Array.isArray(payload.accessOptions) ? payload.accessOptions : fallback.accessOptions,
    comingSoon: resolveComingSoon(payload, fallback.comingSoon),
  };
}

export default function AirportLoungePage({ airportKey }: { airportKey: string }) {
  const [data, setData] = useState<AirportLoungeData>(() => fallbackFor(airportKey));
  const [activeTab, setActiveTab] = useState<'overview' | 'amenities' | 'access'>('overview');

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
  }, []);

  useEffect(() => {
    setData(fallbackFor(airportKey));
    setActiveTab('overview');
    let cancelled = false;
    const load = () => {
      cmsGet<Record<string, any>>(`lounge/${airportKey}`)
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

  const tabCls = (tab: typeof activeTab) =>
    `px-8 py-3 rounded-full font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
      activeTab === tab ? 'bg-[#2879b1] text-white shadow-md' : 'text-gray-600 hover:text-gray-900'
    }`;

  return (
    <>
      <Header />
      {data.comingSoon ? (
        <AirportComingSoon
          airportName={data.heroTitle || data.name}
          backgroundImage={data.heroBackground}
        />
      ) : (
      <div className="min-h-screen bg-gray-50">
        <div className="relative h-[400px] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${data.heroBackground}')` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-6 flex items-center">
            <div className="text-white max-w-2xl" data-aos="fade-right">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 flex items-center justify-center mr-3">
                  <i className="ri-vip-crown-line text-4xl"></i>
                </div>
                <h1 className="text-5xl font-bold">{data.heroTitle}</h1>
              </div>
              <p className="text-xl text-blue-100 mb-6">{data.heroSubtitle}</p>
              <p className="text-lg leading-relaxed">{data.heroTagline}</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex justify-center mb-12" data-aos="fade-up">
            <div className="inline-flex bg-gray-100 rounded-full p-1">
              <button onClick={() => setActiveTab('overview')} className={tabCls('overview')}>Lounge Overview</button>
              <button onClick={() => setActiveTab('amenities')} className={tabCls('amenities')}>Amenities</button>
              <button onClick={() => setActiveTab('access')} className={tabCls('access')}>Access & Pricing</button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12" data-aos="fade-up">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.overviewTitle}</h3>
                <div className="prose max-w-none mb-8">
                  {data.overviewPara1 && <p className="text-gray-700 leading-relaxed mb-4">{data.overviewPara1}</p>}
                  {data.overviewPara2 && <p className="text-gray-700 leading-relaxed">{data.overviewPara2}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-4">
                      <i className="ri-time-line text-2xl text-white"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{data.hoursTitle}</h4>
                    <p className="text-gray-600">{data.hoursDesc}</p>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg mb-4">
                      <i className="ri-group-line text-2xl text-white"></i>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{data.capacityTitle}</h4>
                    <p className="text-gray-600">{data.capacityDesc}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.amenitiesTitle}</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(data.amenities || []).map((feature, index) => (
                    <div
                      key={`${feature.title}-${index}`}
                      className="p-6 bg-gray-50 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg mb-3">
                        <i className={`${feature.icon} text-xl text-white`}></i>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'access' && (
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{data.accessTitle}</h3>
                <div className="space-y-4">
                  {(data.accessOptions || []).map((option, index) => (
                    <div
                      key={`${option.type}-${index}`}
                      className="flex items-start p-5 bg-gray-50 rounded-xl border border-gray-100"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <div className="w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#2879b1] to-[#1a5075] rounded-lg mr-4 flex-shrink-0">
                        <i className={`${option.icon} text-xl text-white`}></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{option.type}</h4>
                        <p className="text-sm text-gray-600">{option.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {(data.infoTitle || data.infoDesc) && (
                  <div className="mt-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100" data-aos="fade-up" data-aos-delay="400">
                    <div className="flex items-start">
                      <div className="w-10 h-10 flex items-center justify-center bg-white rounded-lg mr-4 flex-shrink-0 shadow-sm">
                        <i className="ri-information-line text-xl text-amber-600"></i>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{data.infoTitle}</h4>
                        <p className="text-gray-700 leading-relaxed text-sm">{data.infoDesc}</p>
                      </div>
                    </div>
                  </div>
                )}
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
