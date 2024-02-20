import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private friendsUrl = "https://localhost:3200/friends";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getAllFriends(userId: number): Observable<User[]> {
    const url = `${this.friendsUrl}/${userId}`;
    console.log(url);
    return this.http.get<User[]>(url);
  }

  addFriend(userId: number, friendName: string): Observable<any> {
    const url = `${this.friendsUrl}/${userId}/${friendName}`;
    return this.http.post(url, null, this.httpOptions);
  }

  deleteFriend(userId: number, friendId: number): Observable<User> {
    console.log("DELETE /friends/:userId/:friendId");
    const url = `${this.friendsUrl}/${userId}/${friendId}`;
    return this.http.delete<User>(url);
  }
}
