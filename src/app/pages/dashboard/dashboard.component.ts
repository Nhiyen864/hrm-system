import { Component, inject, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent
implements OnInit {

  http = inject(HttpClient);

  dashboard: any = {};

  ngOnInit(): void {

    this.loadDashboard();

  }

  loadDashboard(){

    const token =
      localStorage.getItem('token');

    this.http.get(

      'http://localhost:5270/api/Dashboard',

      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.dashboard = res;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}
