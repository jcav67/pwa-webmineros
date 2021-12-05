import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  images = ['../../../../../../assets/carrusel/MIBRZVKTY5C7PFZ6AH5Q2WDGSE.jpg'
          ,' ../../../../../../assets/carrusel/DSC00923.jpg'
          ,' ../../../../../../assets/carrusel/AZ2FDAV44RG2LBJ3YY3ZI74RKA.jpg']

}
