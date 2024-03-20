import React from "react";
import { useDarkMode } from "../../customContexts/DarkModeContext";

function Header({ header }) {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`bg-${
        darkMode ? "gray-900" : "white"
      } mt-[-2.6rem] ml-[-5.5rem] w-full md:w-[94rem] mb-4 text-${
        darkMode ? "gray-300" : "gray-800"
      } py-4 shadow-2xl z-40 transC`}
    >
      <h1 className="text-2xl ml-[-6rem] font-semibold text-center">
        {header}
      </h1>
    </div>
  );
}

export default Header;
