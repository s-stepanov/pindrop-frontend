import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestDto } from './types/auth.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export interface UserInfo {
  sub: string;
  email: string;
  nickname: string;
  role: string;
}

export interface TokenResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private _currentUserInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(null);
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  get currentUserInfo(): Observable<UserInfo> {
    this._currentUserInfo.next(JSON.parse(localStorage.getItem('user_info')));
    return this._currentUserInfo.asObservable();
  }

  get accessToken(): string {
    return localStorage.getItem('access_token');
  }

  get isAuthenticated(): Observable<boolean> {
    this._isAuthenticated.next(Boolean(localStorage.getItem('user_info')));
    return this._isAuthenticated.asObservable();
  }

  constructor(private http: HttpClient) {}

  public sendLoginRequest(loginRequest: LoginRequestDto): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(`${environment.apiUrl}/auth/login`, loginRequest).pipe(
      tap((data) => {
        const tokenData = JSON.parse(atob(data.access_token.split('.')[1]));
        localStorage.setItem('user_info', JSON.stringify(tokenData));
        localStorage.setItem('access_token', data.access_token);
        this._currentUserInfo.next(tokenData);
        this._isAuthenticated.next(Boolean(tokenData));
      }),
    );
  }

  public logout(): void {
    localStorage.removeItem('user_info');
    localStorage.removeItem('access_token');
  }
}
