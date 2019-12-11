import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-adminskillsbeheren',
  templateUrl: './adminskillsbeheren.component.html',
  styleUrls: ['./adminskillsbeheren.component.scss']
})
export class AdminskillsbeherenComponent implements OnInit {

  skill: Skill;
  skills: Skill[];
  popup: boolean = false;


  constructor(private _skillService: SkillService)
  {
    this.getSkills();
  }


  onSubmit(){
    if (this.skill.skillID === 0){
      console.log("post")
      this._skillService.addSkill(this.skill).subscribe(result =>{
        this.popup = false;
        this.getSkills();
      });
    } else {
      console.log("put", this.skill)
      this._skillService.updateSkill(this.skill).subscribe(result =>{
        this.popup = false;
        this.getSkills();
      });
    }
 }


 getSkills(){
    this._skillService.getSkills().subscribe(result => {
      this.skills = result;
      console.log('result: ', result);
    });
  }

  closePopup(){
    this.popup = false;
  }

  deleteSkill(id: number){
    this._skillService.deleteSkill(id).subscribe(result =>{
      this.getSkills();
    });
   }

   updateSkill(skill: Skill){
     this.skill = skill;
     console.log(this.skill);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.skill = new Skill(0, '', 0, 0);
  }



  ngOnInit() {
  }

}