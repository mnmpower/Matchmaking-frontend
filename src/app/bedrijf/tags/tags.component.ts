import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  bedrijfID = 0;

  tagForm: FormGroup;
  submitted = false;

  tags: Tag[] = [];
  tag = new Tag(null, null);

  constructor(
    private _userService: UserService,
    private router: Router,
    private _Activatedroute: ActivatedRoute,
    private _tagService: TagService,
    private fb: FormBuilder
  )
  {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result =>{
      if(result.indexOf("VIEW_BEDRIJF-TAGS") == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

    this.LaadTags();

    this.tagForm = this.fb.group({
      inputTag: ['', Validators.required]
    });
  }

  LaadTags() {
    this._tagService.getTagsByBedrijfID(this.bedrijfID).subscribe(r => {
      this.tags = r;
    });
  }

  ngOnInit() {
  }

}
