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
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent
implements OnInit {

  http = inject(HttpClient);

  apiUrl =
    'http://localhost:5270/api/Attendance';

  attendances: any[] = [];

  employeeId = 0;

  ngOnInit(): void {

    this.loadAttendance();

  }

  getHeaders(){

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }

  loadAttendance(){

    if(this.employeeId === 0){

      return;

    }

    this.http.get<any[]>(

      `${this.apiUrl}/employee/${this.employeeId}`,

      this.getHeaders()

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.attendances = res;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  checkIn(){

    this.http.post(

      `${this.apiUrl}/check-in`,

      {

        employeeId: this.employeeId

      },

      this.getHeaders()

    ).subscribe({

      next: () => {

        alert('Check in thành công');

        this.loadAttendance();

      },

      error: (err) => {

        alert(err.error);

      }

    });

  }

  checkOut(){

    this.http.post(

      `${this.apiUrl}/check-out`,

      {

        employeeId: this.employeeId

      },

      this.getHeaders()

    ).subscribe({

      next: () => {

        alert('Check out thành công');

        this.loadAttendance();

      },

      error: (err) => {

        alert(err.error);

      }

    });

  }

}