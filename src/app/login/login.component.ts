import { Component, OnInit } from '@angular/core';
import { UserService } from "../service/user.service";
import { User } from "../models/user";
import { Location } from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentId?: number;
  userName: string = "";
  password: string = "";
  user?: User;

  constructor(private userService: UserService, private location: Location) {}

  ngOnInit() {
    const storedId = localStorage.getItem("currentId");

    if (storedId) {
      this.currentId = Number(storedId);
      document.location.href = '/users/' + this.currentId
    } else {
      this.userName = "Джонни Сильверхенд";
      this.password = "admin";
    }
  }

  login() {
    if (this.userName) {
      this.userService.getUserByName(this.userName).subscribe(user => {
        this.user = user;

        if (this.user && this.user.password === this.password) {
          this.currentId = this.user.id;
          // @ts-ignore
          localStorage.setItem("currentId", this.currentId.toString());
          document.location.href = '/users/' + this.currentId
        }
      });
    }
  }

}
