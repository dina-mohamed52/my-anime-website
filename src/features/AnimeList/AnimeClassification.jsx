import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { getAlph } from "../../services/fetchApi";
import Classifications from "./Classifications";
import Alpha from "./Alpha";
import { ErrorBoundary } from "react-error-boundary";
import { useDarkMode } from "../../customContexts/DarkModeContext";
import Bg from "../../assets/6.jpg"
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" className="text-red-600 p-4">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Try again
      </button>
    </div>
  );
}

function AnimeClassification() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { darkMode } = useDarkMode();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery(
    ["animeData", selectedLetter],
    async () => {
      const { data } = await getAlph(selectedLetter);
      return data;
    },
    { enabled: !!selectedLetter }
  );

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    updateUrl(letter);
  };

  const updateUrl = (letter) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("char", letter);
    navigate(`?${searchParams.toString()}`);
  };

  return (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setSelectedLetter(null);
      }}
    >
      {/* ✅ Full width background with inner content */}
      <div
        className="w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Bg})`, 
        }}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-6">
          <Classifications />
          <Alpha
            selectedLetter={selectedLetter}
            handleLetterClick={handleLetterClick}
            data={data}
            isLoading={isLoading}
            isError={isError}
            error={error}
            isFetching={isFetching}
            refetch={refetch}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default AnimeClassification;
