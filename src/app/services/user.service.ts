import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // haal alle users op
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:44316/api/user', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // haal user op voor id
  getUser(id: number): Observable<User> {
    return this.http.get<User>('https://localhost:44316/api/user/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // voeg een nieuw user toe
  addUser(user: User) {
    return this.http.post<User>('https://localhost:44316/api/user', user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // wijzig user
  updateUser(user: User) {
    return this.http.put<User>('https://localhost:44316/api/user/' + user.userID, user, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // verwijder user
  deleteUser(id: number) {
    return this.http.delete<User>('https://localhost:44316/api/user/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // check voor bruikbaar Mailadress
  bestaatMailadres(mail: string) {
    return this.http.get<boolean>('https://localhost:44316/api/user/bestaatMail/' + mail);
  }
}
