/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import React from "react";
import { useDarkMode } from "../customContexts/DarkModeContext";
export function CustomSelect({ options, name, onChange, value }) {
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode } = useDarkMode();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const handleEscapeKey = (event) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("click", handleClickOutside);
      window.addEventListener("keydown", handleEscapeKey);
    } else {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    }

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className={` ${isOpen ? "bg-gray-100" : "bg-gray-900"}
        w-40 pl-3 hover:bg-gray-200 capitalize hover:text-gray-900 border border-gray-300 rounded-md py-2 px-4 text-${
          isOpen ? "gray-900" : "white"
        } cursor-pointer
       
          `}
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        role="button" // Add role attribute
      >
        {value || name}
      </div>
      {isOpen && (
        <div
          className={`absolute z-10 w-40 mt-1  ${
            darkMode ? "bg-gray-200" : "bg-white"
          } text-gray-900 border border-gray-200 rounded-md overflow-y-auto max-h-40`}
        >
          {options.map((option, index) => (
            <div
              key={index} // Use the index as the key if option.value is not unique
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
