import {Component, OnInit} from '@angular/core';
import {User} from "../models/user";
import {UserService} from "../service/user.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit{
  user?: User

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private location: Location) {
  }

  ngOnInit() {
    if (!localStorage.getItem("currentId"))
      document.location.href = "/"
    this.getUser()
  }

  getUser(){
    let id = localStorage.getItem("currentId")
    if (id)
      this.userService.getUser(Number(id)).subscribe(user => this.user = user)
  }

  save() {
    if (this.user)
      this.userService.updateUser(this.user).subscribe()
  }

}
