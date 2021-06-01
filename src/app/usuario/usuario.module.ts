import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UsuarioModule {}
