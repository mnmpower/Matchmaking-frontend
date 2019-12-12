import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill.model';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MakerService } from 'src/app/services/maker.service';
import { Maker } from 'src/app/models/maker.model';

@Component({
  selector: 'app-adminskillsbeheren',
  templateUrl: './adminskillsbeheren.component.html',
  styleUrls: ['./adminskillsbeheren.component.scss']
})
export class AdminskillsbeherenComponent implements OnInit {

  skill: Skill;
  skills: Skill[];
  makers: Maker[];
  popup: boolean = false;


  constructor(private _skillService: SkillService, private _userService: UserService, private router: Router, private _makerService: MakerService)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    // this._userService.getPermissions().subscribe(result =>{
    //   if(result.indexOf("CRUD_SKILLS") == -1) {
    //     this.router.navigate(['/forbidden']);
    //   }
    // });

    this.getSkills();
  }

  getMakers(){
    this._makerService.getMakers().subscribe(result => {
      this.makers = result;
    });
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
      this.getMakers();
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
