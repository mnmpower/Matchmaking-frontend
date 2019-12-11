import { Component, OnInit } from '@angular/core';
import { Tag } from 'src/app/models/tag.model';
import { TagService } from 'src/app/services/tag.service';

@Component({
  selector: 'app-admintagsbeheren',
  templateUrl: './admintagsbeheren.component.html',
  styleUrls: ['./admintagsbeheren.component.scss']
})
export class AdmintagsbeherenComponent implements OnInit {

  tag: Tag;
  tags: Tag[];
  popup: boolean = false;


  constructor(private _tagService: TagService)
  {
    this.gettags();
  }


  onSubmit(){
    if (this.tag.tagID === 0){
      console.log("post")
      this._tagService.addTag(this.tag).subscribe(result =>{
        this.popup = false;
        this.gettags();
      });
    } else {
      console.log("put", this.tag)
      this._tagService.addTag(this.tag).subscribe(result =>{
        this.popup = false;
        this.gettags();
      });
    }
 }


 gettags(){
    this._tagService.getTags().subscribe(result => {
      this.tags = result;
      console.log('result: ', result);
    });
  }

  closePopup(){
    this.popup = false;
  }

  deletetag(id: number){
    this._tagService.deleteTag(id).subscribe(result =>{
      this.gettags();
    });
   }

   updatetag(tag: Tag){
     this.tag = tag;
     console.log(this.tag);
     this.popup = true;
   }

  toevoegenPopup(){
    this.popup = true;
    this.tag = new Tag(0, '');
  }



  ngOnInit() {
  }

}
