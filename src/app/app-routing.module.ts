import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthRootComponent } from './authentication/components/auth-root/auth-root.component';
import { RootComponent } from './core/components/root/root.component';
import { ReleaseInfoComponent } from './core/components/release-info/release-info.component';
import { ArtistInfoComponent } from './core/components/artist-info/artist-info.component';
import { SearchComponent } from './search/search.component';
import { ReviewsComponent } from './core/components/reviews/reviews.component';
import { AdminGuard } from './admin.guard';

const routes: Routes = [
  { path: 'login', component: AuthRootComponent },

  {
    path: '',
    component: RootComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: ReviewsComponent },
      { path: 'search', component: SearchComponent },
      { path: 'releases/:releaseId', component: ReleaseInfoComponent },
      { path: 'artists/:artistId', component: ArtistInfoComponent },
    ],
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
