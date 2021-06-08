import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { PerfilDetalheComponent } from './perfil-detalhe/perfil-detalhe.component';
import { PerfilPage } from './perfil/perfil.page';
import { UsuarioFormularioComponent } from './usuario-formulario/usuario-formulario.component';

@NgModule({
  declarations: [LoginComponent, PerfilDetalheComponent, PerfilPage, UsuarioFormularioComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
})
export class UsuarioModule {}
