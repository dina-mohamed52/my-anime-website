import React from "react";
import { useQuery } from "react-query";
import { getAnimeTop } from "../../services/fetchApi";
import { Link } from "react-router-dom";
import { useDarkMode } from "../../customContexts/DarkModeContext";
import Header from "../AnimeList/Header";
import Spinner from "../../ui/Spinner";

function RecommendationSec({data,isLoading}) {
  // const { data, isLoading } = useQuery("animeRecommendations", getAnimeTop);
  const { darkMode } = useDarkMode();

  return (
    <div className="container mx-auto px-4 py-8">
      {!isLoading && (
        <h2
          className={` py-4 text-2xl font-extrabold ${
            darkMode ? "text-white" : "text-transparent"
          } bg-gradient-to-r from-teal-300 via-gray-700 to-gray-900 bg-clip-text text-right mb-4`}
          style={{ WebkitBackgroundClip: "text" }}
        >
          Most watched anime of the season
        </h2>
      )}
      {/* <Header header="Most watched anime of the season" /> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <Spinner />
        ) : data && data.data ? (
          data.data.map((item) => (
            <Link key={item.mal_id} to={`/anime/${item.mal_id}`}>
              <div
                className={`bg-white shadow-md rounded-md overflow-hidden ${
                  darkMode ? "dark:bg-gray-800" : ""
                }`}
              >
                <div className="relative group">
                  <img
                    className="w-full rounded-lg h-[20rem] object-cover"
                    src={item.images.jpg.image_url}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </div>
                <div className="p-2 flex flex-col relative z-10">
                  <div
                    className={`  text-${
                      darkMode ? "white" : "white"
                    }  mt-[-20rem]  absolute  bg-${
                      darkMode ? "gray-900" : "gray-900"
                    } rounded-full px-2 py-1 text-sm font-medium`}
                  >
                    {item.status}
                  </div>
                  <div className="p-4 relative z-10">
                    <p
                      className={`text-lg font-semibold mb-2 truncate ${
                        darkMode ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {item.title}
                    </p>
                    <p
                      className={` absolute mt-[-5rem] ml-[15rem] text-xs font-medium text-${
                        darkMode ? "gray-800" : "white"
                      } bg-yellow-500 rounded-full py-1 px-2`}
                    >
                      {item.type}
                    </p>
                    <p
                      className={`text-sm text-gray-600 line-clamp-2 ${
                        darkMode ? "dark:text-gray-300" : ""
                      }`}
                    >
                      {item.synopsis}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No data available</p>
        )}
      </div>
    </div>
  );
}

export default RecommendationSec;
