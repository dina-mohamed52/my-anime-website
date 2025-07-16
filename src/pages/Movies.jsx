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
   <div
  className={`w-full px-4 py-8 ${
    darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
  } transC`}
>
  <div className="mb-6">
    <Header header="Trending Movies" />
  </div>

  {/* خلفية مبسطة دون ترحيل */}
  <div className="w-full classification bg-gradient-to-r from-teal-300 via-indigo-100 to-purple-300 rounded-lg py-8 px-2 mb-8 text-center">
    {/* ممكن تضيف أي محتوى هنا */}
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4">
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
            className={`rounded-md overflow-hidden transition-colors duration-300 shadow ${
              darkMode ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
            }`}
          >
            <span className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
              {item.type}
            </span>
            <img
              src={item.images.jpg.image_url}
              alt={item.title}
              className="w-full h-[17rem] object-cover group-hover:opacity-75 transition-opacity duration-300"
            />
            <div className="p-3">
              <p className="text-sm font-semibold truncate">{item.title}</p>
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

export default Movies;
