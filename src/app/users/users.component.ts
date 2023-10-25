import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userForm:any
  users: any[] = []

  constructor(public fb:FormBuilder, private service:CommonService) {
    this.userForm = this.fb.group({
      Name:[""],
      Email:[""],
      Mobile:[""],
      Age:[""]
    })
  }

  ngOnInit(): void {
    this.GetAllUsers()
  }

  SubmitForm() {
    this.service.AddUpdateUser(this.userForm.value).subscribe(data => {
      alert('Adicionado com sucesso!')
      this.GetAllUsers()
    })
  }

  GetAllUsers() {
    this.service.GetAllUsers().subscribe(data => {
      this.users = data
    })
  }

  DeleteUserById(Id:any) {
    this.service.DeleteUserById(Id).subscribe(data => {
      alert('User deleted')
      this.GetAllUsers()
    })
  }

  GetUserById(Id:any) {
    this.service.GetUserById(Id).subscribe(data => {
      alert('Get user worked')
      console.log(data)
      this.userForm.patchValue({
        Name: data.Name,
        Email: data.Email,
        Mobile: data.Mobile,
        Age: data.Age
      })
    })
  }

  
}
