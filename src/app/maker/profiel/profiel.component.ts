import {Component, OnInit} from '@angular/core';
import {User} from '../../models/user.model';
import {Maker} from '../../models/maker.model';
import {UserService} from '../../services/user.service';
import {MakerService} from '../../services/maker.service';

@Component({
  selector: 'app-profiel',
  templateUrl: './profiel.component.html',
  styleUrls: ['./profiel.component.scss']
})
export class ProfielComponent implements OnInit {

  nieuweMaker: Maker = new Maker(null, null, null, null, null, null, null, null, null);

  constructor(
    private _makerService: MakerService
  ) {
  }

  ngOnInit() {

  }

}
