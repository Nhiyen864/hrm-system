import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private router: Router){}

  login(){

    if(
      this.username === 'admin' &&
      this.password === '123456'
    ){

      this.router.navigate(['/dashboard']);

    }
    else{

      alert('Sai tài khoản hoặc mật khẩu');

    }

  }

}