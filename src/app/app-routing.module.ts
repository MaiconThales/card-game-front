import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService as AuthGuard } from './services';

import {
  DashboardComponent,
  LoginComponent,
  NotFoundComponent,
  BoardComponent,
  DeckListComponent
} from 'src/app/components';

const routes: Routes = [
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
    //title: 'Dashboard'
  },
  { 
    path: 'board', 
    component: BoardComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { 
    path: 'deck', 
    component: DeckListComponent,
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  { 
    path: 'authentication', 
    component: LoginComponent 
  },
  { 
    path: '**', 
    redirectTo: '/not-found', 
    pathMatch: 'full' 
  },
  { 
    path: 'not-found', 
    component: NotFoundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
