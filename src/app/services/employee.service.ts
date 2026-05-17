import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =
    'http://localhost:5270/api/Employees';

  http = inject(HttpClient);

  getHeaders(){

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }

  getEmployees(): Observable<any>{

    return this.http.get(

      this.apiUrl,

      this.getHeaders()

    );

  }

  addEmployee(data: any): Observable<any>{

    return this.http.post(

      this.apiUrl,

      data,

      this.getHeaders()

    );

  }

  updateEmployee(
    id: number,
    data: any
  ): Observable<any>{

    return this.http.put(

      `${this.apiUrl}/${id}`,

      data,

      this.getHeaders()

    );

  }

  deleteEmployee(id: number): Observable<any>{

    return this.http.delete(

      `${this.apiUrl}/${id}`,

      this.getHeaders()

    );

  }

}