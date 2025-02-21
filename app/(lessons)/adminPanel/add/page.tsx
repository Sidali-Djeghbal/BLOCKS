'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddLesson() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    challenge: '',
    solution: '',
    difficulty: '',
    picture: null as File | null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      setFormData(prev => ({
        ...prev,
        picture: file
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to save lesson
      console.log('Form submitted:', formData);
      router.push('/adminPanel/edit');
    } catch (error) {
      console.error('Error saving lesson:', error);
    }
  };

  const setSelectedLesson = (lesson: any) => {
    // TODO: Implement the logic to handle lesson selection
    console.log('Lesson selected:', lesson);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-xl p-6 sm:p-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Add New Lesson</h2>
            <p className="text-lg text-gray-400">Create a new lesson for students</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-300"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                required
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows={6}
                required
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                value={formData.content}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label
                htmlFor="challenge"
                className="block text-sm font-medium text-gray-300"
              >
                Challenge Exercise
              </label>
              <textarea
                id="challenge"
                name="challenge"
                rows={4}
                required
                className="mt-1 block w-full rounded-md bg-gray-700 border-transparent focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 text-white"
                value={formData.challenge}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty Level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`relative flex cursor-pointer rounded-lg border ${formData.difficulty === 'Beginner' ? 'border-green-500' : 'border-gray-700'} bg-gray-800/50 p-4 focus:outline-none transition-colors duration-200`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Beginner"
                    checked={formData.difficulty === 'Beginner'}
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className={`block text-sm font-medium ${formData.difficulty === 'Beginner' ? 'text-green-400' : 'text-gray-300'}`}>Beginner</span>
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${formData.difficulty === 'Beginner' ? 'border-green-500' : 'border-transparent'}`}
                    aria-hidden="true"
                  />
                </label>
                <label className={`relative flex cursor-pointer rounded-lg border ${formData.difficulty === 'Intermediate' ? 'border-yellow-500' : 'border-gray-700'} bg-gray-800/50 p-4 focus:outline-none transition-colors duration-200`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Intermediate"
                    checked={formData.difficulty === 'Intermediate'}
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className={`block text-sm font-medium ${formData.difficulty === 'Intermediate' ? 'text-yellow-400' : 'text-gray-300'}`}>Intermediate</span>
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${formData.difficulty === 'Intermediate' ? 'border-yellow-500' : 'border-transparent'}`}
                    aria-hidden="true"
                  />
                </label>
                <label className={`relative flex cursor-pointer rounded-lg border ${formData.difficulty === 'Advanced' ? 'border-red-500' : 'border-gray-700'} bg-gray-800/50 p-4 focus:outline-none transition-colors duration-200`}>
                  <input
                    type="radio"
                    name="difficulty"
                    value="Advanced"
                    checked={formData.difficulty === 'Advanced'}
                    className="sr-only"
                    onChange={handleInputChange}
                  />
                  <span className="flex flex-1">
                    <span className="flex flex-col">
                      <span className={`block text-sm font-medium ${formData.difficulty === 'Advanced' ? 'text-red-400' : 'text-gray-300'}`}>Advanced</span>
                    </span>
                  </span>
                  <span
                    className={`pointer-events-none absolute -inset-px rounded-lg border-2 ${formData.difficulty === 'Advanced' ? 'border-red-500' : 'border-transparent'}`}
                    aria-hidden="true"
                  />
                </label>
              </div>
            </div>

            <div>
              <label
                htmlFor="picture"
                className="block text-sm font-medium text-gray-300"
              >
                Lesson Picture
              </label>
              <input
                type="file"
                id="picture"
                name="picture"
                accept="image/*"
                required
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

            <div className="pt-4 flex flex-row gap-2">
              <button
                type="submit"
                className="w-full justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Add Lesson
              </button>
                <button
                type="button"
                onClick={() => router.push('/adminPanel/edit')}
                className="w-full py-3 px-4 border border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-transparent hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                >
                Cancel
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}