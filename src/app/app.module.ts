import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './authentication/authentication.module';
import { HeaderComponent } from './core/components/header/header.component';
import { RootComponent } from './core/components/root/root.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faRecordVinyl } from '@fortawesome/free-solid-svg-icons';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SearchModule } from './search/search.module';
import { ArtistInfoComponent } from './core/components/artist-info/artist-info.component';
import { ReleaseInfoComponent } from './core/components/release-info/release-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ReviewFormComponent } from './core/components/review-form/review-form.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ReviewsComponent } from './core/components/reviews/reviews.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RootComponent,
    ArtistInfoComponent,
    ReleaseInfoComponent,
    ReviewFormComponent,
    ReviewsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatExpansionModule,
    FontAwesomeModule,
    MatCardModule,
    SearchModule,
    BarRatingModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faRecordVinyl);
  }
}
