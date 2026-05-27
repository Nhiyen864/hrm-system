import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {

  http = inject(HttpClient);

  apiUrl = 'http://localhost:5270/api/Attendance';

  attendances: any[] = [];

  employeeId = 0;
  employeeName = '';
  checkType = '';

  ngOnInit(): void {
    this.loadAllAttendance();
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  loadAllAttendance() {
  this.http.get<any[]>(
    this.apiUrl,
    this.getHeaders()
  )
  .subscribe({
    next: (res: any) => {
      console.log(res);
      this.attendances =
        Array.isArray(res)
        ? res
        : (res.data || res);
    },
    error: (err) => {
      console.log(err);
    }
  });
}
  loadEmployeeInfo() {
    if (this.employeeId > 0) {
      this.loadAttendance();
    } else {
      this.attendances = [];
      this.employeeName = '';
    }
  }

  loadAttendance() {
    if (this.employeeId <= 0) return;

    this.http.get<any[]>(`${this.apiUrl}/employee/${this.employeeId}`, this.getHeaders())
      .subscribe({
        next: (res: any) => {
          console.log('Attendance Response:', res);
          this.attendances = Array.isArray(res) ? res : (res.data || res);
        },
        error: (err) => {
          console.error(err);
          this.attendances = [];
        }
      });
  }

  submitAttendance() {
    if (this.employeeId <= 0) {
      alert('Vui lòng nhập mã nhân viên');
      return;
    }

    if (!this.checkType) {
      alert('Vui lòng chọn Check In hoặc Check Out');
      return;
    }

    const endpoint = this.checkType === 'CheckIn' ? '/check-in' : '/check-out';

    this.http.post(`${this.apiUrl}${endpoint}`, {
      employeeId: this.employeeId
    }, this.getHeaders()).subscribe({
      next: () => {
        const message = this.checkType === 'CheckIn'
          ? '✅ Check In thành công!'
          : '✅ Check Out thành công!';

        alert(message);
        this.loadAttendance();
        this.checkType = ''; // Reset radio button
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Chấm công thất bại');
      }
    });
  }
}
