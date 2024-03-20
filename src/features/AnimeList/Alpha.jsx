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
    setCharData(letter);
    updateUrl("char", letter);
  };

  return (
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
        >
          {letter}
        </a>
      ))}
    </div>
  );
}

export default Alpha;
