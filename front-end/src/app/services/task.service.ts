import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/tasks'; 
  private taskAddedSubject = new Subject<void>();


  constructor(private http: HttpClient) { }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTask(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  addTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task).pipe(
      tap(() => this.taskAddedSubject.next())
    );
  }

  getTaskAddedObservable(): Observable<void> {
    return this.taskAddedSubject.asObservable();
  }

  updateTask(id: string, task: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.patch<any>(url, task);
  }

  deleteTask(id: string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  getTaskStats(): Observable<any[]> {
    const url = `${this.apiUrl}/task-stats`;
    return this.http.get<any[]>(url);
  }
}
