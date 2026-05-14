import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './candidates.component.html',
  styleUrl: './candidates.component.css'
})
export class CandidatesComponent {

  showForm = false;

  candidates = [

    {
      id: 1,
      full_name: 'Nguyen Van A',
      email: 'a@gmail.com',
      phone: '0123456789',
      position: 'Frontend Developer',
      status: 'Đã ứng tuyển'
    },

    {
      id: 2,
      full_name: 'Tran Thi B',
      email: 'b@gmail.com',
      phone: '0912345678',
      position: 'HR Staff',
      status: 'Phỏng vấn'
    }

  ];

  newCandidate = {
    full_name: '',
    email: '',
    phone: '',
    position: '',
    status: 'Đã ứng tuyển'
  };

  addCandidate(){

    if(
      this.newCandidate.full_name.trim() === '' ||
      this.newCandidate.email.trim() === '' ||
      this.newCandidate.phone.trim() === '' ||
      this.newCandidate.position.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const newData = {

      id: this.candidates.length + 1,

      ...this.newCandidate

    };

    this.candidates.push(newData);

    this.newCandidate = {
      full_name: '',
      email: '',
      phone: '',
      position: '',
      status: 'Đã ứng tuyển'
    };

    this.showForm = false;

  }

  hireCandidate(item: any){

    item.status = 'Đã tuyển';

  }

  rejectCandidate(item: any){

    item.status = 'Từ chối';

  }

  
}