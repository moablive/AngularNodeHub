import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Products } from './products';
import { ProductList } from './components/product-list/product-list';
import { ProductForm } from './components/product-form/product-form';

const routes: Routes = [
  { 
    path: '', 
    component: Products,
    children: [ 
      { 
        path: '',
        component: ProductList
      },
      { 
        path: 'create',
        component: ProductForm 
      },
      { 
        path: 'edit/:id',
        component: ProductForm 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }