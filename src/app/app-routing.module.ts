import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";

import {UserInfoComponent} from "./user-info/user-info.component";
import {FriendsComponent} from "./friends/friends.component";
import {LoginComponent} from "./login/login.component";
import {UserEditComponent} from "./user-edit/user-edit.component";
import {RegistrationComponent} from "./registration/registration.component";
import {NewsComponent} from "./news/news.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'users/edit', component: UserEditComponent},
  {path: 'friends/:userId', component: FriendsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'users/:userId', component: UserInfoComponent},
  {path: 'news', component: NewsComponent},
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
