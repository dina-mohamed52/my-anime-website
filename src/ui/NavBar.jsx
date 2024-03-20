import React, { useState } from "react";
import { IoSearchOutline, IoMenuSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";
import { useDarkMode } from "../customContexts/DarkModeContext";
import Logo from "./Logo";
import { useSearchValue } from "../hooks/getSearchValue";

function NavBar() {
  const { darkMode } = useDarkMode();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchInputOpen, setIsSearchInputOpen] = useState(false);
  const { searchValue, setSearchValue } = useSearchValue();
   console.log("vhvuyvyvuyyuhojp", searchValue);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchInput = () => {
    setIsSearchInputOpen(!isSearchInputOpen);
  };

  return (
    <nav
      className={`cursor-pointer bg-${
        darkMode ? "gray-800" : "white"
      } z-50 p-2 mb-4 transC `}
      style={{
        boxShadow: darkMode
          ? "0 2px 4px rgba(255, 255, 255, 0.1)"
          : "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex items-center md:ml-6">
              <div
                className={`bg-${darkMode ? "gray-900" : "gray-100"}  text-${
                  darkMode ? "gray-100" : "gray-900"
                } py-1.5 px-3 pt-[0.5rem] cursor-pointer rounded-full mt-4 ml-[-4rem] `}
              >
                <DarkModeToggle className="rounded-full" />
              </div>
              <div
                className={`bg-${darkMode ? "gray-900" : "gray-100"}  text-${
                  darkMode ? "gray-100" : "gray-900"
                }  p-3 ml-3 rounded-full mt-4   `}
                // onClick={toggleSearchInput}
              >
                <IoSearchOutline />
              </div>
            </div>
            {isSearchInputOpen && (
              <div className="ml-3">
                <input
                  type="text"
                  className=" w-[8rem] mt-4 border border-gray-300 rounded-md px-3 py-1 outline-none focus:ring focus:ring-gray-400"
                  placeholder="Search for..."
                  value={ searchValue }
                  onChange={(e)=>setSearchValue(e.target.value)}
                />
              </div>
            )}
            <div className="hidden md:block text-xl font-bold">
              <div className="flex ml-[12rem] items-baseline space-x-6">
                <Link
                  to="/episodesDate"
                  className={`text-${darkMode ? "gray-300" : "gray-900"}
                  ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                    rounded-lg px-3 py-2`}
                >
                  Episodes Date
                </Link>
                <Link
                  to="/seasons"
                  className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg px-3 py-2`}
                >
                  Seasons
                </Link>
                <Link
                  to="/movies"
                  className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg px-3 py-2`}
                >
                  Movies
                </Link>
                <Link
                  to="/animeList"
                  className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg px-3 py-2`}
                >
                  Anime List
                </Link>
                <Link
                  to="/home"
                  className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  } rounded-lg px-3 py-2`}
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
          <Logo />
          <div className="block md:hidden">
            {/* Mobile menu button */}
            <button
              className="text-gray-900 focus:outline-none focus:ring"
              onClick={toggleMobileMenu}
            >
              <IoMenuSharp />
            </button>
          </div>
        </div>
        {/* Mobile menu */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden text-xl font-bold`}
        >
          <div className="flex flex-col ml-[12rem] space-y-2">
            <Link
              to="/episodesDate"
              className={`text-${darkMode ? "gray-300" : "gray-900"}
                  ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"}
                    rounded-lg px-3 py-2`}
            >
              Episodes Date
            </Link>
            <Link
              to="/seasons"
              className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } rounded-lg px-3 py-2`}
            >
              Seasons
            </Link>
            <Link
              to="/movies"
              className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } rounded-lg px-3 py-2`}
            >
              Movies
            </Link>
            <Link
              to="/animeList"
              className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } rounded-lg px-3 py-2`}
            >
              Anime List
            </Link>
            <Link
              to="/home"
              className={`text-${darkMode ? "gray-300" : "gray-900"}  ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100"
              } rounded-lg px-3 py-2`}
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
