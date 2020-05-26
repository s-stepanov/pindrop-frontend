import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';
import { Review } from 'src/app/search/types/review';
import { tap } from 'rxjs/operators';

const DEFAULT_LIMIT = 60;

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private reviews$: BehaviorSubject<Review[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {}

  public createReview(releaseMbid: string, userId: string, content: string, releaseScore: number) {
    return this.apiService
      .post('/reviews', {
        releaseMbid,
        userId,
        content,
        releaseScore,
      })
      .pipe(tap((data: Review) => this.reviews$.next([data, ...this.reviews$.value])));
  }

  public getReviewsForRelease(releaseMbid: string) {
    return this.apiService
      .get(`/reviews`, {
        page: 0,
        limit: DEFAULT_LIMIT,
        mbid: releaseMbid,
      })
      .pipe(
        tap((data: Review[]) => {
          this.reviews$.next(data);
        }),
      );
  }
}
