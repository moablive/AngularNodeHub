import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing-module';
import { Users } from './users';
import { Login } from './components/login/login';
import { UserList } from './components/user-list/user-list';
import { UserForm } from './components/user-form/user-form';
import { FontawesomeModule } from '../../shared/fontawesome/fontawesome-module';

@NgModule({
  declarations: [
    Users,
    Login,
    UserList,
    UserForm
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FontawesomeModule
  ]
})
export class UsersModule { 
}
