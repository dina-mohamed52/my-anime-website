/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../customContexts/DarkModeContext";

function AnimeItem({ anime }) {
  const { darkMode } = useDarkMode();

  return (
    <Link to={`/anime/${anime.mal_id}`}>
      <div
        className={`w-full md:w-44 lg:w-[12rem] text-${
          darkMode ? "gray-300" : "gray-900"
        } bg-${
          darkMode ? "gray-800" : "white"
        } rounded-xl shadow-xl overflow-hidden  pb-2 relative group m-0.5 md:m-2`}
      >
        <div className="relative">
          <img
            className="w-full rounded-lg h-[20rem] object-cover"
            src={anime.images.jpg.image_url}
            alt={anime.title}
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        </div>
        <div className="p-2 flex flex-col relative z-10">
          <div
            className={`text-${
              darkMode ? "white" : "white"
            } m absolute mt-[-20rem] ml-[-0.5rem] bg-${
              darkMode ? "gray-900" : "gray-900"
            } rounded-full px-2 py-1 text-sm font-medium`}
          >
            {anime.status}
          </div>
          <div className="flex items-center mt-1">
            <h2
              className={` truncate text-base font-semibold mr-2 ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {anime.title}
            </h2>
            <p
              className={`text-xs font-medium text-${
                darkMode ? "gray-800" : "white"
              } bg-yellow-500 rounded-full py-1 px-2`}
            >
              {anime.type}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AnimeItem;
