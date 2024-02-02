export interface ShowData {
  score: number;
  show: Show;
}

export interface Show {
  id: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  officialSite: string;
  rating: Rating;
  image: Image;
  summary: string;
  premiered: string;
}

export interface Image {
  medium: string;
  original: string;
}

export interface Rating {
  average?: number;
}
