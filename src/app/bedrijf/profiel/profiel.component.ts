import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Bedrijf} from '../../models/bedrijf.model';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {NavbarComponent} from '../../navbar/navbar.component';
import {BedrijfService} from '../../services/bedrijf.service';
import {TagService} from '../../services/tag.service';
import {Tag} from '../../models/tag.model';
import {Maker} from '../../models/maker.model';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  bedrijfID = 0;
  bedrijf: Bedrijf = new Bedrijf(null, null, null, null, null, null);
  tags: Tag[] = [];

  editBedrijfForm: FormGroup;
  submitted = false;
  editBedrijf: Bedrijf = new Bedrijf(null, null, null, null, null, null);

  editMode = false;

  constructor(
    private _bedrijfService: BedrijfService,
    private _Activatedroute: ActivatedRoute,
    private _tagService: TagService,
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private navbar: NavbarComponent
  ) {
    // Controleer of gebruiker permissie heeft om deze pagina te bekijken
    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_BEDRIJF-PROFIEL') == -1) {
        this.router.navigate(['/forbidden']);
      }
    });

    this.bedrijfID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

    this._bedrijfService.getBedrijf(this.bedrijfID).subscribe(r => {
      this.VullBedrijf(r);

      this._tagService.getTagsByBedrijfID(this.bedrijfID).subscribe(re => {
        this.tags = re;
        console.log(this.tags);
      });


      this.editBedrijf = this.bedrijf;
      this.editBedrijfForm = this.fb.group({
        inputBedrijfsnaam: new FormControl(this.editBedrijf.bedrijfsnaam, [Validators.required]),
        inputLocatie: new FormControl(this.editBedrijf.locatie, [Validators.required]),
        inputBiografieBedrijf: new FormControl(this.editBedrijf.biografie, [Validators.required]),
      });
    });
  }

  private VullBedrijf(b: Bedrijf) {
    this.bedrijf.userID = b.userID;
    this.bedrijf.bedrijfID = b.bedrijfID;
    this.bedrijf.locatie = b.locatie;
    this.bedrijf.bedrijfsnaam = b.bedrijfsnaam;
    this.bedrijf.biografie = b.biografie;
    this.bedrijf.fotoBedrijf = b.fotoBedrijf;
  }


  ngOnInit() {
  }

  get f2M() {
    return this.editBedrijfForm.controls;
  }

  EditBedrijf() {
    this.editMode = true;
  }

  DeleteBedrijf() {
      this._bedrijfService.deleteBedrijf(this.bedrijfID).subscribe(r => {
        this.navbar.logUit();
      });
  }

  Annuleer() {
    this.editMode = false;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editBedrijfForm.invalid) {
      return;
    }

    this.editBedrijf.bedrijfID = this.bedrijfID;
    this.editBedrijf.userID = this.bedrijf.userID;
    this.editBedrijf.fotoBedrijf = null;

    this.editBedrijf.bedrijfsnaam = this.editBedrijfForm.controls.inputBedrijfsnaam.value;
    this.editBedrijf.locatie = this.editBedrijfForm.controls.inputLocatie.value;
    this.editBedrijf.biografie = this.editBedrijfForm.controls.inputBiografieBedrijf.value;

    console.log(this.editBedrijf);

    this._bedrijfService.updateBedrijf(this.editBedrijf).subscribe(re => {
      console.log(re);

      this._bedrijfService.getBedrijf(this.bedrijfID).subscribe(r => {
        this.VullBedrijf(r);

        this.editMode = false;
      });
    });
  }

}

