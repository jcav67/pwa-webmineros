import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth/servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
    .example-container {
        width: 400px;
        height: 200px;
        margin: 10px;
        border: 1px solid #555;
}
    `
  ]
})
export class HomeComponent implements OnInit {
  
  usuarioAuth=false
  usuarioActual:string=''
  
  constructor(private authService:AuthService,
              private router:Router) { }

  ngOnInit(): void {
    this.checkuser()
    this.usuarioActual=localStorage.getItem('nombreMinero') || ''; 
  }
  
  toggle(){
    var x = document.getElementById("navDemo");
    if (x!.className.indexOf("w3-show") == -1) {
      x!.className += " w3-show";
    } else { 
      x!.className = x!.className.replace(" w3-show", "");
    }
  }
  checkuser(){
    const tamUser=localStorage.getItem('nombreMinero'); 
    if(tamUser != null){
      this.usuarioAuth=true
    }
  }

  logout(){
    this.authService.logOut();
    window.location.reload();
  }

}
