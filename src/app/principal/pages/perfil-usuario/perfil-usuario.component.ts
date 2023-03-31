import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { PerfilUsuarioService } from '../../servicios/perfil-usuario.service';


interface TipoPersona{
  texto:string;
  valor:string;
}

interface TipoDocumento{
  texto:string;
  valor:string;
}

interface Genero{
  texto:string;
  valor:string;
}

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.component.html',
  styleUrls: ['./perfil-usuario.component.css']
})
export class PerfilUsuarioComponent implements OnInit {

  frmperfilUsuario: FormGroup = this.fb.group({
    strNombre: [, [Validators.required]],
    strApellido: [, [Validators.required]],
    strTelefono: [, [Validators.required]],
    strTipoDocumento: [, [Validators.required]],
    strNumeroDocumento: [, [Validators.required]],
    strGenero: [, [Validators.required]],
    strTipoPersona: [, [Validators.required]],
  });


  tipoDocumento:TipoDocumento[]=[
    {texto:'Cédula de ciudadanía',
    valor:'cedula de ciudadania'},

    {texto:'Tarjeta de extranjería',
    valor:'tarjeta de extranjeria'},

    {texto:'Cédula de extranjería',
    valor:'cedula de extranjeria'},

    {texto:'NIT',
    valor:'NIT'},

    {texto:'Pasaporte',
    valor:'pasaporte'},

    {texto:'Tipo de documento extranjero',
    valor:'tipo de documento extranjero'}
  ]

  lstGenero:Genero[]=[

    {texto:'Hombre',
    valor:'hombre'},
    {texto:'Mujer',
    valor:'mujer'},
    {texto:'Otro',
    valor:'otro'},
    {texto:'Prefiero no decirlo',
    valor: 'prefiero no decirlo'},

  ]

  tipoPersona:TipoPersona[]=[

    {texto:'Natural',
    valor:'natural'},
    {texto:'Jurídica',
    valor:'juridica'},

  ]

  constructor(private fb: FormBuilder, private perfilUsuario:PerfilUsuarioService) {
    this.leerDatos();
    this.llenarFormulario();
   }

  ngOnInit(): void {
    this.llenarFormulario();
  }
  ActualizarInformacion(){

    if (
      this.frmperfilUsuario.invalid ||
      this.frmperfilUsuario.get('strTipoDocumento')?.value==='' ||
      this.frmperfilUsuario.get('strTipoPersona')?.value==='' ||
      this.frmperfilUsuario.get('strGenero')?.value===''
    ) {
      Swal.fire(
        'Revisar los datos',
        'error en los datos por favor revisar los datos, todos los campos son obligatorios',
        'warning'
      );
      this.leerDatos();
      return;
    }

    this.perfilUsuario
      .ActualizarDatosMinero(
        parseInt(localStorage.getItem('idMinero')!) ,
        this.frmperfilUsuario.get('strNombre')?.value,
        this.frmperfilUsuario.get('strApellido')?.value,
        this.frmperfilUsuario.get('strTelefono')?.value,
        this.frmperfilUsuario.get('strTipoDocumento')?.value,
        this.frmperfilUsuario.get('strNumeroDocumento')?.value,
        this.frmperfilUsuario.get('strGenero')?.value,
        this.frmperfilUsuario.get('strTipoPersona')?.value

      )
      .subscribe((resp) => {
        Swal.fire('Guardado exitoso', 'Registro guardado con éxito', 'success');
        this.leerDatos();
        
      });

  }
  llenarFormulario(){
    this.frmperfilUsuario.reset({
      strNombre: localStorage.getItem('perfilNombre') || '',
      strApellido: localStorage.getItem('perfilApellido') || '',
      strTelefono: localStorage.getItem('perfilTelefono') || '',
      strTipoDocumento: localStorage.getItem('perfilTipoDoc') || '',
      strNumeroDocumento: localStorage.getItem('perfilNumDoc') || '',
      strGenero: localStorage.getItem('perfilGenero') || '',
      strTipoPersona: localStorage.getItem('perfilTipoPersona') || '',
  
  
    })
  }

  leerDatos(){
    this.perfilUsuario.leerDatosMinero(34).subscribe((resp)=>{
      for (let elem of resp){
        localStorage.setItem('perfilNombre',elem.strNombre)
      localStorage.setItem('perfilApellido', elem.strApellido)
      localStorage.setItem('perfilTelefono', elem.strTelefono)
      localStorage.setItem('perfilTipoDoc', elem.strTipoIdentificacion)
      localStorage.setItem('perfilNumDoc', elem.strIdentificacion)
      localStorage.setItem('perfilGenero', elem.strGenero)
      localStorage.setItem('perfilTipoPersona', elem.strTipoPersona)
      }
    })
  }
}
