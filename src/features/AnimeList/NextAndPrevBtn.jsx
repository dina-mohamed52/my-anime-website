/* eslint-disable react/prop-types */
import React from "react";

function Pagination({
  currentPageNum,
  setCurrentPageNum,
  hasNextPage,
  isFetching,
  navigate,
  refetch,
}) {
  const handleLoadMore = () => {
    if (hasNextPage && !isFetching) {
      const nextPageNum = currentPageNum + 1; // Calculate the next page number
      setCurrentPageNum(nextPageNum);
      navigate(`?page=${nextPageNum}`); // Navigate to the next page with query parameters
      refetch(); // Refetch the data for the next page
    }
  };

  const handlePrevLoad = () => {
    if (currentPageNum > 1 && !isFetching) {
      const prevPageNum = currentPageNum - 1;
      setCurrentPageNum(prevPageNum);
      navigate(`?page=${prevPageNum}`); // Navigate to the previous page with query parameters
      refetch(); // Refetch the data for the previous page
    }
  };

  return (
    <div className="flex justify-center mt-4">
      {currentPageNum > 1 && (
        <button
          onClick={handlePrevLoad}
          disabled={isFetching && currentPageNum === 1}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
      )}
      {hasNextPage && (
        <button
          onClick={handleLoadMore}
          disabled={isFetching}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      )}
    </div>
  );
}

export default Pagination;
