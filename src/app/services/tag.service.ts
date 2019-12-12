import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Tag} from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) {
  }

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>('https://localhost:44316/api/tag', {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  getTagsByBedrijfID(id: number): Observable<Tag[]> {
    return this.http.get<Tag[]>('https://localhost:44316/api/tag/bybedrijf/' + id, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  addTag(tag: Tag) {
    return this.http.post<Tag>('https://localhost:44316/api/tag', tag, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  updateTag(tag: Tag) {
    return this.http.put<Tag>('https://localhost:44316/api/tag/' + tag.tagID, tag, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }

  deleteTag(tagID: number) {
    return this.http.delete<Tag>('https://localhost:44316/api/tag/' + tagID, {
      headers: new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'))
    });
  }
}
