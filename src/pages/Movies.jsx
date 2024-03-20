import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { getAnimeMovies } from "../services/fetchApi";
import { useDarkMode } from "../customContexts/DarkModeContext";
import Header from "../features/AnimeList/Header";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";

function Movies() {
  const { data, isLoading } = useQuery(["movies"], getAnimeMovies);
  const { darkMode } = useDarkMode();

  return (
    <>
      <div
        className={` mt-[-1.5rem] container mx-auto px-4 py-8 ${
          darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
        } transC  `}
      >
        <div className="mt-[-2rem] pb--6 ">
          <Header header="Trending Movies " />
        </div>
        <div className="classification  w-[85rem] h-[8rem] mt-[-0.9rem] ml-[-3.5rem] rounded-lg mb-4 p-8">
          {/* <h1 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-teal-300 via-gray-200 to-teal-600 bg-clip-text text-center mb-8">
          New Movies
        </h1> */}
        </div>

        <div className="  grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {isLoading ? (
            <Spinner />
          ) : data && data.data ? (
            data.data.map((item) => (
              <Link
                key={item.mal_id}
                to={`/anime/${item.mal_id}`}
                className="relative overflow-hidden group"
              >
                <div
                  className={` shadow-md rounded-md overflow-hidden transition-colors duration-300 ${
                    darkMode
                      ? "bg-gray-800 text-gray-300"
                      : "text-gray-900 bg-white "
                  }`}
                >
                  <p
                    className={`mt-[15rem] ml-[8rem] absolute text-sm font-medium ${
                      darkMode ? "text-gray-800" : "text-white"
                    } bg-yellow-500 rounded-full py-1 px-2`}
                  >
                    {item.type}
                  </p>
                  <div className="group">
                    <img
                      src={item.images.jpg.image_url}
                      alt={item.title}
                      className="w-full h-[17rem] object-cover group-hover:opacity-75 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-gray-950 opacity-0 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 relative z-10">
                    <p
                      className={`text-lg font-semibold mb-2 truncate ${
                        darkMode ? "text-gray-300" : "text-gray-900"
                      }`}
                    >
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
        {!isLoading && (
          <div className="ml-[-6.8rem] mb-[-3.5rem] ">
            <Footer className="absolute w-full bottom-0" />
          </div>
        )}
      </div>
    </>
  );
}

export default Movies;
