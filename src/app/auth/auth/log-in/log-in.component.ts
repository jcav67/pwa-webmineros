import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
import { AuthService } from '../servicios/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LogInComponent implements OnInit {

  formLogIn:FormGroup= this.fb.group({
    email:['',[Validators.required]],
    password:['',[Validators.required]]
  })

  constructor(private auth:AuthService,
              private fb:FormBuilder,
              private router:Router) { }

  ngOnInit(): void {
  }

  login(){
    const {email,password}= this.formLogIn.value
    
    this.auth.login(email,password).subscribe(ok =>{
      if (ok === true){
        this.router.navigateByUrl('/home')
      }else{
        Swal.fire('Error',ok,'error')
      }
    })
  }
  cancelar(){
    this.router.navigateByUrl('/home')
  }

}
