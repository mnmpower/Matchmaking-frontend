import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from '../services/opdracht.service';
import { MakerService } from '../services/maker.service';

@Component({
  selector: 'app-welkom',
  templateUrl: './welkom.component.html',
  styleUrls: ['./welkom.component.scss']
})
export class WelkomComponent implements OnInit {

  title = 'DOT JS';
  auteur = 'DOT JS';
  aantalFreelancers = 0;
  aantalOpdrachten = 0;

  constructor(private _opdrachtService: OpdrachtService, private _makerService: MakerService) { }

  ngOnInit() {
    this._opdrachtService.getAantalOpdrachten().subscribe(result => {
      this.aantalOpdrachten = result;
    });

    this._makerService.getAantalMakers().subscribe(result => {
      this.aantalFreelancers = result;
    });
  }

}
