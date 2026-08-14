import { useState, FormEvent } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';

export default function Contact({
  data,
}: {
  data?: {
    title?: string;
    subtitle?: string;
    formTitle?: string;
    locations?: { name?: string; subtitle?: string; phone?: string; email?: string; address?: string }[];
  };
}) {
  const [formData, setFormData] = useState({
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    locations: [] as string[],
    message: '',
  });

  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCheckboxChange = (field: 'locations', value: string) => {
    setFormData((prev) => {
      const array = prev[field];
      if (array.includes(value)) {
        return { ...prev, [field]: array.filter((item) => item !== value) };
      } else {
        return { ...prev, [field]: [...array, value] };
      }
    });
  };

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setFormData((prev) => ({ ...prev, message: value }));
      setCharCount(value.length);
    }
  };

  const isFormValid = () => {
    return formData.businessName && formData.contactPerson && formData.email && formData.phone;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    try {
      const submitData = new URLSearchParams();
      submitData.append('businessName', formData.businessName);
      submitData.append('contactPerson', formData.contactPerson);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.locations.join(', '));
      submitData.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d4fvkns65ccm3ui4r200', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: submitData.toString(),
      });

      if (response.ok) {
        alert('Thank you for your enquiry! We will get back to you soon.');
        setFormData({
          businessName: '',
          contactPerson: '',
          email: '',
          phone: '',
          locations: [],
          message: '',
        });
        setCharCount(0);
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{data?.title || 'Contact us'}</h2>
            <CmsHtml
              html={data?.subtitle || "Your journey to retail excellence begins here. Drop us a message and we'll guide the way."}
              className="text-gray-600 text-lg mb-12"
            />

            {(data?.locations?.length
              ? data.locations
              : [
                  {
                    name: 'Pune International Airport (PNQ)',
                    subtitle: 'Lohegaon, Pune, Maharashtra',
                    phone: '+91 95388 82531',
                    email: 'debamita.n@refex.co.in',
                    address:
                      'Unit no.304, UrbanWrk, 3rd Floor, Aeromall, 333, Domestic, Airport Road, Pune International Airport Area, Lohegaon, Pune - 411032, Maharashtra.',
                  },
                  {
                    name: 'Srinagar International Airport (SXR)',
                    subtitle: 'Humhama, Srinagar, Jammu & Kashmir',
                    phone: '+91 91497 68998',
                    email: 'showkatahmad.m@refex.co.in',
                    address: 'Srinagar International Airport, Ground floor, Humhama-Srinagar 190007',
                  },
                  {
                    name: 'Tiruchirappalli International Airport (TRZ)',
                    subtitle: 'Tiruchirappalli, Tamil Nadu',
                    phone: '+91 95388 82531',
                    email: 'debamita.n@refex.co.in',
                    address: 'Tiruchirappalli International Airport, Trichy - 620007, Tamil Nadu.',
                  },
                  {
                    name: 'Aurangabad Airport (IXU)',
                    subtitle: 'Chikalthana, Aurangabad, Maharashtra',
                    phone: '+91 95388 82531',
                    email: 'debamita.n@refex.co.in',
                    address: 'Aurangabad Airport, Chikalthana, Aurangabad - 431007, Maharashtra.',
                  },
                  {
                    name: 'Shirdi International Airport (SAG)',
                    subtitle: 'Kakadi, Shirdi, Maharashtra',
                    phone: '+91 95388 82531',
                    email: 'debamita.n@refex.co.in',
                    address: 'Shirdi International Airport, Kakadi, Shirdi - 423109, Maharashtra.',
                  },
                ]
            ).map((loc, index) => (
              <div key={loc.name || index} className={index === 4 ? 'mb-8' : 'mb-10'} data-aos="fade-up" data-aos-delay={String(100 + index * 50)}>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <i className="ri-plane-line text-[#7bbf45] mr-2"></i>
                  {loc.name}
                </h3>
                {loc.subtitle && <p className="text-sm text-gray-500 mb-3">{loc.subtitle}</p>}
                <div className="space-y-3">
                  {loc.phone && (
                    <div className="flex items-center">
                      <i className="fas fa-phone text-[#7bbf45] w-5"></i>
                      <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="ml-3 text-gray-700 hover:text-[#7bbf45] cursor-pointer">
                        {loc.phone}
                      </a>
                    </div>
                  )}
                  {loc.email && (
                    <div className="flex items-center">
                      <i className="fas fa-envelope text-[#7bbf45] w-5"></i>
                      <a href={`mailto:${loc.email}`} className="ml-3 text-gray-700 hover:text-[#7bbf45] cursor-pointer">
                        {loc.email}
                      </a>
                    </div>
                  )}
                  {loc.address && (
                    <div className="flex items-start">
                      <i className="fas fa-map-marker-alt text-[#7bbf45] w-5 mt-1"></i>
                      <div className="ml-3 text-gray-700 text-sm leading-relaxed">{loc.address}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            <div className="flex space-x-4" data-aos="fade-up" data-aos-delay="350">
              <a
                href="https://www.linkedin.com/company/refex-group/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#7bbf45] hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a
                href="https://twitter.com/GroupRefex"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#7bbf45] hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a
                href="https://www.facebook.com/refexindustrieslimited/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#7bbf45] hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-facebook"></i>
              </a>
              <a
                href="https://www.instagram.com/refexgroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#7bbf45] hover:text-white transition-colors cursor-pointer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8" data-aos="fade-left">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Quick Connect</p>
              <h3 className="text-2xl font-bold">
                {data?.formTitle || "Let's Elevate Your Retail Business Together"}
              </h3>
            </div>
            <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  placeholder="Business Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7bbf45] focus:border-transparent text-sm"
                  required
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  name="businessName"
                />
              </div>
              <div>
                <input
                  placeholder="Contact Person"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7bbf45] focus:border-transparent text-sm"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  name="contactPerson"
                />
              </div>
              <div>
                <input
                  placeholder="Email address"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7bbf45] focus:border-transparent text-sm"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  name="email"
                />
              </div>
              <div>
                <input
                  placeholder="Phone number"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7bbf45] focus:border-transparent text-sm"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  name="phone"
                  required
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Select Location</p>
                <div className="space-y-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                      type="checkbox"
                      checked={formData.locations.includes('Pune Airport')}
                      onChange={() => handleCheckboxChange('locations', 'Pune Airport')}
                      name="location"
                    />
                    Pune Airport
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                      type="checkbox"
                      checked={formData.locations.includes('Srinagar Airport')}
                      onChange={() => handleCheckboxChange('locations', 'Srinagar Airport')}
                      name="location"
                    />
                    Srinagar Airport
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                      type="checkbox"
                      checked={formData.locations.includes('Trichy Airport')}
                      onChange={() => handleCheckboxChange('locations', 'Trichy Airport')}
                      name="location"
                    />
                    Trichy Airport
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                      type="checkbox"
                      checked={formData.locations.includes('Aurangabad Airport')}
                      onChange={() => handleCheckboxChange('locations', 'Aurangabad Airport')}
                      name="location"
                    />
                    Aurangabad Airport
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                      type="checkbox"
                      checked={formData.locations.includes('Shirdi Airport')}
                      onChange={() => handleCheckboxChange('locations', 'Shirdi Airport')}
                      name="location"
                    />
                    Shirdi Airport
                  </label>
                </div>
              </div>
              <div>
                <textarea
                  name="message"
                  placeholder="Message"
                  rows={4}
                  maxLength={500}
                  value={formData.message}
                  onChange={handleMessageChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#7bbf45] focus:border-transparent resize-none text-sm"
                ></textarea>
                <p className="text-xs text-gray-500 mt-1">{charCount}/500 characters</p>
              </div>
              <button
                type="submit"
                disabled={!isFormValid() || isSubmitting}
                className="w-full bg-gradient-to-r from-[#2879b1] to-[#20618e] text-white font-medium py-3 px-6 rounded-md hover:from-[#20618e] hover:to-[#1a5075] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}