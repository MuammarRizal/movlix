import { ApiInstance } from "@/lib/api";
import { API_TOKEN } from "@/utils/const";

export const GetDetailTV = async (id) => {
  const { data } = await ApiInstance.get(`/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${API_TOKEN}`,
    },
  });

  return data;
};
