import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';
import { BedrijfTag } from 'src/app/models/bedrijf-tag.model';

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
  bedrijfTag = new BedrijfTag(null, null, null);

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

  get f() {
    return this.tagForm.controls;
  }

  LaadTags() {
    this._tagService.getTagsByBedrijfID(this.bedrijfID).subscribe(r => {
      this.tags = r;
    });
  }

  ngOnInit() {
  }

  RemoveTag(tag: Tag) {
    this._tagService.deleteBedrijfTag(this.bedrijfID, tag.tagID).subscribe(r => {
      this.LaadTags();
    });
  }

  AddTag() {
    this.submitted = true;

    if (this.tagForm.invalid){
      return;
    }

    var tagnaam = this.Capitalize(this.tagForm.controls.inputTag.value);
    this._tagService.getTagIDFromName(tagnaam).subscribe(r => {
      if(r == 0) {
        //tag bestaat nog niet
        this.tag.tagID = 0;
        this.tag.naam = tagnaam;

        //TODO: insert
      } else {
        this.bedrijfTag.bedrijfID = this.bedrijfID;
        this.bedrijfTag.tagID = r;

        //TODO: insert
      }
    });
  }

  Capitalize = (s) => {
    if (typeof s !== 'string') return '';
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
  }

}
