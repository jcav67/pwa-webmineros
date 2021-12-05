import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { AuthService } from '../servicios/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class RegistroComponent implements OnInit {

  formRegistro:FormGroup= this.fb.group({
    nombre:['',[Validators.required]],
    apellido:['',[Validators.required]],
    email:['',[Validators.required]],
    password:['',[Validators.required, Validators.minLength(6),Validators.maxLength(16)]],
    valPassword:['',[Validators.required, Validators.minLength(6),Validators.maxLength(16)]],

  })
  

  constructor(private fb:FormBuilder,
              private router:Router,
              private authService:AuthService) { }

  ngOnInit(): void {
  }

  registrar(){
    const nombre =this.formRegistro.controls['nombre'].value
    const apellido =this.formRegistro.controls['apellido'].value
    const email= this.formRegistro.controls['email'].value
    const password=this.formRegistro.controls['password'].value
    this.authService.crearUsuario(email,password,nombre,apellido).subscribe(ok =>{
      if (ok === true){
        this.router.navigateByUrl('/home')
      }else{
        Swal.fire('Error',ok,'error')
      }
    })
  }
  confirmarPassword(){
    return this.formRegistro.controls['password'].value != this.formRegistro.controls['valPassword'].value && this.formRegistro.controls['valPassword'].touched 
  }


}
