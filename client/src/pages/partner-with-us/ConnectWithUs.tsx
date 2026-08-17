import { FormEvent, useRef, useState } from 'react';
import CmsHtml from '@/components/feature/CmsHtml';
import { apiUrl, mediaUrl } from '@/lib/api';

const DEFAULT_IMAGE = '/images/partner-connect.jpg';
const FALLBACK_IMAGE =
  'https://refexairports.com/wp-content/uploads/2023/09/About-Airport.png';

const inputCls =
  'w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#2879b1]/25 focus:border-[#2879b1]';

const emptyForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  message: '',
};

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
  const fileRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const native = new FormData(e.currentTarget);
    const name = String(native.get('fullName') || formData.fullName).trim();
    const company = String(native.get('organization') || formData.organization).trim();
    const email = String(native.get('email') || formData.email).trim();
    const phone = String(native.get('phone') || formData.phone).trim();
    const message = String(native.get('message') || formData.message).trim();
    if (!name || !company || !email || !phone || !message) {
      setStatus({ kind: 'err', text: 'Please fill Full Name, Organization Name, Email ID, Phone Number, and Message.' });
      return;
    }
    setIsSubmitting(true);
    setStatus(null);
    try {
      const body = new FormData();
      body.append('name', name);
      body.append('company', company);
      body.append('email', email);
      body.append('phone', phone);
      body.append('message', message);
      if (file) body.append('attachment', file);

      const response = await fetch(apiUrl('/api/contact-form'), {
        method: 'POST',
        body,
      });
      const json = await response.json().catch(() => ({}));
      if (!response.ok || json.success === false) {
        throw new Error(json.message || 'Something went wrong. Please try again.');
      }
      setStatus({ kind: 'ok', text: 'Thank you for your enquiry! We will get back to you soon.' });
      setFormData(emptyForm);
      setFile(null);
      if (fileRef.current) fileRef.current.value = '';
    } catch (err: any) {
      setStatus({ kind: 'err', text: err.message || 'Failed to submit form. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 md:py-24 bg-white scroll-mt-24">
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
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Organization Name <span className="text-[#e07a3d]">*</span>
                </label>
                <input
                  className={inputCls}
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  name="organization"
                  autoComplete="organization"
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
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Phone Number <span className="text-[#e07a3d]">*</span>
                </label>
                <input
                  className={inputCls}
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  name="phone"
                  autoComplete="tel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Message <span className="text-[#e07a3d]">*</span>
                </label>
                <textarea
                  className={`${inputCls} resize-none min-h-[140px]`}
                  rows={5}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  name="message"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-2">
                  Attachment <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  ref={fileRef}
                  type="file"
                  className="hidden"
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.jpg,.jpeg,.png,.webp,.txt,.zip"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-800 hover:border-[#2879b1] hover:text-[#2879b1] cursor-pointer"
                  >
                    <i className="ri-attachment-2"></i>
                    {file ? 'Change file' : 'Attach file'}
                  </button>
                  {file && (
                    <span className="text-sm text-gray-600 flex items-center gap-2 min-w-0">
                      <span className="truncate max-w-[220px]">{file.name}</span>
                      <button
                        type="button"
                        className="text-red-500 hover:text-red-600 cursor-pointer"
                        onClick={() => {
                          setFile(null);
                          if (fileRef.current) fileRef.current.value = '';
                        }}
                      >
                        Remove
                      </button>
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs text-gray-500">PDF, Word, Excel, image, or ZIP. Max 8 MB.</p>
              </div>
              {status && (
                <p className={`text-sm ${status.kind === 'ok' ? 'text-emerald-700' : 'text-red-600'}`}>
                  {status.text}
                </p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 text-gray-900 font-medium border-b-2 border-gray-900 pb-1 hover:text-[#2879b1] hover:border-[#2879b1] transition-colors disabled:opacity-50 cursor-pointer bg-transparent"
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
