// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { DarkModeProvider } from "./customContexts/DarkModeContext";
import "tailwindcss/tailwind.css";
import NavBar from "./ui/NavBar";
import Home from "./pages/Home";
import AnimeList from "./pages/AnimeList";
import AnimeById from "./pages/AnimeById";
import Movies from "./pages/Movies";
import AppLayout from "./ui/AppLayOut";
import Seasons from "./pages/Seasons";
import EpisodesDate from "./pages/EpisodesDate";

function App() {
  const queryClient = new QueryClient();

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route path="/animeList" element={<AnimeList />} />
              <Route path="/anime/:id" element={<AnimeById />} />
              <Route path="/movies" element={<Movies />} />
              <Route path="/home" element={<Home />} />
              <Route index element={<Home />} />
              <Route path="/seasons" element={<Seasons />} />
              <Route path="/episodesDate" element={<EpisodesDate/>} />
            </Route>
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
