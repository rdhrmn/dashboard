import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// -Begin


import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// #my 3rd Party Modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

// #my Custom Modules
import { HomeModule } from './modules/home';
import { BootstrapNavbarModule } from './modules/bootstrap-navbar';
import { BootstrapNavbarComponent } from './modules/bootstrap-navbar/bootstrap-navbar.component';

// -End

import { AppComponent } from './app.component';
import { MyOwnJioHomeComponent } from './my-own-jio-home/my-own-jio-home.component';
import { MyOwnJioTibcoComponent } from './my-own-jio-tibco/my-own-jio-tibco.component';
import { MyOwnJioStatusComponent } from './my-own-jio-status/my-own-jio-status.component';


@NgModule({
  declarations: [
    AppComponent,
    MyOwnJioHomeComponent,
    MyOwnJioTibcoComponent,
    MyOwnJioStatusComponent
  ],
  imports: [
    BrowserModule,
    // - Begin
    FormsModule,
    HttpModule,
    HomeModule,
    BootstrapNavbarModule,
    RouterModule.forRoot([]),
    NgbModule.forRoot()
    // - End

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
