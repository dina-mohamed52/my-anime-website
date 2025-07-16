<<<<<<< HEAD
import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function Alpha() {
  const navigate = useNavigate();
  const location = useLocation();
  const [charData, setCharData] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("char") || null;
  });

  const alphabet = useMemo(
    () => "abcdefghijklmnopqrstuvwxyz".split(""),
    []
  );

  const updateUrl = (param, value) => {
    const searchParams = new URLSearchParams(location.search);

    // Reset other filters
    ["Season", "Year", "page", "Type", "genre", "Status"].forEach((key) =>
      searchParams.delete(key)
    );

    searchParams.set(param, value);
    navigate(`?${searchParams.toString()}`);
  };

  const handleCharChange = (e, letter) => {
    e.preventDefault(); // prevent page jump
=======
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Alpha() {
  const navigate = useNavigate();
  const [charData, setCharData] = useState(null);

  const updateUrl = (param, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete("Season");
    searchParams.delete("Year");
    searchParams.delete( "page" );
     searchParams.delete("Type");
     searchParams.delete("genre");
     searchParams.delete("Status");
    searchParams.set(param, value);

    navigate(`?${searchParams.toString()}`);
  };

  const handleCharChange = (letter) => {
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
    setCharData(letter);
    updateUrl("char", letter);
  };

  return (
<<<<<<< HEAD
    <div className="flex flex-wrap justify-start gap-2 mt-6 px-4 sm:px-8">
      {alphabet.map((letter) => (
        <a
          key={letter}
          href={`#${letter}`}
          onClick={(e) => handleCharChange(e, letter)}
          className={`w-8 h-8 flex items-center justify-center rounded-xl text-sm font-semibold transition duration-300 border
            ${
              charData === letter
                ? "bg-teal-500 text-white border-teal-600"
                : "bg-gray-900 text-gray-100 hover:text-gray-400 border-gray-200"
            }`}
=======
    <div className="flex flex-wrap justify-start items-start gap-2 mt-[1.5rem] ml-[1.9rem] ">
      {[
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ].map((letter) => (
        <a
          key={letter}
          href={`#${letter}`}
          onClick={() => handleCharChange(letter)} 
          className="border border-gray-200 w-8 h-8 bg-gray-900 flex justify-center items-center rounded-xl text-sm capitalize font-semibold text-gray-100 hover:text-gray-400 transition duration-300 m-1 p-1"
>>>>>>> 4d37712fb1e4a5e3f0cd06a807db4411c4151ff6
        >
          {letter}
        </a>
      ))}
    </div>
  );
}

export default Alpha;
