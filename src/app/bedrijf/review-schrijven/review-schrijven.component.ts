import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MakerService } from 'src/app/services/maker.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ReviewService } from 'src/app/services/review.service';
import { Review } from 'src/app/models/review.model';
import { Maker } from 'src/app/models/maker.model';

@Component({
  selector: 'app-review-schrijven',
  templateUrl: './review-schrijven.component.html',
  styleUrls: ['./review-schrijven.component.scss']
})
export class ReviewSchrijvenComponent implements OnInit {

  ReviewForm: FormGroup;
  makerID: number;
  bedrijfID: number;
  maker: Maker;
  opdrachtVerzoeken = [];
  review: Review;

  constructor(
    private _userService: UserService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private _makerService: MakerService,
    private _reviewService: ReviewService
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('ADD_REVIEW') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('makerID'));
    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('bedrijfID'));
    this.laadMaker();
  }

  ngOnInit() {
    this.ReviewForm = this.fb.group({
      text: ['', Validators.required]
    });
  }

  laadMaker() {
    this._makerService.getMaker(this.makerID).subscribe(r => {
      this.maker = r;
    });
  }

  onSubmit() {
    this.ReviewForm.addControl('makerID', new FormControl(this.makerID));
    this.ReviewForm.addControl('autheurID', new FormControl(this.bedrijfID));

    this._reviewService.addReviewMaker(this.ReviewForm.value).subscribe(result => {

      console.log('gemaakte opdracht: ', result);
      this.router.navigate(['/bedrijf/maker/', this.makerID]);

    });

  }

}
