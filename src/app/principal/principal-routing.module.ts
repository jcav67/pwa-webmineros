import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { FormulariosComponent } from './pages/formularios/formularios.component';
import { ValidarTokenGuard } from '../guards/validar-token.guard';
import { MapasComponent } from './pages/mapas/mapas.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent,
    children:[
      {path:'',component:InicioComponent},

      {path:'formularios',component:FormulariosComponent,
      canActivate:[ValidarTokenGuard]},
      {path:'mapas',component:MapasComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrincipalRoutingModule { }
