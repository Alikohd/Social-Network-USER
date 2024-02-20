import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { News } from "../models/news";

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private newsUrl = "https://localhost:3200/news";
  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {}

  getNews(userId: number): Observable<News[]> {
    const url = `${this.newsUrl}/${userId}`;
    console.log('url', url);
    return this.http.get<News[]>(url);
  }

  deleteNews(userId: number, newsId: number): Observable<any> {
    const url = `${this.newsUrl}/${userId}/${newsId}`;
    return this.http.delete(url);
  }
}
