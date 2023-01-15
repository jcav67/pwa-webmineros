import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ValidarTokenGuard implements CanActivate, CanLoad {

  constructor(private authservice:AuthService,
              private router:Router){

  }

  canActivate(): Observable<boolean >  | boolean  {
    return this.authservice.validarToken()
    .pipe(
      tap(valid =>{
        if(!valid){
          this.router.navigateByUrl('/home')
        }
      })
    );
  }
  canLoad(): Observable<boolean >  | boolean{
    return true;
  }
}
