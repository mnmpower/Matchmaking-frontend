import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from '../helpers/must-match.validator';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';
import {MakerService} from '../services/maker.service';
import {Bedrijf} from '../models/bedrijf.model';
import {Maker} from '../models/maker.model';
import {BedrijfService} from '../services/bedrijf.service';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.scss']
})
export class RegistreerComponent implements OnInit {
  stap1 = true;
  stap2 = false;
  stap3 = false;

  typeMaker = false;
  typeBedrijf = false;
  inUseEmail = false;
  mailadresOk = false;

  submitted = false;
  submittedMaker = false;
  submittedBedrijf = false;

  signUpForm: FormGroup;
  signUpFormDeel2Bedrijf: FormGroup;
  signUpFormDeel2Maker: FormGroup;

  nieuweUser: User = new User(null, null, null, null, null);
  nieuwBedrijf: Bedrijf = new Bedrijf(null, null, null, null, null, null, null, null);
  nieuweMaker: Maker = new Maker(null, null, null, null, null, null, null, null, null, null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService,
    private _makerService: MakerService,
    private _bedrijfService: BedrijfService
  ) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      inputEmailSignUp: ['', [Validators.required, Validators.email]],
      inputEmailConfirm: ['', [Validators.required, Validators.email]],
      inputPasswordSignUp: ['', [Validators.required, Validators.minLength(8)]],
      inputPasswordConfirm: ['', Validators.required]
    }, {
      validator: [MustMatch('inputPasswordSignUp', 'inputPasswordConfirm'),
        MustMatch('inputEmailSignUp', 'inputEmailConfirm')]
    });

    this.signUpFormDeel2Bedrijf = this.fb.group({
      inputBedrijfsnaam: ['', Validators.required],
      inputLocatie: ['', Validators.required],
      inputBiografie: ['', Validators.required]
    });

    this.signUpFormDeel2Maker = this.fb.group({
      inputVoornaam: ['', Validators.required],
      inputNaam: ['', Validators.required],
      inputGeboortedatum: ['', Validators.required],
      inputBiografieMaker: ['', Validators.required],
      inputLinkenIn: [''],
      inputErvaring: ['', Validators.required],
    });
  }

  get f() {
    return this.signUpForm.controls;
  }

  get f2B() {
    return this.signUpFormDeel2Bedrijf.controls;
  }

  get f2M() {
    return this.signUpFormDeel2Maker.controls;
  }

  naarStap(stapnr: number) {
    switch (stapnr) {
      case 1:
        this.stap2 = false;
        this.stap3 = false;
        this.stap1 = true;
        break;
      case 2:
        this.stap1 = false;
        this.stap3 = false;
        this.stap2 = true;
        break;
      case 3:
        this.stap1 = false;
        this.stap2 = false;
        this.stap3 = true;
        break;
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.signUpForm.invalid) {
      return;
    }
    if (!(this.typeMaker || this.typeBedrijf)) {
      return;
    }
    this.nieuweUser.userID = 0;
    this.nieuweUser.email = this.signUpForm.get(['inputEmailSignUp']).value;
    this.nieuweUser.paswoord = this.signUpForm.get(['inputPasswordSignUp']).value;


    this.naarStap(2);

  }

  checkAvailableMail() {
    this._userService.bestaatMailadres(this.signUpForm.get(['inputEmailSignUp']).value).subscribe(
      r => {
        this.inUseEmail = r.valueOf();

        if (this.inUseEmail === false) {
          this.signUpForm.controls.inputEmailSignUp.setErrors(null);
          this.mailadresOk = true;
        } else {
          this.mailadresOk = false;
          this.signUpForm.controls.inputEmailSignUp.setErrors({inUse: true});
        }
      });
  }


  setTypeMaker() {
    this.typeMaker = true;
    this.typeBedrijf = false;
  }

  setTypeBedrijf() {
    this.typeMaker = false;
    this.typeBedrijf = true;
  }

  ToonMaker() {
    this.submittedMaker = true;

    if (this.signUpFormDeel2Maker.invalid) {
      return;
    }

    this.nieuweMaker.makerID = 0;
    this.nieuweMaker.voornaam = this.signUpFormDeel2Maker.get(['inputVoornaam']).value;
    this.nieuweMaker.achternaam = this.signUpFormDeel2Maker.get(['inputNaam']).value;
    this.nieuweMaker.geboortedatum = this.signUpFormDeel2Maker.get(['inputGeboortedatum']).value;
    this.nieuweMaker.biografie = this.signUpFormDeel2Maker.get(['inputBiografieMaker']).value;
    this.nieuweMaker.linkedIn = this.signUpFormDeel2Maker.get(['inputLinkenIn']).value;
    this.nieuweMaker.ervaring = this.signUpFormDeel2Maker.get(['inputErvaring']).value;


    this.naarStap(3);
  }

  toonBedrijf() {
    this.submittedBedrijf = true;

    if (this.signUpFormDeel2Bedrijf.invalid) {
      return;
    }

    this.nieuwBedrijf.bedrijfID = 0;
    this.nieuwBedrijf.bedrijfsnaam = this.signUpFormDeel2Bedrijf.get(['inputBedrijfsnaam']).value;
    this.nieuwBedrijf.locatie = this.signUpFormDeel2Bedrijf.get(['inputLocatie']).value;
    this.nieuwBedrijf.biografie = this.signUpFormDeel2Bedrijf.get(['inputBiografie']).value;

    this.naarStap(3);
  }

  maakMaker() {
    this.nieuweUser.functie = 'Maker';

    console.log(this.nieuweUser);
    this._userService.addUser(this.nieuweUser).subscribe(r => {
      console.log(r);
      this.nieuweMaker.userID = r.userID;
      console.log(this.nieuweMaker);
      this._makerService.addMaker(this.nieuweMaker).subscribe(re => {
        console.log(re);
        this.router.navigate(['login'], {replaceUrl: true});
      });

    });
  }

  maakBedrijf() {
    this.nieuweUser.functie = 'Bedrijf';
    console.log(this.nieuweUser);
    this._userService.addUser(this.nieuweUser).subscribe(r => {
      console.log(r);
      this.nieuwBedrijf.userID = r.userID;
      console.log(this.nieuwBedrijf);
      this._bedrijfService.addBedrijf(this.nieuwBedrijf).subscribe(re => {
        console.log(re);
        this.router.navigate(['login'], {replaceUrl: true});
      });

    });
  }


}

