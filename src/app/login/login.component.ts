import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthenticateService } from '../services/authenticate.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
  });


  constructor(private fb: FormBuilder, private router: Router, private _authenticatieService: AuthenticateService) { }

  submitted: boolean = false;

  onSubmitLogin() {
    this.submitted = true;
    this._authenticatieService.authenticate(this.loginForm.value).subscribe(result => {
      localStorage.setItem('token', result.token);
 //     this._authenticatieService.isLoggedin.next(result.token ? true : false);
      this.router.navigate(['']);
    });
  }


  ngOnInit() {
    this.loginForm = this.fb.group({
      inputEmail: ['', Validators.required],
      inputPassword: ['', Validators.required]
    });
  }

}
