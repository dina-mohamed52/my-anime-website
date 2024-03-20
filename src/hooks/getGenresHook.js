import { useEffect, useState } from "react";
import { fetchGenres } from "../services/fetchApi";

const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const genresObj = await fetchGenres();
        // console.log("Genres object:", genresObj); // 
        const mappedGenres = genresObj.map(({ mal_id, name, url,count }) => ({
          id: mal_id,
          label: name,
          count,
          url,
          value: mal_id,
        }));
        setGenres(mappedGenres);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching genres:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    console.log("Loading genres...");
  }

  if (error) {
    console.error("Failed to fetch genres:", error);
  }

  return genres;
};

export default useGenres;
