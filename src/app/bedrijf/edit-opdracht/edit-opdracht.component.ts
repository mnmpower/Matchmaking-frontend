import {Component, OnInit} from '@angular/core';
import {OpdrachtService} from '../../services/opdracht.service';
import {MakerService} from '../../services/maker.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {BedrijfService} from '../../services/bedrijf.service';
import {Opdracht} from '../../models/opdracht.model';
import {OpdrachtVerzoek} from '../../models/opdracht-verzoek.model';
import {OpdrachtVerzoekService} from '../../services/opdracht-verzoek.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-edit-opdracht',
  templateUrl: './edit-opdracht.component.html',
  styleUrls: ['./edit-opdracht.component.scss']
})
export class EditOpdrachtComponent implements OnInit {

  bedrijfID = 0;
  opdrachtID = 0;
  popup: boolean = false;
  EditOpdrachtForm: FormGroup;
  competitie: boolean = false;
  submitted = false;
  editmode = false;
  een = true;
  twee = false;
  userID: number;

  opdracht: Opdracht;
  opdrachtVerzoek: OpdrachtVerzoek;

  Opdracht = new Opdracht(null, null, null, null, null, null, null, null, null, null, null);
  mapsUrl: string;

  constructor(
    private _opdrachtService: OpdrachtService,
    private _opdrachtVerzoekService: OpdrachtVerzoekService,
    private _bedrijfService: BedrijfService,
    private _makerService: MakerService,
    private _route: ActivatedRoute,
    public sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private _userService: UserService,
    private _Activatedroute: ActivatedRoute,
    private router: Router
  ) {

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));
    this.opdrachtID = parseInt(this._Activatedroute.snapshot.paramMap.get('opdrachtid'));

    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('EDIT_OPDRACHT') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.getOpdracht();
  }

  ngOnInit() {

    this.EditOpdrachtForm = this.fb.group({
      titel: [this.Opdracht.titel, Validators.required],
      omschrijving: [this.Opdracht.omschrijving, Validators.required],
      locatie: [this.Opdracht.locatie, Validators.required],
      aantalPersonen: [this.Opdracht.aantalPersonen, [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this._opdrachtVerzoekService.getOpdrachtVerzoekOpdracht(this.opdrachtID).subscribe(result => {
      console.log('Verzoek', result);
      this.opdrachtVerzoek = result;
    });

    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(result => {
      this.Opdracht = result;

      this.mapsUrl = 'https://maps.google.com/maps?q=' + encodeURIComponent(this.Opdracht.locatie) + '&output=embed';
      console.log(result);
    });
  }

  getOpdracht() {
    console.log(localStorage.getItem('token'));
    // tslint:disable-next-line: align
    this._opdrachtService.getOpdracht(this.opdrachtID).subscribe(result => {
      this.Opdracht = result;
      console.log(result);
      this.EditOpdrachtForm = this.fb.group({
        titel: [this.Opdracht.titel, Validators.required],
        omschrijving: [this.Opdracht.omschrijving, Validators.required],
        locatie: [this.Opdracht.locatie, Validators.required],
        aantalPersonen: [this.Opdracht.aantalPersonen, [Validators.required, Validators.min(0), Validators.max(100)]]
      });
      this.competitie = result.competitie;
      if (this.competitie) {
        this.een = false;
        this.twee = true;
      } else {

        this.een = true;
        this.twee = false;
      }

    });
  }

  setCompetitie() {

    this.competitie = !this.competitie;
    console.log('competitie: ', this.competitie);
  }


  get f() {
    return this.EditOpdrachtForm.controls;
  }

  toggleVerzoek() {
    if (this.opdrachtVerzoek) {
      this._opdrachtVerzoekService.deleteOpdrachtVerzoek(this.opdrachtVerzoek.opdrachtVerzoekID).subscribe(result => {
        this.opdrachtVerzoek = null;
      });
    } else {
      this._makerService.getMakerbyUserID(+localStorage.getItem('userID')).subscribe(maker => {
        let ov = new OpdrachtVerzoek(0, this.Opdracht.opdrachtID, this.Opdracht.bedrijfID, maker.makerID, false);
        this._opdrachtVerzoekService.addOpdrachtVerzoek(ov).subscribe(result => {
          this.opdrachtVerzoek = result;
        });
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.EditOpdrachtForm.invalid) {
      return;
    }
    this.EditOpdrachtForm.addControl('bedrijfID', new FormControl(this.bedrijfID));
    this.EditOpdrachtForm.addControl('opdrachtID', new FormControl(this.opdrachtID));
    this.EditOpdrachtForm.addControl('competitie', new FormControl(this.competitie));
    this.EditOpdrachtForm.addControl('statusID', new FormControl(1));
    console.log('gemaakte opdracht form: ', this.EditOpdrachtForm.value);
    this._opdrachtService.updateOpdracht(this.EditOpdrachtForm.value).subscribe(result => {

      console.log('upgedate opdracht opdracht: ', result);
      this.getOpdracht();
      this.editmode = false;

    });

  }

  EditBedrijf() {
    this.editmode = true;
  }

  closePopup(){
    this.popup = false;
  }


  DeleteOpdrachtPopup(){
    this.popup = true;
  }

  DeleteOpdracht() {
    this._opdrachtService.deleteOpdracht(this.opdrachtID).subscribe(r => {
      this.router.navigate(['/bedrijf/dashboard/', this.bedrijfID]);
    });
    this.popup = false;
  }
}
