import { useState, useRef } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getRecommendations } from "../../services/fetchApi";
import React from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useDarkMode } from "../../customContexts/DarkModeContext";
import Spinner from "../../ui/Spinner";
function RecentlyAddedAnime({ data, isLoading }) {
  // const { data, isLoading } = useQuery("pinnedanime", getRecommendations);
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= 300; // Adjust the scroll amount as needed
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += 300; // Adjust the scroll amount as needed
    }
  };

  const { darkMode } = useDarkMode();
  return (
    <div
      className={`container mx-auto px-4 py-8 overflow-y-hidden ${
        darkMode ? "dark" : ""
      }`}
    >
      <h2
        className={`text-2xl font-extrabold ${
          darkMode ? "text-white" : "text-transparent"
        }  mb-8 transition-colors duration-500 bg-gradient-to-r from-teal-300 via-gray-700 to-gray-900 bg-clip-text text-right `}
        style={{ WebkitBackgroundClip: "text" }}
      >
        Pinned Anime
      </h2>
      <div className="relative">
        <div
          className="flex space-x-4"
          ref={scrollContainerRef}
          style={{
            scrollBehavior: "smooth",
            overflowX: "scroll",
            whiteSpace: "nowrap",
            scrollbarWidth: "none" /* Firefox */,
            // "-ms-overflow-style": "none" /* Internet Explorer 11 */,
          }}
        >
          {isLoading ? (
            <Spinner />
          ) : data && data.data ? (
            data.data.map((item) => (
              <Link
                key={item.mal_id}
                to={`/anime/${item.mal_id}`}
                className="inline-block w-[14rem] relative"
              >
                <div className="bg-white w-[14rem] h-[18rem] shadow-md rounded-md overflow-hidden">
                  {item.images && item.images.jpg && (
                    <>
                      <img
                        src={item.images.jpg.image_url}
                        alt={item.title}
                        className="w-[14rem] h-[18rem] object-cover"
                      />
                    </>
                  )}
                  <div
                    className={`text-${
                      darkMode ? "gray-800" : "white"
                    } mt-[-1.5rem] absolute top-0 right-0 bg-${
                      darkMode ? "gray-300" : "gray-900"
                    } rounded-full px-2 py-1 text-sm font-medium`}
                  >
                    {item.status}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
                    <p className=" truncate text-lg font-semibold text-white px-2 py-1">
                      {item.title}
                    </p>
                    {/* <p
                      className={`text-xs font-medium text-${
                        darkMode ? "gray-800" : "white"
                      } bg-yellow-500 rounded-full py-1 px-2`}
                    >
                      {item.type}
                    </p> */}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
        <button
          className="sm:ml-[0rem] mt-[-11rem] sm:mt-[-11rem]  sm:mr-0 absolute top-1/2 left-0 sm:left-auto bg-gray-900 text-white px-4 py-2 rounded-lg opacity-50 hover:opacity-75 uppercase text-xs font-semibold tracking-wider"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          className="sm:ml-[75.5rem] mt-[-11rem] sm:mt-[-11rem]  mr-0 sm:mr-0 absolute top-1/2 right-0 sm:right-auto bg-gray-900 text-white px-4 py-2 rounded-lg opacity-50 hover:opacity-75 uppercase text-xs font-semibold tracking-wider"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default RecentlyAddedAnime;
