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

import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { MyOwnJioHomeComponent } from './my-own-jio-home/my-own-jio-home.component';
import { MyOwnJioTibcoComponent } from './my-own-jio-tibco/my-own-jio-tibco.component';
import { MyOwnJioStatusComponent } from './my-own-jio-status/my-own-jio-status.component';
import { MyOwnJioTibcoopsdataComponent } from './my-own-jio-tibcoopsdata/my-own-jio-tibcoopsdata.component';
import { MyOwnJioTibcoServiceVerifyComponent } from './my-own-jio-tibco-service-verify/my-own-jio-tibco-service-verify.component';
import { MyOwnJioTibcoTasksComponent } from './my-own-jio-tibco-tasks/my-own-jio-tibco-tasks.component';
import { MyOwnJioHeaderComponent } from './my-own-jio-header/my-own-jio-header.component';
import { MyOwnJioHighlightsComponent } from './my-own-jio-highlights/my-own-jio-highlights.component';
import { MyOwnJioFooterComponent } from './my-own-jio-footer/my-own-jio-footer.component';

const appRoutes: Routes = [
  { path: 'home', component: MyOwnJioHomeComponent },
  { path: 'tibco', component: MyOwnJioTibcoComponent },
  { path: 'footer', component: MyOwnJioFooterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];


@NgModule({
  declarations: [
    AppComponent,
    MyOwnJioHomeComponent,
    MyOwnJioTibcoComponent,
    MyOwnJioStatusComponent,
    MyOwnJioTibcoopsdataComponent,
    MyOwnJioTibcoServiceVerifyComponent,
    MyOwnJioTibcoTasksComponent,
    MyOwnJioHeaderComponent,
    MyOwnJioHighlightsComponent,
    MyOwnJioFooterComponent
  ],
  imports: [
    BrowserModule,
    // - Begin
    // FormsModule,
    // HttpModule,
    // RouterModule.forRoot([]),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    NgbModule.forRoot(),
   //  AngularFontAwesomeModule
    // - End

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
