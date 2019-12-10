import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() someOutput = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  refine(b: boolean) {
    this.someOutput.emit(b);
  }
}
