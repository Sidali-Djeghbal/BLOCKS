"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // TODO: Replace with actual auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
          {/* Site branding */}
          <div className="flex flex-1 items-center">
            <Logo />
          </div>

          {/* Navigation */}
          <div className="flex flex-1 items-center justify-end">
            {/* Hamburger menu for mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative z-20 p-2"
              aria-label="Toggle menu"
            >
              <div
                className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-[0.45rem]" : ""
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-gray-300 mt-1.5 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              ></div>
              <div
                className={`w-6 h-0.5 bg-gray-300 mt-1.5 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-[0.45rem]" : ""
                }`}
              ></div>
            </button>

            {/* Desktop Navigation */}
            <nav
              className={`
              fixed md:relative top-0 right-0 h-screen md:h-auto w-64 md:w-auto
              bg-gray-900/95 md:bg-transparent
              transform  ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
              } md:translate-x-0
              transition-transform duration-800 ease-in-out
              flex flex-col md:flex-row
              items-center justify-center md:justify-end
              gap-6 md:gap-3
              z-10 md:z-auto
              p-8 md:p-0
            `}
            >
              {!isLoggedIn ? ( /// TODO: Replace with backend-based logic to display user menu items
                <>
                  <Link
                    href="/"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Home
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/app"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    App
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/adminPanel/edit"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/learn"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lessons
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/faq"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Feedback
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>

                  <div className="relative group ">
                    <button
                      className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
                      onClick={(e) => {
                        if (window.innerWidth < 768) {
                          e.stopPropagation();
                          const menu = e.currentTarget.nextElementSibling;
                          if (menu) {
                            menu.classList.toggle("opacity-0");
                            menu.classList.toggle("pointer-events-none");
                          }
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (window.innerWidth >= 768) {
                          const menu = e.currentTarget.nextElementSibling;
                          if (menu) {
                            menu.classList.remove("opacity-0");
                            menu.classList.remove("pointer-events-none");
                          }
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (window.innerWidth >= 768) {
                          const menu = e.currentTarget.nextElementSibling;
                          if (menu) {
                            menu.classList.add("opacity-0");
                            menu.classList.add("");
                          }
                        }
                      }}
                    >
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 duration-400 ease-in-out">
                      <Link
                        href="/profileCard"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        onClick={(e) => {
                          setIsMenuOpen(false);
                          if (window.innerWidth < 768) {
                            e.currentTarget.parentElement?.classList.add(
                              "opacity-0",
                              "pointer-events-none"
                            );
                          }
                        }}
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={() => {
                          // TODO: Implement logout functionality
                          setIsLoggedIn(false);
                          setIsMenuOpen(false);
                          if (window.innerWidth < 768) {
                            const menu = document.querySelector(".group > div");
                            menu?.classList.add(
                              "opacity-0",
                              "pointer-events-none"
                            );
                          }
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/signin"
                    className="btn-sm relative bg-linear-to-b from-gray-800 to-gray-800/60 bg-[length:100%_100%] bg-[bottom] py-[5px] text-gray-300 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(to_right,var(--color-gray-800),var(--color-gray-700),var(--color-gray-800))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)] hover:bg-[length:100%_150%]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/signup"
                    className="btn-sm bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] py-[5px] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>

            {/* Overlay for mobile menu */}
            {isMenuOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

