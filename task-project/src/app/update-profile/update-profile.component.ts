import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../auth.service';

import { take } from 'rxjs';
import { User } from '../../user';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent {
  user: User = new User(0,"", "", "", "", "");
  minDate: any;
  constructor(
    public dialogRef: MatDialogRef<UpdateProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authService: AuthService
  ) {
    const todayDate = new Date();
    this.minDate = (todayDate?.getFullYear() - 18) + '-' + (todayDate?.getMonth() + 1) + '-' + todayDate?.getDate();
    this.getUserProfileData(data?.id);
  }
  getUserProfileData(id: any): void {
    this.authService.getUserById(id).subscribe(
      (user: User) => {
        this.user = user;
      });
  }

  update(): void {
    this.authService.updateUserInformation(this.data?.id, this.user).pipe(take(1)).subscribe((res: any) => {
      if (res?.id) {
        localStorage.setItem('userInfo', JSON.stringify(res));
        alert("Profile updated successfully");
        this.closeDialog();
      }
    });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
