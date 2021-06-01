import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilComponent } from './perfil/perfil.component';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';

@NgModule({
  declarations: [LoginComponent, PerfilComponent, PerfilDetalheComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UsuarioModule {}
