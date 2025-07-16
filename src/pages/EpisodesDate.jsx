import { useQuery } from "react-query";
import { getEpisodesDate } from "../services/fetchApi";
import React from "react";
import { useDarkMode } from "../customContexts/DarkModeContext";
import Header from "../features/AnimeList/Header";
import Spinner from "../ui/Spinner";
import { Link } from "react-router-dom";

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
      return data;
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
                  ))
                ) : (
                  <p>No episodes for {day}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EpisodesDate;
