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
    departmentId: 1,
    position: '',
    status: 'WORKING'
  };

  employees: any[] = [];

  ngOnInit(): void {

    this.loadEmployees();

  }

  // LOAD EMPLOYEE

  loadEmployees(){

    this.employeeService.getEmployees().subscribe({

      next: (data) => {

        console.log(data);

        this.employees = data;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  // SEARCH

  get filteredEmployees(){

    if(!this.employees) return [];

    return this.employees.filter(emp =>

      emp.fullName
        ?.toLowerCase()
        .includes(this.searchText.toLowerCase())

    );

  }

  // ADD EMPLOYEE

  addEmployee(){

    if(
      this.newEmployee.fullName.trim() === '' ||
      this.newEmployee.position.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    this.employeeService.addEmployee(this.newEmployee)
      .subscribe({

        next: () => {

          this.loadEmployees();

          this.newEmployee = {
            id: 0,
            fullName: '',
            departmentId: 1,
            position: '',
            status: 'WORKING'
          };

          this.showForm = false;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // DELETE

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

    this.employeeService
      .deleteEmployee(this.deleteId)
      .subscribe({

        next: () => {

          this.loadEmployees();

          this.showDeletePopup = false;

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

  // EDIT

  editEmployee(emp: any){

    this.newEmployee = {

      id: emp.id,

      fullName: emp.fullName,

      departmentId:

        emp.departmentId ||

        emp.department?.id ||

        1,

      position: emp.position,

      status: emp.status

    };

    this.showForm = true;

    this.isEdit = true;

  }

  // UPDATE

  updateEmployee(){

    this.employeeService
      .updateEmployee(
        this.newEmployee.id,
        this.newEmployee
      )
      .subscribe({

        next: () => {

          this.loadEmployees();

          this.showForm = false;

          this.isEdit = false;

          this.newEmployee = {

            id: 0,

            fullName: '',

            departmentId: 1,

            position: '',

            status: 'WORKING'

          };

        },

        error: (err) => {

          console.log(err);

        }

      });

  }

}