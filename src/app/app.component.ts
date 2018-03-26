import { Component, ViewEncapsulation } from '@angular/core';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.css',
    // '../../node_modules/@swimlane/ngx-datatable/src/themes/material.scss',
    // '../../node_modules/@swimlane/ngx-datatable/src/themes/dark.scss',
    // '../../node_modules/@swimlane/ngx-datatable/src/themes/bootstrap.scss'
    '../NgxDatatable/themes/material.scss',
    '../NgxDatatable/themes/dark.scss',
    '../NgxDatatable/themes/bootstrap.scss'
],
encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'RDH is trying';

}
