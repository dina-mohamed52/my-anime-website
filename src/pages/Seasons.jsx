import { useQuery } from "react-query";
import { getAnimeRecommendations } from "../services/fetchApi";
import { useDarkMode } from "../customContexts/DarkModeContext";
import { Link } from "react-router-dom";
import React from "react";
import Header from "../features/AnimeList/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
function Seasons() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  let season;
  switch (currentDate.getMonth()) {
    case 11:
    case 0:
    case 1:
      season = "Winter";
      break;
    case 2:
    case 3:
    case 4:
      season = "Spring";
      break;
    case 5:
    case 6:
    case 7:
      season = "Summer";
      break;
    default:
      season = "Fall";
  }

  const { data, isLoading } = useQuery("animeRecommendations", () =>
    getAnimeRecommendations(year, season)
  );

  const { darkMode } = useDarkMode();

  return (
    <div className={`${darkMode ? "bg-gray-800" : "bg-white"} py-8 px-4`}>
      {/* ✅ نفس شكل هيدر موفيز */}
      <div className="mb-6">
        <Header header={`${season} ${year}`} />
      </div>

      <div className="container mx-auto ">
        {/* ✅ نفس خلفية التوب */}
        <div className="w-full classification bg-gradient-to-r from-teal-300 via-indigo-100 to-purple-300 rounded-lg py-8 px-2 mb-8 text-center">

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <Spinner />
          ) : data && data.data ? (
            data.data.map((item) => (
              <Link
                key={item.mal_id}
                to={`/anime/${item.mal_id}`}
                className="relative overflow-hidden"
              >
                <div
                  className={`bg-white border rounded-md shadow-2xl overflow-hidden ${
                    darkMode ? "dark:bg-gray-800" : ""
                  }`}
                >
                  <div className="group">
                    {item.images && item.images.jpg && (
                      <img
                        src={item.images.jpg.image_url}
                        alt={item.title}
                        className="w-full h-[20rem] object-cover transition-opacity duration-300 group-hover:opacity-75"
                      />
                    )}
                    <div className="absolute inset-0 bg-gray-800 opacity-0 transition-opacity duration-300"></div>
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
                      className={`absolute top-4 right-4 text-xs font-medium ${
                        darkMode ? "text-gray-800" : "text-white"
                      } bg-yellow-500 rounded-full py-1 px-2`}
                    >
                      {item.type}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Seasons;
