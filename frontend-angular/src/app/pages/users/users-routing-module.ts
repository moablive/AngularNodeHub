// pages/users/users-routing-module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../shared/guards/auth-guard'; 

// Importe os componentes com os nomes corretos
import { Users } from './users';
import { Login } from './components/login/login';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';

const routes: Routes = [
  // Rota de login, sem proteção
  {
    path: 'login',
    component: Login
  },
  // Rota pai protegida que agrupa os componentes de usuário logado
  {
    path: '', // => /users
    component: Users,
    canActivate: [AuthGuard],
    children: [ 
      { path: '', component: UserList }, // => /users
      { path: 'create', component: UserForm }, // => /users/create
      { path: 'edit/:id', component: UserForm }, // => /users/edit/:id
    ]
  },
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }