export interface SearchResponse<T> {
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  matches: T[];
}

export interface Image {
  url: string;
  size: string;
}

export interface Track {
  name: string;
  duration: number;
  mbid: string;
  artist: {
    name: string;
    mbid: string;
  };
}

export interface Tag {
  name: string;
}
