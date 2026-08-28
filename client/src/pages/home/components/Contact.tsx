import { useState, FormEvent } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { GreenIcon } from '@/pages/partner-with-us/GreenIcon';
import { apiUrl } from '@/lib/api';

type ContactLocation = {
  name?: string;
  subtitle?: string;
  phone?: string;
  email?: string;
  address?: string;
};

const DEFAULT_LOCATIONS: ContactLocation[] = [
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
];

function hasLocationContent(loc: ContactLocation) {
  return Boolean(loc.name || loc.subtitle || loc.phone || loc.email || loc.address);
}

function locationLabel(loc: ContactLocation, index: number) {
  if (loc.name) return loc.name.replace(/\s*\([^)]*\)\s*$/, '').trim() || loc.name;
  return `Location ${index + 1}`;
}

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

  const locations = (Array.isArray(data?.locations) ? data.locations : DEFAULT_LOCATIONS).filter(
    hasLocationContent
  );
  const formLocationOptions = locations.map((loc, index) => locationLabel(loc, index));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsSubmitting(true);
    
    try {
      const locationsLine = formData.locations.length
        ? `Airports of interest: ${formData.locations.join(', ')}`
        : '';
      const message = [locationsLine, formData.message].filter(Boolean).join('\n\n');
      const body = new FormData();
      body.append('name', formData.contactPerson);
      body.append('company', formData.businessName);
      body.append('email', formData.email);
      body.append('phone', formData.phone);
      body.append('message', message || 'No message provided.');

      const response = await fetch(apiUrl('/api/contact-form'), {
        method: 'POST',
        body,
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

            {locations.map((loc, index) => (
              <div key={`${loc.name || 'loc'}-${index}`} className="mb-10" data-aos="fade-up" data-aos-delay={String(100 + index * 50)}>
                {(loc.name || loc.subtitle) && (
                  <>
                    <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                      <GreenIcon name="plane" className="w-6 h-6" />
                      {loc.name}
                    </h3>
                    {loc.subtitle && <p className="text-sm text-gray-500 mb-3 ml-8">{loc.subtitle}</p>}
                  </>
                )}
                <div className="space-y-3">
                  {loc.phone && (
                    <div className="flex items-center gap-3">
                      <GreenIcon name="phone" />
                      <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="text-gray-700 hover:text-[#7bbf45] cursor-pointer">
                        {loc.phone}
                      </a>
                    </div>
                  )}
                  {loc.email && (
                    <div className="flex items-center gap-3">
                      <GreenIcon name="mail" />
                      <a href={`mailto:${loc.email}`} className="text-gray-700 hover:text-[#7bbf45] cursor-pointer">
                        {loc.email}
                      </a>
                    </div>
                  )}
                  {loc.address && (
                    <div className="flex items-start gap-3">
                      <GreenIcon name="pin" className="w-5 h-5 mt-0.5" />
                      <div className="text-gray-700 text-sm leading-relaxed">{loc.address}</div>
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
                <i className="ri-linkedin-fill"></i>
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
                <i className="ri-facebook-fill"></i>
              </a>
              <a
                href="https://www.instagram.com/refexgroup/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-[#7bbf45] hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-instagram-line"></i>
              </a>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-5 sm:p-8" data-aos="fade-left">
            <div className="mb-6">
              <p className="text-sm text-gray-500 mb-2">Quick Connect</p>
              <h3 className="text-2xl font-bold">
                {data?.formTitle || "Let's Build the Future of Travel Infrastructure Together"}
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
                  {formLocationOptions.map((label) => (
                    <label key={label} className="flex items-center cursor-pointer">
                      <input
                        className="mr-3 text-[#7bbf45] focus:ring-[#7bbf45]"
                        type="checkbox"
                        checked={formData.locations.includes(label)}
                        onChange={() => handleCheckboxChange('locations', label)}
                        name="location"
                      />
                      {label}
                    </label>
                  ))}
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