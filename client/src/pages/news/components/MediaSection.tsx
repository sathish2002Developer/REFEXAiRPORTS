export default function MediaSection() {
  const mediaItems = [
    {
      title: "Because Even in Transit, There's Always a Reason to Celebrate!",
      description:
        'From beautifully decorated store fronts to small gestures of celebration, the festive mood could be felt throughout the terminals. The Diwali season reminded us once again that our spaces are not just transit points, but places where people connect, share moments, and experience the joy of togetherness.',
      images: [
        'https://readdy.ai/api/search-image?query=Airport%20terminal%20decorated%20for%20Diwali%20festival%20with%20traditional%20Indian%20decorations%2C%20colorful%20lights%20and%20diyas%2C%20festive%20store%20displays%20with%20rangoli%20patterns%2C%20passengers%20enjoying%20celebrations%2C%20warm%20golden%20lighting%20and%20cultural%20elements%2C%20professional%20event%20photography&width=600&height=400&seq=diwali-media-1&orientation=landscape',
        'https://readdy.ai/api/search-image?query=Beautiful%20Diwali%20decorated%20airport%20retail%20stores%20with%20traditional%20Indian%20festive%20decorations%2C%20colorful%20marigold%20flowers%2C%20illuminated%20diyas%20and%20lanterns%2C%20festive%20shopping%20atmosphere%2C%20warm%20ambient%20lighting%2C%20professional%20commercial%20photography&width=600&height=400&seq=diwali-media-2&orientation=landscape',
        'https://readdy.ai/api/search-image?query=Airport%20staff%20and%20travelers%20celebrating%20Diwali%20festival%2C%20traditional%20Indian%20decorations%20in%20modern%20airport%20terminal%2C%20festive%20atmosphere%20with%20lights%20and%20decorations%2C%20people%20sharing%20joy%20and%20togetherness%2C%20professional%20event%20photography&width=600&height=400&seq=diwali-media-3&orientation=landscape',
        'https://readdy.ai/api/search-image?query=Diwali%20celebration%20at%20airport%20terminal%20entrance%20with%20grand%20festive%20decorations%2C%20traditional%20Indian%20welcome%20setup%2C%20colorful%20rangoli%20art%2C%20illuminated%20lamps%20and%20flowers%2C%20modern%20airport%20architecture%20with%20cultural%20elements%2C%20professional%20photography&width=600&height=400&seq=diwali-media-4&orientation=landscape',
      ],
      date: 'November 2024',
    },
  ];

  return (
    <div className="space-y-12">
      {mediaItems.map((item, index) => (
        <article key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8 lg:p-10">
            <div className="flex items-center justify-end mb-6">
              <div className="flex items-center text-sm text-gray-500">
                <i className="ri-calendar-line mr-2"></i>
                <span>{item.date}</span>
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">{item.title}</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">{item.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {item.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 group"
                >
                  <img
                    alt={`${item.title} - Image ${imgIndex + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    src={image}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center bg-white/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                    <i className="ri-zoom-in-line text-2xl text-gray-900"></i>
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <div className="flex items-center text-sm text-gray-500">
                <i className="ri-image-line mr-2 text-teal-600"></i>
                <span>{item.images.length} Photos</span>
              </div>
              <button className="inline-flex items-center px-6 py-3 bg-[#7bbf45] text-white font-medium rounded-lg hover:bg-[#6aaf35] transition-colors duration-200 whitespace-nowrap cursor-pointer">
                View Full Gallery
                <i className="ri-gallery-line ml-2"></i>
              </button>
            </div>
          </div>
        </article>
      ))}

      {/* Removed "Share Your Airport Moments" section as per user request */}
    </div>
  );
}
