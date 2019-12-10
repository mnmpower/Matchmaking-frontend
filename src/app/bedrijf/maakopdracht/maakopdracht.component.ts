import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router} from '@angular/router';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { BedrijfService } from 'src/app/services/bedrijf.service';

@Component({
  selector: 'app-maakopdracht',
  templateUrl: './maakopdracht.component.html',
  styleUrls: ['./maakopdracht.component.scss']
})
export class MaakopdrachtComponent implements OnInit {

  CreateOpdrachtForm: FormGroup;
  submitted = false;
  inUse: boolean = false;
  userID: number;
  bedrijfID: number;
  competitie: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private _opdrachtService: OpdrachtService,
    private _bedrijfService: BedrijfService
  ) { this.getBedrijf(); }

  ngOnInit() {
    this.CreateOpdrachtForm = this.fb.group({
      titel: ['', Validators.required],
      omschrijving: ['', Validators.required],
      locatie: ['', Validators.required],
      aantalPersonen: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(){
    this.submitted = true;
    this.CreateOpdrachtForm.addControl('bedrijfID', new FormControl(this.bedrijfID));
    this.CreateOpdrachtForm.addControl('competitie', new FormControl(this.competitie));
    console.log('gemaakte opdracht form: ', this.CreateOpdrachtForm.value);
    this._opdrachtService.addOpdracht(this.CreateOpdrachtForm.value).subscribe(result => {
       console.log('gemaakte opdracht: ', result);
    });

  }

  getBedrijf(){
    console.log(localStorage.getItem('token'));
      // tslint:disable-next-line: align
      this._bedrijfService.getBedrijfID().subscribe(result => {
        this.bedrijfID = result;
        console.log(result);

      });
  }

  setCompetitie() {

    this.competitie = !this.competitie;
    console.log('competitie: ',  this.competitie);
  }


  get f() {
    return this.CreateOpdrachtForm.controls;
  }
}
