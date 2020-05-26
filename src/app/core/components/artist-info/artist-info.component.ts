import { Component, OnInit, OnDestroy } from '@angular/core';
import { ArtistInfoService } from '../../services/artist-info.service';
import { Observable, Subscription } from 'rxjs';
import { ArtistSearch } from 'src/app/search/types/artist';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'pindrop-artist-info',
  templateUrl: './artist-info.component.html',
  styleUrls: ['./artist-info.component.scss'],
})
export class ArtistInfoComponent implements OnInit, OnDestroy {
  mbid: string;

  artistInfo$: Observable<ArtistSearch>;
  routerSubscription = new Subscription();

  constructor(private artistInfoService: ArtistInfoService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap
      .pipe(
        tap((params) => {
          this.mbid = params.get('artistId');
        }),
      )
      .subscribe(() => (this.artistInfo$ = this.artistInfoService.getArtistInfo(this.mbid)));
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
}
