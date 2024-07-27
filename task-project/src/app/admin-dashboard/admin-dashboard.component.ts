import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateProfileComponent } from '../update-profile/update-profile.component';

import { take } from 'rxjs';
import { User } from '../../user';



@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  @Input() message: string = '';
  unreadMessagesCount: number = 0;
  
  users: User[] = [];
  
  searchText: string = '';
  

  constructor(private router: Router, private authService: AuthService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllUsers();
  }

  ngOnDestroy() {
    
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

  deleteUser(userId: number) {
    this.authService.deleteUserById(userId).pipe(take(1)).subscribe(

      () => {
        this.getAllUsers();
        window.alert('Account deleted successfully');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }

  searchUsers(searchText: string) {
   
    this.authService.searchUsers(searchText).subscribe(
      (data: User[]) => {
        if (data.length > 0) {
          const adminId = localStorage.getItem('uId');
          if (adminId !== null) {
            this.users = data.filter((userId: any) => userId?.id !== parseInt(adminId, 10));
          }
        } else {
          this.users = [];
        }
      },
      (error: any) => {
        console.error('Error searching users', error);
      }
    );
  }

  onSearchInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    this.searchUsers(value);
  }

  updateUser(userId: any): void {
    const dialogRef = this.dialog.open(UpdateProfileComponent, {
      data: { id: userId },
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '80%',
      width: '80%'
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUsers();
    });
  }

}
