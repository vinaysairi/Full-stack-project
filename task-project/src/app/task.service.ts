import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.modal';
import { Observable } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskUrl = 'http://localhost:8080/api/v1/task';

  constructor(private http: HttpClient) { }
  
  getAllTask(): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl + '/all');
  }

  addTask(body: any): Observable<Task> {
    return this.http.post<Task>(this.taskUrl + '/createtask', body);
  }
  
  getAllTaskByUser(id: any): Observable<Task[]> {
    return this.http.get<Task[]>(this.taskUrl + '/findByOwnerOrderByDateDesc/'+ id);
  }

  getTaskById(id: any): Observable<Task> {
    return this.http.get<Task>(this.taskUrl + '/gettaskbyid/'+ id);
  }

  updateTask(id: any, body: any): Observable<Task> {
    return this.http.put<Task>(this.taskUrl + '/update/'+ id, body);
  }

  deleteTask(id: any): Observable<Task> {
    return this.http.delete<Task>(this.taskUrl + '/delete/'+ id);
  }

  changeTaskAssingee(body: any): Observable<Task> {
    return this.http.put<Task>(this.taskUrl + '/change-assignee', body);
  }

  changeTaskStatus(id: any, status: string): Observable<Task> {
    return this.http.get<Task>(this.taskUrl + '/change-status/'+ id+'/'+ status);
  }

  searchTask(searchText: string): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.taskUrl}/search?searchText=${searchText}`);
  }

  isDeadlineDate(date: any): boolean {
    let isDeadline: boolean = false;
    const dDate = new Date(moment(date).format('l'));
    var today = new Date(moment().format('l'));
    if(dDate <= today) {
      isDeadline = true;
    }
    return isDeadline;
  }

}
