import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
      return this.http.get<Skill[]>("https://localhost:44316/api/skill", {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  addSkill(skill: Skill) {
      return this.http.post<Skill>("https://localhost:44316/api/skill", skill, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  updateSkill(skill: Skill) {
      return this.http.put<Skill>("https://localhost:44316/api/skill/" + skill.skillID, skill, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }

  deleteSkill(skillID: number) {
      return this.http.delete<Skill>("https://localhost:44316/api/skill/" + skillID, {
        headers: new HttpHeaders().set("Authorization", "Bearer " + localStorage.getItem("token"))
      });
  }
}
