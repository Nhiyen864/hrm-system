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

  newDepartment = '';

  departments: any[] = [];

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

    this.http.get<any[]>(

      this.apiUrl,

      this.getHeaders()

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.departments = res;

      },

      error: (err) => {

        alert(JSON.stringify(err));

      }

    });

  }

  addDepartment(){

    const data = {

      name: this.newDepartment

    };

    this.http.post(

      this.apiUrl,

      data,

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadDepartments();

        this.newDepartment = '';

        this.showForm = false;

      },

      error: (err) => {

        console.log(err);

      }

    });

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

}