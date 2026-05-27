import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent
implements OnInit {

  http = inject(HttpClient);
  apiUrl ='http://localhost:5270/api/Candidate';
  showForm = false;
  candidates: any[] = [];

  newCandidate = {
    fullName: '',
    email: '',
    phone: '',
    recruitmentId: 0
  };

  ngOnInit(): void {
    this.loadCandidates();
  }

  getHeaders(){
    return {
      headers: new HttpHeaders({
        Authorization:
          `Bearer ${localStorage.getItem('token')}`
      })
    };
  }

  loadCandidates(){
    this.http.get<any[]>(
      this.apiUrl,
      this.getHeaders()
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.candidates = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addCandidate(){
    this.http.post(
      this.apiUrl,
      this.newCandidate,
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.loadCandidates();
        this.newCandidate = {
          fullName: '',
          email: '',
          phone: '',
          recruitmentId: 0
        };
        this.showForm = false;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  updateStatus(
    id: number,
    status: string
  ){
    this.http.put(
      `${this.apiUrl}/${id}/status`,
      {
        status: status
      },
      this.getHeaders()
    ).subscribe({
      next: () => {
        this.loadCandidates();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  public resetForm() {
    this.newCandidate = {
      fullName: '',
      email: '',
      phone: '',
      recruitmentId: 0
    };
    this.showForm = false;
  }
}
