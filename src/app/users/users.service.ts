import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, RegisterUserRequest } from './user.types';
import { environment } from 'src/environments/environment';
import { UserInfo } from '../authentication/authentication.service';
import { ApiService } from '../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private apiService: ApiService) {}

  public registerUser(registerRequest: RegisterUserRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, registerRequest);
  }

  public getAllUsers(): Observable<UserInfo[]> {
    return this.apiService.get('/users');
  }
}
