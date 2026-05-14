import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent implements OnInit {

  employeeService = inject(EmployeeService);

  searchText = '';

  showForm = false;

  isEdit = false;

  showDeletePopup = false;

  deleteId = 0;

  newEmployee = {
    id: 0,
    fullName: '',
    department: '',
    position: '',
    status: 'WORKING'
  };

  employees: any[] = [];

  ngOnInit(): void {
      this.loadEmployees();
  }

  loadEmployees(){

    this.employeeService.getEmployees().subscribe({

      next: (data) => {

        console.log(data);

        this.employees = data;
        console.log(this.employees);

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  get filteredEmployees(){

    return this.employees.filter(emp =>

      emp.fullName
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  addEmployee(){

    if(
      this.newEmployee.fullName.trim() === '' ||
      this.newEmployee.department.trim() === '' ||
      this.newEmployee.position.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    this.newEmployee.id =
      this.employees.length + 1;

    this.employees.push({
      ...this.newEmployee
    });

    this.newEmployee = {
      id: 0,
      fullName: '',
      department: '',
      position: '',
      status: 'WORKING'
    };

    this.showForm = false;

  }

  deleteEmployee(id: number){

    this.employees = this.employees.filter(
      emp => emp.id !== id
    );

  }

  openDeletePopup(id: number){

    this.showDeletePopup = true;

    this.deleteId = id;

  }

  confirmDelete(){

    this.employees = this.employees.filter(
      emp => emp.id !== this.deleteId
    );

    this.showDeletePopup = false;

  }

  editEmployee(emp: any){

    this.newEmployee = {...emp};

    this.showForm = true;

    this.isEdit = true;

  }

  updateEmployee(){

    if(
      this.newEmployee.fullName.trim() === '' ||
      this.newEmployee.department.trim() === '' ||
      this.newEmployee.position.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const index = this.employees.findIndex(
      emp => emp.id === this.newEmployee.id
    );

    this.employees[index] = {
      ...this.newEmployee
    };

    this.newEmployee = {
      id: 0,
      fullName: '',
      department: '',
      position: '',
      status: 'WORKING'
    };

    this.showForm = false;

    this.isEdit = false;

  }

}