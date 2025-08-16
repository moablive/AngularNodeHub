import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { NgxMaskDirective, provideEnvironmentNgxMask } from 'ngx-mask';

import { ProductsRoutingModule } from './products-routing-module';
import { FontawesomeModule } from '../../shared/fontawesome/fontawesome-module';

import { Products } from './products';
import { ProductForm } from './components/product-form/product-form'; 
import { ProductList } from './components/product-list/product-list';

@NgModule({
  declarations: [
    Products,
    ProductForm,
    ProductList
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FontawesomeModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ]
})
export class ProductsModule { }