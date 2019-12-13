import { Component, OnInit } from '@angular/core';
import { Maker } from 'src/app/models/maker.model';
import { Skill } from 'src/app/models/skill.model';
import { MakerService } from 'src/app/services/maker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {

  makerID = 0;
  maker: Maker = new Maker(null, null, null, null, null, null, null, null, null, null);
  skills: Skill[] = [];

  constructor(
    private _makerService: MakerService,
    private _Activatedroute: ActivatedRoute,
    private _skillService: SkillService,
    private _userService: UserService,
    private router: Router
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_VREEMD-PROFIEL-ADMIN') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('makerID'));

    this.laadMaker();
  }

  ngOnInit() {
  }

  laadMaker() {
    this._makerService.getMaker(this.makerID).subscribe(r => {
      this.maker = r;

      console.log(this.maker)

      this._skillService.getSkillsByMakerID(this.makerID).subscribe(re => {
        this.skills = re;
        console.log(this.skills);
      });
    });
  }

}
