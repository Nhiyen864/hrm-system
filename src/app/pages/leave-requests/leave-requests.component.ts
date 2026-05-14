import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-requests',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave-requests.component.html',
  styleUrl: './leave-requests.component.css'
})
export class LeaveRequestsComponent {

  showForm = false;

  leaveRequests = [

    {
      id: 1,
      employee: 'Nguyen Van A',
      startDate: '2025-07-01',
      endDate: '2025-07-03',
      reason: 'Du lịch',
      status: 'Chờ duyệt'
    },

    {
      id: 2,
      employee: 'Tran Thi B',
      startDate: '2025-07-05',
      endDate: '2025-07-06',
      reason: 'Bệnh',
      status: 'Đã duyệt'
    }

  ];

  newLeave = {
    employee: '',
    startDate: '',
    endDate: '',
    reason: '',
    status: 'Chờ duyệt'
  };

  addLeave(){

    if(
      this.newLeave.employee.trim() === '' ||
      this.newLeave.startDate === '' ||
      this.newLeave.endDate === '' ||
      this.newLeave.reason.trim() === ''
    ){

      alert('Vui lòng nhập đầy đủ thông tin');

      return;

    }

    const newData = {

      id: this.leaveRequests.length + 1,

      ...this.newLeave

    };

    this.leaveRequests.push(newData);

    this.newLeave = {
      employee: '',
      startDate: '',
      endDate: '',
      reason: '',
      status: 'Chờ duyệt'
    };

    this.showForm = false;

  }

  approveLeave(item: any){

    item.status = 'Đã duyệt';

  }

  rejectLeave(item: any){

    item.status = 'Từ chối';

  }

}