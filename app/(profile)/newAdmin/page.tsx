'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
      <div className="max-w-xl mx-auto">
        <div className="bg-black/40 backdrop-blur-sm border border-yellow-200/40 rounded-xl p-6 sm:p-8">
          <section>
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
              <div className="py-12 md:py-20">
                {/* Section header */}
                <div className="pb-12 text-center">
                  <h1 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-yellow-100),var(--color-yellow-200),var(--color-yellow-500),var(--color-yellow-400),var(--color-yellow-200))] bg-[length:200%_auto] bg-clip-text font-nacelle text-3xl font-semibold text-transparent md:text-4xl">
                    Create an admin account
                  </h1>
                </div>
                {/* Contact form */}
                <form className="mx-auto max-w-[400px]">
                  <div className="space-y-5">
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-indigo-200/65"
                        htmlFor="name"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="mb-1 block text-sm font-medium text-indigo-200/65"
                        htmlFor="email"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full"
                        placeholder="Your work email"
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-medium text-indigo-200/65"
                        htmlFor="password"
                      >
                        Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full"
                        placeholder="Password (at least 10 characters)"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-5">
                    <button className="btn w-full bg-linear-to-t from-yellow-300 to-yellow-600 bg-[length:100%_100%] bg-[bottom] text-black font-bold text-lg shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
                      Register
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}