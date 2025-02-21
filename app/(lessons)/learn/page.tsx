'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

interface Lesson {
  id: number;
  title: string;
  content: string;
  description: string;
  picture: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  challenge?: string;
  solution?: string;
}

const sampleLessons: Lesson[] = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    content: 'Learn the fundamentals of web development including HTML, CSS, and JavaScript. This comprehensive lesson will guide you through the basic building blocks of modern web applications. We will cover essential concepts like HTML structure, CSS styling, and JavaScript interactivity. You will learn about semantic markup, responsive design principles, and basic programming concepts that form the foundation of web development.',
    description: 'Start your journey in web development with core concepts and practical examples.',
    picture: '/images/hero-image-01.svg',
    duration: '45 mins',
    difficulty: 'Beginner',
    challenge: 'Create a simple webpage that includes a header, navigation menu, main content area, and footer. Style it using CSS to be responsive and visually appealing.',
        solution: `Heres a basic structure for the webpage:
    
    \`\`\`html
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        /* Add responsive styling */
        body { margin: 0; font-family: sans-serif; }
        nav { background: #333; padding: 1rem; }
        main { padding: 2rem; }
        footer { background: #333; color: white; padding: 1rem; }
        @media (max-width: 768px) {
          /* Add mobile-specific styles */
        }
      </style>
    </head>
    <body>
      <nav>Navigation</nav>
      <main>Content</main>
      <footer>Footer</footer>
    </body>
    </html>
    \`\`\`
    `
      },

  {
    id: 2,
    title: 'Responsive Design Principles',
    content: 'Master the art of creating responsive websites that work seamlessly across all devices. Learn about media queries, flexible grids, and mobile-first design approaches.',
    description: 'Create websites that look great on any device.',
    picture: '/images/features.svg',
    duration: '60 mins',
    difficulty: 'Intermediate'
  },
  {
    id: 3,
    title: 'Advanced JavaScript Concepts',
    content: 'Dive deep into advanced JavaScript concepts including closures, promises, async/await, and modern ES6+ features.',
    description: 'Take your JavaScript skills to the next level.',
    picture: '/images/workflow-02-inspiration.svg',
    duration: '90 mins',
    difficulty: 'Advanced'
  }
];

export default function LearnPage() {
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Available Lessons
          </h1>
          <p className="text-lg text-gray-400">
            Choose a lesson to start learning
          </p>
        </div>

        {/* Lessons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleLessons.map((lesson) => (
            <div
              key={lesson.id}
              onClick={() => setSelectedLesson(lesson)}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-900/60"
            >
              <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
                <Image
                  src={lesson.picture}
                  alt={lesson.title}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {lesson.title}
              </h3>
              <p className="text-gray-400 mb-4">{lesson.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-indigo-400">{lesson.duration}</span>
                <span
                  className={`px-3 py-1 rounded-full ${
                    lesson.difficulty === "Beginner"
                      ? "bg-green-900/50 text-green-400"
                      : lesson.difficulty === "Intermediate"
                      ? "bg-yellow-900/50 text-yellow-400"
                      : "bg-red-900/50 text-red-400"
                  }`}
                >
                  {lesson.difficulty}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full-screen Lesson Modal */}
        <Dialog
          open={selectedLesson !== null}
          onClose={() => {
            setSelectedLesson(null);
            setShowSolution(false);
          }}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-0 overflow-hidden">
              <DialogPanel className="my-4 lg:max-w-[60vw] md:max-w-[80vw] max-w-[95vw] bg-gray-900/95 p-4">
                {selectedLesson && (
                  <div className="h-screen flex flex-col">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-800">
                      <h2 className="text-2xl md:text-3xl font-bold text-white">
                        {selectedLesson.title}
                      </h2>
                      <div className="flex items-center flex-col lg:flex-row md:flex-row gap-4">
                        <button
                          onClick={() => {
                            setSelectedLesson(null);
                            setShowSolution(false);
                          }}
                          className="p-2 text-gray-400 hover:text-white lg:hidden md:hidden transition-colors"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                        <span
                          className={`px-3 py-1 rounded-full ${
                            selectedLesson.difficulty === "Beginner"
                              ? "bg-green-900/50 text-green-400"
                              : selectedLesson.difficulty === "Intermediate"
                              ? "bg-yellow-900/50 text-yellow-400"
                              : "bg-red-900/50 text-red-400"
                          }`}
                        >
                          {selectedLesson.difficulty}
                        </span>
                        <span className="text-indigo-400">
                          {selectedLesson.duration}
                        </span>
                      </div>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                      <div className="relative h-64 sm:h-96 rounded-xl overflow-hidden">
                        <Image
                          src={selectedLesson.picture}
                          alt={selectedLesson.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="prose prose-invert max-w-none">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {selectedLesson.content}
                        </p>
                      </div>

                      {/* Challenge Section */}
                      {selectedLesson.challenge && (
                        <div className="max-w-[80vw] max-h-[90vh] bg-gray-800/50 rounded-xl p-6 space-y-4">
                          <h3 className="text-xl font-semibold text-white">
                            Challenge Exercise
                          </h3>
                          <p className="text-gray-300">
                            {selectedLesson.challenge}
                          </p>

                          {selectedLesson.solution && (
                            <div className="space-y-4">
                              <button
                                onClick={() => setShowSolution(!showSolution)}
                                className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 transition-colors"
                              >
                                <span>
                                  {showSolution
                                    ? "Hide Solution"
                                    : "Show Solution"}
                                </span>
                                <svg
                                  className={`w-5 h-5 transform transition-transform ${
                                    showSolution ? "rotate-180" : ""
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

                              {showSolution && (
                                <div className="bg-gray-900/50 rounded-lg p-4 overflow-x-auto">
                                  <pre className="text-gray-300 whitespace-pre-wrap">
                                    {selectedLesson.solution}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

