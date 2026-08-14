import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: 'How can I connect with Refex Airports for space?',
    answer: 'Please click here to Contact us or fill up enquiry form.',
  },
  {
    question: 'Can I have a site visit?',
    answer: 'Yes, connect with the team to align for a schedule.',
  },
  {
    question: 'Where will you offer the space, after security check or before?',
    answer: 'Based on your category, ATV and space requirement, concern team will suggest best location for your business.',
  },
  {
    question: 'What is the rent I need to pay to Refex?',
    answer: 'It will vary category to category on rent and revenue share, for better clarity, meet with Refex Team.',
  },
  {
    question: 'When will the new terminal go live?',
    answer: 'The New terminal will go live end of January 2024.',
  },
  {
    question: 'What is the business model?',
    answer: 'Retailers will be selected as sub-concessionaire to Refex Airports with applicable commercial aspects.',
  },
  {
    question: 'How will the Terminal look like?',
    answer: 'The terminal will have smart, compact, efficient, integrated layout for passengers\' journey and retail experience.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Title */}
          <div data-aos="fade-right">
            <p className="text-teal-600 text-sm font-semibold mb-4 tracking-wider uppercase">
              F.A.Q.
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Getting to Know More About Partnering
            </h2>
          </div>

          {/* Right Column - FAQ Items */}
          <div className="space-y-4" data-aos="fade-left">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
                  aria-expanded={openIndex === index}
                >
                  <span className="text-base font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center">
                    <i
                      className={`fas fa-angle-${openIndex === index ? 'up' : 'down'} text-gray-600 transition-transform duration-300`}
                    ></i>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
