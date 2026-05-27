// src/app/services/employee.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);
  private api = 'http://localhost:5270/api/employees';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      })
    };
  }

  getEmployees(): Observable<any> {
    return this.http.get(this.api, this.getHeaders());
  }

  getEmployeeById(id: number): Observable<any> {
    return this.http.get(`${this.api}/${id}`, this.getHeaders());
  }

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.api, data, this.getHeaders());
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(`${this.api}/${id}`, data, this.getHeaders());
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`, this.getHeaders());
  }
}
