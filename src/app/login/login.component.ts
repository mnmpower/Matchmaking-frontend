import {Component, OnInit} from '@angular/core';

import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticateService} from '../services/authenticate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MakerService} from '../services/maker.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  makerID = 0;

  loginForm = this.fb.group({
    Email: ['', Validators.required],
    Paswoord: ['', Validators.required]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _makerService: MakerService,
    private _authenticatieService: AuthenticateService
  ) {

  }

  submitted: boolean = false;

  onSubmitLogin() {
    this.submitted = true;
    console.log(this.loginForm.value);
    this._authenticatieService.authenticate(this.loginForm.value).subscribe(result => {
      localStorage.setItem('token', result.token);
      localStorage.setItem('functie', result.functie);

      this._makerService.getMakerbyUserID(result.userID).subscribe(r => {
        this.makerID = r.makerID;


        this._authenticatieService.isLoggedin.next(result.token ? true : false);

        switch (result.functie) {
          case 'Maker':
            this.router.navigate(['maker/dashboard/' + this.makerID], {replaceUrl: true});
            break;
          case 'Admin':
            this.router.navigate(['admin/overzicht'], {replaceUrl: true});
            break;
          case 'Bedrijf':
            this.router.navigate(['bedrijf/dashboard'], {replaceUrl: true});
            break;
        }
      });
    });
  }


  ngOnInit() {

  }

}
