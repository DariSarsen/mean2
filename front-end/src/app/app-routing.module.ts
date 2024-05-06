import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' },
  { 
    path: 'tasks', 
    loadChildren: () => import('./routing/tasks-routing.module').then(m => m.TasksRoutingModule),
    canActivate: [AuthGuard] 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./routing/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  { 
    path: 'management', 
    loadChildren: () => import('./routing/management-routing.module').then(m => m.ManagementRoutingModule),
    canActivate: [AuthGuard] 
  },
  { path: '**', redirectTo: '/tasks' }
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {
    initialNavigation: 'enabledBlocking'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
