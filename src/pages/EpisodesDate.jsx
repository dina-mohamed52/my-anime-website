import { useQuery } from "react-query";
import { getEpisodesDate } from "../services/fetchApi";
<<<<<<< HEAD
=======
import Footer from "../ui/Footer";
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
import React from "react";
import { useDarkMode } from "../customContexts/DarkModeContext";
import Header from "../features/AnimeList/Header";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";
<<<<<<< HEAD

=======
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
function EpisodesDate() {
  const daysOfWeek = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ];

  const fetchEpisodesDate = async (day) => {
    try {
      const data = await getEpisodesDate(day);
<<<<<<< HEAD
      return data;
=======
      return data; // Assuming data is already an array of episodes
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
    } catch (error) {
      console.error("Error fetching anime data:", error);
      throw error;
    }
  };

  const { data, isLoading, error } = useQuery("episodesDate", async () => {
    const episodesData = {};
    for (const day of daysOfWeek) {
      episodesData[day] = await fetchEpisodesDate(day);
    }
    return episodesData;
  });

  const { darkMode } = useDarkMode();

  return (
<<<<<<< HEAD
    <div className={`w-full px-4 py-8 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} transC`}>
      <div className="mb-6">
        <Header header="Episodes for each day of the week" />
      </div>

      {isLoading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-600 text-center">Error: {error.message}</p>
      ) : (
        <div className="space-y-8">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className={`p-6 rounded-md shadow-md transC ${darkMode ? "bg-gray-800" : "bg-white"}`}
            >
              <h3 className="text-2xl font-bold mb-4 capitalize">
                {day}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {data && data[day] && Array.isArray(data[day].data) ? (
                  data[day].data.map((episode) => (
                    <Link
                      key={episode.mal_id}
                      to={`/anime/${episode.mal_id}`}
                      className="relative group rounded-md overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg"
                    >
                      <div className="relative">
                        <img
                          src={episode.images.jpg.image_url}
                          alt={episode.title}
                          className="w-full h-64 object-cover"
                        />

                        {/* Status badge */}
                        <div className="absolute top-2 left-2 text-white bg-gray-900 rounded-full px-2 py-1 text-xs font-medium">
                          {episode.status}
                        </div>

                        {/* Type badge */}
                        <div className="absolute top-2 right-2 text-white bg-yellow-500 rounded-full px-2 py-1 text-xs font-medium">
                          {episode.type}
                        </div>
                      </div>

                      <div className="p-4 bg-white dark:bg-gray-800">
                        <p className="truncate text-base font-semibold text-gray-900 dark:text-white">
                          {episode.title}
                        </p>
                      </div>
                    </Link>
=======
    <div className="container mx-auto px-8 py-8">
      <p className="mt-[-4.5rem]">
        <Header header="Episodes for each day of the week" />
      </p>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          daysOfWeek.map((day) => (
            <div
              key={day}
              className={`bg-white px-8 transC shadow-md rounded-md overflow-hidden ${
                darkMode ? "dark:bg-gray-800" : ""
              }`}
            >
              <h3
                className={`text-2xl transC font-extrabold p-4 ${
                  darkMode ? "text-white" : "text-gray-900"
                }`}
              >
                {day.charAt(0).toUpperCase() + day.slice(1)}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 2xl:grid-cols-6 gap-4">
                {data && data[day] && Array.isArray(data[day].data) ? (
                  data[day].data.map((episode) => (
                    <div
                      key={episode.id}
                      className={`bg-white shadow-md rounded-md overflow-hidden group ${
                        darkMode ? "dark:bg-gray-800" : ""
                      }`}
                    >
                      <Link
                        to={`/anime/${episode.mal_id}`}
                        className="relative overflow-hidden block"
                      >
                        <div className="relative">
                          <img
                            src={episode.images.jpg.image_url}
                            alt={episode.title}
                            className="w-full h-[17rem] object-cover"
                          />
                          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                        </div>
                        <div className="p-2 flex flex-col relative z-10">
                          <div
                            className={`absolute mt-[-17rem] ml-[-0.5rem] text-${
                              darkMode ? "white" : "white"
                            } bg-${
                              darkMode ? "gray-900" : "gray-900"
                            } rounded-full px-2 py-1 text-xs font-medium`}
                          >
                            {episode.status}
                          </div>
                          <div className="p-4 relative z-10">
                            <p
                              className={`truncate text-base font-semibold ${
                                darkMode ? "text-white" : "text-gray-900"
                              }`}
                            >
                              {episode.title}
                            </p>
                            <p
                              className={`absolute mt-[-4rem] ml-[7.5rem] text-xs font-medium text-${
                                darkMode ? "gray-800" : "white"
                              } bg-yellow-500 rounded-full py-1 px-2`}
                            >
                              {episode.type}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
                  ))
                ) : (
                  <p>No episodes for {day}</p>
                )}
              </div>
            </div>
<<<<<<< HEAD
          ))}
=======
          ))
        )}
      </div>
      {!isLoading && (
        <div className="ml-[-8rem] mb-[-3.5rem] ">
          <Footer className="absolute w-full bottom-0" />
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
        </div>
      )}
    </div>
  );
}

export default EpisodesDate;
