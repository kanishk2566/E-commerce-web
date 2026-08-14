"use client";

import Image from "next/image";
import { SetStateAction, useEffect, useState } from "react";
import { GoTriangleLeft, GoTriangleRight } from "react-icons/go";

const heroImages = [
  "/Hero11.png",
  "/Hero21.png",
  "/Hero31.png",
  "/Hero411.png"
];

interface HeroProps {
  setCategory: React.Dispatch<SetStateAction<string>>,
}

const Hero = ({ setCategory}: HeroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  function handleCategory(index: number): string {
    if(index === 0) {
      return "men's clothing";
    } else if (index === 1) {
      return "jewelery";
    } else if (index === 2) {
      return "electronics";
    } else if (index === 3) {
      return "women's clothing"
    }
    return "all";
    
  }

  return (
    <div className="relative w-full h-30 md:h-60 lg:h-100 xl:h-105 overflow-hidden mt-12 shadow-xl shadow-gray-700/30">
      <button
        className="absolute top-1/2 bottom-1/2 left-5 z-50 text-xl lg:text-5xl text-[#401b1b] hover:text-[#f2f2eb] transition-all"
        disabled={currentIndex === 0}
        onClick={() => setCurrentIndex((prev) => (prev - 1) % heroImages.length)}
        ><GoTriangleLeft /></button>
         <button
        className="absolute top-1/2 bottom-1/2 right-5 z-50 text-xl lg:text-5xl text-[#401b1b] hover:text-[#f2f2eb] transition-all stroke-2 stroke-[#f2f2eb]"
        onClick={() => setCurrentIndex((prev) => (prev + 1) % heroImages.length)}
        ><GoTriangleRight /></button>
      <div
        className="flex h-full transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="relative min-w-full h-full"
          >
            <Image
              src={image}
              alt={`Hero ${index + 1}`}
              fill
              onClick={() => {setCategory(handleCategory(index));
                 document.getElementById(`Products`)?.scrollIntoView({ behavior: "smooth" });}}
                className="object-cover object-center"
                />
          </div>
        ))}

      </div>
    </div>
  );
};

export default Hero;