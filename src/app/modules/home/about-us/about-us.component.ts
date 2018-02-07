//#region Angular Modules

import { Component, OnInit } from '@angular/core';

//#endregion

@Component({
  // moduleId: module.id,
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: [
    './about-us.component.scss'
  ]
})
export class AboutUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
