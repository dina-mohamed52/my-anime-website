import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import { AnimeProvider } from "./customContexts/useAnimeContext";
import { SearchProvider } from "./hooks/getSearchValue";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AnimeProvider>
      <SearchProvider>
        
        <App />
      </SearchProvider>
    </AnimeProvider>
  </React.StrictMode>
);
