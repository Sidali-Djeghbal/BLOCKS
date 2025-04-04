"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "./logo";
import { useAuth } from "@/app/context/AuthContext";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  const signOut = () => {
    throw new Error("Function not implemented.");
  };

  return (
    <header className="z-30 mt-2 w-full md:mt-5">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative flex h-14 items-center justify-between gap-3 rounded-2xl bg-gray-900/90 px-3 before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent after:absolute after:inset-0 after:-z-10 after:backdrop-blur-xs">
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
              {!user ? (
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
                    href="/login"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/register"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Register
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                </>
              ) : user.role === 'admin' ? (
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
                    href="/adminPanel"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Panel
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/profile"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                </>
              ) : (
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
                    href="/learn"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lessons
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                  <Link
                    href="/profile"
                    className="group relative text-gray-300 hover:text-white transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-indigo-500 transition-all group-hover:w-full"></span>
                  </Link>
                </>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
