import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { ArtistSearch } from 'src/app/search/types/artist';

@Injectable({
  providedIn: 'root',
})
export class ArtistInfoService {
  constructor(private apiService: ApiService) {}

  public getArtistInfo(mbid: string): Observable<ArtistSearch> {
    return this.apiService.get(`/search/artists/${mbid}`);
  }
}
