import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  title = 'ZLANCE';
  auteur = 'DOT JS';

  constructor() { }

  ngOnInit() {
  }

}
