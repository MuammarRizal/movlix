import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

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

export const GetActorsMovie = async () => {
  const { data } = await ApiInstance.get(
    `/person/popular?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
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
