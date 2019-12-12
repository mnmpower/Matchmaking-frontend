import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  // haal alle users op
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('https://localhost:44316/api/user');
  }

  // haal user op voor id
  getUser(id: number): Observable<User> {
    return this.http.get<User>('https://localhost:44316/api/user/' + id);
  }

  // voeg een nieuw user toe
  addUser(user: User) {
    return this.http.post<User>('https://localhost:44316/api/user', user);
  }

  // wijzig user
  updateUser(user: User) {
    return this.http.put<User>('https://localhost:44316/api/user/' + user.userID, user);
  }

  // verwijder user
  deleteUser(id: number) {
    return this.http.delete<User>('https://localhost:44316/api/user/' + id);
  }

  // check voor bruikbaar Mailadress
  bestaatMailadres(mail: string) {
    return this.http.get<boolean>('https://localhost:44316/api/user/bestaatMail/' + mail);
  }

  // haal permissions op
  getPermissions(): Observable<String[]> {
    return this.http.get<String[]>('https://localhost:44316/api/user/permissions');
  }

  // haal makerID/bedrijfID/adminID van current user op
  getIdOfCurrentUser(): Observable<number> {
    return this.http.get<number>('https://localhost:44316/api/user/idcurrentuser');
  }

}
