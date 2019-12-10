import {Injectable} from '@angular/core';
import {Maker} from '../models/maker.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MakerService {

  constructor(private http: HttpClient) {
  }

  //haal alle makers op
  getMakers(): Observable<Maker[]> {
    return this.http.get<Maker[]>('https://localhost:44316/api/maker', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal maker op voor id
  getMaker(id: number): Observable<Maker> {
    return this.http.get<Maker>('https://localhost:44316/api/maker/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //voeg een nieuw maker toe
  addMaker(maker: Maker) {
    return this.http.post<Maker>('https://localhost:44316/api/maker', maker, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //wijzig maker
  updateMaker(maker: Maker) {
    return this.http.put<Maker>('https://localhost:44316/api/maker/' + maker.makerID, maker, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //verwijder maker
  deleteMaker(id: number) {
    return this.http.delete<Maker>('https://localhost:44316/api/maker/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal aantal makers op
  getAantalMakers(): Observable<number> {
    return this.http.get<number>("https://localhost:44316/api/maker/count", {
      headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
    });
  }

}
