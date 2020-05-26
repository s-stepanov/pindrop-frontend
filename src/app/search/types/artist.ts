import { Image } from './search-response';
import { AlbumSearch } from './album';

export interface ArtistSearch {
  mbid: string;
  name: string;
  image: Image[];
  listeners: number;
  albums: Array<AlbumSearch>;
  bio: {
    summary: string;
    content: string;
  };
}
