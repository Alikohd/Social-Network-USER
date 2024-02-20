import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { SocketIoService } from "../service/socket-io.service";
import { News } from "../models/news";
import { User } from "../models/user";
import { UserService } from "../service/user.service";
import { NewsService } from "../service/news.service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, OnDestroy {
  user?: User;
  newNews?: News;
  news: News[] = [];
  isMyNews: boolean = false;
  subs: Subscription[] = [];
  evs: number[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private socketService: SocketIoService,
    private newsService: NewsService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    if (!localStorage.getItem("currentId")) {
      document.location.href = "/";
    }
    // this.setIsMyNews();
    this.setNewNews();
    this.getNews();
  }

  setNewNews() {
    this.newNews = new News();
    this.newNews.title = "Title";
    this.newNews.text = "A lot of text";
  }

  setIsMyNews() {
    this.isMyNews = this.route.snapshot.url.toString().includes("my_news");
  }

  getNews() {
    const currentId = localStorage.getItem('currentId');
    console.log('currentId:', currentId);
    if (!currentId) {
      return;
    }

    const userId = Number(currentId);

    this.userService.getUser(userId).subscribe(user => {
      this.user = user;
      console.log('this.user:', this.user);
      if (!this.user) {
        return;
      }

      this.subs.push(this.newsService.getNews(userId).subscribe(news => {
        this.news = [];
        this.evs = [userId];
        if (this.user?.friends) {
          for (const friendId of this.user.friends) {
            this.evs.push(friendId);
          }
        }

        console.log("this.evs:", this.evs);

        for (const ev of this.evs) {
          this.socketService.listen_to_server(ev.toString()).subscribe(data => {
            console.log("ev:", ev, ", newNews:", data.newNews);
            this.news?.push(data.newNews);
          });

          this.newsService.getNews(ev).subscribe(friendNews => {
            this.news?.push(...friendNews);
          });
        }
      }));
    });
  }

  deleteNews(userId?: number, newsId?: number) {
    if (userId && newsId) {
      this.newsService.deleteNews(userId, newsId).subscribe(() => {
        document.location.href = "/news/";
      });
    }
  }

  addNews() {
    const userId = Number(localStorage.getItem('currentId'));
    if (this.user && this.user.id && this.newNews) {
      this.newNews.userId = this.user.id;
      this.newNews.userName = this.user.name;
      this.socketService.emit_to_server(this.user.id.toString(), { newNews: this.newNews });
    }
    this.newNews = new News();
    this.newNews.title = "Title";
    this.newNews.text = "A lot of text";
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

}
