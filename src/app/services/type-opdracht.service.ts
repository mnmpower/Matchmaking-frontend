import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TypeOpdracht } from '../models/type-opdracht.model';

@Injectable({
  providedIn: 'root'
})
export class TypeOpdrachtService {

  constructor(private http: HttpClient) { }

  getTypeOpdrachten(): Observable<TypeOpdracht[]> {
      return this.http.get<TypeOpdracht[]>("https://localhost:44316/api/typeOpdracht");
  }

  addTypeOpdracht(typeOpdracht: TypeOpdracht) {
      return this.http.post<TypeOpdracht>("https://localhost:44316/api/typeOpdracht", typeOpdracht);
  }

  updateTypeOpdracht(typeOpdracht: TypeOpdracht) {
      return this.http.put<TypeOpdracht>("https://localhost:44316/api/typeOpdracht/" + typeOpdracht.typeOpdrachtID, typeOpdracht);
  }

  deleteTypeOpdracht(typeOpdrachtID: number) {
      return this.http.delete<TypeOpdracht>("https://localhost:44316/api/typeOpdracht/" + typeOpdrachtID);
  }
}
