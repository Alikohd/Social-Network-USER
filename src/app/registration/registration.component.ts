import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  user: User = new User();

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.createUser();
  }

  createUser() {
    this.user.name = "Oliver";
    this.user.email = "oleevych@mail.ru";
    this.user.password = "admin";
  }

  save() {
    if (this.user) {
      this.user.friends = [];
      this.user.role = "USER";
      this.user.status = "ACTIVE";

      this.userService.addUser(this.user).subscribe(() => {
        window.location.href = "/login";
      });
    }
  }

}
