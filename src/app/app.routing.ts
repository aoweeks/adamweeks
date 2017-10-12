import { RouterModule } from '@angular/router';
// import { Home } from './home.component';
import { AboutPage } from './about/about.component';
// import { NotFound } from './notfound.component';

const routes = [
//  { path: '', redirectTo: 'home', pathMatch: 'full' },
//  { path: 'home', component: Home, data: { state: 'home'} },
    { path: 'about', component: AboutPage, data: { state: 'about'} },
//  { path: '**', component: NotFound }
];

export const AppRouting = RouterModule.forRoot(routes, { 
  useHash: true
});