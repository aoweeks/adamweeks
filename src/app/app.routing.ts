import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
  { path: '**', redirectTo: 'notfound'},
  { path: 'notfound', component: NotFoundComponent }
];

export const AppRouting = RouterModule.forRoot(routes);