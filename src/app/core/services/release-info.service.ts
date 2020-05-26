import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Album } from 'src/app/search/types/album';

@Injectable({
  providedIn: 'root',
})
export class ReleaseInfoService {
  constructor(private apiService: ApiService) {}

  public getReleaseInfo(mbid: string): Observable<Album> {
    return this.apiService.get(`/search/albums/${mbid}`);
  }
}
