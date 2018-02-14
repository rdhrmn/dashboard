import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// -Begin


// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

// -End

// #my 3rd Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';


import { AppComponent } from './app.component';
import { MyOwnJioHomeComponent } from './my-own-jio-home/my-own-jio-home.component';
import { MyOwnJioTibcoComponent } from './my-own-jio-tibco/my-own-jio-tibco.component';
import { MyOwnJioStatusComponent } from './my-own-jio-status/my-own-jio-status.component';
import { MyOwnJioTibcoopsdataComponent } from './my-own-jio-tibcoopsdata/my-own-jio-tibcoopsdata.component';


@NgModule({
  declarations: [
    AppComponent,
    MyOwnJioHomeComponent,
    MyOwnJioTibcoComponent,
    MyOwnJioStatusComponent,
    MyOwnJioTibcoopsdataComponent
  ],
  imports: [
    BrowserModule,
    // - Begin
    // FormsModule,
    // HttpModule,
    // RouterModule.forRoot([]),
    NgbModule.forRoot(),
   //  AngularFontAwesomeModule
    // - End

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
