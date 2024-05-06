import { Component, OnDestroy, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service'; 
import { MatDialog } from '@angular/material/dialog';
import { EditTaskFormComponent } from '../edit-task-form/edit-task-form.component';
import { WebSocketService } from '../../services/web-socket.service'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  tasks: any[] = []; 
  taskStats: any[] = [];

  selectedStatus: string = '';
  taskStatuses: string[] = ['new', 'in progress', 'completed'];


  constructor(private taskService: TaskService, private dialog: MatDialog, private webSocketService: WebSocketService) { }

  ngOnInit(): void {
    this.webSocketService.connectToServer();
    this.getTasks();
    this.taskService.getTaskAddedObservable().subscribe(() => {
      this.getTasks();
    });
    this.taskService.getTaskStats().subscribe({
      next: (stats: any[]) => {
        this.taskStats = stats;
        console.log("stats: ", stats);
      },
      error: (error) => {
        console.error('Error fetching task stats:', error);
      }
    });
    
    // console.log('token', localStorage.getItem('token'));
    // console.log('tokenExpiration', localStorage.getItem('tokenExpiration'));
  }

  getFilteredTasks(): any[] {
    if (!this.selectedStatus) {
      return this.tasks;
    }
    return this.tasks.filter(task => task.status === this.selectedStatus);
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


  ngOnDestroy() {
    this.webSocketService.disconnectFromServer();
  }
}
