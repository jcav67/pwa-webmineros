import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidarTokenGuard } from './guards/validar-token.guard';

const routes: Routes = [ 
{
  path:'auth',
  loadChildren: ()=> import('./auth/auth/auth.module').then(a => a.AuthModule)
},
{
  path:'home',
  loadChildren: ()=> import('./principal/principal.module').then(m => m.PrincipalModule)
},
{
  path:'**',
  redirectTo:'home'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{
    useHash:true
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
