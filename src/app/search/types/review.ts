import { UserInfo } from 'src/app/authentication/authentication.service';

export interface Review {
  content: string;
  releaseMbid: string;
  author: UserInfo;
  releaseScore: number;
  rating: number;
  id: string;
}
