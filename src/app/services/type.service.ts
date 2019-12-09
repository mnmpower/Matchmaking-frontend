import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Type } from '../models/type.model';



@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http: HttpClient) { }

  getTypes(): Observable<Type[]> {
      return this.http.get<Type[]>("https://localhost:44316/api/type");
  }

  addType(type: Type) {
      return this.http.post<Type>("https://localhost:44316/api/type", type);
  }

  updateType(type: Type) {
      return this.http.put<Type>("https://localhost:44316/api/type/" + type.typeID, type);
  }

  deleteType(typeID: number) {
      return this.http.delete<Type>("https://localhost:44316/api/type/" + typeID);
  }
}
