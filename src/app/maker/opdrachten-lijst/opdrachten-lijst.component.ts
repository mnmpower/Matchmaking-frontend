import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-opdrachten-lijst',
  templateUrl: './opdrachten-lijst.component.html',
  styleUrls: ['./opdrachten-lijst.component.scss']
})
export class OpdrachtenLijstComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doSomething($event)
  {
    console.log("list");
  }

}
