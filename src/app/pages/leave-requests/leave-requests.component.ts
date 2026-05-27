import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-leave-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent implements OnInit {

  http = inject(HttpClient);
  apiUrl = 'http://localhost:5270/api/LeaveRequest';

  showForm = false;
  leaveRequests: any[] = [];
  selectedFileName = '';

  newLeave = {
    employeeId: 0,
    startDate: '',
    endDate: '',
    reason: '',
    attachment: null as File | null
  };

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  loadLeaveRequests() {
    this.http.get(this.apiUrl, this.getHeaders()).subscribe({
      next: (res: any) => {                    // ← Sửa ở đây
        console.log('Leave Requests Response:', res);

        // Xử lý linh hoạt nhiều kiểu response
        if (Array.isArray(res)) {
          this.leaveRequests = res;
        } else if (res?.data && Array.isArray(res.data)) {
          this.leaveRequests = res.data;
        } else if (res) {
          this.leaveRequests = Array.isArray(res) ? res : [res];
        } else {
          this.leaveRequests = [];
        }
      },
      error: (err) => {
        console.error('Load leave requests error:', err);
      }
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.newLeave.attachment = file;
      this.selectedFileName = file.name;
    }
  }

  addLeave() {
    if (!this.newLeave.employeeId || !this.newLeave.startDate || !this.newLeave.endDate || !this.newLeave.reason?.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc (*)');
      return;
    }

    const formData = new FormData();
    formData.append('employeeId', this.newLeave.employeeId.toString());
    formData.append('startDate', this.newLeave.startDate);
    formData.append('endDate', this.newLeave.endDate);
    formData.append('reason', this.newLeave.reason);

    if (this.newLeave.attachment) {
      formData.append('attachment', this.newLeave.attachment);
    }

    this.http.post(this.apiUrl, formData, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    }).subscribe({
      next: () => {
        alert('✅ Tạo đơn nghỉ phép thành công!');
        this.resetForm();
        this.loadLeaveRequests();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Tạo đơn thất bại');
      }
    });
  }

  resetForm() {
    this.newLeave = {
      employeeId: 0,
      startDate: '',
      endDate: '',
      reason: '',
      attachment: null
    };
    this.selectedFileName = '';
    this.showForm = false;
  }

  updateStatus(id: number, status: string) {
    this.http.put(`${this.apiUrl}/${id}/status`, { status }, this.getHeaders())
      .subscribe({
        next: () => this.loadLeaveRequests(),
        error: (err) => console.error(err)
      });
  }
}
