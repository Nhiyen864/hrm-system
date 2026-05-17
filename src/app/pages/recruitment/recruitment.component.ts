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
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css'
})
export class RecruitmentComponent
implements OnInit {

  http = inject(HttpClient);

  apiUrl =
    'http://localhost:5270/api/Recruitment';

  showForm = false;

  recruitments: any[] = [];

  newRecruitment = {

    title: '',

    description: '',

    department: ''

  };

  ngOnInit(): void {

    this.loadRecruitments();

  }

  getHeaders(){

    return {

      headers: new HttpHeaders({

        Authorization:
          `Bearer ${localStorage.getItem('token')}`

      })

    };

  }

  loadRecruitments(){

    this.http.get<any[]>(

      this.apiUrl,

      this.getHeaders()

    ).subscribe({

      next: (res) => {

        console.log(res);

        this.recruitments = res;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  addRecruitment(){

    this.http.post(

      this.apiUrl,

      this.newRecruitment,

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadRecruitments();

        this.newRecruitment = {

          title: '',

          description: '',

          department: ''

        };

        this.showForm = false;

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

  closeRecruitment(id: number){

    this.http.put(

      `${this.apiUrl}/${id}/close`,

      {},

      this.getHeaders()

    ).subscribe({

      next: () => {

        this.loadRecruitments();

      },

      error: (err) => {

        console.log(err);

      }

    });

  }

}