//#region Angular Modules

import { NgModule } from '@angular/core';
import { Route } from '@angular/router';

//#endregion

//#region Custom Router Pages

import { HomeComponent } from './home.component';
import { AboutUsComponent } from './about-us';
import { ContactUsComponent } from './contact-us';

//#endregion

export const HOME_MODULE_ROUTES: Route[] = [
  { path: '', pathMatch: 'full' , component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactUsComponent }
]

export const HOME_MODULE_COMPONENTS = [
  HomeComponent,
  AboutUsComponent,
  ContactUsComponent
]
