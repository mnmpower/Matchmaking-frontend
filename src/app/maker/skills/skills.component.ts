import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Skill} from '../../models/skill.model';
import {SkillService} from '../../services/skill.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tags',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  makerID = 0;

  skillForm: FormGroup;
  submitted = false;

  skills: Skill[] = [];
  skill = new Skill(null, null, null, 0);


  constructor(
    private _userService: UserService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private _skillService: SkillService,
    private fb: FormBuilder
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_MAKER-TAGS') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

    this.LaadSkills();

    this.skillForm = this.fb.group({
      inputSkill: ['', Validators.required]
    });


  }

  get f() {
    return this.skillForm.controls;
  }

  LaadSkills() {
    this._skillService.getSkillsByMakerID(this.makerID).subscribe(r => {
      this.skills = r;
    });
  }

  ngOnInit() {
  }

  RemoveSkill(skill: Skill) {
    this._skillService.deleteSkill(skill.skillID).subscribe(r => {
      this.LaadSkills();
    });
  }

  AddSkill() {
    this.submitted = true;

    if (this.skillForm.invalid){
      return;
    }
    var skillnaam = this.Capitalize(this.skillForm.controls.inputSkill.value);

    this.skill.skillID = 0;
    this.skill.makerID = this.makerID;
    this.skill.naam = skillnaam;
    this.skill.aantalLikes = 0;

    this._skillService.addSkill(this.skill).subscribe(r => {
      this.skill = new Skill(null, null, null, 0);
      this.submitted = false;

      this.skillForm = this.fb.group({
        inputSkill: ['', Validators.required]
      });

      this.LaadSkills();
    });


  }

  Capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

}
