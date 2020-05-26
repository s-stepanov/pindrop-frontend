import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SearchService } from '../search.service';
import { Observable, Subscription } from 'rxjs';
import { SearchType } from '../types/search-types';
import { AlbumSearch } from '../types/album';
import { ArtistSearch } from '../types/artist';
import { Router } from '@angular/router';

@Component({
  selector: 'pindrop-search-result-item',
  templateUrl: './search-result-item.component.html',
  styleUrls: ['./search-result-item.component.scss'],
})
export class SearchResultItemComponent implements OnInit, OnDestroy {
  @Input() searchResult: AlbumSearch | ArtistSearch;

  currentSearchType: SearchType;

  sub = new Subscription();

  searchType = SearchType;

  constructor(private searchService: SearchService, private router: Router) {}

  ngOnInit(): void {
    this.sub = this.searchService.currentSearchType$.subscribe((data) => (this.currentSearchType = data));
  }

  navigateToInfoPage() {
    const urlPrefix = this.currentSearchType === this.searchType.ARTIST ? 'artists' : 'releases';
    this.router.navigateByUrl(`${urlPrefix}/${this.searchResult.mbid}`);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
