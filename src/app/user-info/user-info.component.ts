import { Component, OnInit } from '@angular/core';
import { User } from "../models/user";
import { UserService } from "../service/user.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  user?: User;
  currentId?: number;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  async ngOnInit() {
    if (!localStorage.getItem("currentId")) {
      window.location.href = "/";
    } else {
      await this.getUser();
      console.log('ngOnInit: currentId', this.currentId);
    }
  }

  getCurrentId() {
    const storedId = localStorage.getItem('currentId');
    console.log('getCurrentId()', storedId, this.currentId);
    this.currentId = storedId ? Number(storedId) : undefined;
  }

  async getUser() {
    const id = this.route.snapshot.paramMap.get('userId');
    this.getCurrentId();
    if (id) {
      try {
        this.user = await this.userService.getUser(Number(id)).toPromise();
      } catch (error) {
        console.error('Error fetching user', error);
      }
    }
  }

  async delete() {
    this.getCurrentId();
    console.log("delete()", this.currentId);
    if (this.currentId) {
      try {
        await this.userService.deleteUser(this.currentId).toPromise();
        localStorage.removeItem("currentId");
        window.location.href = "/";
      } catch (error) {
        console.error('Error deleting user', error);
      }
    }
  }

}
