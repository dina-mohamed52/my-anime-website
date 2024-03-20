/* eslint-disable react/prop-types */

import React, { createContext, useContext, useState } from "react";

const AnimeContext = createContext();

export const useAnimeContext = () => useContext(AnimeContext);

export const AnimeProvider = ({ children }) => {
  const [animeClassification, setAnimeClassification] = useState("");
  const [animeStatus, setAnimeStatus] = useState("");
  const [animeType, setAnimeType] = useState("");
  const [animeSeason, setAnimeSeason] = useState("");

  return (
    <AnimeContext.Provider
      value={{
        animeClassification,
        setAnimeClassification,
        animeStatus,
        setAnimeStatus,
        animeType,
        setAnimeType,
        animeSeason,
        setAnimeSeason,
      }}
    >
      {children}
    </AnimeContext.Provider>
  );
};
