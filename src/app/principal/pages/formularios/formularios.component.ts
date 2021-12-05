import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { formEconomico } from 'src/app/auth/interfaces/formularios.interface';
import { FormularioService } from '../../servicios/formulario.service';

interface TipoMinero{
  tipo: string,
  valor:string
}


@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {


  status:boolean=false

  tipoTecnico={
    barequero:false,
    chatarrero:false,
    otroTipoMinero:false,
    metalOro:false,
    metalPlata:false,
    metalPlatino:false,
    materialArenaGrava:false,
    materialArcilla:false,
    piedraPreciosaEsmeralda:false,
    piedraPreciosaMorallas:false,
    tipoOtro:false,
    prodMensual:false

  }

  datosBasicos:FormGroup= this.fb.group({
    nombre:[,[Validators.required, Validators.minLength(3)]],
    email:[,[Validators.required]],
    telefono:[,[Validators.required]],
    genero:[,[Validators.required]],
    tipoDocumento:[,[Validators.required]],
    numDocumento:[,[Validators.required]],
    tipoPersona:[,[Validators.required]]


  })

  
  formTecnico:FormGroup=this.fb.group({
    barequero:[false],
    chatarrero:[false],
    otroTipoMinero:[false],
    metalOro:[false],
    metalPlata:[false],
    metalPlatino:[false],
    materialArenaGrava:[false],
    materialArcilla:[false],
    piedraPreciosaEsmeralda:[false],
    piedraPreciosaMorallas:[false],
    tipoOtro:[false],
    prodMensual:['',[]]
  })

  formEconomico:FormGroup= this.fb.group({
    añosLaborados:[0],
    diasMensual:[0],
    ingresoMensual:[0],
    tamañoFamilia:[0],
    compraotros:[],
    lugarVenta:['']
  })
  
  formMineroAmbiental:FormGroup= this.fb.group({
    leerEscribir:['',],
    gradoEscolaridad:[],
    estadoCivil:[],
    tipoVivienda:[],
    afiliacion:[],
    nombreAfiliacion:['']
  })
  
  

  nuevoFavorito:FormControl=this.fb.control('',Validators.required)
  get favoritosArr(){
    return this.datosBasicos.get('favoritos') as FormArray;
  }

  constructor(private fb:FormBuilder, private formService:FormularioService) { 
  this.leerEconomico()
  this.leerMinero()

}

  ngOnInit(): void {
    this.datosBasicos.reset({
      nombre:localStorage.getItem('nombre')||'',
      email:localStorage.getItem('email')||'',
      telefono:localStorage.getItem('strTelefono')||'',
      genero:localStorage.getItem('strGenero')||'',
      tipoDocumento:localStorage.getItem('strTipoIdentificacion')||'',
      numDocumento:localStorage.getItem('strIdentificacion')||'',
      tipoPersona:localStorage.getItem('strTipoPersona')||''
  
  
    })
    this.formEconomico.reset({
      añosLaborados:localStorage.getItem('intAnosMinero')||'',
      diasMensual:localStorage.getItem('intLaborames')||'',
      ingresoMensual:localStorage.getItem('fltIngresoMensual')||'',
      tamañoFamilia:localStorage.getItem('intGrupoFamiliar')||'',
      compraotros:localStorage.getItem('intCompraVenta')||'',
      lugarVenta:localStorage.getItem('strLugarVenta')||''
    })
  }
  leerMinero(){
    console.log('entre')
    const intIdminero= parseInt( localStorage.getItem('idMinero')!)
    this.formService.leerFormMinero(intIdminero).subscribe(resp=>{
      console.log(resp)
      localStorage.setItem('strTipoIdentificacion',resp.strTipoIdentificacion)
      localStorage.setItem('strIdentificacion',resp.strIdentificacion)
      localStorage.setItem('strGenero',resp.strGenero)
      localStorage.setItem('strTipoPersona',resp.strTipoPersona)
      localStorage.setItem('strTelefono',resp.strTelefono)
    })
  }

  insertarMinero(){
    const intIdminero= parseInt( localStorage.getItem('idMinero')!)
    localStorage.setItem('nombre', this.datosBasicos.get('nombre')?.value)
    localStorage.setItem('email', this.datosBasicos.get('email')?.value)
    const strTipoIdentificacion= this.datosBasicos.get('tipoDocumento')?.value
    const strIdentificacion= this.datosBasicos.get('numDocumento')?.value
    const strTipoPersona= this.datosBasicos.get('tipoPersona')?.value
    const strGenero= this.datosBasicos.get('genero')?.value
    const strTelefono= this.datosBasicos.get('telefono')?.value
    
    this.formService.insertarMinero(intIdminero,strTipoIdentificacion,strIdentificacion,strTipoPersona,strGenero,strTelefono)
    .subscribe(resp=>console.log('exito'))

  }


  insertarEconomico(){
    const intAnosMinero = this.formEconomico.get('añosLaborados')?.value
    const intLaborames=this.formEconomico.get('diasMensual')?.value
    const fltIngresoMensual = this.formEconomico.get('ingresoMensual')?.value
    const intGrupoFamiliar=this.formEconomico.get('tamañoFamilia')?.value
    const intCompraVenta=this.formEconomico.get('compraotros')?.value
    const strLugarVenta=this.formEconomico.get('lugarVenta')?.value
    this.formService.insertarFormEconomico(intAnosMinero,intLaborames,fltIngresoMensual,intGrupoFamiliar,
      intCompraVenta,strLugarVenta).subscribe(resp=>console.log('exito'))
  }
  leerEconomico(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerFormEconomico(id).subscribe(resp=> {
      localStorage.setItem('fltIngresoMensual',resp.fltIngresoMensual.toString())
      localStorage.setItem('intAnosMinero',resp.intAnosMinero.toString())
      localStorage.setItem('intCompraVenta',resp.intCompraVenta.toString())
      localStorage.setItem('intGrupoFamiliar',resp.intGrupoFamiliar.toString())
      localStorage.setItem('intLaborames',resp.intLaborames.toString())
      localStorage.setItem('strLugarVenta',resp.strLugarVenta)
      
    })
  }

  validarCampo(campo:string){
    return this.datosBasicos.controls[campo].errors && this.datosBasicos.controls[campo].touched
  }

  agregar(){
    if(this.nuevoFavorito.invalid && this.nuevoFavorito.value==""){
      return
    }
    this.favoritosArr.push(this.fb.control(this.nuevoFavorito.value,Validators.required))
    this.nuevoFavorito.reset();
  }

  borrar(index:number){
    this.favoritosArr.removeAt(index);
  }

  guardar(){
    console.log(this.datosBasicos.get('tipoDocumento')?.value)
    this.insertarMinero()
    this.insertarEconomico()
    } 


  validarVentaOtrosMineros(){
   return  this.formEconomico.controls['compraotros'].value=='Si' || this.formEconomico.controls['compraotros'].value=='Ocacional'
  }

  local(){
    console.log('Hola mundo')
  }

  guardarValores(){
    localStorage.setItem('nombre',this.datosBasicos.get('nombre')?.value)
    localStorage.setItem('email',this.datosBasicos.get('email')?.value)
    localStorage.setItem('fltIngresoMensual',this.formEconomico.get('ingresoMensual')?.value)
    localStorage.setItem('intAnosMinero',this.formEconomico.get('añosLaborados')?.value)
    localStorage.setItem('intCompraVenta',this.formEconomico.get('compraotros')?.value)
    localStorage.setItem('intGrupoFamiliar',this.formEconomico.get('tamañoFamilia')?.value)
    localStorage.setItem('intLaborames',this.formEconomico.get('diasMensual')?.value)
    localStorage.setItem('strLugarVenta',this.formEconomico.get('lugarVenta')?.value)
  }

}
