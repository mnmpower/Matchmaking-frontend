import { Component, OnInit } from '@angular/core';
import { Bedrijf } from 'src/app/models/bedrijf.model';
import { Tag } from 'src/app/models/tag.model';
import { BedrijfService } from 'src/app/services/bedrijf.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bedrijf-profiel',
  templateUrl: './bedrijf-profiel.component.html',
  styleUrls: ['./bedrijf-profiel.component.scss']
})
export class BedrijfProfielComponent implements OnInit {

  bedrijfID = 0;
  bedrijf: Bedrijf = new Bedrijf(null, null, null, null, null, null, null, null);
  tags: Tag[] = [];

  constructor(
    private _bedrijfService: BedrijfService,
    private _Activatedroute: ActivatedRoute,
    private _tagService: TagService,
    private _userService: UserService,
    private router: Router
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_VREEMD-PROFIEL-ADMIN') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('bedrijfID'));

    this.laadBedrijf();
  }

  laadBedrijf() {
    this._bedrijfService.getBedrijf(this.bedrijfID).subscribe(r => {
      this.bedrijf = r;

      console.log(this.bedrijf)

      this._tagService.getTagsByBedrijfID(this.bedrijfID).subscribe(re => {
        this.tags = re;
        console.log(this.tags);
      });
    });
  }

  ngOnInit() {
  }

}
