import { Image, Rating } from ".";

export interface Episode {
  id: string;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  rating: Rating;
  image: Image;
  summary: string;
}
