"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaUserCircle, FaSyncAlt } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

/*
interface FlippableCardProps {
 role: "admin" | "user";
}
 */

/*const FlippableCard: React.FC<FlippableCardProps> = ({ role }) => {*/  // TO DO: Change thiis to perform the check
const FlippableCard = () => {
  const role = "admin"; // TO DO: Change this to perform the check
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement | null>(null);
  const innerCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const innerCard = innerCardRef.current;

    if (!card || !innerCard) return;

    const calculateAngle = (e: MouseEvent) => {
      let dropShadowColor = "rgba(0, 0, 0, 0.3)";
      let rect = innerCard.getBoundingClientRect();

      let x = e.clientX - rect.left;
      let y = e.clientY - rect.top;
      let halfWidth = rect.width / 2;
      let halfHeight = rect.height / 2;

      let calcAngleX = (x - halfWidth) / 6;
      let calcAngleY = (y - halfHeight) / 14;

      innerCard.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
      innerCard.style.filter = `drop-shadow(${-calcAngleX}px ${-calcAngleY}px 15px ${dropShadowColor})`;
    };

    const resetAngle = () => {
      if (!innerCard) return;
      innerCard.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      innerCard.style.filter = "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.11))";
    };

    card.addEventListener("mousemove", calculateAngle);
    card.addEventListener("mouseleave", resetAngle);

    return () => {
      card.removeEventListener("mousemove", calculateAngle);
      card.removeEventListener("mouseleave", resetAngle);
    };
  }, []);

  return (
    <div className="flex flex-col space-y-8 justify-center items-center h-screen">
      <Link href="/newAdmin">
        <button className="btn w-full bg-linear-to-t from-indigo-600 to-indigo-500 bg-[length:100%_100%] bg-[bottom] text-white shadow-[inset_0px_1px_0px_0px_--theme(--color-white/.16)] hover:bg-[length:100%_150%]">
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
          Add new admin
        </button>
      </Link>
      <div className="relative w-80 h-96 perspective" ref={cardRef}>
        <div
          className={`card w-full h-full transition-transform duration-500 transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {role === "admin" ? ( // TO DO: Change this to role === "admin"
            <>
              {!isFlipped ? (
                <div
                  ref={innerCardRef}
                  className="inner-card absolute w-full h-full bg-black/30 border border-yellow-200/30 backdrop-blur-lg rounded-lg shadow-lg flex flex-col justify-center items-center p-4"
                >
                  <FaUserCircle className="text-yellow-500 text-8xl mb-4" />
                  <h3 className="text-2xl font-bold">Admin</h3>
                  <p className="text-gray-300 text-md">Year</p>
                  <p className="text-gray-300 text-sm">Joined: 2025/mm/dd</p>
                  <button
                    className="absolute top-4 right-4 border border-yellow-400/50 p-2 rounded-full"
                    onClick={() => setIsFlipped(true)}
                  >
                    <FaSyncAlt className="text-yellow-400" />
                  </button>
                </div>
              ) : (
                <div className="absolute w-full h-full bg-black/30 border border-yellow-400/30 backdrop-blur-lg rounded-lg shadow-lg flex flex-col justify-center items-center p-4 transform rotate-y-180">
                  <Image
                    src="/images/logoAdmin.svg"
                    alt="profile"
                    width={300}
                    height={250}
                  />
                  <h3 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-yellow-400),var(--color-yellow-200),var(--color-yellow-400),var(--color-yellow-400),var(--color-yellow-400))] bg-[length:200%_auto] bg-clip-text rotate-y-180 text-4xl font-semibold text-transparent">
                    TechGeeks
                  </h3>
                  <button
                    className="absolute top-4 right-4 border border-yellow-400/50 p-2 rounded-full"
                    onClick={() => setIsFlipped(false)}
                  >
                    <FaSyncAlt className="text-yellow-400" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              {!isFlipped ? (
                <div
                  ref={innerCardRef}
                  className="inner-card absolute w-full h-full bg-gray-900/40 backdrop-blur-lg rounded-lg shadow-lg flex flex-col justify-center items-center p-4"
                >
                  <FaUserCircle className="text-gray-200 text-8xl mb-4" />
                  <h3 className="text-2xl font-bold">User</h3>
                  <p className="text-gray-300 text-md">Year</p>
                  <p className="text-gray-300 text-sm">Joined: 2025/mm/dd</p>
                  <button
                    className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full"
                    onClick={() => setIsFlipped(true)}
                  >
                    <FaSyncAlt className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="absolute w-full h-full bg-gray-900/40 backdrop-blur-lg text-white rounded-lg shadow-lg flex flex-col justify-center items-center p-4 transform rotate-y-180">
                  <Image
                    src="/images/logo.svg"
                    alt="profile"
                    width={300}
                    height={250}
                  />
                  <h3 className="animate-gradient bg-gradient-to-r rotate-y-180 from-gray-200 via-gray-400 to-gray-50 bg-clip-text text-4xl font-semibold text-transparent">
                    TechGeeks
                  </h3>
                  <button
                    className="absolute top-4 right-4 bg-gray-600 p-2 rounded-full"
                    onClick={() => setIsFlipped(false)}
                  >
                    <FaSyncAlt className="text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlippableCard;
