import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from '../components/task-list/task-list.component';

const tasksRoutes: Routes = [
  { path: '', component: TaskListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(tasksRoutes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
