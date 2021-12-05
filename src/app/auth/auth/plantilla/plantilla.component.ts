import { Component, OnInit } from '@angular/core';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-plantilla',
  templateUrl: './plantilla.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class PlantillaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
