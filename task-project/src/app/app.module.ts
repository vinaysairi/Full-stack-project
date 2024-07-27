import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ContactComponent } from './contact/contact.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClientheaderComponent } from './client/clientheader/clientheader.component';


import { AdminheaderComponent } from './adminheader/adminheader.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { ClienthomeComponent } from './client/clienthome/clienthome.component';
import { ClientLoginGuardService } from './guard/client-login-guard.service';
import { AdminLoginGuardService } from './guard/admin-login-guard.service';
import { AppHomeComponent } from './app-home/app-home.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { MatIconModule } from '@angular/material/icon';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddTaskComponent } from './client/add-task/add-task.component';
import { ListTaskComponent } from './client/list-task/list-task.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { AdminTaskListComponent } from './admin-task-list/admin-task-list.component';
import { AddTaskUserComponent } from './add-task-user/add-task-user.component';
import { AdminClientGuardService } from './guard/admin-client-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ContactComponent,
    AdminDashboardComponent,
    ClientheaderComponent,
    AdminheaderComponent,
    AppheaderComponent,
    ClienthomeComponent,
    AppHomeComponent,
    UserProfileComponent,
    UpdateProfileComponent,
    AboutusComponent,
    AddTaskComponent,
    ListTaskComponent,
    AdminTaskListComponent,
    AddTaskUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  providers: [
    provideClientHydration(),
    ClientLoginGuardService, AdminLoginGuardService,
    AdminClientGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
