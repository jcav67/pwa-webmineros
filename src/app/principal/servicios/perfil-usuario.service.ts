import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { formReponse, RespDatosMineros } from 'src/app/auth/interfaces/formularios.interface';

@Injectable({
  providedIn: 'root',
})
export class PerfilUsuarioService {
  private _baseUrl: string = 'http://localhost:3000/api/querys';
  ///minero/frmMinero
  constructor(private http: HttpClient) {}

  ActualizarDatosMinero(
    intIdminero: number,
    strNombre: string,
    strApellido: string,
    strTelefono: string,
    strTipoIdentificacion: string,
    strIdentificacion: string,
    strGenero: string, 
    strTipoPersona: string,
  ) {
    const url = `${this._baseUrl}/minero/frmMinero`;
    const body = {
      intIdminero,
      strNombre,
      strApellido,
      strTelefono,
      strTipoIdentificacion,
      strIdentificacion,
      strGenero,
      strTipoPersona,
    };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
  leerDatosMinero(){

      const id=localStorage.getItem("idMinero");
      const url=`${this._baseUrl}/minero/datosminero?minero=5`
      
      return this.http.get<RespDatosMineros>(url).pipe(
        map(resp=> resp.DatosMinero )
      )
    

  }
}
