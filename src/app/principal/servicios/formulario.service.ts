import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { formReponse, respEconomico, respMinero } from 'src/app/auth/interfaces/formularios.interface';
import { environment } from 'src/environments/environment';
import { formEconomico } from '../../auth/interfaces/formularios.interface';

@Injectable({
  providedIn: 'root'
})
export class FormularioService {

  private _baseUrl:string=environment.baseUrlQuerys

  constructor(private http:HttpClient) { }
  
  leerFormEconomico(id:number){
    console.log(id)
    const url=`${this._baseUrl}/minero/economico?id=${id}`
    
    return this.http.get<respEconomico>(url).pipe(
      map(resp=> resp.Economico )
    )
  }
  insertarFormEconomico(intAnosMinero:number,intLaborames:number,fltIngresoMensual:number,intGrupoFamiliar:number,
                        intCompraVenta:number,strLugarVenta:string){
    const url=`${this._baseUrl}/minero/frmMinero`
    const body={intAnosMinero,intLaborames,fltIngresoMensual,intGrupoFamiliar,intCompraVenta,strLugarVenta}
    return this.http.post<formReponse>(url,body).pipe(
      // tap(resp => {
      //   if(resp.ok){
          
      //   }
      // }),
      map( resp => resp.ok),
      catchError(err => of( err.error.msg))
    )
  }


  leerFormMinero(id:number){
    console.log(id)
    const url=`${this._baseUrl}/minero/datosminero?id=${id}`
    
    return this.http.get<respMinero>(url).pipe(
      map(resp=> resp.DatosMinero )
    )
  }
  insertarMinero(intIdminero:number, strTipoIdentificacion:string,strIdentificacion:string,strTipoPersona:string,
                strGenero:string,strTelefono:string ){
    const url=`${this._baseUrl}/minero/frmMinero`
    const body={intIdminero, strTipoIdentificacion,strIdentificacion,strTipoPersona,strGenero,strTelefono}
    return this.http.post<formReponse>(url,body).pipe(
      map( resp => resp.ok),
      catchError(err => of( err.error.msg))
    )
  }
}

