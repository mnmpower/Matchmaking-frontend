import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { OpdrachtenFilter } from './opdrachten-filter.model';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  bedrijven: Bedrijf[];

  filterForm: FormGroup;

  @Output() filterOutput = new EventEmitter<OpdrachtenFilter>();

  constructor(private _bedrijfService: BedrijfService, private _fb: FormBuilder) {

    this.filterForm = this._fb.group({
      zoekterm: ['', { updateOn: 'submit' }],
      maxAfstand: 10,
      minPersonen: 0,
      maxPersonen: 100,
      competitie: 'all',
      bedrijven: this._fb.array([])
    });

    this.filterForm.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    ).subscribe(val => {
      let filter = new OpdrachtenFilter();
      filter = Object.assign(filter, val);

      filter.bedrijven = [];

      this.bedrijven.forEach(function (b, i) {
        if (val.bedrijven[i])
          filter.bedrijven.push(b.bedrijfID);
      });

      //console.log(filter);
      this.filterOutput.emit(filter);
    });

    _bedrijfService.getBedrijven().subscribe(result => {
      this.bedrijven = result;

      const formArray = this.filterForm.get('bedrijven') as FormArray;

      this.bedrijven.forEach(b => {
        formArray.push(this._fb.control(false));
      });
    });
  }

  ngOnInit() {
  }

  onSubmit() {
  }
}
