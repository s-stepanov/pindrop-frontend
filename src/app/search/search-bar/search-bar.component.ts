import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { SearchService } from '../search.service';
import { take } from 'rxjs/operators';
import { SearchType } from '../types/search-types';

@Component({
  selector: 'pindrop-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  public form: FormControl;
  searchTypes = SearchType;
  selectedSearchType = SearchType.ARTIST;

  constructor(private fb: FormBuilder, private searchService: SearchService) {}

  ngOnInit(): void {
    this.form = this.fb.control('');
  }

  performSearch(e: Event) {
    e.preventDefault();
    if (this.selectedSearchType === this.searchTypes.ARTIST) {
      this.searchService.searchArtists(this.form.value, 1).pipe(take(1)).subscribe();
    } else {
      this.searchService.searchAlbums(this.form.value, 1).pipe(take(1)).subscribe();
    }
  }

  onSearchTypeSelect(type: SearchType): void {
    this.searchService.setSearchType(type);
  }
}
