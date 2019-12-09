import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  private submitted: boolean;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      inputEmail: ['', Validators.required],
      inputPassword: ['', Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
  }
}
