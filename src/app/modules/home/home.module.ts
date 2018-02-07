//#region Amngular Modules

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

//#endregion

//#region Home routes
import { HOME_MODULE_COMPONENTS, HOME_MODULE_ROUTES } from './home.routes';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AboutUsComponent } from './about-us/about-us.component';
//#endregion

@NgModule({
  imports: [
     RouterModule.forChild( HOME_MODULE_ROUTES )
  ],
  declarations: [ HOME_MODULE_COMPONENTS, ContactUsComponent, AboutUsComponent ]
})
export class HomeModule { }
