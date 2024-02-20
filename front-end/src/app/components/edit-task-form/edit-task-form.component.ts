// edit-task.component.ts
import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-edit-task-form',
  templateUrl: './edit-task-form.component.html',
  styleUrls: ['./edit-task-form.component.css']
})
export class EditTaskFormComponent implements OnInit {
  editedTask: any = {};
  taskId: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private route: ActivatedRoute, private taskService: TaskService, private router: Router) {
    this.taskId = data.taskId
    console.log(this.taskId)
   }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      // this.taskId = params['id'];
      this.fetchTask();
    });
  }

  fetchTask() {
    if (this.taskId) {
      this.taskService.getTask(this.taskId)
        .subscribe({
          next: (task) => {
            this.editedTask = task;
          },
          error: (error) => {
            console.error('Error fetching task:', error);
          }
        });
    } else {
      console.error('Task ID is null');
    }
  }
  
  updateTask() {
    if (this.taskId) {
      this.taskService.updateTask(this.taskId, this.editedTask)
        .subscribe({
          next: (updatedTask) => {
            console.log('Task updated successfully:', updatedTask);
            this.router.navigate(['/tasks']);
          },
          error: (error) => {
            console.error('Error updating task:', error);
          }
        });
    } else {
      console.error('Task ID is null');
    }
  }
}
