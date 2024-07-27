import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../task.service';
import { take } from 'rxjs';
import { Task } from '../../task.modal';
import { Router } from '@angular/router';
import  moment from 'moment';


@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit{

  allTask: Array<Task> = [];
  STATUS: string = 'delete';
  
  constructor(
    private taskServie: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTaskList();
  }

  getAllTaskList(): void {
    const id = localStorage.getItem('uId');
    this.taskServie.getAllTaskByUser(id).pipe(take(1)).subscribe((tasks: Array<Task>) => {
      this.allTask = tasks.filter((item: Task) => item.taskStatus !== this.STATUS);
      console.log('>>>>>', this.allTask)
    });
  }

  edit(id: any): void {
    this.router.navigate(['/addtask'], { queryParams: { id: id } })
  }

  deleteTask(id: any): void {
    this.taskServie.changeTaskStatus(id, this.STATUS).pipe(take(1)).subscribe((res) => {
      alert("Task Deleted Successfully");
      this.getAllTaskList();
    });
  }

  getFormatedDate(date: any): string {
    console.log('>>>>', date);
    return date !== 0 ? moment(date).format('LLL') : '';
  }

  isDeadlineDate(date: any): boolean {
    return this.taskServie.isDeadlineDate(date);
  }

}
