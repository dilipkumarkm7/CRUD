import { Routes } from '@angular/router';

export const routes: Routes = [
     { path: '', redirectTo: 'listuser', pathMatch: 'full' },
     { path: 'adduser', loadComponent: () => import('./components/adduser/adduser.component').then(m => m.AdduserComponent) },
     { path: 'listuser', loadComponent: () => import('./components/listuser/listuser.component').then(m => m.ListuserComponent) },
     { path: '**', redirectTo: 'listuser' }
];
