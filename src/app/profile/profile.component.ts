import { Component, OnInit, Output, Input, Pipe, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { DataspaService } from '../common/dataspa.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  profileGroup: FormGroup;
  formStatus: string= null;
  @Input() profileRcvr: any;
  @Output() profileStatus: EventEmitter<string> = new EventEmitter<string>();


  constructor(private formBuilder: FormBuilder,
              private dataspaService: DataspaService) { }
  
  submit(){
    this.dataspaService.saveProfile(this.profileRcvr).subscribe(
      res => {
          this.profileRcvr = res.body;
          this.formStatus = "Profile Saved!";

      }
    );
  }

  showInput(){
    console.log(this.profileRcvr);
  }

  closeView(){
    this.profileStatus.emit("search");
  }

  ngOnInit() {

    this.profileGroup = this.formBuilder.group({
      first_name: this.formBuilder.control(null, Validators.required),
      country_name: this.formBuilder.control(null, Validators.required),
      language: this.formBuilder.control(null, Validators.required),
      last_name: this.formBuilder.control(null, Validators.required),
      profile_sub_title: this.formBuilder.control(null, Validators.required),
      profile_title: this.formBuilder.control(null, Validators.required),
      summary: this.formBuilder.control(null, Validators.required)
    });

  }

}
