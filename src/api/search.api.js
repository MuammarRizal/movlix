import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

export const SearchMovieAPI = async (query) => {
  const { data } = await ApiInstance.get(`/search/movie?query=${query}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data;
};

export const FilterDiscoverMovie = async (sortby, genreId, year, page = 1) => {
  try {
    const params = {
      language: "en-US",
      page: 1,
    };

    if (sortby) params.sort_by = sortby;
    if (genreId) params.with_genres = genreId;
    if (year) params.year = year;
    if (page > 1) params.page = page;

    const { data } = await ApiInstance.get("/discover/movie", {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params,
    });

    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
