import {Component, OnInit} from '@angular/core';
import {Maker} from '../../models/maker.model';
import {MakerService} from '../../services/maker.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {SkillService} from '../../services/skill.service';
import {Skill} from '../../models/skill.model';
import {UserService} from '../../services/user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';
import {NavbarComponent} from '../../navbar/navbar.component';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  makerID = 0;
  maker: Maker = new Maker(null, null, null, null, null, null, null, null, null, null);
  skills: Skill[] = [];

  editMakerForm: FormGroup;
  submittedMaker = false;
  editMaker: Maker = new Maker(null, null, null, null, null, null, null, null, null, null);

  editMode = false;

  constructor(
    private _makerService: MakerService,
    private _Activatedroute: ActivatedRoute,
    private _skillService: SkillService,
    private router: Router,
    private fb: FormBuilder,
    private _userService: UserService,
    private navbar:NavbarComponent
  ) {

    this._userService.getPermissions().subscribe(result => {
      if (result.indexOf('VIEW_MAKER-PROFIEL') == -1) {
        this.router.navigate(['/forbidden']);
      }

      this.makerID = parseInt(this._Activatedroute.snapshot.paramMap.get('id'));

      this._makerService.getMaker(this.makerID).subscribe(r => {
        this.VullMaker(r);

        this._skillService.getSkillsByMakerID(this.makerID).subscribe(re => {
          this.skills = re;
          console.log(this.skills);
        });


        this.editMaker = this.maker;
        this.editMakerForm = this.fb.group({
          inputVoornaam: new FormControl(this.editMaker.voornaam, [Validators.required]),
          inputNaam: new FormControl(this.editMaker.achternaam, [Validators.required]),
          inputGeboortedatum: new FormControl(this.editMaker.geboortedatum, [Validators.required]),
          inputBiografieMaker: new FormControl(this.editMaker.biografie, [Validators.required]),
          inputLinkenIn: new FormControl(this.editMaker.linkedIn),
          inputErvaring: new FormControl(this.editMaker.ervaring, [Validators.required]),

        });
      });
    });
  }

  private VullMaker(m: Maker) {
    this.maker.makerID = m.makerID;
    this.maker.userID = m.userID;
    this.maker.ervaring = m.ervaring;
    this.maker.linkedIn = m.linkedIn;
    this.maker.biografie = m.biografie;
    this.maker.geboortedatum = m.geboortedatum;
    this.maker.voornaam = m.voornaam;
    this.maker.achternaam = m.achternaam;
    this.maker.fotoMaker = m.fotoMaker;
  }

  ngOnInit() {

  }

  get f2M() {
    return this.editMakerForm.controls;
  }

  EditMaker() {
    this.editMode = true;
  }

  DeleteMaker(){
    this._userService.deleteUser(this.maker.userID).subscribe(re =>{
      this._makerService.deleteMaker(this.makerID).subscribe(r => {
        this.navbar.logUit();
      });
    });

  }

  Annuleer() {
    this.editMode = false;
  }

  onSubmit() {
    this.submittedMaker = true;

    if (this.editMakerForm.invalid) {
      return;
    }

    this.editMaker.makerID = this.makerID;
    this.editMaker.userID = this.maker.userID;
    this.editMaker.fotoMaker = null;

    this.editMaker.voornaam = this.editMakerForm.controls.inputVoornaam.value;
    this.editMaker.achternaam = this.editMakerForm.controls.inputNaam.value;
    this.editMaker.geboortedatum = this.editMakerForm.controls.inputGeboortedatum.value;
    this.editMaker.biografie = this.editMakerForm.controls.inputBiografieMaker.value;
    this.editMaker.linkedIn = this.editMakerForm.controls.inputLinkenIn.value;
    this.editMaker.ervaring = this.editMakerForm.controls.inputErvaring.value;

    console.log(this.editMaker);

    this._makerService.updateMaker(this.editMaker).subscribe(re => {
      console.log(re);

      this._makerService.getMaker(this.makerID).subscribe(r => {
        this.VullMaker(r);

        this.editMode = false;
      });
    });
  }
}
