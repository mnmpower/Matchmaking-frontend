import { Injectable } from '@angular/core';
import { BedrijfTag } from '../models/bedrijf-tag.model'
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BedrijfTagService {

  constructor(private http: HttpClient) { }

  //haal alle bedrijfTags op
  getBedrijfTags(): Observable<BedrijfTag[]> {
    return this.http.get<BedrijfTag[]>("https://localhost:44316/api/bedrijfTag", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //haal bedrijfTag op voor id
  getBedrijfTag(id: number): Observable<BedrijfTag> {
    return this.http.get<BedrijfTag>("https://localhost:44316/api/bedrijfTag/" + id, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //voeg een nieuw bedrijfTag toe
  addBedrijfTag(bedrijfTag: BedrijfTag) {
    return this.http.post<BedrijfTag>("https://localhost:44316/api/bedrijfTag", bedrijfTag, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //wijzig bedrijfTag
  updateBedrijfTag(bedrijfTag: BedrijfTag) {
    return this.http.put<BedrijfTag>("https://localhost:44316/api/bedrijfTag/" + bedrijfTag.bedrijfTagID, bedrijfTag, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

  //verwijder bedrijfTag
  deleteBedrijfTag(id: number) {
    return this.http.delete<BedrijfTag>("https://localhost:44316/api/bedrijfTag/" + id, {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

}
