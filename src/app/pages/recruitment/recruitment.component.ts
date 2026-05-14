import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-recruitment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recruitment.component.html',
  styleUrl: './recruitment.component.css'
})
export class RecruitmentComponent {

  showForm = false;

  recruitments = [

    {
      id: 1,
      title: 'Frontend Developer',
      description: 'Angular Developer',
      department: 'IT',
      status: 'Đang tuyển'
    },

    {
      id: 2,
      title: 'HR Staff',
      description: 'Tuyển dụng nhân sự',
      department: 'HR',
      status: 'Đã đóng'
    }

  ];

  newRecruitment = {
    title: '',
    description: '',
    department: '',
    status: 'Đang tuyển'
  };

  addRecruitment(){

    if(
      this.newRecruitment.title.trim() === '' ||
      this.newRecruitment.description.trim() === '' ||
      this.newRecruitment.department.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const newData = {

      id: this.recruitments.length + 1,

      ...this.newRecruitment

    };

    this.recruitments.push(newData);

    this.newRecruitment = {
      title: '',
      description: '',
      department: '',
      status: 'Đang tuyển'
    };

    this.showForm = false;

  }

  closeRecruitment(item: any){

    item.status = 'Đã đóng';

  }

  deleteRecruitment(id: number){

    this.recruitments = this.recruitments.filter(
      item => item.id !== id
    );

  }

}