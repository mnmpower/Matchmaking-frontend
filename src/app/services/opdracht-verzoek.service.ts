import {Injectable} from '@angular/core';
import {OpdrachtVerzoek} from '../models/opdracht-verzoek.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OpdrachtVerzoekService {

  constructor(private http: HttpClient) {
  }

  //haal alle opdrachtverzoeken op
  getOpdrachtVerzoeken(): Observable<OpdrachtVerzoek[]> {
    return this.http.get<OpdrachtVerzoek[]>('https://localhost:44316/api/opdrachtVerzoek', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor id
  getOpdrachtVerzoek(id: number): Observable<OpdrachtVerzoek> {
    return this.http.get<OpdrachtVerzoek>('https://localhost:44316/api/opdrachtVerzoek/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor opdracht id
  getOpdrachtVerzoekOpdracht(opdrachtID: number): Observable<OpdrachtVerzoek> {
    return this.http.get<OpdrachtVerzoek>('https://localhost:44316/api/opdrachtVerzoek/Opdracht/' + opdrachtID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //voeg een nieuw opdrachtverzoek toe
  addOpdrachtVerzoek(opdrachtVerzoek: OpdrachtVerzoek) {
    return this.http.post<OpdrachtVerzoek>('https://localhost:44316/api/opdrachtVerzoek', opdrachtVerzoek, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //wijzig opdrachtverzoek
  updateOpdrachtVerzoek(opdrachtVerzoek: OpdrachtVerzoek) {
    return this.http.put<OpdrachtVerzoek>('https://localhost:44316/api/opdrachtVerzoek/' + opdrachtVerzoek.opdrachtVerzoekID, opdrachtVerzoek, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //verwijder opdrachtverzoek
  deleteOpdrachtVerzoek(id: number) {
    return this.http.delete<OpdrachtVerzoek>('https://localhost:44316/api/opdrachtVerzoek/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor maker id
  getOpdrachtVerzoekenByMakerID(id: number): Observable<OpdrachtVerzoek[]> {
    return this.http.get<OpdrachtVerzoek[]>('https://localhost:44316/api/opdrachtVerzoek/byMakerID/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor opdracht id
  getOpdrachtVerzoekenByOpdrachtIDAcepted(id: number): Observable<OpdrachtVerzoek[]> {
    return this.http.get<OpdrachtVerzoek[]>('https://localhost:44316/api/opdrachtVerzoek/byOpdachtIDA/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor opdracht id
  getOpdrachtVerzoekenByOpdrachtIDNotAccepted(id: number): Observable<OpdrachtVerzoek[]> {
    return this.http.get<OpdrachtVerzoek[]>('https://localhost:44316/api/opdrachtVerzoek/byOpdachtID/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  //haal opdrachtverzoek op voor maker id en opdrachtID
  getOpdrachtVerzoekenByMakerIDAndByOpdrachtID(makerid: number, opdrachtid: number): Observable<OpdrachtVerzoek> {
    return this.http.get<OpdrachtVerzoek>('https://localhost:44316/api/OpdrachtVerzoek/byOpdachtIDAndMakerID/'
      + makerid  + '?opdrachtid=' + opdrachtid, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
}
