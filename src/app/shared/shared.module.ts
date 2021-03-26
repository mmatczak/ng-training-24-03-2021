import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './dialogs/components/header/header.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HeaderComponent],
  exports: [CommonModule, RouterModule, HeaderComponent],
  imports: [
    CommonModule, RouterModule
  ]
})
export class SharedModule {
}
