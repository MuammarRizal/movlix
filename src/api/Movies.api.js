import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

export const GetDiscoverMovie = async (page = 1) => {
  const { data } = await ApiInstance.get(`/discover/movie?page=${page}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data;
};

export const GetPopularMovies = async () => {
  const { data } = await ApiInstance.get(
    "/movie/popular?language=en-US&page=1",
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return data;
};

export const GetTrendingMovies = async (period = "day") => {
  const { data } = await ApiInstance.get(`/trending/all/${period}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data;
};

export const GetProvidersMovie = async () => {
  const { data } = await ApiInstance.get(`/watch/providers/movie`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data;
};

export const GetDetailMovie = async (id) => {
  const { data } = await ApiInstance.get(`/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data;
};
