import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MustMatch} from '../helpers/must-match.validator';
import {User} from '../models/user.model';
import {UserService} from '../services/user.service';

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
  typeBedrijf = true;
  inUse: boolean = false;
  mailadresOk = false;
  submitted = false;
  signUpForm: FormGroup;
  signUpFormDeel2: FormGroup;
  nieuweUser: User = new User(null, null, null, null,null);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _userService: UserService
  ) {
    this.naarStap(2);
    this.typeMaker = true;
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      inputEmailSignUp: ['', [Validators.required, Validators.email]],
      inputEmailConfirm: ['', Validators.required],
      inputPasswordSignUp: ['', [Validators.required, Validators.minLength(8)]],
      inputPasswordConfirm: ['', Validators.required],
      optradio: ['', Validators.required]
    }, {
      validator: [MustMatch('inputPasswordSignUp', 'inputPasswordConfirm'),
        MustMatch('inputEmailSignUp', 'inputEmailConfirm')]
    });

    this.signUpFormDeel2 = this.fb.group({
      inputBedrijfsnaam: ['', [Validators.required, Validators.email]],
      inputLocatie: ['', Validators.required]
    });
  }

  get f() {
    return this.signUpForm.controls;
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
    this.nieuweUser.userID = 0;
    this.nieuweUser.email = this.signUpForm.get(['inputEmailSignUp']).value;
    this.nieuweUser.paswoord = this.signUpForm.get(['inputPasswordSignUp']).value;

    console.log(this.nieuweUser);

    this.naarStap(2);

  }

  checkAvailableMail() {
    // AANPASSEN DAT HIJ VIA API KIJKE OF USERNAME VRIJ IS
    this._userService.bestaatMailadres(this.signUpForm.get(['inputEmailSignUp']).value).subscribe(
      r => {
        this.inUse = r.valueOf();

        if (this.inUse === false) {
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
}

