import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
// import { NotFound } from './notfound.component';

const routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, data: { state: 'home'} },
  { path: 'about', component: AboutComponent, data: { state: 'about'} },
//  { path: '**', component: NotFound }
];

export const AppRouting = RouterModule.forRoot(routes);