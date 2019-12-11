import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Maker} from '../../models/maker.model';
import {UserService} from '../../services/user.service';
import {MakerService} from '../../services/maker.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  nieuweMaker: Maker = new Maker(null, null, null, null, null, null, null, null, null);

  constructor(private _makerService: MakerService, private _userService: UserService, private router: Router)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_PROFIEL") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  ngOnInit() {

  }

}
