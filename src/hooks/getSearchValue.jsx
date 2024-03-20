import React, { createContext, useContext, useState } from "react";

// Create a context for the search value
const SearchContext = createContext();

// Custom hook to use the search context
export const useSearchValue = () => useContext(SearchContext);

// Search value provider component
export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};
