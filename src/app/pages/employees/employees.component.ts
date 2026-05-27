import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';   // ← Thêm dòng này

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  private employeeService = inject(EmployeeService);
  private departmentService = inject(DepartmentService);
  searchText = '';
  showForm = false;
  isEdit = false;
  showDeletePopup = false;
  showDetailModal = false;
  deleteId = 0;
  selectedEmployee: any = null;

  departments: any[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = [];

  newEmployee = {
    id: 0,
    fullName: '',
    departmentId: 0,
    position: '',
    status: 'WORKING',
    dob: null as string | null,
    gender: '',
    phone: '',
    address: '',
    salary: null as number | null
  };

  ngOnInit(): void {

    this.loadEmployees();
    this.loadDepartments();
  }

  // ==================== LOAD NHÂN VIÊN ====================
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (response) => {
        console.log('✅ Employees Response:', response);
        this.employees = Array.isArray(response) ? response : (response.data || response);
        this.filteredEmployees = [...this.employees];
      console.log(`✅ Đã load ${this.employees.length} nhân viên vào bảng`);
      },
      error: (err) => {
        console.error('❌ Load employees error:', err);
        if (err.status === 401) {
          alert('Phiên đăng nhập hết hạn!');
        }
      }
    });
  }


  // ==================== LOAD PHÒNG BAN ====================
  loadDepartments(): void {
    this.departmentService.getAll().subscribe({
      next: (response) => {
        console.log('✅ Departments loaded:', response);
        this.departments = Array.isArray(response) ? response : (response.data || response);
      },
      error: (err) => {
        console.error('❌ Load departments failed:', err);
        alert('Không thể tải danh sách phòng ban');
      }
    });
  }

  viewDetail(emp: any): void {
    this.employeeService.getEmployeeById(emp.id).subscribe({
      next: (data) => {
        this.selectedEmployee = data;
        this.showDetailModal = true;
      },
      error: (err) => {
        console.error(err);
        alert('Không thể tải thông tin chi tiết');
      }
    });
  }

  closeDetailModal(): void {
    this.showDetailModal = false;
    this.selectedEmployee = null;
  }
  // ==================== CRUD NHÂN VIÊN ====================
 addEmployee(): void {
    if (!this.newEmployee.fullName?.trim() ||
        !this.newEmployee.position?.trim() ||
        this.newEmployee.departmentId === 0) {
      alert('Vui lòng nhập đầy đủ thông tin bắt buộc');
      return;
    }

    this.employeeService.addEmployee(this.newEmployee).subscribe({
      next: () => {
        alert('✅ Thêm nhân viên thành công!');
        this.resetForm();
        this.loadEmployees();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Thêm nhân viên thất bại');
      }
    });
  }

  editEmployee(emp: any): void {
    this.newEmployee = {
      id: emp.id,
      fullName: emp.fullName || '',
      departmentId: emp.departmentId || 0,
      position: emp.position || '',
      status: emp.status || 'WORKING',
      dob: emp.dob ? emp.dob.split('T')[0] : null,
      gender: emp.gender || '',
      phone: emp.phone || '',
      address: emp.address || '',
      salary: emp.salary || null
    };
    this.showForm = true;
    this.isEdit = true;
  }

  updateEmployee(): void {
    if (!this.newEmployee.fullName?.trim() || !this.newEmployee.position?.trim()) {
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }

    this.employeeService.updateEmployee(this.newEmployee.id, this.newEmployee).subscribe({
      next: () => {
        alert('✅ Cập nhật thành công!');
        this.resetForm();
        this.loadEmployees();
      },
      error: (err) => {
        console.error(err);
        alert(err.error?.message || 'Cập nhật thất bại');
      }
    });
  }

  openDeletePopup(id: number): void {
    this.deleteId = id;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
  this.employeeService.deleteEmployee(this.deleteId).subscribe({
    next: (response) => {
      console.log('✅ Delete success response:', response);
      alert('Xóa nhân viên thành công!');
      this.showDeletePopup = false;
      this.loadEmployees();
    },
    error: (err) => {
      console.error('Delete Error:', err);

      if (err.status === 200) {
        console.log('✅ Backend xóa thành công nhưng response không chuẩn JSON');
        alert('Xóa nhân viên thành công!');
        this.showDeletePopup = false;
        this.loadEmployees();
      }
      else {
        alert(err.error?.message || err.error?.title || 'Xóa thất bại');
        this.showDeletePopup = false;
      }
    }
  });
}

  onSearchChange(): void {
  if (!this.searchText?.trim()) {
    this.filteredEmployees = [...this.employees];
  } else {
    const keyword = this.searchText.toLowerCase().trim();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.fullName?.toLowerCase().includes(keyword)
    );
  }
}

  public resetForm(): void {
    this.newEmployee = {
      id: 0,
      fullName: '',
      departmentId: 0,
      position: '',
      status: 'WORKING',
      dob: null,
      gender: '',
      phone: '',
      address: '',
      salary: null
    };
    this.showForm = false;
    this.isEdit = false;
  }
}
