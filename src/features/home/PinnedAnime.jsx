import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDarkMode } from "../../customContexts/DarkModeContext";
import Spinner from "../../ui/Spinner";
import { Row, Col } from "antd";

function RecentlyAddedAnime({ data, isLoading }) {
  const scrollContainerRef = useRef(null);
  const { darkMode } = useDarkMode();

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300;
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300;
    }
  };

  return (
    <div
      className={`relative container mx-auto px-4 py-8 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <h2 className="text-2xl font-extrabold mb-8 bg-gradient-to-r from-teal-300 via-gray-700 to-gray-900 bg-clip-text text-transparent">
        Pinned Anime
      </h2>

      <div className="relative">
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth pr-4"
        >
          {isLoading ? (
            <Spinner />
          ) : data && data.data ? (
            data.data.map((item) => (
              <Link
                key={item.mal_id}
                to={`/anime/${item.mal_id}`}
                className="flex-shrink-0 w-[10rem] sm:w-[12rem] md:w-[13rem] lg:w-[14rem] relative"
              >
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden h-[18rem] relative">
                  {item.images?.jpg?.image_url && (
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div
                    className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      darkMode
                        ? "bg-gray-200 text-gray-800"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {item.status}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <p className="text-white text-sm font-semibold px-2 text-center truncate">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>

        {/* Left Button */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 left-2 bg-gray-800 text-white rounded-full w-10 h-10 opacity-70 hover:opacity-90 z-10"
        >
          <FaChevronLeft />
        </button>

        {/* Right Button */}
        <button
          onClick={scrollRight}
          className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 right-2 bg-gray-800 text-white rounded-full w-10 h-10 opacity-70 hover:opacity-90 z-10"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default RecentlyAddedAnime;
