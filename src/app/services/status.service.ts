import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status } from '../models/status.model';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  getStatussen(): Observable<Status[]> {
      return this.http.get<Status[]>("https://localhost:44316/api/status");
  }

  addStatus(status: Status) {
      return this.http.post<Status>("https://localhost:44316/api/status", status);
  }

  updateStatus(status: Status) {
      return this.http.put<Status>("https://localhost:44316/api/status/" + status.statusID, status);
  }

  deleteStatus(statusID: number) {
      return this.http.delete<Status>("https://localhost:44316/api/status/" + statusID);
  }
}
