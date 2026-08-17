import { useEffect, useLayoutEffect, useRef, useState, type TransitionEvent } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const MODAL_MS = 2200;
const MODAL_EASE = 'cubic-bezier(0.45, 0.05, 0.15, 1)';
/** Start in-window on the right (~28% of viewport), then slide to center. */
const MODAL_START_X = 'min(28vw, 18rem)';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  bio: string;
}

const LeadershipTeam = ({
  data,
}: {
  data?: {
    title?: string;
    subtitle?: string;
    foundersTitle?: string;
    founders?: TeamMember[];
    mgmtTitle?: string;
    management?: TeamMember[];
  };
}) => {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const closingRef = useRef(false);

  const openMember = (member: TeamMember) => {
    closingRef.current = false;
    setSelectedMember(member);
  };

  const closeMember = () => {
    closingRef.current = true;
    setModalOpen(false);
  };

  useLayoutEffect(() => {
    if (!selectedMember || closingRef.current) return;
    const frame = requestAnimationFrame(() => setModalOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [selectedMember]);

  useEffect(() => {
    if (modalOpen || !selectedMember || !closingRef.current) return;
    const timer = window.setTimeout(() => {
      setSelectedMember(null);
      closingRef.current = false;
    }, MODAL_MS + 40);
    return () => window.clearTimeout(timer);
  }, [modalOpen, selectedMember]);

  const handleModalTransitionEnd = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.propertyName !== 'transform') return;
    if (!closingRef.current) return;
    setSelectedMember(null);
    closingRef.current = false;
  };

  const defaultFounders: TeamMember[] = [
    {
      name: 'Sidharath Kapur',
      position: 'Founder & Board Member',
      image: 'https://refexairports.com/wp-content/uploads/2023/09/Sidharath-Kapur.png',
      bio: 'Sidharath Kapur is a visionary leader with extensive experience in the aviation and retail industry.'
    },
    {
      name: 'Romy Juneja',
      position: 'Founder & Board Member',
      image: 'https://refexairports.com/wp-content/uploads/2023/09/Romy-Junja-.png',
      bio: 'Romy Juneja brings decades of expertise in transportation and business development.'
    }
  ];

  const defaultManagement: TeamMember[] = [
    {
      name: 'Debamita',
      position: 'Head - Pune Airport',
      image: 'https://refexairports.com/wp-content/uploads/2023/10/Debamitha-Image.png',
      bio: 'Debamita leads operations at Pune Airport with a focus on excellence and customer satisfaction.'
    },
    {
      name: 'Showkat Mirza',
      position: 'Head - Srinagar Airport',
      image: 'https://refexairports.com/wp-content/uploads/2024/01/Showkat-Mirza.png',
      bio: 'Showkat Mirza oversees all retail operations at Srinagar Airport.'
    }
  ];

  const founders = data?.founders?.length ? data.founders : defaultFounders;
  const management = data?.management?.length ? data.management : defaultManagement;

  return (
    <>
      <section className="w-full bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-6">

          {/* Founders Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12" data-aos="fade-up">
              {data?.foundersTitle || 'Founders and Board Members'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {founders.map((member, index) => (
                <div key={member.name} className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="relative mb-6 overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7bbf45] to-[#5a9933] rounded-3xl transform rotate-6"></div>
                    <img
                      src={mediaUrl(member.image)}
                      alt={member.name}
                      className="relative w-52 h-52 sm:w-64 sm:h-64 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h4>
                  <button
                    onClick={() => openMember(member)}
                    className="text-[#7bbf45] hover:text-[#5a9933] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Know more
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Management Section */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12" data-aos="fade-up">
              {data?.mgmtTitle || 'Management'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {management.map((member, index) => (
                <div key={member.name} className="flex flex-col items-center" data-aos="zoom-in" data-aos-delay={index * 100}>
                  <div className="relative mb-6 overflow-hidden rounded-3xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7bbf45] to-[#5a9933] rounded-3xl transform rotate-6"></div>
                    <img
                      src={mediaUrl(member.image)}
                      alt={member.name}
                      className="relative w-52 h-52 sm:w-64 sm:h-64 object-cover rounded-3xl transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h4>
                  <p className="text-gray-600 mb-3">{member.position}</p>
                  <button
                    onClick={() => openMember(member)}
                    className="text-[#7bbf45] hover:text-[#5a9933] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Know more
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className={`absolute inset-0 bg-black/50 transition-opacity ${
              modalOpen ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ transitionDuration: `${MODAL_MS}ms`, transitionTimingFunction: MODAL_EASE }}
            onClick={closeMember}
          />
          <div
            className="relative bg-white rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto transform-gpu will-change-transform"
            style={{
              transitionProperty: 'transform, opacity',
              transitionDuration: `${MODAL_MS}ms`,
              transitionTimingFunction: MODAL_EASE,
              transform: modalOpen ? 'translate3d(0, 0, 0)' : `translate3d(${MODAL_START_X}, 0, 0)`,
              opacity: modalOpen ? 1 : 0.45,
            }}
            onClick={(e) => e.stopPropagation()}
            onTransitionEnd={handleModalTransitionEnd}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                  {selectedMember.name}
                </h3>
                <p className="text-gray-600 text-lg">{selectedMember.position}</p>
              </div>
              <button
                onClick={closeMember}
                className="text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-3xl"></i>
              </button>
            </div>
            <img
              src={mediaUrl(selectedMember.image)}
              alt={selectedMember.name}
              className="w-48 h-48 object-cover rounded-2xl mx-auto mb-6"
            />
            <CmsHtml html={selectedMember.bio} className="text-gray-700 text-lg leading-relaxed" />
          </div>
        </div>
      )}
    </>
  );
};

export default LeadershipTeam;
