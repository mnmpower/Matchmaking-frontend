import { Component, OnInit } from '@angular/core';
import { OpdrachtService } from 'src/app/services/opdracht.service';
import { Opdracht } from 'src/app/models/opdracht.model';

@Component({
  selector: 'app-opdrachten-lijst',
  templateUrl: './opdrachten-lijst.component.html',
  styleUrls: ['./opdrachten-lijst.component.scss']
})
export class OpdrachtenLijstComponent implements OnInit {

  isLoading: boolean = false;
  isEmpty: boolean = false;

  opdrachten: Opdracht[];

  constructor(private _opdrachtService: OpdrachtService) { }

  ngOnInit() {
  }

  doFilter(filter)
  {
    this.isLoading = true;

    this._opdrachtService.getOpdrachtenFilter(filter).subscribe(result => {
      this.opdrachten = result;
      this.isLoading = false;
      this.isEmpty = this.opdrachten.length == 0;
    });
  }
}
