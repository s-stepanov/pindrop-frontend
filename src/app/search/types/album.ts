import { Tag, Track, Image } from './search-response';

export interface Album {
  name: string;
  artist: string;
  mbid: string;
  releaseDate: string;
  playCount: number;
  topTags: Array<Tag>;
  tracks: Array<Track>;
}

export interface AlbumSearch {
  name: string;
  artist: string;
  image: Image[];
  mbid: string;
}
