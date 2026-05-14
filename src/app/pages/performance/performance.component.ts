import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './performance.component.html',
  styleUrl: './performance.component.css'
})
export class PerformanceComponent {

  showForm = false;

  performances = [

    {
      id: 1,
      employee: 'Nguyen Van A',
      score: 90,
      review: 'Làm việc tốt',
      period: '2026-Q1'
    },

    {
      id: 2,
      employee: 'Tran Thi B',
      score: 75,
      review: 'Cần cải thiện',
      period: '2026-Q1'
    }

  ];

  newPerformance = {
    employee: '',
    score: 0,
    review: '',
    period: ''
  };

  addPerformance(){

    if(
      this.newPerformance.employee.trim() === '' ||
      this.newPerformance.review.trim() === '' ||
      this.newPerformance.period.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const newData = {

      id: this.performances.length + 1,

      ...this.newPerformance

    };

    this.performances.push(newData);

    this.newPerformance = {
      employee: '',
      score: 0,
      review: '',
      period: ''
    };

    this.showForm = false;

  }

  deletePerformance(id: number){

    this.performances = this.performances.filter(
      item => item.id !== id
    );

  }

}