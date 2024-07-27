import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../task.service';
import { AuthService } from '../auth.service';
import { User } from '../../user';
import { Task } from '../task.modal';
import { take } from 'rxjs';

@Component({
  selector: 'app-add-task-user',
  templateUrl: './add-task-user.component.html',
  styleUrl: './add-task-user.component.css'
})
export class AddTaskUserComponent {

  users: User[] = [];
  userId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<AddTaskUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private service: TaskService,
    private authService: AuthService
  ) {
    this.getAllUsers();
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      (users: User[]) => {
        if (users.length > 0) {
          const adminId = localStorage.getItem('uId');
          if (adminId !== null) {
            // Logged in Admin user,  Never come in to list of User list.
            this.users = users.filter((item: any) => item?.id !== parseInt(adminId, 10));
          }
        } else {
          this.users = [];
        }
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }

  addToTask(): void {
    this.data.owner.id = this.userId;
    
    this.service.changeTaskAssingee(this.data).pipe(take(1)).subscribe((res)=> {
      if (res && res?.id) {
        alert("User assign to task successfully");
        this.close();
      }
    });
  }
}
