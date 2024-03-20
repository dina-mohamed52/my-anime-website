import React from "react";

function SearchBar({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <input
          type="text"
          className="border border-gray-300 rounded-md py-2 px-4 w-full outline-none focus:border-blue-500"
          placeholder="Search..."
        />
        <button
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
