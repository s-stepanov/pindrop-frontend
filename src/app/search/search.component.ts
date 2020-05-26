import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  template: ` <pindrop-search-bar></pindrop-search-bar>
    <pindrop-search-results></pindrop-search-results>`,
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
