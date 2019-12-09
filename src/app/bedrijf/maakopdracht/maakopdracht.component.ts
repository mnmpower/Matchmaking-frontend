import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-maakopdracht',
  templateUrl: './maakopdracht.component.html',
  styleUrls: ['./maakopdracht.component.scss']
})
export class MaakopdrachtComponent implements OnInit {

  CreateOpdrachtForm: FormGroup;
  submitted = false;
  inUse: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.CreateOpdrachtForm = this.fb.group({
      inputTitle: ['', Validators.required],
      inputOmschrijving: ['', Validators.required],
      inputLocatie: ['', Validators.required],
      inputAantalPersonen: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  onSubmit(){
    this.submitted = true;
  }


  get f() {
    return this.CreateOpdrachtForm.controls;
  }
}
