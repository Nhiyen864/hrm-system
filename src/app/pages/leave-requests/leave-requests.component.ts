import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-leave-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent
implements OnInit {

  http = inject(HttpClient);

  apiUrl =
    'http://localhost:5270/api/LeaveRequest';

  showForm = false;

  leaveRequests: any[] = [];

  newLeave = {

    employeeId: 0,

    startDate: '',

    endDate: '',

    reason: ''

  };

  ngOnInit(): void {

    this.loadLeaveRequests();

  }

  getHeaders(){

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }

  loadLeaveRequests(){

    this.http.get<any[]>(

      this.apiUrl,

      this.getHeaders()

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.leaveRequests = res;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addLeave(){

    this.http.post(

      this.apiUrl,

      this.newLeave,

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadLeaveRequests();

        this.newLeave = {

          employeeId: 0,

          startDate: '',

          endDate: '',

          reason: ''

        };

        this.showForm = false;

      },

      error: (err) => {

        alert(JSON.stringify(err.error));

      }

    });

  }

  updateStatus(
    id: number,
    status: string
  ){

    this.http.put(

      `${this.apiUrl}/${id}/status`,

      {
        status: status
      },

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadLeaveRequests();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}