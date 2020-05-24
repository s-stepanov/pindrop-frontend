import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/authentication/authentication.service';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  get<T>(path: string, params?: any, headers?: any): Observable<T>;
  get(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('get', path, params, headers);
  }

  post(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('post', path, params, headers);
  }

  patch(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('patch', path, params, headers);
  }

  put(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('put', path, params, headers);
  }

  delete(path: string, params = {}, headers = {}): Observable<any> {
    return this.request('delete', path, params, headers);
  }

  request(method: string, path: string, params = {}, headers = {}): Observable<any> {
    return of(this.authService.accessToken).pipe(
      switchMap((token) => {
        const httpHeaders = new HttpHeaders({
          ...headers,
          Authorization: `Bearer ${token}`,
        });
        const hasBody = ['post', 'patch', 'put', 'delete'].includes(method);
        const requestPath = `${this.apiUrl}${path}`;

        return this.http.request(method, requestPath, {
          headers: httpHeaders,
          body: hasBody ? params : {},
          params: !hasBody ? params : {},
        });
      }),
    );
  }
}
