import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeOpdracht } from '../models/type-opdracht.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOpdrachtService {

  constructor(private http: HttpClient) { }

  getTypeOpdrachten(): Observable<TypeOpdracht[]> {
      return this.http.get<TypeOpdracht[]>("https://localhost:44316/api/typeOpdracht", {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  addTypeOpdracht(typeOpdracht: TypeOpdracht) {
      return this.http.post<TypeOpdracht>("https://localhost:44316/api/typeOpdracht", typeOpdracht, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  updateTypeOpdracht(typeOpdracht: TypeOpdracht) {
      return this.http.put<TypeOpdracht>("https://localhost:44316/api/typeOpdracht/" + typeOpdracht.typeOpdrachtID, typeOpdracht, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  deleteTypeOpdracht(typeOpdrachtID: number) {
      return this.http.delete<TypeOpdracht>("https://localhost:44316/api/typeOpdracht/" + typeOpdrachtID, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }
}
