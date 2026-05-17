import {
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent
implements OnInit {

  http = inject(HttpClient);

  apiUrl =
    'http://localhost:5270/api/Performance';

  showForm = false;

  performances: any[] = [];

  newPerformance = {

    employeeId: 0,

    score: 0,

    review: '',

    period: ''

  };

  ngOnInit(): void {

    this.loadPerformances();

  }

  getHeaders(){

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }

  loadPerformances(){

    this.http.get<any[]>(

      this.apiUrl,

      this.getHeaders()

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.performances = res;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addPerformance(){

    this.http.post(

      this.apiUrl,

      this.newPerformance,

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadPerformances();

        this.newPerformance = {

          employeeId: 0,

          score: 0,

          review: '',

          period: ''

        };

        this.showForm = false;

      },

      error: (err) => {

        alert(JSON.stringify(err.error));

      }

    });

  }

  getRank(score: number){

    if(score >= 90){

      return 'Xuất sắc';

    }

    if(score >= 75){

      return 'Tốt';

    }

    if(score >= 50){

      return 'Trung bình';

    }

    return 'Kém';

  }

}