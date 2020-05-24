import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserInfo } from 'src/app/authentication/authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'pindrop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: Observable<UserInfo>;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.currentUser = this.authService.currentUserInfo;
  }

  logout(): void {
    this.authService.logout();
    window.location.assign('/login');
  }
}
