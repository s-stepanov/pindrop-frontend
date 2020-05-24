import { Image } from './search-response';

export interface ArtistSearch {
  mbid: string;
  name: string;
  image: Image[];
  listeners: number;
  bio: {
    summary: string;
    content: string;
  };
}
