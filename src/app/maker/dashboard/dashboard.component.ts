import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Opdracht} from '../../models/opdracht.model';
import {OpdrachtService} from '../../services/opdracht.service';
import {OpdrachtVerzoek} from '../../models/opdracht-verzoek.model';
import {OpdrachtVerzoekService} from '../../services/opdracht-verzoek.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  makerID = 0;
  opdrachtverzoeken: OpdrachtVerzoek[] = [];
  alleOpdrachten: Opdracht[] = [];
  aanvaardeOpdrachten: Opdracht[] = [];
  opgegevenOpdrachten: Opdracht[] = [];
  mogelijkeOpdrachten: Opdracht[] = [];

  constructor(
    private _userService: UserService,
    private _opdrachtService: OpdrachtService,
    private _opdrachtVerzoekService: OpdrachtVerzoekService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_MAKER-DASHBOARD') == -1) {
        this.router.navigate(['/forbidden']);
      }

      this.getMogelijkeOpdrachten();
    });


    this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));


    this._opdrachtVerzoekService.getOpdrachtVerzoekenByMakerID(this.makerID).subscribe(result => {
      this.opdrachtverzoeken = result;
      console.log(this.opdrachtverzoeken);

      for (let i = 0; i < this.opdrachtverzoeken.length; i++) {

        this._opdrachtService.getOpdracht(this.opdrachtverzoeken[i].opdrachtID).subscribe(r => {
          this.alleOpdrachten.push(r);
          if (this.opdrachtverzoeken[i].bevestiging === true) {
            this.aanvaardeOpdrachten.push(r);
          } else {
            this.opgegevenOpdrachten.push(r);
          }
        });
      }
    });
  }

  getMogelijkeOpdrachten(){
    this._opdrachtService.getOpdrachtVoorstellen().subscribe(result => {
      this.mogelijkeOpdrachten = result;
    });
  }



  ngOnInit() {
  }

}
