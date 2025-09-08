import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

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

export const GetActorDetail = async (id) => {
  const { data } = await ApiInstance.get(`/person/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });
  return data;
};
