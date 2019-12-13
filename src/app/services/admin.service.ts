import {Injectable} from '@angular/core';
import {Admin} from '../models/admin.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Maker} from '../models/maker.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  //haal alle admins op
  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>('https://localhost:44316/api/admin', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal admin op voor id
  getAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>('https://localhost:44316/api/admin/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //voeg een nieuw admin toe
  addAdmin(admin: Admin) {
    return this.http.post<Admin>('https://localhost:44316/api/admin', admin, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //wijzig admin
  updateAdmin(admin: Admin) {
    return this.http.put<Admin>('https://localhost:44316/api/admin/' + admin.adminID, admin, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //verwijder admin
  deleteAdmin(id: number) {
    return this.http.delete<Admin>('https://localhost:44316/api/admin/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  getAdminByUserID(id: number): Observable<Admin> {
    return this.http.get<Admin>('https://localhost:44316/api/admin/byUserID/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

}
