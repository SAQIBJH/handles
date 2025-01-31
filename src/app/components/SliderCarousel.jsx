"use client";

import { useState, useEffect, useRef } from "react";
function CustomButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`
          w-8 h-8 md:w-12 md:h-12 flex items-center justify-center
          bg-transparent hover:scale-110
          transition-transform duration-300
        `}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <svg
        viewBox="0 0 24 24"
        className={`w-6 h-6 md:w-8 md:h-8 ${
          direction === "prev" ? "rotate-180" : ""
        }`}
      >
        <path
          d="M9 5l7 7-7 7"
          stroke="rgb(13, 148, 136)"
          strokeWidth="5"
          strokeLinecap=""
          strokeLinejoin="butt"
          fill="none"
        />
      </svg>
    </button>
  );
}


export default function Carousel({Handles,handlesData,isBrand = false}) {
  if(!handlesData || !handlesData.length) return null
  const [slides, setSlides] = useState([]);
  const [transitioning, setTransitioning] = useState(false);
  const [itemsToShow, setItemsToShow] = useState(4);
  const carouselRef = useRef(null);

  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        // lg
        setItemsToShow(4);
      } else if (window.innerWidth >= 768) {
        // md
        setItemsToShow(3);
      } else {
        // sm
        setItemsToShow(1);
      }
    };

    updateItemsToShow();
    window.addEventListener("resize", updateItemsToShow);

    return () => window.removeEventListener("resize", updateItemsToShow);
  }, []);

  useEffect(() => {
    // Initialize with duplicated items to allow infinite scrolling
    setSlides([...handlesData, ...handlesData.slice(0, itemsToShow)]);
  }, [itemsToShow]);

  const moveSlide = (direction) => {
    if (transitioning) return;

    setTransitioning(true);
    const carousel = carouselRef.current;
    const slideWidth = carousel.offsetWidth / itemsToShow;

    if (direction === "next") {
      carousel.style.transition = "transform 0.5s ease-in-out";
      carousel.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        carousel.style.transition = "none";
        carousel.style.transform = "translateX(0)";
        setSlides((prev) => {
          const newSlides = [...prev];
          const firstSlide = newSlides.shift();
          newSlides.push(firstSlide);
          return newSlides;
        });
        setTransitioning(false);
      }, 500);
    } else {
      setSlides((prev) => {
        const newSlides = [...prev];
        const lastSlide = newSlides.pop();
        newSlides.unshift(lastSlide);
        return newSlides;
      });
      carousel.style.transition = "none";
      carousel.style.transform = `translateX(-${slideWidth}px)`;

      setTimeout(() => {
        carousel.style.transition = "transform 0.5s ease-in-out";
        carousel.style.transform = "translateX(0)";
        setTransitioning(false);
      }, 50);
    }
  };

  const nextSlide = () => moveSlide("next");
  const prevSlide = () => moveSlide("prev");

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-16 py-12 mt-6 md:py-12 overflow-hidden">
      <h2 className="text-4xl font-semibold text-[#008080] text-center mb-12 ">
        {Handles}
      </h2>
      <div className="relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-16 z-10">
          <CustomButton direction="prev" onClick={prevSlide} />
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-16 z-10">
          <CustomButton direction="next" onClick={nextSlide} />
        </div>

        <div className="relative overflow-hidden p-2">
          <div
            ref={carouselRef}
            className="flex gap-4 md:gap-9 ease-in-out transition-all duration-300"
          >
            {slides && slides?.length > 0 && slides?.map((handle, index) => (
              <div
                key={`${handle.id}-${index}`}
                className="flex-none w-full md:w-[calc(33.333%-24px)] lg:w-[calc(25%-27px)]"
              >
                <div
                  className="bg-white rounded-lg shadow-lg p-2 transition-all duration-300"
                  style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                >
                  <a 
                  href={isBrand ? handle?.completebrandslug || "#" : handle?.completeurl || "#"}
                    className="relative flex justify-center items-center ">
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${handle?.image?.url}` || "/logo.png"}
                      alt={handle?.image?.alt || `handle ${index}`}
                      width={240}
                      height={240}
                      className="object-fill w-full h-56"
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
