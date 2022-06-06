import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { PrincipalRoutingModule } from './principal-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { MaterialModule } from '../material/material.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';
import { MapasComponent } from './pages/mapas/mapas.component';

import {LeafletModule} from '@asymmetrik/ngx-leaflet';
import { ActividadDiariaComponent } from './pages/actividad-diaria/actividad-diaria.component';
import { PerfilUsuarioComponent } from './pages/perfil-usuario/perfil-usuario.component'

@NgModule({
  declarations: [HomeComponent, InicioComponent, FormulariosComponent, MapasComponent, ActividadDiariaComponent, PerfilUsuarioComponent],
  imports: [
    CommonModule,
    PrincipalRoutingModule,
    NgbModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    LeafletModule
  ]
})
export class PrincipalModule { }
