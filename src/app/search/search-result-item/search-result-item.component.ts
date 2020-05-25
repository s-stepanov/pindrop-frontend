import { Component, OnInit, Input } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable } from 'rxjs';
import { SearchType } from '../types/search-types';
import { AlbumSearch } from '../types/album';
import { ArtistSearch } from '../types/artist';

@Component({
  selector: 'pindrop-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit {
  @Input() searchResult: AlbumSearch | ArtistSearch;

  currentSearchType$: Observable<SearchType>;
  searchType = SearchType;

  constructor(private searchService: SearchService) {}

  ngOnInit(): void {
    this.currentSearchType$ = this.searchService.currentSearchType$;
  }
}
