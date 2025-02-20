'use client'

import { useState } from 'react'
import Footer from "@/components/ui/footer";


type FaqItem = {
  question: string
  answer: string
}

const faqItems: FaqItem[] = [
  {
    question: "What is BLOCKS?",
    answer:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
  },
  {
    question: "How do I get started?",
    answer:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
  },
  {
    question: "How can I contact support?",
    answer:
      "lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh.",
  },
];

export default function FeedbackPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [feedback, setFeedback] = useState({
    subject: "",
    rating: 0,
    comment: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) return;
    // Add your feedback submission logic here
    console.log("Feedback submitted:", feedback);
  };

  return (
    <div className="min-h-screen bg-transparent">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg shadow-sm"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 hover:text-black transition-colors duration-150"
                >
                  <span className="text-lg">{item.question}</span>
                  <svg
                    className={`w-6 h-6 transform transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="px-6 py-4 bg-">
                    <p className="text-gray-300">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="relative">
          <h2 className="text-3xl font-semibold mb-8 text-gray-300">
            Submit Your Feedback
          </h2>
          <div
            className={`relative ${
              !isLoggedIn ? "filter blur-sm pointer-events-none" : ""
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="border bor p-8 rounded-xl shadow-lg"
            >
              <div className="mb-6">
                <label
                  htmlFor="subject"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full p-3 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  value={feedback.subject}
                  onChange={(e) =>
                    setFeedback({ ...feedback, subject: e.target.value })
                  }
                  placeholder="Enter the subject of your feedback"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">
                  Rating
                </label>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFeedback({ ...feedback, rating: star })}
                      className={`text-3xl transition-colors duration-150 ${
                        feedback.rating >= star
                          ? "text-yellow-400"
                          : "text-gray-300"
                      } hover:text-yellow-400`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-gray-300 font-medium mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="comment"
                  rows={6}
                  className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  value={feedback.comment}
                  onChange={(e) =>
                    setFeedback({ ...feedback, comment: e.target.value })
                  }
                  placeholder="Tell us what you think..."
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-linear-to-t from-indigo-600 to-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-[length:100%_150%] transition-colors duration-150 focus:ring-4 focus:ring-blue-200"
              >
                Submit Feedback
              </button>
            </form>
          </div>
          {!isLoggedIn && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gray-900 border  00 p-6 rounded-lg shadow-lg text-center z-10">
                <h3 className="text-xl font-semibold mb-2">Please Sign In</h3>
                <p className="text-gray-600 mb-4 font-bold">
                  You need to be logged in to submit feedback
                </p>
                <a
                  href="/signin"
                  className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] p-2 text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                >
                  Sign In
                </a>
              </div>
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
}