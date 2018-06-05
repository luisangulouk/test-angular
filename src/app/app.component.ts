import { Component, Output, Input, EventEmitter } from '@angular/core';
import { DataspaService } from './common/dataspa.service';
import { Observable } from 'rxjs/Observable';
import './rxjs.operators';
import { Pipe, PipeTransform } from '@angular/core';  
import { Profile } from './profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'app';
  public results:Array<any>;
  public queryString=[];
  public keyword:string='';
  public view='search';
  @Output() profileDispatcher = new EventEmitter<string>();
  public selectedProfile:any;

  filterargs = {profile_title: ''};
  profiles: Array<any>;
  pages = {xtotalcount : 0, maxItemsPerPage : 10, link:''}
  
  constructor(private dataspaService: DataspaService) {}
  
  LoadBlock(url:string):void{
    let apiquery = url;
    if(apiquery==''){
        if(this.keyword!=''){
          apiquery = "_page=1&q=" + this.keyword;
        }else{
          apiquery = "_page=1";  
        }
        this.queryString.forEach(elem => {
          apiquery += elem; 
        });
    }

    this.dataspaService.getProfilesByBlock(apiquery).subscribe(
      res => {
          this.profiles = res.body;
        this.pages.link = res.header.get("link");
        this.results = this.dataspaService.getBlocks(this.pages.link);
      }
    );
  }

  filterBy(e,type:number):void {
    if(e.target.checked){
      this.queryString[type] = "&" + e.target.value + "=false";
    }else{
      this.queryString.splice(type,1);
    }
  }

  loadProfileSelected(selectedProfile):void{
    this.selectedProfile = selectedProfile;
    this.profileDispatcher.emit(this.selectedProfile);
    this.view='edit';
  }

  profileStatus(e){
    this.view=e;
  }

  ngOnInit(){
    this.LoadBlock('');
  }

}
