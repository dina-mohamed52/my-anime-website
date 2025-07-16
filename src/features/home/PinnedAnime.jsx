<<<<<<< HEAD
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
=======
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
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
        >
          {isLoading ? (
            <Spinner />
          ) : data && data.data ? (
            data.data.map((item) => (
              <Link
                key={item.mal_id}
                to={`/anime/${item.mal_id}`}
<<<<<<< HEAD
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
=======
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
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
                  >
                    {item.status}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100">
<<<<<<< HEAD
                    <p className="text-white text-sm font-semibold px-2 text-center truncate">
                      {item.title}
                    </p>
=======
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
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
<<<<<<< HEAD

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
=======
        <button
          className="sm:ml-[0rem] mt-[-11rem] sm:mt-[-11rem]  sm:mr-0 absolute top-1/2 left-0 sm:left-auto bg-gray-900 text-white px-4 py-2 rounded-lg opacity-50 hover:opacity-75 uppercase text-xs font-semibold tracking-wider"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </button>
        <button
          className="sm:ml-[75.5rem] mt-[-11rem] sm:mt-[-11rem]  mr-0 sm:mr-0 absolute top-1/2 right-0 sm:right-auto bg-gray-900 text-white px-4 py-2 rounded-lg opacity-50 hover:opacity-75 uppercase text-xs font-semibold tracking-wider"
          onClick={scrollRight}
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default RecentlyAddedAnime;
