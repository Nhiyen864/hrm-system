import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { LeaveRequestsComponent } from './pages/leave-requests/leave-requests.component';
import { PerformanceComponent } from './pages/performance/performance.component';
import { RecruitmentComponent } from './pages/recruitment/recruitment.component';
import { CandidatesComponent } from './pages/candidates/candidates.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'dashboard',
    component: DashboardComponent
  },

  {
    path: 'employees',
    component: EmployeesComponent
  },

  {
    path: 'departments',
    component: DepartmentsComponent
  },

  {
    path: 'attendance',
    component: AttendanceComponent
  },

   {
    path: 'leave-requests',
    component: LeaveRequestsComponent
  },

  {
    path: 'performance',
    component: PerformanceComponent
  },

  {
    path: 'recruitment',
    component: RecruitmentComponent
  },

  {
    path: 'candidates',
    component: CandidatesComponent
  }, 

  {
    path: 'employees',
    component: EmployeesComponent,
    canActivate: [authGuard]
  }
];