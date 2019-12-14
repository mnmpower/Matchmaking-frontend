import {Component, OnInit} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OpdrachtService} from '../../services/opdracht.service';
import {OpdrachtVerzoekService} from '../../services/opdracht-verzoek.service';
import {Opdracht} from '../../models/opdracht.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  bedrijfID = 0;
  openOpdrachten: Opdracht[] = [];
  bewerkbareOpdrachten: Opdracht[] = [];
  selecteerOpdrachten: Opdracht[] = [];
  geslotenOpdrachten: Opdracht[] = [];

  draft = true;
  open = true;
  selectie = true;
  closed = true;

  constructor(
    private _userService: UserService,
    private _opdrachtService: OpdrachtService,
    private _Activatedroute: ActivatedRoute,
    private router: Router) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_BEDRIJF-DASHBOARD') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

    this.VulOpdrachten();
  }

  VulOpdrachten() {
    this.VulOpenOpdrachten();
    this.VulBewerkbareOpdrachten();
    this.VulSelecteerOpdrachten();
    this.VulGeslotenOpdrachten();
  }

  private VulOpenOpdrachten() {
    this._opdrachtService.getOpenOpdrachtenByBedrijfID(this.bedrijfID).subscribe(r => {
      this.openOpdrachten = r;
      console.log(r);
    });
  }

  private VulBewerkbareOpdrachten() {
    this._opdrachtService.getBewerkbareOpdrachtenByBedrijfID(this.bedrijfID).subscribe(r => {
      this.bewerkbareOpdrachten = r;
      console.log(r);
    });
  }

  private VulSelecteerOpdrachten() {
    this._opdrachtService.getSelecteerOpdrachtenByBedrijfID(this.bedrijfID).subscribe(r => {
      this.selecteerOpdrachten = r;
      console.log(r);
    });
  }

  private VulGeslotenOpdrachten() {
    this._opdrachtService.getGeslotenOpdrachtenByBedrijfID(this.bedrijfID).subscribe(r => {
      this.geslotenOpdrachten = r;
      console.log(r);
    });
  }

  ngOnInit() {
  }

  ToggleDraft() {
    this.draft = !this.draft;
  }

  ToggleOpen() {
    this.open = !this.open;
  }

  ToggleSelectie() {
    this.selectie = !this.selectie;
  }

  ToggleClosed() {
    this.closed = !this.closed;
  }

  PubliceerOpdracht(opdrachtID: number) {
    this._opdrachtService.getOpdracht(opdrachtID).subscribe(r => {
      r.statusID = 2;
      console.log('opdracht: ', r);
      this._opdrachtService.updateOpdracht(r).subscribe(re => {
          console.log('upgedate: ');
          this.VulBewerkbareOpdrachten();
          this.VulOpenOpdrachten();
        }
      );
    });
  }

  SelectieOpdracht(opdrachtID: number) {
    this._opdrachtService.getOpdracht(opdrachtID).subscribe(r => {
      r.statusID = 3;
      console.log('opdracht: ', r);
      this._opdrachtService.updateOpdracht(r).subscribe(re => {
          console.log('upgedate: ');
          this.VulOpenOpdrachten();
          this.VulSelecteerOpdrachten();
        }
      );
    });
  }

  SelecteerMakers(opdrachtID: number) {
    this.router.navigate(['/bedrijf/opdracht/selecteerlijst/', opdrachtID, this.bedrijfID]);

  }

  BewerkOpdracht(opdrachtID: number) {
    this.router.navigate(['/bedrijf/editopdracht/', opdrachtID, this.bedrijfID]);
  }
}
