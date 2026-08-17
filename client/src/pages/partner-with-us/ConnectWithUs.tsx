import { FormEvent, useState } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { mediaUrl } from '@/lib/api';

const DEFAULT_IMAGE = '/images/partner-connect.jpg';
const FALLBACK_IMAGE =
  'https://refexairports.com/wp-content/uploads/2023/09/About-Airport.png';

const inputCls =
  'w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/25 focus:border-[#2879b1]';

export default function ConnectWithUs({
  data,
}: {
  data?: {
    title?: string;
    highlight?: string;
    subtitle?: string;
    image?: string;
  };
}) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    inquiry: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = formData.fullName && formData.phone && formData.email;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setIsSubmitting(true);
    try {
      const submitData = new URLSearchParams();
      submitData.append('contactPerson', formData.fullName);
      submitData.append('phone', formData.phone);
      submitData.append('email', formData.email);
      submitData.append('message', formData.inquiry);
      const response = await fetch('https://readdy.ai/api/form/d4fvkns65ccm3ui4r200', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: submitData.toString(),
      });
      if (response.ok) {
        alert('Thank you for your enquiry! We will get back to you soon.');
        setFormData({ fullName: '', phone: '', email: '', inquiry: '' });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch {
      alert('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5">
            <span className="text-gray-900">{data?.title || 'Connect'}</span>{' '}
            <span className="text-[#2879b1]">{data?.highlight || 'with us'}</span>
          </h2>
          <CmsHtml
            html={
              data?.subtitle ||
              "Your feedback is valuable in helping us enhance your travel experience. Whether you have a question, suggestion, or simply want to share your thoughts, we're here to listen. Get in touch with our team, and let us know how we will be the best part of your journey."
            }
            className="text-gray-500 text-sm md:text-base leading-relaxed"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
          <div
            className="relative rounded-[28px] overflow-hidden min-h-[380px] lg:min-h-[560px] bg-slate-100"
            data-aos="fade-right"
          >
            <img
              src={mediaUrl(data?.image || DEFAULT_IMAGE)}
              alt="Connect with Refex Airports"
              className="absolute inset-0 w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                if (!img.src.includes('About-Airport')) img.src = FALLBACK_IMAGE;
              }}
            />
          </div>

          <div className="bg-[#eaf6fc] rounded-[28px] p-6 sm:p-8 md:p-10" data-aos="fade-left">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Full Name <span className="text-[#e07a3d]">*</span>
                </label>
                <input
                  className={inputCls}
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  name="fullName"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Contact Number <span className="text-[#e07a3d]">*</span>
                </label>
                <input
                  className={inputCls}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  name="phone"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Email ID <span className="text-[#e07a3d]">*</span>
                </label>
                <input
                  className={inputCls}
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  name="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">Inquiry</label>
                <textarea
                  className={`${inputCls} resize-none min-h-[140px]`}
                  rows={5}
                  value={formData.inquiry}
                  onChange={(e) => setFormData({ ...formData, inquiry: e.target.value })}
                  name="inquiry"
                />
              </div>
              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex items-center gap-2 text-gray-900 font-medium border-b-2 border-gray-900 pb-1 hover:text-[#2879b1] hover:border-[#2879b1] transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer bg-transparent"
              >
                {isSubmitting ? 'Sending...' : 'Send us a Message'}
                <i className="ri-arrow-right-line text-[#2879b1] text-lg"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
