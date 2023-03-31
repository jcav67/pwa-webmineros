import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatTable } from '@angular/material/table';
import Swal from 'sweetalert2';
import { ActividadDiariaService } from '../../servicios/actividad-diaria.service';


interface Registro {
  intIdRegistroMinero:number;
  fltCantidad: number;
  unidadMedida: string;
  materialRecolectado: string;
  dtmFechaRecoleccion: string;
}

interface UnidadMedida {
  valor: string;
  valorVista: string;
}

@Component({
  selector: 'app-actividad-diaria',
  templateUrl: './actividad-diaria.component.html',
  styleUrls: ['./actividad-diaria.component.css'],
  providers: [],
})
export class ActividadDiariaComponent implements OnInit {
  selectedValue: string = '';
  dataSource: Registro[] = [];

  ActiviadDiaria: FormGroup = this.fb.group({
    fltCantidad: [0, [Validators.required]],
    frmunidadMedida: [, [Validators.required]],
    materialRecolectado: [, [Validators.required]],
    dtmFechaRecoleccion: [, [Validators.required]],
  });
  lstUnidadMedida: UnidadMedida[] = [
    { valor: 'Onzas', valorVista: 'Onzas(Onz)' },
    { valor: 'Kilogramo', valorVista: 'Kilogramo(Kg)' },
    { valor: 'Gramos', valorVista: 'Gramos(gr)' },
  ];

  startDate = new Date(2010, 0, 1);

  displayedColumns: string[] = [
    'Cantidad',
    'Unidad Medida',
    'Material',
    'Fecha',
    'Eliminar registro'
  ];
  constructor(
    private fb: FormBuilder,
    private actividadService: ActividadDiariaService
  ) {
    this.leerRegistroMinero();
  }

  ngOnInit(): void {}
  @ViewChild(MatTable) table!: MatTable<Registro>;

  async leerRegistroMinero () {
    this.dataSource=[]
     this.actividadService.leerRegistroMinero(34).subscribe((actividades) => {
      for (let actividad of actividades) {
        this.dataSource.push({
          intIdRegistroMinero:actividad.intIdRegistroMinero,
          fltCantidad: actividad.fltCantidadRecolectada,
          unidadMedida: actividad.strUnidadMedida,
          dtmFechaRecoleccion: actividad.strFechaRecoleccion,
          materialRecolectado: actividad.strMaterialRecolectado,
        });
      }
      this.table.renderRows();
    });
  }

  insertarRegistro() {
    if (
      this.ActiviadDiaria.invalid ||
      parseFloat(this.ActiviadDiaria.get('fltCantidad')?.value) <= 0 ||
      this.ActiviadDiaria.get('materialRecolectado')?.value===''
    ) {
      Swal.fire(
        'Revisar los datos',
        'error en los datos por favor revisar los datos, todos los campos son obligatorios',
        'warning'
      );
      return;
    }

    this.actividadService
      .insertarRegistroActividad(
        this.ActiviadDiaria.get('fltCantidad')?.value,
        this.ActiviadDiaria.get('frmunidadMedida')?.value,
        this.ActiviadDiaria.get('materialRecolectado')?.value,
        this.ActiviadDiaria.get('dtmFechaRecoleccion')?.value
      )
      .subscribe((resp) => {
        Swal.fire('Guardado exitoso', 'Registro guardado con éxito', 'success');
        this.leerRegistroMinero();
      });
  }

  eliminarRegistro(id:number){
    this.actividadService.eliminarRegistroMinero(id).subscribe((resp)=>{
      if (resp)Swal.fire('Eliminar exitoso', 'Registro eliminado con éxito', 'success');
      else Swal.fire('Eliminar fracaso', 'Hubo un problema al intentar borrar el registro', 'warning');
      this.leerRegistroMinero();
    })
  }
}
