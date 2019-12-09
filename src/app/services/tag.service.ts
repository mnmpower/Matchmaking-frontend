import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private http: HttpClient) { }

  getTags(): Observable<Tag[]> {
      return this.http.get<Tag[]>("https://localhost:44316/api/tag");
  }

  addTag(tag: Tag) {
      return this.http.post<Tag>("https://localhost:44316/api/tag", tag);
  }

  updateTag(tag: Tag) {
      return this.http.put<Tag>("https://localhost:44316/api/tag/" + tag.tagID, tag);
  }

  deleteTag(tagID: number) {
      return this.http.delete<Tag>("https://localhost:44316/api/tag/" + tagID);
  }
}
