import { Injectable } from '@angular/core';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private http = inject(HttpClient);

  private api = 'http://localhost:5270/api/Department';

  private getHeaders() {
    const token = localStorage.getItem('token');
    return {
       headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
  getAll(): Observable<any> {
    return this.http.get(
      this.api,
      this.getHeaders());
  }

  create(data: any): Observable<any> {
    return this.http.post(
      this.api,
      data,
      this.getHeaders());
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      `${this.api}/${id}`,
      this.getHeaders());
  }

  search(params: any): Observable<any> {
    return this.http.get(
      `${this.api}/search`,
      {
        params,
        headers: this.getHeaders().headers
      }
    );
  }
  constructor() { }
}
