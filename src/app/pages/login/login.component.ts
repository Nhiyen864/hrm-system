import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  username = '';
  password = '';
  router = inject(Router);
  http = inject(HttpClient);

  login(){
    const data = {
      username: this.username,
      password: this.password
    };

    this.http.post<any>(
      'http://localhost:5270/api/Auth/login',
      data
    )
    .subscribe({
      next: (res) => {
        console.log(res);
        localStorage.setItem(
          'token',
          res.token
        );
        // GO DASHBOARD
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err);
        alert(JSON.stringify(err.error));
      }
    });
  }
}
