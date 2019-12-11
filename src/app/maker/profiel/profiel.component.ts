import {Component, OnInit} from '@angular/core';
import {Maker} from '../../models/maker.model';
import {MakerService} from '../../services/maker.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SkillService} from '../../services/skill.service';
import {Skill} from '../../models/skill.model';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  makerID = 0;
  maker: Maker = new Maker(null, null, null, null, null, null, null, null, null);
  skills: Skill[] = [];

  constructor(
    private _makerService: MakerService,
    private _Activatedroute: ActivatedRoute,
    private _skillService: SkillService,
    private router: Router,
    private _userService: UserService
  ) {

    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_PROFIEL') == -1) {
        this.router.navigate(['/forbidden']);
      }


      this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));
      this._makerService.getMaker(this.makerID).subscribe(r => {
        this.maker.makerID = r.makerID;
        this.maker.userID = r.userID;
        this.maker.ervaring = r.ervaring;
        this.maker.linkedIn = r.linkedIn;
        this.maker.biografie = r.biografie;
        this.maker.geboortedatum = r.geboortedatum;
        this.maker.voornaam = r.voornaam;
        this.maker.achternaam = r.achternaam;
        this.maker.fotoMaker = r.fotoMaker;

        this._skillService.getSkillsByMakerID(this.makerID).subscribe(re => {
          this.skills = re;
          console.log(this.skills);
        });
      });

    });
  }

  ngOnInit() {

  }
}
