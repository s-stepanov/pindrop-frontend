import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInfo } from '../authentication/authentication.service';
import { UsersService } from '../users/users.service';
import { Review } from '../search/types/review';
import { ReviewsService } from '../core/services/reviews.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit, OnDestroy {
  usersDataSource: UserInfo[];
  reviewsDataSource: Review[];

  usersColumns: string[] = ['id', 'email', 'nickname', 'active'];
  reviewsColumns: string[] = ['id', 'authorNickname', 'release', 'createdDate'];

  usersSubscription: Subscription = new Subscription();
  reviewsSubscription: Subscription = new Subscription();

  constructor(private usersService: UsersService, private reviewsService: ReviewsService) {}

  ngOnInit(): void {
    this.usersSubscription = this.usersService.getAllUsers().subscribe((data) => (this.usersDataSource = data));
    this.reviewsSubscription = this.reviewsService
      .getReviews(false)
      .subscribe((data) => (this.reviewsDataSource = data));
  }

  ngOnDestroy(): void {
    this.reviewsSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
