import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FontawesomeModule } from '../../shared/fontawesome/fontawesome-module';
import { HomeRoutingModule } from './home-routing-module';
import { Home } from './home';


@NgModule({
  declarations: [
    Home
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FontawesomeModule
  ]
})
export class HomeModule { }
