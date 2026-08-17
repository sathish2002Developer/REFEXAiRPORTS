import React, { useEffect, useMemo, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../../components/feature/Header';
import TravelerHero from '../../components/feature/TravelerHero';
import { cmsGet } from '@/lib/api';
import { travelersAirports, type AirportTravelersData } from '../admin/travelers-editor/travelersData';

const CONTACT_FAQ = 'Please click here to Contact us or fill up enquiry form.';

function fallbackFor(airportKey: string): AirportTravelersData {
  return (
    travelersAirports.find((a) => a.id === airportKey) || travelersAirports[0]
  );
}

function normalizeCms(airportKey: string, payload: Record<string, any> | null): AirportTravelersData {
  const fallback = fallbackFor(airportKey);
  if (!payload) return fallback;
  return {
    ...fallback,
    ...payload,
    id: airportKey,
    terminals: Array.isArray(payload.terminals) ? payload.terminals : fallback.terminals,
    faqs: Array.isArray(payload.faqs) ? payload.faqs : fallback.faqs,
    brands: Array.isArray(payload.brands) ? payload.brands : fallback.brands,
  };
}

function goToContact(e: React.MouseEvent) {
  e.preventDefault();
  if (window.location.pathname !== '/') {
    window.REACT_APP_NAVIGATE('/');
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return;
  }
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

export default function AirportTravelersPage({ airportKey }: { airportKey: string }) {
  const [data, setData] = useState<AirportTravelersData>(() => fallbackFor(airportKey));
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [openFAQIndex, setOpenFAQIndex] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: true, offset: 100 });
  }, []);

  useEffect(() => {
    setData(fallbackFor(airportKey));
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedLocation('');
    setOpenFAQIndex(0);

    let cancelled = false;
    const load = () => {
      cmsGet<Record<string, any>>(`travelers/${airportKey}`)
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

  const stores = data.brands || [];
  const categories = useMemo(
    () => Array.from(new Set(stores.map((store) => store.category))).sort(),
    [stores]
  );
  const locations = useMemo(
    () => Array.from(new Set(stores.map((store) => store.location))).sort(),
    [stores]
  );

  const filteredStores = stores.filter((store) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      store.name.toLowerCase().includes(q) || store.description.toLowerCase().includes(q);
    const matchesCategory = !selectedCategory || store.category === selectedCategory;
    const matchesLocation = !selectedLocation || store.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <TravelerHero
        airportName={data.heroAirportName}
        tagline={data.heroTagline}
        backgroundImage={data.heroBackground}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-16">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8" data-aos="fade-up">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2879b1] focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2879b1] focus:border-transparent outline-none transition-all cursor-pointer"
              >
                <option value="">All Locations</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6" data-aos="fade-up" data-aos-delay="100">
          <p className="text-sm text-gray-600">
            Showing <strong className="text-gray-900">{filteredStores.length}</strong> of{' '}
            <strong className="text-gray-900">{stores.length}</strong> brands
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden" data-aos="fade-up" data-aos-delay="150">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Brand</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStores.map((store, index) => (
                  <tr key={`${store.name}-${index}`} className="transition-colors">
                    <td className="px-6 py-6">
                      <div className="flex items-center justify-center">
                        <img
                          src={store.logo}
                          alt={store.name}
                          className="w-32 h-32 sm:w-56 sm:h-56 object-contain"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-6 text-gray-600 max-w-md">{store.description}</td>
                    <td className="px-6 py-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#2879b1]/10 text-[#2879b1] whitespace-nowrap">
                        {store.category}
                      </span>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2 text-gray-600">
                        <div className="w-4 h-4 flex items-center justify-center">
                          <i className="ri-map-pin-line"></i>
                        </div>
                        <span className="whitespace-nowrap">{store.location}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredStores.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <i className="ri-search-line text-4xl text-gray-300"></i>
              </div>
              <p className="text-gray-500 text-sm">No brands found matching your criteria</p>
            </div>
          )}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8" data-aos="fade-up">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-2">{data.terminalTitle}</h3>
            <p className="text-gray-600">{data.terminalSubtitle}</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(data.terminals || []).map((terminal, index) => (
              <div
                key={`${terminal.name}-${index}`}
                className="group bg-gray-50 rounded-lg p-4 text-center hover:bg-blue-50 hover:-translate-y-1 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className="w-8 h-8 flex items-center justify-center mx-auto mb-2 text-[#2879b1] transition-transform duration-300 group-hover:scale-110">
                  <i className="ri-map-pin-fill"></i>
                </div>
                <div className="font-medium text-gray-900 text-sm mb-1">{terminal.name}</div>
                <div className="text-xs text-gray-500">{terminal.count} stores</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-200 p-6 md:p-8" data-aos="fade-up">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-teal-600 text-sm font-semibold mb-4 tracking-wider uppercase">
                {data.faqLabel}
              </p>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                {data.faqTitle}
              </h2>
            </div>
            <div className="space-y-4">
              {(data.faqs || []).map((faq, index) => (
                <div
                  key={`${faq.question}-${index}`}
                  className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                >
                  <button
                    onClick={() => setOpenFAQIndex(openFAQIndex === index ? -1 : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                    aria-expanded={openFAQIndex === index}
                  >
                    <span className="text-base font-semibold text-gray-900 pr-4">{faq.question}</span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                      <i
                        className={`fas fa-angle-${openFAQIndex === index ? 'up' : 'down'} text-gray-600 transition-transform duration-300`}
                      ></i>
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQIndex === index ? 'max-h-96' : 'max-h-0'
                    }`}
                  >
                    <div className="px-6 pb-5 pt-2">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {faq.answer === CONTACT_FAQ ? (
                          <>
                            Please{' '}
                            <a
                              href="#contact"
                              onClick={goToContact}
                              className="text-[#2879b1] hover:underline cursor-pointer font-medium"
                            >
                              click here
                            </a>{' '}
                            to Contact us or fill up enquiry form.
                          </>
                        ) : (
                          faq.answer
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
