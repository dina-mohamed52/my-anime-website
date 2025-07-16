import React from "react";
import { useDarkMode } from "../../customContexts/DarkModeContext";

function Header({ header }) {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`w-[100vw] max-w-none mb-4 py-4 shadow-2xl z-40 transC ${
        darkMode ? "bg-gray-900 text-gray-300" : "bg-white text-gray-800"
      }`}
      style={{
        marginTop: "-2.6rem",
        marginLeft: "calc(-50vw + 50%)", 
      }}
    >
      <h1 className="text-2xl font-semibold text-center">{header}</h1>
    </div>
  );
}

export default Header;
