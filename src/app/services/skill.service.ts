import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  constructor(private http: HttpClient) { }

  getSkills(): Observable<Skill[]> {
      return this.http.get<Skill[]>("https://localhost:44316/api/skill");
  }

  addSkill(skill: Skill) {
      return this.http.post<Skill>("https://localhost:44316/api/skill", skill);
  }

  updateSkill(skill: Skill) {
      return this.http.put<Skill>("https://localhost:44316/api/skill/" + skill.skillID, skill);
  }

  deleteSkill(skillID: number) {
      return this.http.delete<Skill>("https://localhost:44316/api/skill/" + skillID);
  }
}
