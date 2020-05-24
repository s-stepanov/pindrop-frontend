import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, RegisterUserRequest } from './user.types';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  public registerUser(registerRequest: RegisterUserRequest): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, registerRequest);
  }
}
