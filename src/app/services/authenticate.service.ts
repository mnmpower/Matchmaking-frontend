import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {Observable, BehaviorSubject} from 'rxjs';
import {UserLogin} from '../models/user-login.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {


  isLoggedin = new BehaviorSubject(localStorage.getItem('token') ? true : false);

  constructor(private _httpClient: HttpClient, private _userService: UserService) {
  }

  authenticate(userLogin: UserLogin): Observable<User> {
    return this._httpClient.post<User>('https://localhost:44316/api/User/authenticate', userLogin);
  }

  isLogged() {
    return this._userService.getIdOfCurrentUser();
  }

}
