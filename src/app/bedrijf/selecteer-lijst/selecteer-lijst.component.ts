import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {OpdrachtService} from '../../services/opdracht.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Opdracht} from '../../models/opdracht.model';
import {OpdrachtVerzoek} from '../../models/opdracht-verzoek.model';
import {OpdrachtVerzoekService} from '../../services/opdracht-verzoek.service';
import {MakerService} from '../../services/maker.service';
import {DomSanitizer} from '@angular/platform-browser';
import {Maker} from '../../models/maker.model';

@Component({
  selector: 'app-selecteer-lijst',
  templateUrl: './selecteer-lijst.component.html',
  styleUrls: ['./selecteer-lijst.component.scss']
})
export class SelecteerLijstComponent implements OnInit {

  bedrijfID = 0;
  opdrachtID = 0;
  aantal = 0;
  maxaantal: number;

  opdracht: Opdracht;
  opdrachtVerzoek: OpdrachtVerzoek;
  opdrachtVerzoekenA: OpdrachtVerzoek[] = [];
  opdrachtVerzoeken: OpdrachtVerzoek[] = [];
  mapsUrl: string;

  competitie = false;
  maxAantalBerijkt = false;

  makers: Maker[] = [];
  geaccepteerdeMakers: Maker[] = [];

  constructor(
    private _opdrachtService: OpdrachtService,
    private _opdrachtVerzoekService: OpdrachtVerzoekService,
    private _makerService: MakerService,
    private _route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private _userService: UserService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {

    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('EDIT_OPDRACHT') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));
    this.opdrachtID = parseInt(this._Activatedroute.snapshot.paramMap.get('opdrachtid'));
    this.GetOpdrachtverzoeken();


  }

  ngOnInit() {
    this._opdrachtVerzoekService.getOpdrachtVerzoekOpdracht(this.opdrachtID).subscribe(result => {
      console.log('Verzoek', result);
      this.opdrachtVerzoek = result;
    });

    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(result => {
      this.opdracht = result;
      this.competitie = result.competitie;
      this.maxaantal = this.opdracht.aantalPersonen;
      this.mapsUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(this.opdracht.locatie) + '&output=embed';
      console.log('Opdracht', result);
    });

    this.TelAantal();

  }

  GetOpdrachtverzoeken() {
    this.opdrachtVerzoeken = [];
    this.geaccepteerdeMakers = [];
    this.makers = [];

    this._opdrachtVerzoekService.getOpdrachtVerzoekenByOpdrachtIDAcepted(this.opdrachtID).subscribe(r => {
      this.opdrachtVerzoekenA = r;
      console.log('OpdrachtVerzoekenA', r);
      for (var opdrachtverzoek of this.opdrachtVerzoekenA) {
        this._makerService.getMaker(opdrachtverzoek.makerID).subscribe(r => {
          this.geaccepteerdeMakers.push(r);
          this.TelAantal();
        });
      }
    });

    this._opdrachtVerzoekService.getOpdrachtVerzoekenByOpdrachtIDNotAccepted(this.opdrachtID).subscribe(r => {
      this.opdrachtVerzoeken = r;
      console.log('OpdrachtVerzoeken', r);
      for (var opdrachtverzoek of this.opdrachtVerzoeken) {
        this._makerService.getMaker(opdrachtverzoek.makerID).subscribe(r => {
          this.makers.push(r);
        });
      }
    });
  }

  toggleVerzoek() {
    if (this.opdrachtVerzoek) {
      this._opdrachtVerzoekService.deleteOpdrachtVerzoek(this.opdrachtVerzoek.opdrachtVerzoekID).subscribe(result => {
        this.opdrachtVerzoek = null;
      });
    } else {
      this._makerService.getMakerbyUserID(+localStorage.getItem('userID')).subscribe(maker => {
        let ov = new OpdrachtVerzoek(0, this.opdracht.opdrachtID, this.opdracht.bedrijfID, maker.makerID, false);
        this._opdrachtVerzoekService.addOpdrachtVerzoek(ov).subscribe(result => {
          this.opdrachtVerzoek = result;
        });
      });
    }
  }

  TelAantal() {
    this.aantal = this.geaccepteerdeMakers.length;
    console.log(this.aantal);
    console.log(this.maxaantal);

    if (this.aantal == this.maxaantal) {
      this.maxAantalBerijkt = true;
    } else {
      this.maxAantalBerijkt = false;
    }
  }

  AccepteerOpdrachtVerzoek(makerID: number) {

    console.log('ACCEPTmakerID', makerID);
    this._opdrachtVerzoekService.getOpdrachtVerzoekenByMakerIDAndByOpdrachtID(makerID, this.opdrachtID).subscribe(r => {
      r.bevestiging = true;
      console.log('r', r);
      this._opdrachtVerzoekService.updateOpdrachtVerzoek(r).subscribe(re => {
        this.aantal++;
        this.GetOpdrachtverzoeken();
        this.TelAantal();
      });
    });

  }

  DeleteOpdrachtVerzoek(makerID: number) {

    console.log('DELETEmakerID', makerID);
    this._opdrachtVerzoekService.getOpdrachtVerzoekenByMakerIDAndByOpdrachtID(makerID, this.opdrachtID).subscribe(r => {
      r.bevestiging = false;
      console.log('r', r);
      this._opdrachtVerzoekService.updateOpdrachtVerzoek(r).subscribe(re => {
        this.aantal--;
        this.GetOpdrachtverzoeken();
        this.TelAantal();
      });
    });

  }

  SluitOpdracht() {
    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(r => {
      r.statusID = 4;
      console.log('opdracht: ', r);
      this._opdrachtService.updateOpdracht(r).subscribe(re => {
          console.log('upgedate: ');
          this.router.navigate(['/bedrijf/dashboard/' + this.bedrijfID]);
        }
      );
    });
  }

  OpenOpdracht() {
    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(r => {
      r.statusID = 2;
      console.log('opdracht: ', r);
      this._opdrachtService.updateOpdracht(r).subscribe(re => {
          console.log('upgedate: ');
        this.router.navigate(['/bedrijf/dashboard/' + this.bedrijfID]);
        }
      );
    });
  }
}
