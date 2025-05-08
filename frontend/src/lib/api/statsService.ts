import { Stats } from "@/types";
import apiClient from "./axios";

export const getStats = async (): Promise<Stats> => {
  const response = await apiClient.get("/stats");
  return response.data;
};
