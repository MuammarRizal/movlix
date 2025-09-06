import { API_BASE_URL } from "@/utils/const";
import axios from "axios";

export const ApiInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
});
