import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchResultsComponent } from './search-results/search-results.component';
import { SearchResultItemComponent } from './search-result-item/search-result-item.component';
import { SearchComponent } from './search.component';

@NgModule({
  declarations: [SearchBarComponent, SearchResultsComponent, SearchResultItemComponent, SearchComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [SearchBarComponent, SearchResultsComponent, MatInputModule],
})
export class SearchModule {}
