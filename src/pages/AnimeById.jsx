  import React from "react";
  import { useQuery } from "react-query";
  import { getAnimeById, getAnimeEpisodes } from "../services/fetchApi";
  import { useParams } from "react-router-dom";



  import { formatDate } from "../helpers/sorting";
  import Spinner from "../ui/Spinner";

  function AnimeById() {
    const { id } = useParams();
    // const [currentPage, setCurrentPage] = useState(1);
    const {
      data: animeData,
      error: animeError,
      isLoading: animeLoading,
    } = useQuery("animeId", () => getAnimeById(id));
    const {
      data: episodesData,
      error: episodesError,
      isLoading: episodesLoading,
    } = useQuery("animeEpisodes", () => getAnimeEpisodes(id));
    // console.log(episodesData);
    let hasNextPage = episodesData;
    // .pagination && episodesData.pagination.has_next_page;
    if (animeLoading || episodesLoading) {
      return <Spinner />;
    }

    if (animeError || episodesError) {
      return <div>Error: {animeError || episodesError}</div>;
    }

    return (
      <>
        <div className=" mx-auto w-[85rem] py-8 pt--6 mt-[-0.9rem] id text-gray-200 font-medium ">
          <div className="grid grid-cols-2 gap-8">
            <div className="w-[42rem] p-4 ml-[2rem] mt-[-1rem]">
              <h1 className="text-3xl font-bold">{animeData.data.title}</h1>
              <div className="mt-8">
                <ul className="flex flex-wrap gap-2">
                  {animeData.data.genres.map((genre) => (
                    <li
                      key={genre.mal_id}
                      className="bg-transparent border border-teal-600 px-2 py-1 rounded-full"
                    >
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm mt-4">{animeData.data.synopsis}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="flex">
                  <p className="font-semibold mr-2">Episode Duration:</p>
                  <p>{animeData.data.duration}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Episodes:</p>
                  <p>{animeData.data.episodes}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Status:</p>
                  <p>{animeData.data.status}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Type:</p>
                  <p>{animeData.data.type}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Season:</p>
                  <p>{animeData.data.season}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Source:</p>
                  <p>{animeData.data.source}</p>
                </div>
                <div className="flex">
                  <p className="font-semibold mr-2">Start Airing:</p>
                  <p>
                    {" "}
                    <p>{formatDate(animeData.data.aired.from)}</p>
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src={animeData.data.images.jpg.large_image_url}
                alt={animeData.data.title}
                className="rounded-xl ml-[9rem] mt-[-1.5rem] object-contain "
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {episodesData.data.map((episode) => (
            <a
              key={episode.mal_id}
              href={`https://myanimelist.net/anime/${animeData.data.mal_id}/episode/${episode.episode_id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div
                className="text-white h-[13.5rem] mt-[2rem] p-4 rounded-lg flex flex-col items-center"
                style={{
                  backgroundImage: `url(${animeData.data.images.jpg.image_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <p className="text-lg text-white font-bold mt-[10rem]">
                  Episode {episode.mal_id}
                </p>
              </div>
            </a>
          ))}
        </div>
        {/* {!animeLoading && (
          <div className="ml-[-5rem] mb-[-1.5rem] pt-4 ">
            <Footer className="absolute w-full bottom-0" />
          </div>
        )} */}
      </>
    );
  }

  export default AnimeById;
