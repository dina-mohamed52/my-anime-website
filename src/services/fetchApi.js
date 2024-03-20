//////////////////////////////////////////////////////////////////////////////
//FETCH GENRES
const MAX_REQUESTS_PER_MINUTE = 60;
let requestsMade = 0;

export const fetchGenres = async () => {
  try {
    if (requestsMade >= MAX_REQUESTS_PER_MINUTE) {
      // Wait for a minute before making the next request
      await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
      requestsMade = 0;
    }

    const response = await fetch("https://api.jikan.moe/v4/genres/anime");
    const data = await response.json();
    requestsMade++;
    // console.log("api",data)
    const genres = data.data;

    // console.log("api",genres)
    return genres;
  } catch (error) {
    if (error.status === 429) {
      // Rate limit exceeded, retry after the specified time
      const retryAfter = error.response.headers.get("Retry-After") || 1;
      await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
      return fetchGenres();
    } else {
      console.error("Error fetching genres:", error);
      throw new Error("Failed to fetch genres");
    }
  }
};

//////////////////////////////////////////////////////////////////////////////

// let prevGenre = null; // Store the previous genre
// let prevType = null; // Store the previous type
// let prevStatus = null; // Store the previous status

export const fetchAnimeByGenre = async (
  genre,
  currentPageNum,
  navigate,
  Type = null,
  Status = null,
  startDate = null
) => {
  try {
    let url = `https://api.jikan.moe/v4/anime?sort=asc`;

    if (genre) {
      url += `&genres=${genre}`;
    }

    if (currentPageNum) {
      url += `&page=${currentPageNum}`;
    }

    if (Type) {
      url += `&type=${Type}`;
    }

    if (Status) {
      url += `&status=${Status}`;
    }

    if (startDate) {
      url += `&start_date=${startDate}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const genreNextPage = data.data.pagination;

    // console.log("resssssssss", data);
    return { data, genreNextPage };
  } catch (error) {
    console.error("Error fetching anime for genre:", error);
    throw new Error("Failed to fetch anime for genre");
  }
};

//////////////////////////////////////////////////////////////////////////////////
export async function getSeason(year, season) {
  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/seasons/${year}/${season}`
    );
    if (!res.ok) {
      throw new Error(
        `Failed to fetch season data for ${year}/${season}: ${res.status}`
      );
    }
    const data = await res.json();
    // Assuming the pagination information is present in the API response

    return data;
  } catch (error) {
    console.error("Error fetching season data:", error);
    throw error;
  }
}
/////////////////////////////////////////////////////////////////////
// fetch anime by char
export async function getAlph(char) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime?q=${char}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch season data for ${char}: ${res.status}`);
    }
    const data = await res.json();
    // Assuming the pagination information is present in the API response
    // console.log(data)
    // console.log(data.pagination)
    return data;
  } catch (error) {
    console.error("Error fetching season data:", error);
    throw error;
  }
}

// getAlph("b")
//   .then((data) => {
//     console.log("Data fetched successfully:", data);
//     // Add assertions here to check the fetched data if needed
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//     // Add assertions for error handling if needed
//   });
/////////////////////////////////////////////////////////////////////
export async function getAnimeById(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`);
    if (!res.ok) {
      throw new Error(`Failed to fetch anime data for ID ${id}: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    throw error;
  }
}
///////////////////////////////////////////////////////////////////////////////////////////////
export async function getAnimeEpisodes(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch anime episodes for ID ${id}: ${res.status}`
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime episodes:", error);
    throw error;
  }
}
//////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////
export async function getAnimeEpVideo(id) {
  try {
    const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/episodes`);
    if (!res.ok) {
      throw new Error(
        `Failed to fetch anime episodes for ID ${id}: ${res.status}`
      );
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching anime episodes:", error);
    throw error;
  }
}
/////////////////////////////////////////////////////////////////////////
//fetch top anime for  Carousel
export async function getAnimeCarousel() {
  const url =
    "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&limit=8";
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error("Received invalid data from the server");
      }

      return data;
    } catch (error) {
      console.error("Error fetching anime data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error("Failed to fetch anime data after multiple retries");
}

////////////////////////////////////////////////////////////////////////////
// season page
export async function getAnimeRecommendations(year, season) {
  const url = `https://api.jikan.moe/v4/seasons/${year}/${season}`;
  const MAX_RETRIES = 5; // Increased number of retries
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch season data for ${year}/${season}: ${response.status}`
        );
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching season data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error(
    `Failed to fetch season data for ${year}/${season} after multiple retries`
  );
}

//////////////////////////////////////////////////////////////////////////////
export async function getRecommendations() {
  const url = `https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&limit=15`;
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch season data for: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Error fetching season data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error(`Failed to fetch season data for after multiple retries`);
}

//////////////////////////////////////////////////////////////////////////////////////////
//get movies page
export async function getAnimeMovies() {
  const url = "https://api.jikan.moe/v4/top/anime?type=movie&filter=favorite";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch data: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error("Received invalid data from the server");
    }

    return data;
  } catch (error) {
    console.error("Error fetching anime data:", error);
    throw error;
  }
}
///////////////////////////////////////////////////////////////////////////////////
//home page top watched list
export async function getAnimeTop() {
  const url =
    "https://api.jikan.moe/v4/top/anime?type=tv&filter=airing&limit=25";
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error("Received invalid data from the server");
      }

      return data;
    } catch (error) {
      console.error("Error fetching anime data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error("Failed to fetch anime data after multiple retries");
}
///////////////////////////////////////////////////////////////////////////////////////
//episodes date
export async function getEpisodesDate(day) {
  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  if (!validDays.includes(day)) {
    throw new Error(
      `Invalid day: ${day}. Day must be one of ${validDays.join(", ")}`
    );
  }

  const url = `https://api.jikan.moe/v4/schedules?filter=${day}`;
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        console.error("Received invalid data from the server:", data);
        throw new Error("Received invalid data from the server");
      }

      return data;
    } catch (error) {
      console.error("Error fetching anime data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for 10 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error("Failed to fetch anime data after multiple retries");
}

/////////////////////////////////////////////////////////////////////////////
//search 
export async function getSearchedAnime(searchKey) {
  const url = `https://api.jikan.moe/v4/anime?q=${searchKey}`;
  const MAX_RETRIES = 3;
  let retryCount = 0;

  while (retryCount < MAX_RETRIES) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Failed to fetch data: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      if (!data || !Array.isArray(data.data) || data.data.length === 0) {
        throw new Error("Received invalid data from the server");
      }

      return data;
    } catch (error) {
      console.error("Error fetching anime data:", error);

      if (error instanceof Error && error.message.includes("429")) {
        // If the error is due to rate limiting, wait for some time before retrying
        retryCount++;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
      } else {
        throw error; // Re-throw other types of errors
      }
    }
  }

  throw new Error("Failed to fetch anime data after multiple retries");
}
//////////////////////////////////////////////////////////////////////////
// Example usage
 getSearchedAnime("natuto")
   .then((data) => {
     console.log("rrrrrrrrrrrrrr fetched successfully:", data);

     // console.log("rrrrrrrrrrrrrr fetched successfully:", data.data);
   })
   .catch((error) => {
     console.error("Error fetching crosal:", error);
   });
