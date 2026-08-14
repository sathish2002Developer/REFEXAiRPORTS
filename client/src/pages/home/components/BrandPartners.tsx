import { useEffect, useRef } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const DEFAULT_BRANDS = [
    { name: 'Travel Food Services', image: 'https://readdy.ai/api/search-image?query=Modern%20airport%20food%20court%20with%20multiple%20cuisine%20stalls%20and%20bright%20warm%20lighting%2C%20clean%20interior%20design%2C%20diverse%20food%20counters%2C%20bustling%20atmosphere%2C%20editorial%20photography%2C%20simple%20neutral%20background&width=400&height=280&seq=partner-tfs&orientation=landscape' },
    { name: 'Jubilant FoodWorks', image: 'https://readdy.ai/api/search-image?query=Colorful%20spread%20of%20diverse%20Indian%20and%20international%20fast%20food%20dishes%20on%20a%20clean%20white%20table%2C%20warm%20studio%20lighting%2C%20vibrant%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-jubilant&orientation=landscape' },
    { name: 'SSP Group', image: 'https://readdy.ai/api/search-image?query=Premium%20airport%20dining%20restaurant%20with%20elegant%20table%20setting%2C%20modern%20interior%2C%20warm%20ambient%20lighting%2C%20sophisticated%20food%20service%20environment%2C%20editorial%20photography%2C%20clean%20background&width=400&height=280&seq=partner-ssp&orientation=landscape' },
    { name: 'Keventers', image: 'https://readdy.ai/api/search-image?query=Classic%20milkshake%20bar%20with%20tall%20glass%20milkshakes%20in%20pastel%20colors%2C%20retro%20diner%20ambiance%2C%20warm%20cozy%20lighting%2C%20vintage%20style%20milk%20bottles%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-keventers&orientation=landscape' },
    { name: 'Cafe Coffee Day', image: 'https://readdy.ai/api/search-image?query=Cozy%20coffee%20shop%20interior%20with%20steaming%20coffee%20cups%20on%20wooden%20tables%2C%20warm%20ambient%20lighting%2C%20comfortable%20seating%2C%20barista%20station%20in%20background%2C%20editorial%20cafe%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-ccd&orientation=landscape' },
    { name: 'Biriyani By Kilo', image: 'https://readdy.ai/api/search-image?query=Aromatic%20biryani%20dish%20in%20traditional%20handi%20pot%20with%20saffron%20rice%2C%20caramelized%20onions%2C%20fresh%20herbs%20garnish%2C%20warm%20golden%20lighting%2C%20premium%20food%20photography%2C%20simple%20dark%20background&width=400&height=280&seq=partner-bbk&orientation=landscape' },
    { name: 'Wow! Momo', image: 'https://readdy.ai/api/search-image?query=Steaming%20hot%20momos%20dumplings%20in%20bamboo%20steamer%20basket%20with%20red%20chili%20dipping%20sauce%2C%20fresh%20herbs%2C%20warm%20steam%20rising%2C%20editorial%20Asian%20street%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-wowmomo&orientation=landscape' },
    { name: 'Chai Point', image: 'https://readdy.ai/api/search-image?query=Traditional%20Indian%20tea%20chai%20in%20clay%20kulhad%20cups%20with%20ginger%20and%20spices%2C%20warm%20golden%20lighting%2C%20aromatic%20steam%2C%20rustic%20wooden%20surface%2C%20editorial%20beverage%20photography%2C%20simple%20background&width=400&height=280&seq=partner-chaipoint&orientation=landscape' },
    { name: 'Barbeque Nation', image: 'https://readdy.ai/api/search-image?query=Sizzling%20grilled%20meats%20and%20vegetables%20on%20live%20charcoal%20grill%20with%20flames%20and%20smoke%2C%20warm%20fiery%20lighting%2C%20premium%20barbecue%20spread%2C%20editorial%20food%20photography%2C%20simple%20dark%20background&width=400&height=280&seq=partner-bbq&orientation=landscape' },
    { name: 'Haldiram\'s', image: 'https://readdy.ai/api/search-image?query=Colorful%20assortment%20of%20Indian%20snacks%20and%20sweets%20in%20decorative%20bowls%2C%20namkeen%20and%20mithai%20spread%2C%20warm%20festive%20lighting%2C%20traditional%20Indian%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-haldirams&orientation=landscape' },
    { name: 'Street Foods by Punjab Grill', image: 'https://readdy.ai/api/search-image?query=North%20Indian%20street%20food%20platter%20with%20tandoori%20items%20and%20rich%20curries%2C%20vibrant%20spices%2C%20warm%20rustic%20lighting%2C%20clay%20serving%20dishes%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-punjabgrill&orientation=landscape' },
    { name: 'Andhra Dosas', image: 'https://readdy.ai/api/search-image?query=Crispy%20golden%20dosa%20on%20banana%20leaf%20with%20coconut%20chutney%20and%20sambar%2C%20south%20Indian%20breakfast%20spread%2C%20warm%20morning%20lighting%2C%20traditional%20food%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-andhra&orientation=landscape' },
    { name: 'Sagar Ratna', image: 'https://readdy.ai/api/search-image?query=South%20Indian%20vegetarian%20thali%20with%20idli%20vada%20sambar%20rasam%20and%20rice%20in%20brass%20vessels%2C%20banana%20leaf%20base%2C%20warm%20traditional%20lighting%2C%20editorial%20food%20photography%2C%20simple%20background&width=400&height=280&seq=partner-sagarratna&orientation=landscape' },
    { name: 'O2 Rise Cafe', image: 'https://readdy.ai/api/search-image?query=Modern%20minimalist%20cafe%20interior%20with%20oxygen%20plant%20decor%2C%20green%20plants%2C%20contemporary%20furniture%2C%20bright%20natural%20lighting%2C%20fresh%20and%20airy%20atmosphere%2C%20editorial%20architecture%20photography%2C%20clean%20background&width=400&height=280&seq=partner-o2rise&orientation=landscape' },
    { name: 'Tibetan Kitchen', image: 'https://readdy.ai/api/search-image?query=Tibetan%20momos%20and%20thukpa%20noodle%20soup%20in%20traditional%20bowls%2C%20Himalayan%20herbs%20and%20spices%2C%20warm%20cozy%20lighting%2C%20rustic%20wooden%20table%2C%20editorial%20Asian%20cuisine%20photography%2C%20simple%20background&width=400&height=280&seq=partner-tibetan&orientation=landscape' },
    { name: 'Wagh Bakri Tea Lounge', image: 'https://readdy.ai/api/search-image?query=Premium%20tea%20lounge%20with%20elegant%20porcelain%20tea%20cups%20and%20premium%20tea%20leaves%2C%20warm%20golden%20ambient%20lighting%2C%20sophisticated%20cafe%20setting%2C%20editorial%20beverage%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-waghbakri&orientation=landscape' },
    { name: 'Ferns N Petals', image: 'https://readdy.ai/api/search-image?query=Beautiful%20floral%20arrangement%20with%20fresh%20roses%20and%20mixed%20flowers%20in%20elegant%20wrapping%2C%20gift%20store%20setting%2C%20warm%20soft%20lighting%2C%20editorial%20floral%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-fnp&orientation=landscape' },
    { name: 'WhSmith', image: 'https://readdy.ai/api/search-image?query=Modern%20bookstore%20retail%20store%20with%20neatly%20arranged%20books%20magazines%20and%20stationery%2C%20warm%20wood%20shelving%2C%20bright%20inviting%20lighting%2C%20editorial%20retail%20interior%20photography%2C%20clean%20simple%20background&width=400&height=280&seq=partner-whsmith&orientation=landscape' },
    { name: 'Ather Energy', image: 'https://readdy.ai/api/search-image?query=Sleek%20modern%20electric%20scooter%20in%20premium%20showroom%20with%20clean%20lines%2C%20futuristic%20lighting%2C%20technology%20display%2C%20editorial%20product%20photography%2C%20minimal%20simple%20background&width=400&height=280&seq=partner-ather&orientation=landscape' },
    { name: 'Bose', image: 'https://readdy.ai/api/search-image?query=Premium%20wireless%20headphones%20on%20elegant%20display%20stand%20with%20soft%20bokeh%20lighting%2C%20high-end%20audio%20equipment%2C%20sleek%20modern%20design%2C%20editorial%20product%20photography%2C%20clean%20dark%20background&width=400&height=280&seq=partner-bose&orientation=landscape' },
];

export default function BrandPartners({
  data,
}: {
  data?: { title?: string; subtitle?: string; brands?: { name: string; image: string; url?: string }[] };
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const brands = data?.brands?.length ? data.brands : DEFAULT_BRANDS;
  const title = data?.title || 'Brand Partners';
  const subtitle = data?.subtitle || 'A portfolio of 50+ brands, united by a single vision';

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 1;

    const scroll = () => {
      scrollPosition += scrollSpeed;
      if (scrollPosition >= scrollContainer.scrollWidth / 3) {
        scrollPosition = 0;
      }
      scrollContainer.scrollLeft = scrollPosition;
    };

    const interval = setInterval(scroll, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12" data-aos="fade-up">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h3>
          <CmsHtml html={subtitle} className="text-gray-600 text-base max-w-2xl mx-auto" />
        </div>
        <div className="relative" data-aos="fade-up" data-aos-delay="200">
          <div className="overflow-hidden" ref={scrollRef}>
            <div className="flex gap-6 transition-transform duration-300 ease-linear">
              {[...brands, ...brands, ...brands].map((brand, index) => {
                const card = (
                  <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl shadow-sm transition-all duration-700 ease-out group-hover:shadow-xl group-hover:-translate-y-2">
                    <img
                      alt={brand.name}
                      className="w-full h-full object-cover object-top transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-115"
                      src={mediaUrl(brand.image)}
                    />
                    <div className="absolute inset-0 bg-black/0 transition-all duration-700 ease-out group-hover:bg-black/10" />
                  </div>
                );
                return (
                  <div
                    key={index}
                    className="group flex-shrink-0 w-40 sm:w-48 md:w-52 cursor-pointer"
                  >
                    {brand.url ? (
                      <a href={brand.url} target="_blank" rel="noopener noreferrer">
                        {card}
                      </a>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
