import React, { useState } from "react";
import { useEffect } from "react";
import { CustomSelect } from "../../ui/DropDown";
import { useAnimeContext } from "../../customContexts/useAnimeContext";
import { useNavigate, useLocation } from "react-router-dom";
import useGenres from "../../hooks/getGenresHook";
import { getSeason } from "../../services/fetchApi";

function Classifications() {
  //  const [genres, setGenres] = useState([]);
  const status = [
    { label: "complete", value: "complete" },
    { label: "airing", value: "airing" },
    { label: "upcoming", value: "upcoming" },
    
  ];

  const types = [
    { label: "TV", value: "TV" },
    { label: "Movie", value: "movie" },
    { label: "OVA", value: "ova" },
    { label: "ONA", value: "ona" },
    { label: "Special", value: "special" },
  ];

 const seasons = Array.from({ length: 46 }, (_, i) => {
   const year = 1979 + i;
   return [
     { year: year, season: "Winter" },
     { year: year, season: "Spring" },
     { year: year, season: "Summer" },
     { year: year, season: "Fall" },
   ];
 } ).flat();
  // console.log(seasons)
  

  const { animeClassification, setAnimeClassification } = useAnimeContext();
  const { animeStatus, setAnimeStatus } = useAnimeContext();
  const { animeType, setAnimeType } = useAnimeContext();
  const { animeSeason, setAnimeSeason } = useAnimeContext();

  const location = useLocation();
  const navigate = useNavigate();
 const [reloadOnce, setReloadOnce] = useState(false);

  const updateUrl = (param, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("Season");
    searchParams.delete("Year");
    searchParams.delete( "page" );
     searchParams.delete("char");
    searchParams.set(param, value);
    setReloadOnce(true)
    navigate(`?${searchParams.toString()}`);
  };

  const updateUrlSeason = ({ Season, Year }) => {
    const searchParams = new URLSearchParams(location.search);

    // Remove genre, type, and status parameters
    searchParams.delete("Type");
    searchParams.delete("genre");
    searchParams.delete("Status");
    searchParams.delete("page");
    searchParams.delete("char");

    // Set Season and Year parameters
    searchParams.set("Season", Season);
    searchParams.set("Year", Year);

    navigate(`?${searchParams.toString()}`);
    // window.location.reload();
  };

  useEffect(() => {
    if (reloadOnce) {
      window.location.reload(); // Reload the website when the animeType changes
    }
  }, [reloadOnce]);

  const genres = useGenres();

  //////////////////////////////////////////////////////udate the url and pass the genre to it
  const handleClassificationChange = (value) => {
    const selectedGenre = genres.find((genre) => genre.id === value); // Use id for comparison
   
    if (selectedGenre) {
      setAnimeClassification(selectedGenre.label);
      // Use id instead of value
      updateUrl("page", "1"); // Update the URL to reflect the new page number
      updateUrl( "genre", selectedGenre.id );// Update the URL with the selected genre
      
    
    }
  };



  const handleStatusChange = (value) => {
    setAnimeStatus(value);

    updateUrl("Status", value);
    setReloadOnce(true);
  };

  const handleTypeChange = (value) => {
    setAnimeType(value);

    updateUrl("Type", value);
    setReloadOnce(true);
  };

  const handleSeasonChange = (value) => {
    const [year, season] = value.split("-");
    setAnimeSeason(value);
    updateUrlSeason({ Season: season, Year: year });
    getSeason(year, season);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    // const classificationParam = searchParams.get("genre");
    const statusParam = searchParams.get("Status");
    const typeParam = searchParams.get("Type");
    const seasonParam = searchParams.get("Season");

    // setAnimeClassification(classificationParam.label);
    setAnimeStatus(statusParam || "");
    setAnimeType(typeParam || "");
    setAnimeSeason(seasonParam || "");
  }, [
    location.search,
    setAnimeClassification,
    setAnimeSeason,
    setAnimeStatus,
    setAnimeType,
  ]);

  return (
    <div className=" mt-[0.6rem] flex justify-center items-center h-full">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="col-span-1">
          <CustomSelect
            options={genres.map((genre) => ({
              label: genre.label,
              value: genre.id,
            }))}
            value={animeClassification}
            name="animeClassification"
            onChange={handleClassificationChange}
          />
        </div>
        <div className="col-span-1">
          <CustomSelect
            options={status}
            value={animeStatus}
            name="animeStatus"
            onChange={handleStatusChange}
          />
        </div>
        <div className="col-span-1">
          <CustomSelect
            options={types}
            value={animeType}
            name="animeType"
            onChange={handleTypeChange}
          />
        </div>
        <div className="col-span-1">
          <CustomSelect
            options={seasons.map((season) => ({
              label: `${season.year} - ${season.season}`,
              value: `${season.year}-${season.season}`,
            }))}
            value={animeSeason}
            name="animeSeason"
            onChange={handleSeasonChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Classifications;
