import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { formReponse, RespRegistroMinero } from 'src/app/auth/interfaces/formularios.interface';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class ActividadDiariaService {
  private _baseUrl: string = environment.baseUrlQuerys;

  constructor(private http: HttpClient) {}

  insertarRegistroActividad(
    fltCantidad: string,
    unidadMedida: string,
    materialRecolectado: string,
    dtmFechaRecoleccion: string
  ) {
    const url = `${this._baseUrl}/minero/frmRegistroMaterial`;
    const body = {
      strUnidadMedida:unidadMedida,
      strMaterialRecolectado:materialRecolectado.toLowerCase(),
      fltCantidadRecolectada:parseFloat(fltCantidad) ,
      fechaRecoleccion:dtmFechaRecoleccion,
      IdMinero:localStorage.getItem("idMinero"),
    };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  leerRegistroMinero(id:number){

    //const id=localStorage.getItem("idMinero");
    const url=`${this._baseUrl}/minero/registrosMinero?id=${id}`
    
    return this.http.get<RespRegistroMinero>(url).pipe(
      map(resp=> resp.RegistroMinero )
    ) 
  }
  eliminarRegistroMinero( id:number){

    const url=`${this._baseUrl}/minero/registros/eliminarRegistro`
    const body = {
      "idregistro":id
    }
    return this.http.put<formReponse>(url,body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

}
