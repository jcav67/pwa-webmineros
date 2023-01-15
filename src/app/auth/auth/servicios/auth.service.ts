import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {catchError, map, tap}from 'rxjs/operators'
import { environment } from 'src/environments/environment.prod';
import { authResponse, Usuario } from '../../interfaces/auth.interface';
import { of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl:string=environment.baseUrlAuth
  private _usuario!:Usuario

  get Usuario(){
    return {... this._usuario
    }
  }

  constructor(private http:HttpClient) { }

  login(email:string,password:string){
    const url=`${this._baseUrl}login`;
    const body={email,password}
    return this.http.post<authResponse>( url,body).pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token',resp.jwt!)          
          localStorage.setItem('email',resp.email!)          
          localStorage.setItem('idMinero',resp.idMinero!)
          localStorage.setItem('nombreMinero',resp.nombre!)
          this._usuario= {
            idMinero:resp.idMinero,
            nombre: resp.nombre
          }
        }
      }),
      map( resp => resp.ok),
      catchError(err => of( err.error.msg))
    )
  }

  validarToken(){
    const url=`${this._baseUrl}renew`;
    const headers= new HttpHeaders()
    .set('x-token',localStorage.getItem('token') || '')

    return this.http.get<authResponse>(url,{headers}).pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token',resp.jwt!)
          this._usuario= {
            idMinero:resp.idMinero,
            nombre: resp.nombre
          }
        }
      }),
      map(resp=>{
        return resp.ok
      }),
      catchError(err=> of(false) )
    )
  }

  crearUsuario(email:string,password:string,nombre:string,apellido:string){
    const url=`${this._baseUrl}new`;
    const body={email,password,nombre,apellido}
    return this.http.post<authResponse>( url,body).pipe(
      tap(resp => {
        if(resp.ok){
          localStorage.setItem('token',resp.jwt!)
          localStorage.setItem('email',resp.email!) 
          localStorage.setItem('idMinero',resp.idMinero!)
          localStorage.setItem('nombreMinero',resp.nombre!)
          console.log(resp.nombre)
          this._usuario= {
            idMinero:resp.idMinero,
            nombre: resp.nombre
          }
        }
      }),
      map( resp => resp.ok),
      catchError(err => of( err.error.msg))
    )
  }

  logOut(){
    localStorage.clear()
  }

  cargarGeoJson(){
    this.http.get('../../../../assets/data/Barrio_Vereda.json').subscribe(json=>console.log(json))
  }
}
