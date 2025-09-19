import { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const faqData: FaqItem[] = [
  {
    question: "What charities can I give to?",
    answer:
      "You can give to a wide variety of registered charities including education, health, poverty alleviation, and environmental organizations.",
  },
  {
    question: "How do I track my donations?",
    answer:
      "Once you donate, you will receive an email confirmation. You can also log into your account to view a full donation history.",
  },
  {
    question: "Are my donations tax deductible?",
    answer:
      "Yes, all donations made through our platform are tax deductible, and you will receive a statement at the end of the year.",
  },
  {
    question: "Can I set up recurring donations?",
    answer:
      "Absolutely! You can set up weekly, monthly, or yearly recurring donations, and manage them anytime from your account dashboard.",
  },
];

export default function FAQS() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="relative w-full">
      {faqData.map((faq, index) => (
        <div
          key={index}
          className={`${
            openIndex === index
              ? "bg-[#F8F9FA] rounded-2xl p-6 md:p-8"
              : "p-6 md:p-8"
          } mb-4 transition-all`}
        >
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h3 className="text-xl text-[#0e372d] md:text-2xl font-semibold">
                {faq.question}
              </h3>
              {openIndex === index && (
                <p className="mt-3 text-neutral-600 leading-relaxed">
                  {faq.answer}
                </p>
              )}
            </div>
            <button
              aria-label="Toggle FAQ"
              onClick={() => toggleFaq(index)}
              className={`${
                openIndex === index
                  ? "shrink-0 h-9 w-9 rounded-full bg-[#C4A54A] text-white grid place-items-center transition"
                  : "shrink-0 h-9 w-9 rounded-full border-2 text-black grid place-items-center transition"
              }`}
            >
              {openIndex === index ? "−" : "+"}
            </button>
          </div>
        </div>
      ))}
    </section>
  );
}
