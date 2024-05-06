import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from '../components/user-list/user-list.component';

const managementRoutes: Routes = [
  { path: 'users', component: UserListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(managementRoutes)],
  exports: [RouterModule]
})
export class ManagementRoutingModule { }
