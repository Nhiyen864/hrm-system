import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  userRole = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (token) {

      const decoded: any = jwtDecode(token);

      this.userRole =
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      console.log('Role:', this.userRole);
    }
  }

  logout() {

    localStorage.removeItem('token');

    this.router.navigate(['/login']);

  }
}