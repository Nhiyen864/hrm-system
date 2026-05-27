import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent
implements OnInit {

  http = inject(HttpClient);

  apiUrl =
    'http://localhost:5270/api/Department';

  showForm = false;
  isEdit = false;
  departments: any[] = [];
  filteredDepartments: any[] = [];

  newDepartment = {
    id: 0,
    name: '',
    description: ''
  };
  showDetailModal = false;
  selectedDepartment: any = null;

  ngOnInit(): void {
    this.loadDepartments();
  }

  getHeaders(){
    return {
      headers: new HttpHeaders({
        Authorization:
          `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

 loadDepartments(){
  this.http.get(this.apiUrl, this.getHeaders()).subscribe({
    next: (res: any) => {
      console.log('Departments loaded:', res);
      this.departments = Array.isArray(res) ? res : (res.data || res);
      this.filteredDepartments = [...this.departments];
    },
    error: (err) => {
      console.error(err);
      alert('Không thể tải danh sách phòng ban');
    }
  });
}

  saveDepartment() {
    if (!this.newDepartment.name?.trim()) {
      alert('Vui lòng nhập tên phòng ban');
      return;
    }

     const body = {
    name: this.newDepartment.name,
    description: this.newDepartment.description
  };

    if (this.isEdit) {
    this.http.put(`${this.apiUrl}/${this.newDepartment.id}`,
      body, this.getHeaders()
    ).subscribe({
      next: () => {
        alert('Cập nhật phòng ban thành công');
        this.loadDepartments();
        this.resetForm();
      },

      error: (err) => {
        console.log(err);
        alert(
          err.error.message ||
          'Update thất bại'
        );
      }
    });

  } else {
      // Create
      this.http.post(this.apiUrl, this.newDepartment, this.getHeaders())
        .subscribe({
          next: () => this.afterSave(),
          error: (err) => console.error(err)
        });
    }
  }
  private afterSave() {
    this.loadDepartments();
    this.resetForm();
    alert(this.isEdit ? 'Cập nhật phòng ban thành công!' : 'Thêm phòng ban thành công!');
  }

  editDepartment(dept: any) {
  console.log('Editing department full data:', dept);

  this.newDepartment = {
    id: dept.id,
    name: dept.name,
    description: dept.description || ''
  };

  this.showForm = true;
  this.isEdit = true;
}

  deleteDepartment(id: number){
    const confirmDelete = confirm(
      'Bạn có chắc chắn muốn xóa phòng ban này?'
    );
    if(!confirmDelete){
      return;
    }
    this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.loadDepartments();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  viewDetail(dept: any): void {
    this.selectedDepartment = dept;
    this.showDetailModal = true;
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedDepartment = null;
  }

  resetForm() {
    this.newDepartment = {
      id: 0,
      name: '',
      description: ''
    };
    this.showForm = false;
    this.isEdit = false;
  }
}

