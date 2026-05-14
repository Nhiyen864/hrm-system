import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://localhost:5270/api/Employees';

  http = inject(HttpClient);

  getEmployees(): Observable<any>{

    return this.http.get(this.apiUrl);

  }

}