import React, { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useLocation } from "react-router-dom";
import { getAlph } from "../../services/fetchApi";
import Classifications from "./Classifications";
import Alpha from "./Alpha";
import { ErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function AnimeClassification() {
  const [selectedLetter, setSelectedLetter] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isFetching, isLoading, isError, error, refetch } = useQuery(
    ["animeData", selectedLetter],
    async () => {
      const { data } = await getAlph(selectedLetter);
      console.log("alpha", data);
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
        // Reset the state of your app so the error UI is no longer displayed
      }}
    >
      <div className="classification w-[85rem] ml-[-2.5rem] mt-[-0.9rem] text-white p-6">
        <div>
          <Classifications />
        </div>
        <div>
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
