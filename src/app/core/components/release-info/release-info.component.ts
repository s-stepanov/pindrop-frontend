import { Component, OnInit, Input } from '@angular/core';
import { ReleaseInfoService } from '../../services/release-info.service';
import { Subscription } from 'rxjs';
import { Album } from 'src/app/search/types/album';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'pindrop-release-info',
  templateUrl: './release-info.component.html',
  styleUrls: ['./release-info.component.scss'],
})
export class ReleaseInfoComponent implements OnInit {
  @Input() mbid: string;

  releaseInfo: Album;
  routerSubscription = new Subscription();

  constructor(private releaseInfoService: ReleaseInfoService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.routerSubscription = this.route.paramMap
      .pipe(
        tap((params) => {
          this.mbid = params.get('releaseId');
        }),
        switchMap(() => this.releaseInfoService.getReleaseInfo(this.mbid)),
      )
      .subscribe((release: Album) => (this.releaseInfo = release));
  }
}
