import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService, UserInfo } from 'src/app/authentication/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'pindrop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser: UserInfo;

  currentUserSubscription = new Subscription();

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUserSubscription = this.authService.currentUserInfo.subscribe((data) => {
      this.currentUser = data;
    });
  }

  logout(): void {
    this.authService.logout();
    window.location.assign('/login');
  }

  isAdmin(): boolean {
    return !!this.currentUser?.roles?.find((role) => role.name === 'admin');
  }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
