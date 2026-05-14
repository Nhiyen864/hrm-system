import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent {

  attendances = [

    {
      id: 1,
      employee: 'Nguyen Van A',
      date: '2025-07-01',
      checkIn: '08:00',
      checkOut: '17:00'
    },

    {
      id: 2,
      employee: 'Tran Thi B',
      date: '2025-07-01',
      checkIn: '08:15',
      checkOut: '17:10'
    }

  ];

  newAttendance = {
    employee: '',
    date: '',
    checkIn: '',
    checkOut: ''
  };

  showForm = false;

  addAttendance(){

    if(
      this.newAttendance.employee.trim() === '' ||
      this.newAttendance.date === '' ||
      this.newAttendance.checkIn === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const newData = {

      id: this.attendances.length + 1,

      ...this.newAttendance

    };

    this.attendances.push(newData);

    this.newAttendance = {
      employee: '',
      date: '',
      checkIn: '',
      checkOut: ''
    };

    this.showForm = false;

  }

}