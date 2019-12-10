import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { OpdrachtenFilter } from './opdrachten-filter.model';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  bedrijven: Bedrijf[];

  filterForm: FormGroup;

  position: any;

  @Output() filterOutput = new EventEmitter<OpdrachtenFilter>();

  constructor(
    private _bedrijfService: BedrijfService,
    private _fb: FormBuilder,
    private _locationService: LocationService) {

    this._locationService.getPosition().then(pos => {
      this.position = pos;
    });

    this.filterForm = this._fb.group({
      zoekterm: ['', { updateOn: 'submit' }],
      maxAfstand: 150,
      minPersonen: 0,
      maxPersonen: 100,
      competitie: 'all',
      bedrijven: this._fb.array([])
    });

    this.filterForm.valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
      )
      .subscribe(val => {
        let filter = new OpdrachtenFilter();
        filter = Object.assign(filter, val);

        filter.longitude = this.position.lng;
        filter.latitude = this.position.lat;

        filter.bedrijven = [];

        this.bedrijven.forEach(function (b, i) {
          if (val.bedrijven[i])
            filter.bedrijven.push(b.bedrijfID);
        });

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
