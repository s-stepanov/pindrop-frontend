import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginRequestDto } from './types/auth.types';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

export interface UserInfo {
  id: string;
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

  get currentUserInfo(): Observable<UserInfo> {
    return this._currentUserInfo.asObservable();
  }

  constructor(private http: HttpClient) {}

  public sendLoginRequest(loginRequest: LoginRequestDto): Observable<TokenResponse> {
    return this.http
      .post<TokenResponse>(`${environment.apiUrl}/auth/login`, loginRequest)
      .pipe(tap((data) => this._currentUserInfo.next(JSON.parse(atob(data.access_token.split('.')[1])))));
  }
}
