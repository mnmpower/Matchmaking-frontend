import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Review } from 'src/app/models/review.model';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  isEmpty: boolean = false;

  bedrijfID = 0;
  reviews: Review[];

  constructor(private _userService: UserService, private router: Router, private _reviewService: ReviewService, private _Activatedroute: ActivatedRoute)
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_BEDRIJF-REVIEWS") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

    this._reviewService.getReviewsOfBedrijf(this.bedrijfID).subscribe(result => {
      this.reviews = result;
      this.isEmpty = this.reviews.length == 0;
    });
  }

  ngOnInit() {
  }
  
  like(reviewID: number) {
    alert(reviewID);
  }

}
