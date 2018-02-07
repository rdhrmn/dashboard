//#region Angular Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

//#endregion

//#region Custom Components
import { BootstrapNavbarComponent } from './bootstrap-navbar.component';

//#endregion

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ BootstrapNavbarComponent ],
    exports: [ BootstrapNavbarComponent ]
})
export class BootstrapNavbarModule { }
