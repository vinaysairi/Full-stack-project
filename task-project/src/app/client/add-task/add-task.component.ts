import { Component } from '@angular/core';
//import { TaskUser } from '../../task-user.modal';
import { TaskService } from '../../task.service';
import { take } from 'rxjs';
import { Task } from '../../task.modal';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';
import { User } from '../../../user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  errorMessage: string = '';
  taskName: string = '';
  description: string = '';
  date: string ='';
  isEdit: boolean = false;
  taskId: number = 0;
  isComplete: boolean = false;
  maxDate:string = new Date().toISOString().split("T")[0];
  priority: any = [
    {key: "high", value:"High"},
    {key: "low", value: "Low"},
    {key:"medium", value:"Medium"}
  ];
  taskPriority: string = '';
  isAdmin: boolean = false;
  deadlineDate: string = '';

  constructor(
    private service: TaskService,
    private auth: AuthService,
    private activaedRouter: ActivatedRoute
  ) {
    const admin = localStorage.getItem("role");
    if (admin !== null) {
      this.isAdmin = admin === 'admin' ? true : false;
    }
    this.taskPriority = this.priority[0].value;
    this.activaedRouter.queryParams.subscribe((res: any) => {
      if (res && res?.id) {
        this.isEdit = true;
        this.getTaskById(res?.id);
      } else {
        this.isEdit = false;
      }
    });
  }

  getTaskById(id: any): void {
    this.service.getTaskById(id).pipe(take(1)).subscribe((res) => {
      this.date = moment(res?.date).format('YYYY-MM-DD');
      this.description = res?.description;
      this.taskName = res?.name;
      this.taskId = res?.id;
      this.isComplete = res?.completed;
      this.taskPriority = res?.priority;
      this.deadlineDate = moment(res?.deadlineDate).format('YYYY-MM-DD');
    });
  }

  getFormatedDate(date: string) {
    const currentDate = new Date();
    const commingDate = new Date(date);
    currentDate.setFullYear(commingDate.getFullYear());
    currentDate.setMonth(commingDate.getMonth());
    currentDate.setDate(commingDate.getDate());
    return moment(currentDate).format('YYYY-MM-DD hh:mm:ss a');
  }

  onDoTask(): void {
    if (this.taskName === '') {
      this.errorMessage = 'Please enter Task Name';
      return;
    }
    if (this.description === '') {
      this.errorMessage = 'Please enter Task Description';
      return;
    }
    this.errorMessage  = '';

    const uInfo = localStorage.getItem('userInfo');
    const user: User = uInfo !== null ? JSON.parse(uInfo) : '';
    
    const body: any = {
      name: this.taskName,
      description: this.description,
      date: new Date(this.getFormatedDate(this.date)).getTime(),
      creatorName: user.firstName,
      owner: user,
      priority: this.taskPriority,
      deadlineDate: new Date(this.getFormatedDate(this.deadlineDate)).getTime()
    };

    console.log('>>>>>##', body);
    if (!this.isEdit) {
      this.service.addTask(body).pipe(take(1)).subscribe((res: Task) => {
        if (res && res?.id) {
          alert("Task Created Successfully");
          this.navigateRoute();
        }
      });
    } else {
      body.completed = this.isComplete;
      body.id = this.taskId;
      
      const bb = Object.assign(body);
      console.log('>>>>#######', bb)
  
      this.service.updateTask(this.taskId, bb).pipe(take(1)).subscribe((res: Task) => {
        if (res && res?.id) {
          alert("Task Updated Successfully");
          this.navigateRoute();
        }
      });
    }
  }

  navigateRoute(): void {
    if (this.isAdmin) {
      this.auth.navigate('admin-listtask');
    } else {
      this.auth.navigate('listtask');
    }
  }
}
