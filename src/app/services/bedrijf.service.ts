import {Injectable} from '@angular/core';
import {Bedrijf} from '../models/bedrijf.model';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Admin} from '../models/admin.model';

@Injectable({
  providedIn: 'root'
})
export class BedrijfService {

  constructor(private http: HttpClient) {
  }

  // haal alle bedrijven op
  getBedrijven(): Observable<Bedrijf[]> {
    return this.http.get<Bedrijf[]>('https://localhost:44316/api/bedrijf', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  getBedrijfID(): Observable<number> {
    return this.http.get<number>('https://localhost:44316/api/bedrijf/getbedrijfID', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // haal bedrijf op voor id
  getBedrijf(id: number): Observable<Bedrijf> {
    return this.http.get<Bedrijf>('https://localhost:44316/api/Bedrijf/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // voeg een nieuw bedrijf toe
  addBedrijf(bedrijf: Bedrijf) {
    return this.http.post<Bedrijf>('https://localhost:44316/api/bedrijf', bedrijf, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // wijzig bedrijf
  updateBedrijf(bedrijf: Bedrijf) {
    return this.http.put<Bedrijf>('https://localhost:44316/api/bedrijf/' + bedrijf.bedrijfID, bedrijf, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  // verwijder bedrijf
  deleteBedrijf(id: number) {
    return this.http.delete<Bedrijf>('https://localhost:44316/api/bedrijf/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }


  getBedrijfByUserID(id: number): Observable<Bedrijf> {
    return this.http.get<Bedrijf>('https://localhost:44316/api/bedrijf/byUserID/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

}
