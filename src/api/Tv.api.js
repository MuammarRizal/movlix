import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

export const GetTVDiscover = async (payload) => {
  const params = {
    language: "en-US",
    page: 1,
  };

  if (payload.sortby) params.sort_by = payload.sortby;
  if (payload.genreId) params.with_genres = payload.genreId;
  if (payload.year) params.year = payload.year;
  if (payload.page > 1) params.page = payload.page;

  const { data } = await ApiInstance.get("/discover/tv", {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
    params,
  });

  return data;
};

export const GetDetailTV = async (id) => {
  const { data } = await ApiInstance.get(`/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data;
};
