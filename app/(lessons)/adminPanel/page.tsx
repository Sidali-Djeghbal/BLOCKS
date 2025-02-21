"use client";

import React, { useState } from "react";
import Link from "next/link";

const Dashboard: React.FC = () => {
const [lessons, setLessons] = useState([
  { id: 1, title: "Lesson 1", description: "Introduction to React" },
  { id: 2, title: "Lesson 2", description: "Components and Props" },
  { id: 3, title: "Lesson 3", description: "State and Lifecycle" },
]);

  const removeLesson = (id: number) => {
    setLessons(lessons.filter((lesson) => lesson.id !== id));
  };

  const updateLesson = (updatedLesson: {
    id: number;
    title: string;
    description: string;
  }) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === updatedLesson.id ? updatedLesson : lesson
      )
    );
  };

  return (
    <div className="p-2 md:p-4 lg:p-8 mt-8 min-h-screen flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className="p-4 text-white flex justify-between items-center shadow-md">
          <h1 className="text-xl font-semibold">Welcome, Teacher!</h1>
        </header>

        {/* Dashboard Content */}
        <div className="p-6 flex-1">
          <Link
            href="/adminPanel/add">
            <button className="bg-green-600 px-4 py-2 rounded-md text-white mb-8 border-1 hover:bg-green-700 flex items-center">
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
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {lessons.map((lesson) => (
              <div
                key={lesson.id}
                className="bg-gray-900/60 border- p-5 rounded-lg text-white shadow-md flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg w-full font-semibold">
                    {lesson.title}
                  </h3>
                  <p className="text-sm mt-1">{lesson.description}</p>
                </div>
                <div className="flex gap-2">
                  <Link href="/adminPanel/edit">
                    <button
                      className="bg-blue-700 p-2 cursor-pointer rounded-full hover:bg-blue-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828zM4 12v4h4v-1H5v-3H4zm1-1h3v-1H5v1z" />
                      </svg>
                    </button>
                  </Link>
                  <button
                    className="bg-red-700 p-2 cursor-pointer rounded-full hover:bg-red-600"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to delete this lesson?"
                        )
                      ) {
                        removeLesson(lesson.id);
                      }
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H3a1 1 0 000 2h1v9a2 2 0 002 2h8a2 2 0 002-2V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm3 4a1 1 0 112 0v7a1 1 0 11-2 0V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
