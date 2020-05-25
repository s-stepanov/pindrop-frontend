import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { SearchResponse } from '../types/search-response';
import { AlbumSearch } from '../types/album';
import { ArtistSearch } from '../types/artist';

@Component({
  selector: 'pindrop-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
})
export class SearchResultsComponent implements OnInit {
  searchResults$: Observable<SearchResponse<AlbumSearch | ArtistSearch>>;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.searchResults$ = this.searchService.getSearchResults();
  }
}
