import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  http = inject(HttpClient);
  apiUrl = 'http://localhost:5270/api/Users';

  users: any[] = [];
  showForm = false;

  newUser = {
    username: '',
    password: '',
    email: '',
    role: 'VIEWER'
  };

  ngOnInit(): void {
    this.loadUsers();
  }
  private getHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  loadUsers() {
    this.http.get<any[]>(this.apiUrl, this.getHeaders()).subscribe({
      next: (res: any) => {
        this.users = Array.isArray(res) ? res : (res.data || res);
      },
      error: (err) => {
        console.error(err);
        alert('Không thể tải danh sách người dùng');
      }
    });
  }

  createUser() {
  if (!this.newUser.username || !this.newUser.password) {
    alert('Vui lòng nhập Username và Password');
    return;
  }

  this.http.post(this.apiUrl, this.newUser, this.getHeaders()).subscribe({
    next: (res) => {
      console.log('Create success:', res);
      alert('✅ Tạo tài khoản thành công!');
      this.resetForm();
      this.loadUsers();
    },
    error: (err) => {
      console.error(err);
      alert(err.error?.message || 'Tạo tài khoản thất bại');
    }
  });
}

  lockUser(id: number) {
  if (!confirm('Bạn có chắc muốn khóa tài khoản này?')) return;

  this.http.put(`${this.apiUrl}/${id}/lock`, {}, this.getHeaders())
    .subscribe({
      next: (response) => {
        console.log('Lock success:', response);
        alert('✅ Đã khóa tài khoản thành công!');
        this.loadUsers();
      },
      error: (err) => {
        console.error('Lock error:', err);

        if (err.status === 200) {
          alert('✅ Đã khóa tài khoản thành công!');
          this.loadUsers();
        } else {
          alert(err.error?.message || 'Khóa tài khoản thất bại');
        }
      }
    });
}

unlockUser(id: number) {
    if (!confirm('Bạn có chắc muốn mở khóa tài khoản này?')) return;

    this.http.put(`${this.apiUrl}/${id}/unlock`, {}, this.getHeaders())
      .subscribe({
        next: (response) => {
          console.log('Unlock success:', response);
          alert('Đã mở khóa tài khoản thành công!');
          this.loadUsers();
        },
        error: (err) => {
          console.error('Unlock error:', err);
          if (err.status === 200|| err.status === 204) {
            alert('Đã mở khóa tài khoản thành công!');
            this.loadUsers();
          } else {
            alert(err.error?.message || 'Mở khóa tài khoản thất bại');
          }
        }
      });
  }

  resetForm() {
    this.newUser = {
      username: '',
      password: '',
      email: '',
      role: 'VIEWER'
    };
    this.showForm = false;
  }

}
