import axios from "axios";
import {
  searchSeriesByQuery,
  fetchShowById,
  fetchShowEpisodes,
} from "./apiService";
import { BASE_API_URL } from "@/constants";

jest.mock("axios");

describe("searchSeriesByQuery", () => {
  const query = "test query";
  const encodedQuery = encodeURIComponent(query);
  const mockResponse = [{ id: 1, title: "Test Show" }];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the response data if the request is successful", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await searchSeriesByQuery(query);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_API_URL}/search/shows?q=${encodedQuery}`,
    );
    expect(result).toEqual(mockResponse);
  });

  it("should return an empty array if the request fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("Request failed"));

    const result = await searchSeriesByQuery(query);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_API_URL}/search/shows?q=${encodedQuery}`,
    );
    expect(result).toEqual([]);
  });
});

describe("fetchShowById", () => {
  const showId = "123";
  const mockResponse = { id: 123, title: "Test Show" };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the response data if the request is successful", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchShowById(showId);

    expect(axios.get).toHaveBeenCalledWith(`${BASE_API_URL}/shows/${showId}`);
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchShowById(showId)).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_API_URL}/shows/${showId}`);
  });
});

describe("fetchShowEpisodes", () => {
  const showId = "123";
  const mockResponse = [
    { id: 1, title: "Episode 1" },
    { id: 2, title: "Episode 2" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the response data if the request is successful", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });

    const result = await fetchShowEpisodes(showId);

    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_API_URL}/shows/${showId}/episodes`,
    );
    expect(result).toEqual(mockResponse);
  });

  it("should throw an error if the request fails", async () => {
    const errorMessage = "Request failed";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    await expect(fetchShowEpisodes(showId)).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith(
      `${BASE_API_URL}/shows/${showId}/episodes`,
    );
  });
});
