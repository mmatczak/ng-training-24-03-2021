import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './dialogs/components/header/header.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorsComponent} from './forms/comonents/errors/errors.component';

@NgModule({
  declarations: [HeaderComponent, ErrorsComponent],
  exports: [
    CommonModule, RouterModule, ReactiveFormsModule,
    HeaderComponent, ErrorsComponent, HttpClientModule],
  imports: [
    CommonModule, RouterModule, HttpClientModule
  ]
})
export class SharedModule {
}
