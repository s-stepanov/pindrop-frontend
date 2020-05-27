import { UserInfo } from 'src/app/authentication/authentication.service';

export interface Review {
  content: string;
  releaseMetadata: {
    mbid: string;
    artistName: string;
    albumName: string;
    coverArt: string;
  };
  author: UserInfo;
  releaseScore: number;
  rating: number;
  id: string;
  createdDate: string;
  canUpvote?: boolean;
  canDownvote?: boolean;
}
