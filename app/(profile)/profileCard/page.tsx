"use client";

import React, { useState, useEffect } from "react";
import { FaUserCircle, FaSyncAlt } from "react-icons/fa";
import Image from "next/image";

interface FlippableCardProps {
  role: "admin" | "user";
}

const FlippableCard: React.FC<FlippableCardProps> = ({ role }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const calculateAngle = (
      e: MouseEvent,
      item: HTMLElement,
      parent: HTMLElement
    ) => {
      let dropShadowColor = `rgba(0, 0, 0, 0.3)`;
      if (parent.dataset.filterColor) {
        dropShadowColor = parent.dataset.filterColor;
      }

      parent.classList.add("animated");
      let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
      let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

      let halfWidth = item.getBoundingClientRect().width / 2;
      let halfHeight = item.getBoundingClientRect().height / 2;

      let calcAngleX = (x - halfWidth) / 6;
      let calcAngleY = (y - halfHeight) / 14;

      item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
      parent.style.perspective = `${halfWidth * 6}px`;

      item.style.filter = `drop-shadow(${-calcAngleX}px ${-calcAngleY}px 15px ${dropShadowColor})`;
    };

    const card = document.querySelector(".card") as HTMLElement;
    if (!card) return;

    const innerCard = card.querySelector(".inner-card") as HTMLElement;
    card.addEventListener("mousemove", (e) =>
      calculateAngle(e, innerCard, card)
    );
    card.addEventListener("mouseleave", () => {
      innerCard.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
      innerCard.style.filter = "drop-shadow(0 10px 15px rgba(0, 0, 0, 0.11))";
    });
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative w-90 h-106 perspective">
        <div
          className={`card w-full h-full transition-transform duration-500 transform ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          {1 ? ( // TODO : admin check here //////////////////////////
            <>
              {!isFlipped ? (
                <div className="inner-card absolute w-full h-full bg-black/30 border-1 border-yellow-200/30 backdrop-blur-lg rounded-lg shadow-lg flex flex-col justify-center items-center p-4 backface-hidden">
                  <FaUserCircle className="text-yellow-500 text-8xl mb-4" />
                  <h3 className="text-2xl font-bold">Admin</h3>
                  <p className="text-gray-300 text-md">Year</p>
                  <p className="text-gray-300 text-sm">Joined : 2025/mm/dd</p>
                  <button
                    className="absolute top-4 right-4 border-1 border-yellow-400/50 p-2 rounded-full"
                    onClick={() => setIsFlipped(true)}
                  >
                    <FaSyncAlt className="text-yellow-400 " />
                  </button>
                </div>
              ) : (
                <div className="inner-card-backface absolute w-full h-full bg-black/30 border-1 border-yellow-400/30 backdrop-blur-lg text-white rounded-lg transform shadow-lg flex flex-col justify-center items-center p-4 backface-hidden">
                  <Image
                    src="/images/logoAdmin.svg"
                    alt="profile"
                    width={300}
                    height={250}
                  />
                  <h3 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-yellow-100),var(--color-yellow-500),var(--color-yellow-500),var(--color-yellow-400),var(--color-yellow-50))] bg-[length:200%_auto] rotate-y-180 bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
                    TechGeeks
                  </h3>
                  <button
                    className="absolute top-4 right-4 border-1 border-yellow-400/50 p-2 rounded-full"
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
                <div className="inner-card absolute w-full h-full bg-gray-900/40 backdrop-blur-lg rounded-lg shadow-lg flex flex-col justify-center items-center p-4 backface-hidden">
                  <FaUserCircle className="text-gray-200 text-8xl mb-4" />
                  <h3 className="text-2xl font-bold">User</h3>
                  <p className="text-gray-300 text-md">Year</p>
                  <p className="text-gray-300 text-sm">Joined : 2025/mm/dd</p>
                  <button
                    className="absolute top-4 right-4 bg-gray-300 p-2 rounded-full"
                    onClick={() => setIsFlipped(true)}
                  >
                    <FaSyncAlt className="text-gray-600" />
                  </button>
                </div>
              ) : (
                <div className="inner-card-backface absolute w-full h-full bg-gray-900/40 backdrop-blur-lg text-white rounded-lg transform shadow-lg flex flex-col justify-center items-center p-4 backface-hidden">
                  <Image
                    src="/images/logo.svg"
                    alt="profile"
                    width={300}
                    height={250}
                  />
                  <h3 className="animate-[gradient_6s_linear_infinite] bg-[linear-gradient(to_right,var(--color-gray-200),var(--color-gray-400),var(--color-gray-50),var(--color-gray-300),var(--color-gray-200))] bg-[length:200%_auto] rotate-y-180 bg-clip-text pb-5 font-nacelle text-4xl font-semibold text-transparent md:text-5xl">
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
