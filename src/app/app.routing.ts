import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ArtGalleryComponent} from './pages/art-gallery/art-gallery.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
  { path: 'art', component: ArtGalleryComponent, data: { state: 'art'} },
  { path: '**', redirectTo: 'notfound'},
  { path: 'notfound', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);