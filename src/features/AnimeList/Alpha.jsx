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
    setCharData(letter);
    updateUrl("char", letter);
  };

  return (
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
        >
          {letter}
        </a>
      ))}
    </div>
  );
}

export default Alpha;
