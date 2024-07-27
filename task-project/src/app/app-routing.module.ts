import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ClienthomeComponent } from './client/clienthome/clienthome.component';
import { ClientLoginGuardService } from './guard/client-login-guard.service';
import { AdminLoginGuardService } from './guard/admin-login-guard.service';
import { AppHomeComponent } from './app-home/app-home.component';
import { UserProfileComponent } from './client/user-profile/user-profile.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddTaskComponent } from './client/add-task/add-task.component';
import { ListTaskComponent } from './client/list-task/list-task.component';
import { AdminTaskListComponent } from './admin-task-list/admin-task-list.component';
import { AdminClientGuardService } from './guard/admin-client-auth-guard.service';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: UserProfileComponent, canActivate: [ClientLoginGuardService] },
  { path: 'clienthome', component: ClienthomeComponent, canActivate: [ClientLoginGuardService] },
  { path: 'addtask', component: AddTaskComponent, canActivate: [AdminClientGuardService] },
  { path: 'listtask', component: ListTaskComponent, canActivate: [ClientLoginGuardService] },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AdminLoginGuardService] },
  { path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AdminLoginGuardService] },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'admin-listtask', component: AdminTaskListComponent, canActivate: [AdminLoginGuardService] },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
