import { Component, OnInit, SecurityContext } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Opdracht } from 'src/app/models/opdracht.model';
import { DomSanitizer } from '@angular/platform-browser';
import { OpdrachtVerzoekService } from 'src/app/services/opdracht-verzoek.service';
import { OpdrachtVerzoek } from 'src/app/models/opdracht-verzoek.model';
import { MakerService } from 'src/app/services/maker.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-opdracht',
  templateUrl: './opdracht.component.html',
  styleUrls: ['./opdracht.component.scss']
})
export class OpdrachtComponent implements OnInit {

  opdrachtID: number;
  opdracht: Opdracht;
  opdrachtVerzoek: OpdrachtVerzoek;
  mapsUrl: string;

  constructor(
    private _opdrachtService: OpdrachtService,
    private _opdrachtVerzoekService: OpdrachtVerzoekService,
    private _makerService: MakerService,
    private _route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private _userService: UserService,
    private router: Router
  ){
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_OPDRACHTEN") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });
  }

  ngOnInit() {
    this.opdrachtID = Number(this._route.snapshot.paramMap.get("opdrachtID"));

    this._opdrachtVerzoekService.getOpdrachtVerzoekOpdracht(this.opdrachtID).subscribe(result => {
      console.log('Verzoek', result);
      this.opdrachtVerzoek = result;
    });

    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(result => {
      this.opdracht = result;

      this.mapsUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(this.opdracht.locatie) + '&output=embed';
      console.log(result);
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
}
