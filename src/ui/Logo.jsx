import React from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../customContexts/DarkModeContext";

function Logo() {
  const { darkMode } = useDarkMode();

  return (
    <div className="hidden md:block">
      <Link to="/home">
        <div className="flex-shrink-0 text-4xl font-extrabold flex items-center">
          <span
            className={`italic font-extrabold text-transparent ${
              darkMode
                ? "bg-gradient-to-r from-teal-400 via-slate-400 to-teal-800"
                : "bg-gradient-to-r from-teal-700 via-gray-700 to-gray-900"
            } bg-clip-text mr-2 ${
              darkMode ? "text-gray-300" : "text-gray-900"
            }`}
          >
            my
          </span>
          <span
            className={`italic bg-clip-text text-transparent ${
              darkMode
                ? "bg-gradient-to-r from-teal-500 via-slate-400 to-teal-800"
                : "bg-gradient-to-r from-teal-700 via-gray-700 to-gray-900"
            } ${darkMode ? "text-gray-300" : "text-gray-900"}`}
          >
            Anime
          </span>
        </div>
      </Link>
    </div>
  );
}

export default Logo;
