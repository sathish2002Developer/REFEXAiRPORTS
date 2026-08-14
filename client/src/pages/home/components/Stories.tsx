import { useRef, useState, useEffect, useCallback } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

interface Story {
  tag?: string;
  title: string;
  description: string;
  image: string;
}

function StoryCard({ story, isEntering }: { story: Story; isEntering: boolean }) {
  if (!story) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 bg-gray-50 rounded-3xl overflow-hidden w-full">
      <div className="w-full lg:w-1/2 shrink-0">
        <div className="relative overflow-hidden h-64 sm:h-72 md:h-80 lg:h-[480px] bg-gray-100">
          {story.image ? (
            <img
              src={mediaUrl(story.image)}
              alt={story.title}
              className={`w-full h-full object-cover ${isEntering ? 'animate-story-image-settle' : ''}`}
            />
          ) : null}
        </div>
      </div>

      <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 space-y-4">
        {story.tag ? (
          <span className="inline-block text-sm font-semibold tracking-wide uppercase text-[#2879b1]">
            {story.tag}
          </span>
        ) : null}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {story.title || 'Untitled story'}
        </h3>
        <CmsHtml
          html={story.description}
          className="text-base md:text-lg text-gray-600 leading-relaxed"
        />
      </div>
    </div>
  );
}

const defaultStories: Story[] = [
  {
    tag: 'Milestone',
    title: 'Completion of 1 Year at Pune Airport',
    description:
      "Refex Airports & Transportation proudly completes one year of operations at Pune Airport. Over the past year, we have worked closely with our brand partners and airport stakeholders to enhance the passenger retail experience from curating an exciting mix of stores to improving on-ground engagement and service standards.",
    image:
      'https://readdy.ai/api/search-image?query=Modern%20airport%20terminal%20interior%20with%20retail%20stores%2C%20passengers%20walking%20through%20bright%20spacious%20corridors%2C%20contemporary%20architecture%20with%20glass%20and%20steel%20elements%2C%20professional%20commercial%20photography%20style&width=800&height=500&seq=pune-anniversary-v2&orientation=landscape',
  },
  {
    tag: 'Campaign',
    title: 'Fly Buy Summer Campaign',
    description:
      "Refex Airports introduced the 'Fly Buy Summer' campaign this season, transforming airport spaces into vibrant, engaging hubs for travellers. The campaign was designed to encourage customer interaction through attractive shopping offers and vibrant store displays, making every journey a memorable retail experience.",
    image:
      'https://readdy.ai/api/search-image?query=Vibrant%20airport%20retail%20campaign%20with%20colorful%20summer%20displays%2C%20shopping%20promotional%20banners%2C%20travelers%20engaging%20with%20stores%2C%20bright%20modern%20airport%20interior%20with%20summer%20themed%20decorations&width=800&height=500&seq=fly-buy-summer-v2&orientation=landscape',
  },
  {
    tag: 'Program',
    title: 'Brand Wars Initiative',
    description:
      "In a bid to recognize and celebrate outstanding retail performance, Refex Airports introduced 'Brand Wars', an internal incentive program aimed at rewarding excellence and fostering collaboration among our retail partners. It helped brands to engage in a healthy competition while encouraging them to perform better.",
    image:
      'https://readdy.ai/api/search-image?query=Airport%20retail%20competition%20event%20with%20brand%20displays%2C%20award%20ceremony%20setup%2C%20retail%20partners%20celebrating%2C%20modern%20airport%20terminal%20with%20competitive%20retail%20environment%2C%20professional%20business%20photography&width=800&height=500&seq=brand-wars-v2&orientation=landscape',
  },
  {
    tag: 'Celebration',
    title: 'Diwali Celebrations at Terminals',
    description:
      'From beautifully decorated store fronts to small gestures of celebration, the festive mood could be felt throughout the terminals. The Diwali season reminded us once again that our spaces are not just transit points, but places where people connect, share moments, and experience the joy of togetherness.',
    image:
      'https://readdy.ai/api/search-image?query=Airport%20terminal%20decorated%20for%20Diwali%20festival%20with%20traditional%20Indian%20decorations%2C%20colorful%20lights%2C%20festive%20store%20displays%2C%20passengers%20enjoying%20celebrations%2C%20warm%20lighting%20and%20cultural%20elements&width=800&height=500&seq=diwali-celebration-v2&orientation=landscape',
  },
  {
    tag: 'Expansion',
    title: 'New Store Openings at Pune & Srinagar',
    description:
      'Refex Airports continues to expand its retail footprint with the addition of new stores across Pune and Srinagar airports. The new outlets bring a mix of popular brands and local favourites, offering travellers more variety and convenience on the go. Each opening marks another step towards creating vibrant, engaging spaces.',
    image:
      'https://readdy.ai/api/search-image?query=New%20retail%20store%20opening%20in%20airport%20terminal%2C%20modern%20store%20front%20design%2C%20ribbon%20cutting%20ceremony%2C%20airport%20retail%20expansion%2C%20contemporary%20commercial%20space%20with%20brand%20displays&width=800&height=500&seq=store-opening-v2&orientation=landscape',
  },
];

export default function Stories({
  data,
}: {
  data?: { title?: string; subtitle?: string; items?: Story[] };
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [exitIndex, setExitIndex] = useState<number | null>(null);
  const [enterIndex, setEnterIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<'idle' | 'transitioning'>('idle');
  const [hasEnteredViewport, setHasEnteredViewport] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const stories: Story[] = Array.isArray(data?.items)
    ? data.items.map((item) => ({
        tag: item?.tag || '',
        title: item?.title || '',
        description: item?.description || '',
        image: item?.image || '',
      }))
    : defaultStories;
  const storiesTitle = data?.title || 'Stories from our Terminals';
  const storiesSubtitle =
    data?.subtitle ||
    'Discover the latest updates, campaigns, and milestones from our airport operations across India';

  const clearTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  useEffect(() => {
    setActiveIndex((current) => {
      if (!stories.length) return 0;
      return Math.min(current, stories.length - 1);
    });
    setExitIndex(null);
    setEnterIndex(null);
    setPhase('idle');
  }, [stories.length]);

  const goTo = useCallback((targetIndex: number) => {
    if (
      phase !== 'idle' ||
      targetIndex === activeIndex ||
      targetIndex < 0 ||
      targetIndex >= stories.length
    ) {
      return;
    }

    clearTimers();
    setPhase('transitioning');
    setExitIndex(activeIndex);
    setEnterIndex(targetIndex);

    const t1 = setTimeout(() => {
      setExitIndex(null);
    }, 400);

    const t2 = setTimeout(() => {
      setActiveIndex(targetIndex);
      setEnterIndex(null);
      setPhase('idle');
    }, 900);

    timersRef.current = [t1, t2];
  }, [activeIndex, phase, stories.length, clearTimers]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEnteredViewport(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isHovered || phase !== 'idle' || stories.length < 2) return;

    const interval = setInterval(() => {
      const next = (activeIndex + 1) % stories.length;
      goTo(next);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHovered, phase, activeIndex, stories.length, goTo]);

  useEffect(() => {
    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  const handlePrev = () => goTo(activeIndex - 1);
  const handleNext = () => goTo(activeIndex + 1);

  const displayedIndex = enterIndex !== null ? enterIndex : activeIndex;
  const isNavDisabled = phase !== 'idle';
  const currentStory = stories[activeIndex];
  const exitStory = exitIndex !== null ? stories[exitIndex] : null;
  const enterStory = enterIndex !== null ? stories[enterIndex] : null;

  return (
    <section
      ref={sectionRef}
      className={`py-14 md:py-20 bg-white ${hasEnteredViewport ? 'animate-stories-entrance' : 'opacity-0'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {storiesTitle}
          </h2>
          <CmsHtml
            html={storiesSubtitle}
            className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          />
        </div>
      </div>

      {!stories.length ? (
        <p className="text-center text-gray-500 px-4">No stories yet.</p>
      ) : (
        <>
          <div className="relative max-w-7xl mx-auto px-4 md:px-6">
            <div className="relative overflow-hidden rounded-3xl bg-gray-50 min-h-[600px] md:min-h-[680px] lg:min-h-[480px]">
              {phase === 'transitioning' ? (
                <>
                  {exitStory && (
                    <div
                      key={`exit-${exitIndex}`}
                      className="absolute inset-0 z-10 animate-story-exit"
                    >
                      <StoryCard story={exitStory} isEntering={false} />
                    </div>
                  )}
                  {enterStory && (
                    <div
                      key={`enter-${enterIndex}`}
                      className="absolute inset-0 z-[5] animate-story-enter"
                    >
                      <StoryCard story={enterStory} isEntering />
                    </div>
                  )}
                </>
              ) : (
                currentStory && (
                  <div key={`active-${activeIndex}`}>
                    <StoryCard story={currentStory} isEntering={false} />
                  </div>
                )
              )}
            </div>

            {stories.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap ${
                    isNavDisabled || activeIndex === 0
                      ? 'opacity-30 pointer-events-none'
                      : 'opacity-100'
                  }`}
                  aria-label="Previous story"
                  type="button"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-left-s-line text-2xl" />
                  </div>
                </button>

                <button
                  onClick={handleNext}
                  className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap ${
                    isNavDisabled || activeIndex === stories.length - 1
                      ? 'opacity-30 pointer-events-none'
                      : 'opacity-100'
                  }`}
                  aria-label="Next story"
                  type="button"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-arrow-right-s-line text-2xl" />
                  </div>
                </button>
              </>
            )}
          </div>

          {stories.length > 1 && (
            <div className="flex justify-center gap-3 mt-10 flex-wrap px-4">
              {stories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    index === displayedIndex
                      ? 'w-8 bg-[#2879b1]'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  } ${isNavDisabled ? 'pointer-events-none' : ''}`}
                  aria-label={`Go to story ${index + 1}`}
                  type="button"
                />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
}
