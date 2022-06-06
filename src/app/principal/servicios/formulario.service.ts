import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  formReponse,
  RespAmbiental,
  RespDatosEconomico,
  RespDatosJuridico,
  RespDatosMinero,
  RespDatosSocial,
  RespDatosTecnico,
  RespDocumentacion,
} from 'src/app/auth/interfaces/formularios.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormularioService {
  private _baseUrl: string = environment.baseUrlQuerys;

  constructor(private http: HttpClient) {}

  leerFormEconomico(id: number) {
    console.log(id);
    const url = `${this._baseUrl}/minero/economico?minero=${id}`;

    return this.http
      .get<RespDatosEconomico>(url)
      .pipe(map((resp) => resp.Economico));
  }
  insertarFormEconomico(
    intAnosMinero: number,
    intLaborames: number,
    fltIngresoMensual: number,
    intGrupoFamiliar: number,
    intCompraVenta: number,
    strLugarVenta: string
  ) {
    console.log('angular id minero',localStorage.getItem('idMinero'))
    const url = `${this._baseUrl}/minero/frmEconomico`;
    const body = {
      intIdminero:localStorage.getItem('idMinero'),
      intAnosMinero,
      intLaborames,
      fltIngresoMensual,
      intGrupoFamiliar,
      intCompraVenta,
      strLugarVenta,
    };
    return this.http.post<formReponse>(url, body).pipe(
      // tap(resp => {
      //   if(resp.ok){

      //   }
      // }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
  
  insertarFrmTecnio(
    intTipoMineroBarequero:boolean,
    intTipoMineroChatarrero:boolean,
    intTipoMineroOtro:boolean,
    intTipoMetalOro:boolean,
    intTipoMetalPlata:boolean,
    intTipoMetalPlatino:boolean,
    intTipoMaterialArenaGrava:boolean,
    intTipoMaterialArcilla:boolean,
    intTipoPiedraPreciosaEsmeralda:boolean,
    intTipoPiedraPreciosaMorallas:boolean,
    intTipoOtro:boolean,
    intProdMensual:number,
  ){
    const url = `${this._baseUrl}/minero/frmTecnico`;
    const body={
      intIdminero:localStorage.getItem('idMinero'),
      intTipoMineroBarequero,
      intTipoMineroChatarrero,
      intTipoMineroOtro,
      intTipoMetalOro,
      intTipoMetalPlata,
      intTipoMetalPlatino,
      intTipoMaterialArenaGrava,
      intTipoMaterialArcilla,
      intTipoPiedraPreciosaEsmeralda,
      intTipoPiedraPreciosaMorallas,
      intTipoOtro,
      intProdMensual,
    }
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
      
  }
  leerFormTecnico(id:number){
    const url = `${this._baseUrl}/minero/tecnico?minero=${id}`;

    return this.http.get<RespDatosTecnico>(url).pipe(map((resp) => resp.Tecnico));
  }

  leerFormMinero(id: number) {
    console.log(id);
    const url = `${this._baseUrl}/minero/datosminero?minero=${id}`;

    return this.http.get<RespDatosMinero>(url).pipe(map((resp) => resp.DatosMinero));
  }
  insertarMinero(
    intIdminero: number,
    strNombre: string,
    strApellido:string,
    strEmail:string,
    strTipoIdentificacion: string,
    strIdentificacion: string,
    strTipoPersona: string,
    strGenero: string,
    strTelefono: string
  ) {
    const url = `${this._baseUrl}/minero/frmMinero`;
    const body = {
      intIdminero,
      strNombre,
      strApellido,
      strEmail,
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

  insertarSocial(
      strGradoEscolaridad:string,
      strEstadoCivil:string,
      strTipoVivienda:string,
      intLeescribir:number,
      strAfiliacion:string,
      strNombreAsociacion:string
  ) {
    const url = `${this._baseUrl}/minero/frmSocial`;
    const body = {
      intIdminero:localStorage.getItem('idMinero'),
      strGradoEscolaridad,
      strEstadoCivil,
      strTipoVivienda,
      intLeescribir,
      strAfiliacion,
      strNombreAsociacion
  };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }

  leerSocial(id:number){
    const url = `${this._baseUrl}/minero/social?minero=${id}`;

    return this.http.get<RespDatosSocial>(url).pipe(map((resp) => resp.Social));
  }

  insertarJuridico(
    strTrabajoPropPub:string,
    strTrabajoPropPubSi:string,
    strPropEst:string,
    strPropEstSi:string,
    strComNegra:string,
    strComNegraSi:string,
    strAreaProhibida:string,
    strAreaProhibidaSi:string,
    strVecino:string,
    strNoVecino:string,
    strGrupoSocial:string,
    strGrupoSocialSi:string
  ){

    const url = `${this._baseUrl}/minero/frmJuridico`;
    const body = {
      intIdminero:localStorage.getItem('idMinero'),
      strTrabajoPropPub,
      strTrabajoPropPubSi,
      strPropEst,
      strPropEstSi,
      strComNegra,
      strComNegraSi,
      strAreaProhibida,
      strAreaProhibidaSi,
      strVecino,
      strNoVecino,
      strGrupoSocial,
      strGrupoSocialSi
  };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );

  }
  leerJuridico(id:number){
    const url = `${this._baseUrl}/minero/juridico?minero=${id}`;

    return this.http.get<RespDatosJuridico>(url).pipe(map((resp) => resp.Juridico));
  }
  insertarDocumentacion(
    bitRut:string,
    bitSisben:string,
    bitRucom:string,
    bitOrigenMIneral:string,
    bitCapacitaciones:string,
    bitOtro:string,
    bitNinguna:string
  ){

    const url = `${this._baseUrl}/minero/frmDocumentacion`;
    console.log('otro',bitOtro)
    const body = {
      intIdminero:localStorage.getItem('idMinero'),
      bitRut,
      bitSisben,
      bitRucom,
      bitOrigenMIneral,
      bitCapacitaciones,
      bitOtro,
      bitNinguna
  };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );

  }
  leerDocuemntacion(id:number){
    const url = `${this._baseUrl}/minero/documentacion?minero=${id}`;

    return this.http.get<RespDocumentacion>(url).pipe(map((resp) => resp.Documentacion));
  }

  insertarAmbiental(
    strCapSeguridadSalud:string,
    intCapssRespuesta:string,
    strCaptecnologia:string,
    intCaptecRespuesta:string,
    strCapOng:string
  ){

    const url = `${this._baseUrl}/minero/frmMineroAmbiental`;
    const body = {
      intIdminero:localStorage.getItem('idMinero'),
      strCapSeguridadSalud,
      intCapssRespuesta,
      strCaptecnologia,
      intCaptecRespuesta,
      strCapOng
  };
    return this.http.post<formReponse>(url, body).pipe(
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );

  }
  leerAmbiental(id:number){
    const url = `${this._baseUrl}/minero/ambiental?minero=${id}`;

    return this.http.get<RespAmbiental>(url).pipe(map((resp) => resp.MineroAmbiental));
  }
}
