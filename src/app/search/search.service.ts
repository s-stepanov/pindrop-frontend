import { Injectable } from '@angular/core';
import { ApiService } from '../core/services/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchResponse } from './types/search-response';
import { ArtistSearch } from './types/artist';
import { tap } from 'rxjs/operators';
import { AlbumSearch } from './types/album';
import { SearchType } from './types/search-types';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _searchResults: BehaviorSubject<SearchResponse<ArtistSearch | AlbumSearch>> = new BehaviorSubject(null);
  private _currentSearchType: BehaviorSubject<SearchType> = new BehaviorSubject(SearchType.ARTIST);

  get currentSearchType$(): Observable<SearchType> {
    return this._currentSearchType.asObservable();
  }

  constructor(private apiService: ApiService) {}

  public searchArtists(term: string, page: number, limit = 10) {
    return this.apiService
      .get(`/search/artists`, {
        term,
        page,
        limit,
      })
      .pipe(tap((data: SearchResponse<ArtistSearch>) => this._searchResults.next(data)));
  }

  public searchAlbums(term: string, page: number, limit = 10) {
    return this.apiService
      .get(`/search/albums`, {
        term,
        page,
        limit,
      })
      .pipe(tap((data: SearchResponse<AlbumSearch>) => this._searchResults.next(data)));
  }

  public setSearchType(type: SearchType): void {
    this._currentSearchType.next(type);
  }

  public getSearchResults(): Observable<SearchResponse<ArtistSearch | AlbumSearch>> {
    return this._searchResults.asObservable();
  }
}
