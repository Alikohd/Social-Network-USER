import { Component, OnInit } from '@angular/core';
import { FriendService } from "../service/friend.service";
import { User } from "../models/user";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  friends: User[] = [];
  userId?: number;
  friendName: string = "Афанасий";

  constructor(private friendService: FriendService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.initializeUserId();
    this.getFriends();
  }

  initializeUserId() {
    const routeUserId = this.route.snapshot.paramMap.get('userId');
    this.userId = routeUserId ? Number(routeUserId) : Number(localStorage.getItem("currentId"));

    if (!this.userId) {
      document.location.href = "/";
    }
  }

  addFriend() {
    if (this.userId && this.friendName) {
      this.friendService.addFriend(this.userId, this.friendName).subscribe(() => {
        this.redirectToFriendsPage();
      });
    }
  }

  getFriends() {
    if (this.userId) {
      this.friendService.getAllFriends(this.userId).subscribe(friends => {
        this.friends = friends;
      });
    }
  }

  delete(friendId?: number) {
    if (this.userId && friendId) {
      this.friendService.deleteFriend(this.userId, friendId).subscribe(() => {
        this.redirectToFriendsPage();
      });
    }
  }

  private redirectToFriendsPage() {
    document.location.href = "/friends/" + this.userId;
  }
}
