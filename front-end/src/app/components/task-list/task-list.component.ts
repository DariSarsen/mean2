import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'; 
import { MatDialog } from '@angular/material/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any[] = []; 

  constructor(private taskService: TaskService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getTasks();
    this.taskService.getTaskAddedObservable().subscribe(() => {
      this.getTasks();
    });
    console.log('token', localStorage.getItem('token'));
    console.log('tokenExpiration', localStorage.getItem('tokenExpiration'));
  }

  openEditTaskDialog(taskId: string): void {
    const dialogRef = this.dialog.open(EditTaskFormComponent, {
      width: '400px',
      data: { taskId: taskId } 
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getTasks();
    });
  }

  getTasks(): void {
    this.taskService.getTasks() 
      .subscribe(tasks => {
        this.tasks = tasks;
      }); 
  }

  deleteTask(id: string): void {
    this.taskService.deleteTask(id)
      .subscribe(() => {
        this.tasks = this.tasks.filter(task => task._id !== id);
      });
  }
}
