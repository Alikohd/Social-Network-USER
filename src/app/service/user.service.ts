import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = "https://localhost:3200/users";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {}

  getUser(userId: number): Observable<User> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
  }

  getUserByName(userName: string): Observable<User> {
    const url = `${this.usersUrl}/name/${userName}`;
    return this.http.get<User>(url)
      .pipe(catchError(this.handleError));
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.usersUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.patch<User>(url, user, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  deleteUser(userId: number): Observable<any> {
    const url = `${this.usersUrl}/${userId}`;
    return this.http.delete(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<any> {
    console.error('An error occurred:', error);
    throw error;
  }
}
