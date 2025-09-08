import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

export const GetListGenre = async () => {
  const { data } = await ApiInstance.get(`/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data.genres;
};
