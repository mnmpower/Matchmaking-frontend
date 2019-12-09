import { Injectable } from '@angular/core';
import { Opdracht } from '../models/opdracht.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpdrachtService {

  constructor(private http: HttpClient) { }

  //haal alle opdrachten op
  getOpdrachten(): Observable<Opdracht[]> {
    return this.http.get<Opdracht[]>("https://localhost:44316/api/opdracht", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //haal opdracht op voor id
  getOpdracht(id: number): Observable<Opdracht> {
    return this.http.get<Opdracht>("https://localhost:44316/api/opdracht/" + id, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //voeg een nieuwe opdracht toe
  addOpdracht(opdracht: Opdracht) {
    return this.http.post<Opdracht>("https://localhost:44316/api/opdracht", opdracht, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //wijzig opdracht
  updateOpdracht(opdracht: Opdracht) {
    return this.http.put<Opdracht>("https://localhost:44316/api/opdracht/" + opdracht.opdrachtID, opdracht, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //verwijder opdracht
  deleteOpdracht(id: number) {
    return this.http.delete<Opdracht>("https://localhost:44316/api/opdracht/" + id, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }
}