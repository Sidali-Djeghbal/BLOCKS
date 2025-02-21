"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import Link from "next/link";

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
  isEditing?: boolean;
}

export default function EditLesson() {
  const { id } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: 1,
      title: "Introduction to Web Development",
      content:
        "Learn the fundamentals of web development including HTML, CSS, and JavaScript.",
      description: "Start your journey in web development with core concepts.",
      picture: "/images/hero-image-01.svg",
      duration: "45 mins",
      difficulty: "Beginner",
      challenge: "Create a simple webpage",
      solution: "Solution details here",
    },

    {
      id: 2,
      title: "Responsive Design Principles",
      content:
        "Master the art of creating responsive websites that work seamlessly across all devices. Learn about media queries, flexible grids, and mobile-first design approaches.",
      description: "Create websites that look great on any device.",
      picture: "/images/features.svg",
      duration: "60 mins",
      difficulty: "Intermediate",
    },
    {
      id: 3,
      title: "Advanced JavaScript Concepts",
      content:
        "Dive deep into advanced JavaScript concepts including closures, promises, async/await, and modern ES6+ features.",
      description: "Take your JavaScript skills to the next level.",
      picture: "/images/workflow-02-inspiration.svg",
      duration: "90 mins",
      difficulty: "Advanced",
    },
  ]);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<{
    title: string;
    description: string;
    content: string;
    challenge: string;
    solution: string;
    picture: File | null;
  }>({
    title: "",
    description: "",
    content: "",
    challenge: "",
    solution: "",
    picture: null,
  });

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        // TODO: Replace with actual API call
        const response = await fetch('/api/lessons');
        const data = await response.json();
        setLessons(data);
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        picture: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Implement API call to update lesson
    console.log("Form submitted:", formData);
    setSelectedLesson(null);
  };

  const handleDelete = async (lessonId: number) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      // TODO: Implement delete API call
      setLessons(lessons.filter(lesson => lesson.id !== lessonId));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Manage Lessons</h1>
          <p className="text-lg text-gray-400">
            Edit or remove existing lessons
          </p>
        </div>
        <Link href="/adminPanel/add">
          <button className="bg-green-600 px-4 py-2 rounded-md text-white mb-8 hover:bg-green-700 flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add Lesson
          </button>
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:bg-gray-900/60"
              onClick={() => setSelectedLesson(lesson)}
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
              <div className="flex items-center justify-between text-sm mb-4">
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
              <div 
                className="flex justify-end space-x-2" 
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedLesson({ ...lesson, isEditing: true })}
                  className="group relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-500 hover:to-blue-300 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600/50 to-blue-400/50 blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zm-2.207 2.207L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="group relative p-2 rounded-full bg-gradient-to-r from-red-600 to-red-400 hover:from-red-500 hover:to-red-300 transition-all duration-300 shadow-lg hover:shadow-red-500/25"
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600/50 to-red-400/50 blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-white relative z-10 transform group-hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <Dialog
          open={selectedLesson !== null}
          onClose={() => setSelectedLesson(null)}
          className="relative z-50"
        >
          <DialogBackdrop className="fixed inset-0 bg-black/70 backdrop-blur-sm" />

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel className="w-full max-w-4xl bg-gray-900/95 rounded-xl p-6 shadow-xl">
                {selectedLesson && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Edit Lesson
                      </h2>
                      <button
                        type="button"
                        onClick={() => setSelectedLesson(null)}
                        className="text-gray-400 hover:text-white"
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
                    </div>

                    {/* Form fields */}
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Title
                        </label>
                        <input
                          type="text"
                          name="title"
                          required
                          className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                          defaultValue={selectedLesson.title}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Description
                        </label>
                        <textarea
                          name="description"
                          rows={3}
                          required
                          className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                          defaultValue={selectedLesson.description}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Content
                        </label>
                        <textarea
                          name="content"
                          rows={6}
                          required
                          className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                          defaultValue={selectedLesson.content}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Challenge
                        </label>
                        <textarea
                          name="challenge"
                          rows={4}
                          required
                          className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                          defaultValue={selectedLesson.challenge}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Solution
                        </label>
                        <textarea
                          name="solution"
                          rows={4}
                          required
                          className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                          defaultValue={selectedLesson.solution}
                          onChange={handleInputChange}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300">
                          Picture
                        </label>
                        <div className="mt-2 mb-4">
                          <Image
                            src={selectedLesson.picture}
                            alt="Current lesson picture"
                            width={200}
                            height={150}
                            className="rounded-md"
                          />
                        </div>
                        <input
                          type="file"
                          name="picture"
                          accept="image/*"
                          className="mt-1 block w-full text-sm text-gray-300
                          file:mr-4 file:py-2 file:px-4
                          file:rounded-md file:border-0
                          file:text-sm file:font-medium
                          file:bg-indigo-600 file:text-white
                          hover:file:bg-indigo-700
                          file:cursor-pointer"
                          onChange={handleImageChange}
                        />
                      </div>
                    </div>

                    <div className="flex space-x-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setSelectedLesson(null)}
                        className="flex-1 py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}


