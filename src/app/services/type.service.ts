import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../models/type.model';



@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
      return this.http.get<Type[]>("https://localhost:44316/api/type", {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  addType(type: Type) {
      return this.http.post<Type>("https://localhost:44316/api/type", type, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  updateType(type: Type) {
      return this.http.put<Type>("https://localhost:44316/api/type/" + type.typeID, type, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  deleteType(typeID: number) {
      return this.http.delete<Type>("https://localhost:44316/api/type/" + typeID, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }
}
