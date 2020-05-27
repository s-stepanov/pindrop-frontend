import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ReviewsService } from '../../services/reviews.service';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { Review } from 'src/app/search/types/review';
import { take } from 'rxjs/operators';
import { UserInfo } from 'src/app/authentication/authentication.service';

export enum VotingTypes {
  UPVOTE = 'upvote',
  DOWNVOTE = 'downvote',
}

@Component({
  selector: 'pindrop-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit, OnDestroy {
  reviews$: BehaviorSubject<Review[]>;
  ratingSort$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  authorFilter$: BehaviorSubject<UserInfo> = new BehaviorSubject(null);
  releaseMbid$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  @Input() set releaseMbid(id: string) {
    this.releaseMbid$.next(id);
  }

  VotingTypes = VotingTypes;

  reviewsSubscription = new Subscription();

  constructor(private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.reviews$ = this.reviewsService.reviews$;

    this.reviewsSubscription = combineLatest(this.ratingSort$, this.authorFilter$, this.releaseMbid$).subscribe(
      ([isRatingSort, author, releaseMbid]) => {
        this.reviewsService.getReviews(isRatingSort, author?.id, releaseMbid).subscribe();
      },
    );
  }

  ngOnDestroy(): void {
    this.reviewsSubscription.unsubscribe();
  }

  vote({ id, type }): void {
    this.reviewsService.voteForReview(id, type).pipe(take(1)).subscribe();
  }

  onSortChange(sort): void {
    this.ratingSort$.next(sort.checked);
  }

  setAuthorFilter(author: UserInfo): void {
    this.authorFilter$.next(author);
  }

  hideBadRatingReviews({ checked }): void {
    if (checked) {
      const filteredReviews = this.reviews$.value.filter((review) => review.rating >= 0);
      this.reviews$.next(filteredReviews);
      return;
    }
    this.releaseMbid$.next(this.releaseMbid$.value);
  }
}
