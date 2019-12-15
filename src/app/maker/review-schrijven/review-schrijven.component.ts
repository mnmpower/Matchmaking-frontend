import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { Bedrijf } from 'src/app/models/bedrijf.model';

@Component({
  selector: 'app-review-schrijven',
  templateUrl: './review-schrijven.component.html',
  styleUrls: ['./review-schrijven.component.scss']
})
export class ReviewSchrijvenComponent implements OnInit {

  ReviewForm: FormGroup;
  makerID: number;
  bedrijfID: number;
  bedrijf: Bedrijf;
  review: Review;

  constructor(
    private _userService: UserService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _bedrijfService: BedrijfService,
    private _reviewService: ReviewService
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('ADD_BEDRIJF-REVIEW') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this._userService.getIdOfCurrentUser().subscribe(r => {
      this.makerID = r.valueOf();
    });
    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('bedrijfID'));
    this.laadBedrijf();
  }

  ngOnInit() {
    this.ReviewForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  laadBedrijf() {
    this._bedrijfService.getBedrijf(this.bedrijfID).subscribe(r => {
      this.bedrijf = r;
    });
  }

  onSubmit() {
    this.ReviewForm.addControl('bedrijfID', new FormControl(this.bedrijfID));
    this.ReviewForm.addControl('autheurID', new FormControl(this.makerID));

    this._reviewService.addReviewBedrijf(this.ReviewForm.value).subscribe(result => {

      console.log('gemaakte opdracht: ', result);
      this.router.navigate(['/maker/bedrijf/', this.bedrijfID]);

    });

  }

}
