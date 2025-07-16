import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import {  useLocation, useNavigate } from "react-router-dom";
import AnimeItem from "../features/AnimeList/AnimeItem";
import Header from "../features/AnimeList/Header";
import AnimeClassification from "../features/AnimeList/AnimeClassification";
import { customSort } from "../helpers/sorting";
import { fetchAnimeByGenre, getAlph, getSeason } from "../services/fetchApi";
import React from "react";
import Footer from "../ui/Footer";
import Spinner from "../ui/Spinner";
import { useSearchValue } from "../hooks/getSearchValue";
function AnimeList() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const pageNum = parseInt(searchParams.get("page")) || 1;
  const genre = searchParams.get("genre");
  const Type = searchParams.get("Type");
  const Status = searchParams.get("Status");
  const Season = searchParams.get("Season");
  const Year = searchParams.get("Year");
  const char = searchParams.get("char");
  const [currentPageNum, setCurrentPageNum] = useState(pageNum);
  const [seasonData, setSeasonData] = useState(null); // Initialize seasonData state
  const [charData, setCharData] = useState(null);
  const [seasonPagination, setSeasonPagination] = useState(null); // Initialize seasonData state
  const [charPagination, setCharPagination] = useState(null); // Initialize seasonData state
  const navigate = useNavigate();

  const { searchValue, setSearchValue } = useSearchValue();
  console.log("vhvuyvyvuyyuhojp",searchValue)
  const { data, isFetching, isLoading, isError, error, refetch } = useQuery(
    ["animeData", currentPageNum, genre, Type, Status, Season, Year, char],
    async () => {
      if (genre || Type || Status) {
        const { data } = await fetchAnimeByGenre(
          genre,
          currentPageNum,
          navigate,
          Type,
          Status
        );

        return data;
      } else if (Season && Year) {
        const { data: seasonDataRes, pagination: SeasonPagination2 } =
          await getSeason(Year, Season);
        setSeasonData(seasonDataRes); // Update seasonData state
        setSeasonPagination(SeasonPagination2);

        return seasonDataRes;
      } else if (char) {
        // console.log("Fetching anime for char:", char);
        const { data: charDataR, pagination: CharPagination2 } = await getAlph(
          char
        );
        setCharData(charDataR);
        setCharPagination(CharPagination2);
        // console.log("Received data for char:", char, data);
        return charDataR;
      } else {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?page=${currentPageNum}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      }
    },
    { enabled: !!genre || !!Season || !!char || currentPageNum !== pageNum }
  );
  useEffect(() => {
    refetch();
  }, [currentPageNum, genre, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return `Error: ${error.message}`;
  }

  if (!data) {
    return "No data available";
  }

  let hasNextPage;
  // console.log("seaaaaa", seasonData);
  // console.log("data", data);
  let sortedData;

  if (seasonData) {
    sortedData = seasonData;
    hasNextPage = seasonPagination && seasonPagination.has_next_page;
  } else if (char) {
    sortedData = charData;
    // hasNextPage = charPagination && charPagination.has_next_page;
    //  console.log("sortedCahr", sortedData);
  } else {
    sortedData = data.data?.slice().sort(customSort);
    hasNextPage = data.pagination && data.pagination.has_next_page;
  }

  ////////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////
  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      const nextPageNum = currentPageNum + 1; // Calculate the next page number
      setCurrentPageNum(nextPageNum);
      let queryParams = `?page=${nextPageNum}`;
      if (genre) {
        queryParams += `&genre=${genre}`;
      }
      if (Type) {
        queryParams += `&Type=${Type}`;
      }
      if (Status) {
        queryParams += `&Status=${Status}`;
      }
      if (Season && Year) {
        queryParams += `&Season=${Season}&Year=${Year}`;
      }
      if (char) {
        queryParams += `&char=${char}`;
      }
      navigate(queryParams); // Navigate to the next page with query parameters
      refetch(); // Refetch the data for the next page
    }
  };

  const handlePrevLoad = () => {
    if (currentPageNum > 1 && !isFetching) {
      const prevPageNum = currentPageNum - 1;
      setCurrentPageNum(prevPageNum);
      if (genre) {
        navigate(`?page=${prevPageNum}&genre=${genre}`);
      } else if (Type) {
        navigate(`?page=${prevPageNum}&Type=${Type}`); // Navigate to the next page with Type parameter
        if (Status) {
          navigate(`?page=${prevPageNum}&Status=${Status}`); // Navigate to the next page with Status parameter
        }
      } else {
        navigate(`?page=${prevPageNum}`);
      }
    }
  };

  return (
  <>
  {/* ✅ Full-width section with styled background */}
  <div className="w-full bg-gradient-to-r classification py-8">
    <div className="max-w-7xl mx-auto px-4">
      <Header header="Anime List" />
      <AnimeClassification />
    </div>
  </div>

  {/* ✅ Anime cards and pagination inside a centered container */}
  <div className="container mx-auto px-4 py-8">
    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {(seasonData || sortedData)
        .slice((currentPageNum - 1) * 10, currentPageNum * 10)
        .map((anime) => (
          <div key={anime.mal_id} className="flex justify-center">
            <AnimeItem anime={anime} />
          </div>
        ))}
    </div>

    <div className="flex justify-center flex-wrap gap-4 mt-8">
      {currentPageNum > 1 && (
        <button
          onClick={handlePrevLoad}
          disabled={isFetching && currentPageNum === 1}
          className="w-40 bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
          &larr; {isFetching ? "Loading..." : "Prev Page"}
        </button>
      )}

      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          disabled={isFetching}
          className="w-40 bg-blue-900 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition"
        >
          {isFetching ? "Loading..." : "Next Page"} &rarr;
        </button>
      )}
    </div>
  </div>
</>


  );
}

export default AnimeList;