import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-add-task-form',
  templateUrl: './add-task-form.component.html',
  styleUrls: ['./add-task-form.component.css']
})
export class AddTaskFormComponent {
  tasks: any[] = []; 

  newTask: any = { title: '', description: '', status: 'не выполнена' };

  constructor(private taskService: TaskService) { }

  addTask(): void {
    this.taskService.addTask(this.newTask)
      .pipe(
        tap(() => {
          console.log('Task added successfully');
          this.newTask = { title: '', description: '', status: 'не выполнена' };
        }),
        catchError((error) => {
          console.error('Error adding task:', error);
          throw error; 
        })
      )
      .subscribe(() => {
        this.taskService.getTasks().subscribe(tasks => {
          
        });      
      });
  }


}
