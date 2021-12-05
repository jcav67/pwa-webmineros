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
  constructor(private authService:AuthService,
              private router:Router) { console.log("home constructor") }

  ngOnInit(): void {
    this.authService.Usuario
    this.checkuser()
    console.log("home init")
    console.log(this.usuario)
  }
  
  get usuario(){
    return this.authService.Usuario;
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
    const tamUser=Object.keys(this.usuario).length; 
    console.log(tamUser)
    if(tamUser!=0){
      this.usuarioAuth=true
    }
  }

  logout(){
    this.authService.logOut();
    window.location.reload();
  }

}
