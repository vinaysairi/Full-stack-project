import { Component } from '@angular/core';
import { Task } from '../task.modal';
import { TaskService } from '../task.service';
import { take } from 'rxjs';
import moment from 'moment';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskUserComponent } from '../add-task-user/add-task-user.component';

@Component({
  selector: 'app-admin-task-list',
  templateUrl: './admin-task-list.component.html',
  styleUrl: './admin-task-list.component.css'
})
export class AdminTaskListComponent {
  allTask: Array<Task> = [];
  uId: any;
  searchText: string = '';

  constructor(
    private taskServie: TaskService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = localStorage.getItem("uId");
    if (id !== null) {
      this.uId = id;
     
    }
    this.getAllTaskList();
  }

  getAllTaskList(): void {
    this.taskServie.getAllTask().pipe(take(1)).subscribe((tasks: Array<Task>) => {
      this.allTask = tasks;
      console.log(this.allTask, '>>>>>>', this.uId)
    });
  }

  edit(id: any): void {
    this.router.navigate(['/addtask'], { queryParams: { id: id } })
  }

  deleteTask(id: any): void {
    this.taskServie.deleteTask(id).pipe(take(1)).subscribe((res) => {
      alert("Task Deleted Successfully");
      this.getAllTaskList();
    });
  }

  getFormatedDate(date: any): string {
    
    return date !== 0 ? moment(date).format('LLL') : '';
  }

  addUserToTask(task: Task): void {
    const dialogRef = this.dialog.open(AddTaskUserComponent, {
      data: task,
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().pipe(take(1)).subscribe(() => {
      this.getAllTaskList();
    });
  }

  searchUsers(taskName: string): void {
    this.taskServie.searchTask(taskName).pipe(take(1)).subscribe((res) => {
      this.allTask = res;
    });
  };

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.searchUsers(value);
  }

  isDeadlineDate(date: any): boolean {
    return this.taskServie.isDeadlineDate(date);
  }


}
