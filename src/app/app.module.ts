import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { FormsModule } from '@angular/forms';
// -Begin


// import { RouterModule } from '@angular/router';
// import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';

// -End

// #my 3rd Party Modules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { RouterModule, Routes } from '@angular/router';

// toastr
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { MyGlobal } from './myglobals';

// TreeView
import { JsonTree } from 'ng2-json-view';

// ngx-datatable
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {DataService} from './rest-api/data.service';
import {RequestsService} from './rest-api/requests.service';
import {DataPathUtils} from './rest-api/utils/dataPath.utils';
import {UrlUtils} from './rest-api/utils/url.utils';
import { HttpModule, Response, Headers  } from '@angular/http';

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
import { TestDataServiceComponent } from './test-data-service/test-data-service.component';
import { TransformProvider } from '../providers/transform';

const appRoutes: Routes = [
  { path: 'home', component: MyOwnJioHomeComponent },
  { path: 'tibco', component: MyOwnJioTibcoComponent },
  { path: 'footer', component: MyOwnJioFooterComponent },
  { path: 'working', component: TestDataServiceComponent },
  { path: '', redirectTo: '/working', pathMatch: 'full' },
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
    MyOwnJioFooterComponent,
    TestDataServiceComponent,
    JsonTree
  ],
  imports: [
    BrowserModule,
    // - Begin
    FormsModule,
    HttpModule,
    // HttpClientModule,
    // RouterModule.forRoot([]),
    RouterModule.forRoot(appRoutes, { enableTracing: true }),
    NgbModule.forRoot(),
   //  AngularFontAwesomeModule
    // - End
    // toastr
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added

    NgxDatatableModule, // Datatable

    // JsonTree // Treeview

    MDBBootstrapModule.forRoot() // Material Design 
  ],
  providers: [
    TransformProvider,
    DataService, RequestsService,
    UrlUtils,
    DataPathUtils,
    MyGlobal
  ]
    ,
  bootstrap: [AppComponent],

  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
