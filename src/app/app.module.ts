import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { DataspaService } from './common/dataspa.service';
import { profilePipe } from './common/profile.pipe';
import { ProfileComponent } from './profile/profile.component'; 

const globalOptions = {
  apiEndPoint: 'http://localhost:3000'
};

@NgModule({
  declarations: [
    AppComponent, profilePipe, ProfileComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule, ReactiveFormsModule
  ],
  providers: [DataspaService, { provide: 'global_options', useValue: globalOptions }],
  bootstrap: [AppComponent]
})
export class AppModule { }
