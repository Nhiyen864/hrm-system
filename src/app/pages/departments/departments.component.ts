import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css'
})
export class DepartmentsComponent {

  showForm = false;

  newDepartment = '';

  departments = [

    {
      id: 1,
      name: 'IT'
    },

    {
      id: 2,
      name: 'HR'
    },

    {
      id: 3,
      name: 'Marketing'
    }

  ];

  addDepartment(){

    const newDept = {
      id: this.departments.length + 1,
      name: this.newDepartment
    };

    this.departments.push(newDept);

    this.newDepartment = '';

    this.showForm = false;

  }

  deleteDepartment(id: number){

    this.departments = this.departments.filter(
      dept => dept.id !== id
    );

  }

}