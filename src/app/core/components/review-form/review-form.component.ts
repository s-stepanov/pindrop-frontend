import { Component, OnInit, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ReviewsService } from '../../services/reviews.service';
import { take } from 'rxjs/operators';
import { AuthenticationService, UserInfo } from 'src/app/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pindrop-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.scss'],
})
export class ReviewFormComponent implements OnInit, OnDestroy {
  @Input() mbid: string;
  selectedRating: number = 0;

  formExpanded = false;

  reviewTextarea: FormControl;

  userInfo: UserInfo;

  userInfoSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private reviewsService: ReviewsService,
    private authService: AuthenticationService,
  ) {}

  ngOnInit(): void {
    this.reviewTextarea = this.fb.control('');
    this.userInfoSubscription = this.authService.currentUserInfo.subscribe((data) => (this.userInfo = data));
  }

  isSubmitDisabled(): boolean {
    return this.selectedRating === 0 || !this.reviewTextarea.value.length;
  }

  onSubmit() {
    this.reviewsService
      .createReview(this.mbid, this.userInfo.id, this.reviewTextarea.value, this.selectedRating)
      .pipe(take(1))
      .subscribe(() => {
        this.reviewTextarea.setValue('');
        this.formExpanded = false;
        this.selectedRating = 0;
      });
  }

  ngOnDestroy() {
    this.userInfoSubscription.unsubscribe();
  }
}
