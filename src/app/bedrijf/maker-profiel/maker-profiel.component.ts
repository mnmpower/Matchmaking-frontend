import { Component, OnInit } from '@angular/core';
import { Maker } from 'src/app/models/maker.model';
import { Skill } from 'src/app/models/skill.model';
import { MakerService } from 'src/app/services/maker.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SkillService } from 'src/app/services/skill.service';
import { UserService } from 'src/app/services/user.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-maker-profiel',
  templateUrl: './maker-profiel.component.html',
  styleUrls: ['./maker-profiel.component.scss']
})
export class MakerProfielComponent implements OnInit {

  makerID = 0;
  maker: Maker = new Maker(null, null, null, null, null, null, null, null, null, null);
  skills: Skill[] = [];

  constructor(
    private _makerService: MakerService,
    private _Activatedroute: ActivatedRoute,
    private _skillService: SkillService,
    private _userService: UserService,
    private _reviewService: ReviewService,
    private router: Router
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_VREEMD-PROFIEL') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('makerID'));

    this.laadMaker();
  }

  ngOnInit() {
  }

  laadMaker() {
    this._makerService.getMaker(this.makerID).subscribe(r => {
      this.maker = r;
      
      this.maker.reviews.forEach(element => {
        this._reviewService.getReviewLike(element.reviewID).subscribe(rl => {
            console.log("ReviewLike: ", rl);
            if(rl != null) {
              element.magLiken = false;
            } else {
              element.magLiken = true;
            }
        });
      });

      console.log(this.maker)

      this._skillService.getSkillsByMakerID(this.makerID).subscribe(re => {
        this.skills = re;
        console.log(this.skills);
      });
    });
  }

  like(reviewID: number) {
    this._reviewService.addReviewLike(reviewID).subscribe(rl => {
      console.log("Review geliket");
      this.laadMaker();
    });
  }

}
