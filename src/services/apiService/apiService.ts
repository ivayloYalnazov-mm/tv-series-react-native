import { BASE_API_URL } from "@/constants";
import { Show, ShowData, Episode } from "@/types";
import axios from "axios";

const searchSeriesByQuery = async (query: string) => {
  try {
    const encodedQuery = encodeURIComponent(query);
    const response = await axios.get<ShowData[]>(
      `${BASE_API_URL}/search/shows?q=${encodedQuery}`,
    );
    return response.data;
  } catch (error) {
    return [];
  }
};

const fetchShowById = async (showId: string) => {
  const response = await axios.get<Show>(`${BASE_API_URL}/shows/${showId}`);
  return response.data;
};

const fetchShowEpisodes = async (showId: string) => {
  const response = await axios.get<Episode[]>(
    `${BASE_API_URL}/shows/${showId}/episodes`,
  );
  return response.data;
};

export { searchSeriesByQuery, fetchShowById, fetchShowEpisodes };
