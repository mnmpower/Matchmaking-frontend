import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welkom',
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.scss']
})
export class WelkomComponent implements OnInit {

  title = 'ZLANCE';
  auteur = 'DOT JS';
  aantalFreelancers = 102;
  aantalOpdrachten = 26;

  constructor() { }

  ngOnInit() {
  }

}
