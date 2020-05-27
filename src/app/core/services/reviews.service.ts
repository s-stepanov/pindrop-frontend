import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Review } from 'src/app/search/types/review';
import { tap } from 'rxjs/operators';
import { VotingTypes } from '../components/reviews/reviews.component';

const DEFAULT_LIMIT = 60;

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  reviews$: BehaviorSubject<Review[]> = new BehaviorSubject([]);

  constructor(private apiService: ApiService) {}

  public createReview(releaseMbid: string, userId: string, content: string, releaseScore: number): Observable<Review> {
    return this.apiService
      .post('/reviews', {
        releaseMbid,
        userId,
        content,
        releaseScore,
      })
      .pipe(tap((data: Review) => this.reviews$.next([data, ...this.reviews$.value])));
  }

  public getReviews(ratingSort: boolean, authorId?: string, releaseMbid?: string, page = 0): Observable<Review[]> {
    return this.apiService
      .get('/reviews', {
        page,
        limit: DEFAULT_LIMIT,
        ...(ratingSort && { sort: 'rating' }),
        ...(authorId && { authorId }),
        ...(releaseMbid && { mbid: releaseMbid }),
      })
      .pipe(
        tap((data: Review[]) => {
          this.reviews$.next(data);
        }),
      );
  }

  public voteForReview(reviewId: string, type: VotingTypes): Observable<Review> {
    return this.apiService.patch(`/reviews/${reviewId}?action=${type}`).pipe(
      tap((review: Review) => {
        const updatedReviews = this.reviews$.getValue().map((item) => {
          if (review.id === item.id) {
            return {
              ...item,
              canDownvote: review.canDownvote,
              canUpvote: review.canUpvote,
              rating: review.rating,
            };
          }
          return item;
        });

        this.reviews$.next(updatedReviews);
      }),
    );
  }
}
