import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { NotFound } from './components/not-found/not-found';
import { FontawesomeModule } from './fontawesome/fontawesome-module';

@NgModule({
  declarations: [
    Navbar,
    Footer,
    NotFound
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontawesomeModule
  ],
  exports: [
    Navbar,
    Footer,
    NotFound,
    FontawesomeModule
  ]
})
export class SharedModule { }