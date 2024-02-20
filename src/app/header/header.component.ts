import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { UserService } from "../service/user.service";
import { User } from "../models/user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentId?: number;
  currentUser?: User;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.getCurrentId();
    this.getCurrentUser();
  }

  logout() {
    localStorage.removeItem("currentId");
    this.getCurrentId();
    document.location.href = "/login";
  }

  getCurrentUser() {
    if (this.currentId) {
      this.userService.getUser(this.currentId).subscribe(user => this.currentUser = user);
    }
  }

  isAdmin(): boolean {
    return this.currentUser?.role === "ADMIN";
  }

  goToAdmin() {
    if (this.isAdmin()) {
      location.href = "http://localhost:63342/web3/dist/html/users_list_page.html";
    }
  }

  getMyPage() {
    this.getCurrentId();
    document.location.href = `/users/${this.currentId}`;
  }

  getCurrentId() {
    const str = localStorage.getItem("currentId");
    this.currentId = str ? Number(str) : undefined;
    return this.currentId;
  }

  back() {
    this.location.back();
  }
}
