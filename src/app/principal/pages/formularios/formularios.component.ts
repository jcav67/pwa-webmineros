import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormularioService } from '../../servicios/formulario.service';


@Component({
  selector: 'app-formularios',
  templateUrl: './formularios.component.html',
  styleUrls: ['./formularios.component.css']
})
export class FormulariosComponent implements OnInit {


  status:boolean=false

  datosBasicos:FormGroup= this.fb.group({
    nombre:[,[Validators.required, Validators.minLength(3)]],
    apellido:[,[Validators.required, Validators.minLength(3)]],
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
  });

  formEconomico:FormGroup= this.fb.group({
    añosLaborados:[0],
    diasMensual:[0],
    ingresoMensual:[0],
    tamañoFamilia:[0],
    compraotros:[0],
    lugarVenta:['']
  })
  
  formMineroSocial:FormGroup= this.fb.group({
    leerEscribir:['',],
    gradoEscolaridad:[],
    estadoCivil:[],
    tipoVivienda:[],
    afiliacion:[],
    nombreAfiliacion:['']
  });

  formAmbiental:FormGroup= this.fb.group({
    capacitacionSeguridadSalud:[''],
    respCapacitacionseguridadsalud:[''],
    capacitacionTecnologiasLimpias:[''],
    respCapacitacionTecnologiasLimpias:[''],
    respCapacitacionONG:['']
  });

  formJuridico:FormGroup= this.fb.group({
    trabPropPublica:[''],
    SitrabPropPublica:[''],
    trabPropEstado:[''],
    SitrabPropEstado:[''],
    trabPropcomNegra:[''],
    SitrabPropcomNegra:[''],
    trabPropProhibida:[''],
    SitrabPropProhibida:[''],
    vecinoLugarTrabajo:[''],
    NovecinoLugarTrabajo:[''],
    GrupoSocialReconocido:[''],
  });

  documentacion:FormGroup=this.fb.group({
    RUT:[false],
    SISBEN:[false],
    RUCOM:[false],
    origenMineral:[false],
    ninguna:[false],
    capacitaciones:[false],
    otro:[false],
  })
  
  

  nuevoFavorito:FormControl=this.fb.control('',Validators.required)
  get favoritosArr(){
    return this.datosBasicos.get('favoritos') as FormArray;
  }

  constructor(private fb:FormBuilder, private formService:FormularioService) { 
  this.leerEconomico()
  this.leerMinero()
  this.leerTecnico()
  this.leerSocial()
  this.leerJuridico()
  this.leerDocumentacion()
  this.leerAmbiental()

}

  ngOnInit(): void {
    this.datosBasicos.reset({
      nombre:localStorage.getItem('nombreMinero')||'',
      apellido:localStorage.getItem('strApellido')||'',
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
    this.formMineroSocial.reset({
      leerEscribir:localStorage.getItem('intLeescribir')||'',
      gradoEscolaridad:localStorage.getItem('strGradoEscolaridad')||'',
      estadoCivil:localStorage.getItem('strEstadoCivil')||'',
      tipoVivienda:localStorage.getItem('strTipoVivienda')||'',
      afiliacion:localStorage.getItem('strAfiliacion')||'',
      nombreAfiliacion:localStorage.getItem('strNombreAsociacion')||''      
    })

    this.formAmbiental.reset({
      capacitacionSeguridadSalud:localStorage.getItem('capacitacionSeguridadSalud'),
      respCapacitacionseguridadsalud:localStorage.getItem('respCapacitacionseguridadsalud'),
      capacitacionTecnologiasLimpias:localStorage.getItem('capacitacionTecnologiasLimpias'),
      respCapacitacionTecnologiasLimpias:localStorage.getItem('respCapacitacionTecnologiasLimpias'),
      respCapacitacionONG:localStorage.getItem('respCapacitacionONG')
    })

    this.formTecnico.reset({
      
      barequero:this.trueorfalse('intTipoMineroBarequero'),
      chatarrero:this.trueorfalse( 'intTipoMineroChatarrero'),
      otroTipoMinero:this.trueorfalse( 'intTipoMineroOtro'),
      metalOro:this.trueorfalse( 'intTipoMetalOro'),
      metalPlata:this.trueorfalse( 'intTipoMetalPlata'),
      metalPlatino:this.trueorfalse( 'intTipoMetalPlatino'),
      materialArenaGrava:this.trueorfalse( 'intTipoMaterialArenaGrava'),
      materialArcilla:this.trueorfalse( 'intTipoMaterialArcilla'),
      piedraPreciosaEsmeralda:this.trueorfalse( 'intTipoPiedraPreciosaEsmeralda'),
      piedraPreciosaMorallas: this.trueorfalse( 'intTipoPiedraPreciosaMorallas'),
      tipoOtro:this.trueorfalse( 'intTipoOtro'),
      prodMensual:this.trueorfalse( 'intProdMensual')
    });

    this.formJuridico.reset({

      trabPropPublica:localStorage.getItem('strTrabajoPropPub'),
      SitrabPropPublica:localStorage.getItem('strTrabajoPropPubSi'),
      trabPropEstado:localStorage.getItem('strPropEst'),
      SitrabPropEstado:localStorage.getItem('strPropEstSi'),
      trabPropcomNegra:localStorage.getItem('strComNegra'),
      SitrabPropcomNegra:localStorage.getItem('strComNegraSi'),
      trabPropProhibida:localStorage.getItem('strAreaProhibida'),
      SitrabPropProhibida:localStorage.getItem('strAreaProhibidaSi'),
      vecinoLugarTrabajo:localStorage.getItem('strVecino'),
      NovecinoLugarTrabajo:localStorage.getItem('strNoVecino'),
      GrupoSocialReconocido:localStorage.getItem('strGrupoSocialSi')
    });

    this.documentacion.reset({
      RUT:this.trueorfalse('RUT'),
      SISBEN:this.trueorfalse('SISBEN'),
      RUCOM:this.trueorfalse('RUCOM'),
      origenMineral:this.trueorfalse('origenMineral'),
      ninguna:this.trueorfalse('ninguna'),
      capacitaciones:this.trueorfalse('capacitaciones'),
      otro:this.trueorfalse('otro'),
    })
  }
  leerMinero(){
    const intIdminero= parseInt( localStorage.getItem('idMinero')!)
    this.formService.leerFormMinero(intIdminero).subscribe(resp=>{
      localStorage.setItem('strNombre',resp[0].strNombre)
      localStorage.setItem('strTipoIdentificacion',resp[0].strTipoIdentificacion)
      localStorage.setItem('strIdentificacion',resp[0].strIdentificacion)
      localStorage.setItem('strGenero',resp[0].strGenero)
      localStorage.setItem('strTipoPersona',resp[0].strTipoPersona)
      localStorage.setItem('strTelefono',resp[0].strTelefono)
      localStorage.setItem('strApellido',resp[0].strApellido)
    })
  }

  insertarMinero(){
    const intIdminero= parseInt( localStorage.getItem('idMinero')!)
    localStorage.setItem('nombre', this.datosBasicos.get('nombre')?.value)
    localStorage.setItem('email', this.datosBasicos.get('email')?.value)
    const strNombre= this.datosBasicos.get('nombre')?.value
    const strApellido=this.datosBasicos.get('apellido')?.value
    const strEmail= this.datosBasicos.get('email')?.value
    const strTipoIdentificacion= this.datosBasicos.get('tipoDocumento')?.value
    const strIdentificacion= this.datosBasicos.get('numDocumento')?.value
    const strTipoPersona= this.datosBasicos.get('tipoPersona')?.value
    const strGenero= this.datosBasicos.get('genero')?.value
    const strTelefono= this.datosBasicos.get('telefono')?.value
    
    
    this.formService.insertarMinero(intIdminero,strNombre,strApellido,strEmail,strTipoIdentificacion,strIdentificacion,strTipoPersona,strGenero,strTelefono)
    .subscribe(resp=>{
      this.status=resp?  true:  false;
     })
     return this.status;
  }
  insertarTecnico():boolean{
    const intTipoMineroBarequero= this.formTecnico.get('barequero')?.value
    const intTipoMineroChatarrero= this.formTecnico.get('chatarrero')?.value
    const intTipoMineroOtro= this.formTecnico.get('otroTipoMinero')?.value
    const intTipoMetalOro= this.formTecnico.get('metalOro')?.value
    const intTipoMetalPlata= this.formTecnico.get('metalPlata')?.value
    const intTipoMetalPlatino= this.formTecnico.get('metalPlatino')?.value
    const intTipoMaterialArenaGrava= this.formTecnico.get('materialArenaGrava')?.value
    const intTipoMaterialArcilla= this.formTecnico.get('materialArcilla')?.value
    const intTipoPiedraPreciosaEsmeralda= this.formTecnico.get('piedraPreciosaEsmeralda')?.value
    const intTipoPiedraPreciosaMorallas= this.formTecnico.get('piedraPreciosaMorallas')?.value
    const intTipoOtro= this.formTecnico.get('tipoOtro')?.value
    const intProdMensual= this.formTecnico.get('prodMensual')?.value
    this.formService.insertarFrmTecnio(intTipoMineroBarequero,
      intTipoMineroChatarrero,
      intTipoMineroOtro,
      intTipoMetalOro,
      intTipoMetalPlata,
      intTipoMetalPlatino,
      intTipoMaterialArenaGrava,
      intTipoMaterialArcilla,
      intTipoPiedraPreciosaEsmeralda,
      intTipoPiedraPreciosaMorallas,
      intTipoOtro,
      intProdMensual).subscribe(resp=>{
        this.status=resp?  true:  false;
       })
       return this.status;
  }
  leerTecnico(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerFormTecnico(id).subscribe(resp=>{    
      localStorage.setItem( 'intTipoMineroBarequero',resp[0].intTipoMineroBarequero.toString());      
      localStorage.setItem( 'intTipoMineroChatarrero',resp[0].intTipoMineroChatarrero.toString());
      localStorage.setItem( 'intTipoMineroOtro',resp[0].intTipoMineroOtro.toString())
      localStorage.setItem( 'intTipoMetalOro',resp[0].intTipoMetalOro.toString())
      localStorage.setItem( 'intTipoMetalPlata',resp[0].intTipoMetalPlata.toString())
      localStorage.setItem( 'intTipoMetalPlatino',resp[0].intTipoMetalPlatino.toString())
      localStorage.setItem( 'intTipoMaterialArenaGrava',resp[0].intTipoMaterialArenaGrava.toString())
      localStorage.setItem( 'intTipoMaterialArcilla',resp[0].intTipoMaterialArcilla.toString())
      localStorage.setItem( 'intTipoPiedraPreciosaEsmeralda',resp[0].intTipoPiedraPreciosaEsmeralda.toString())
      localStorage.setItem( 'intTipoPiedraPreciosaMorallas',resp[0].intTipoPiedraPreciosaMorallas.toString())
      localStorage.setItem( 'intTipoOtro',resp[0].intTipoOtro.toString())
      localStorage.setItem( 'intProdMensual',resp[0].intProdMensual.toString())
    })

  }

  insertarEconomico():boolean{
    const intAnosMinero = this.formEconomico.get('añosLaborados')?.value
    const intLaborames=this.formEconomico.get('diasMensual')?.value
    const fltIngresoMensual = this.formEconomico.get('ingresoMensual')?.value
    const intGrupoFamiliar=this.formEconomico.get('tamañoFamilia')?.value
    const intCompraVenta=this.formEconomico.get('compraotros')?.value
    const strLugarVenta=this.formEconomico.get('lugarVenta')?.value
    this.formService.insertarFormEconomico(intAnosMinero,intLaborames,fltIngresoMensual,intGrupoFamiliar,
      intCompraVenta,strLugarVenta).subscribe(resp=>{
         this.status=resp?  true:  false;
        })
        return this.status;
  }
  leerEconomico(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerFormEconomico(id).subscribe(resp=> {
      localStorage.setItem('fltIngresoMensual',resp[0].fltIngresoMensual.toString())
      localStorage.setItem('intAnosMinero',resp[0].intAnosMinero.toString())
      localStorage.setItem('intCompraVenta',resp[0].intCompraVenta.toString())
      localStorage.setItem('intGrupoFamiliar',resp[0].intGrupoFamiliar.toString())
      localStorage.setItem('intLaborames',resp[0].intLaborames.toString())
      localStorage.setItem('strLugarVenta',resp[0].strLugarVenta)
      
    })
  }
  trueorfalse(propiedad:string){
    if(localStorage.getItem(propiedad)=='1'){
      return true
    }
    else{
      return false
    }
  }

    insertarAmbiental():boolean{

      const strCapSeguridadSalud=this.formAmbiental.get('capacitacionSeguridadSalud')?.value;
      const intCapssRespuesta=this.formAmbiental.get('respCapacitacionseguridadsalud')?.value;
      const strCaptecnologia=this.formAmbiental.get('capacitacionTecnologiasLimpias')?.value;
      const intCaptecRespuesta=this.formAmbiental.get('respCapacitacionTecnologiasLimpias')?.value;
      const strCapOng=this.formAmbiental.get('respCapacitacionONG')?.value;
  
      this.formService.insertarAmbiental(
        strCapSeguridadSalud,
        intCapssRespuesta,
        strCaptecnologia,
        intCaptecRespuesta,
        strCapOng
      ).subscribe(resp=>{
           this.status=resp?  true:  false;
          })
          return this.status;
    }  

    leerAmbiental(){
      const id:number = parseInt(localStorage.getItem('idMinero')!,10)
      this.formService.leerAmbiental(id).subscribe(resp=> {
        localStorage.setItem( 'capacitacionSeguridadSalud', resp[0].strCapSeguridadSalud)
        localStorage.setItem( 'respCapacitacionseguridadsalud', resp[0].strCapssRespuesta)
        localStorage.setItem( 'capacitacionTecnologiasLimpias', resp[0].strCaptecnologia)
        localStorage.setItem( 'respCapacitacionTecnologiasLimpias', resp[0].intCaptecRespuesta)
        localStorage.setItem( 'respCapacitacionONG', resp[0].strCapOng)
        
      })
    }

  insertarSocial():boolean{

    const strGradoEscolaridad= this.formMineroSocial.get('gradoEscolaridad')?.value
    const strEstadoCivil= this.formMineroSocial.get('estadoCivil')?.value
    const strTipoVivienda= this.formMineroSocial.get('tipoVivienda')?.value
    const intLeescribir= this.formMineroSocial.get('leerEscribir')?.value
    const strAfiliacion= this.formMineroSocial.get('afiliacion')?.value
    const strNombreAsociacion= this.formMineroSocial.get('nombreAfiliacion')?.value

    this.formService.insertarSocial(
      strGradoEscolaridad,
      strEstadoCivil,
      strTipoVivienda,
      intLeescribir,
      strAfiliacion,
      strNombreAsociacion
    ).subscribe(resp=>{
         this.status=resp?  true:  false;
        })
        return this.status;
  }

  leerSocial(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerSocial(id).subscribe(resp=> {
      localStorage.setItem('strGradoEscolaridad',resp[0].strGradoEscolaridad)
      localStorage.setItem('strEstadoCivil',resp[0].strEstadoCivil)
      localStorage.setItem('strTipoVivienda',resp[0].strTipoVivienda)
      localStorage.setItem('intLeescribir',resp[0].intLeescribir.toString())
      localStorage.setItem('strAfiliacion',resp[0].strAfiliacion)
      localStorage.setItem('strNombreAsociacion',resp[0].strNombreAsociacion)
      
    })
  }

  insertarDocumentacion():boolean{
    const bitRut= this.documentacion.get('RUT')?.value;
    const bitSisben= this.documentacion.get('SISBEN')?.value;
    const bitRucom= this.documentacion.get('RUCOM')?.value;
    const bitOrigenMIneral= this.documentacion.get('origenMineral')?.value;
    const bitCapacitaciones= this.documentacion.get('capacitaciones')?.value;
    const bitOtro= this.documentacion.get('otro')?.value;
    const bitNinguna= this.documentacion.get('ninguna')?.value;
    this.formService.insertarDocumentacion(
      bitRut,
      bitSisben,
      bitRucom,
      bitOrigenMIneral,
      bitCapacitaciones,
      bitOtro,
      bitNinguna
    ).subscribe(resp=>{
         this.status=resp?  true:  false;
        })
        return this.status;
  }

  leerDocumentacion(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerDocuemntacion(id).subscribe(resp=> {
      localStorage.setItem('RUT',resp[0].intRut.toString()) 
      localStorage.setItem('SISBEN',resp[0].intSisben.toString()) 
      localStorage.setItem('RUCOM',resp[0].intRucom.toString()) 
      localStorage.setItem('origenMineral',resp[0].intOrigenMIneral.toString()) 
      localStorage.setItem('ninguna',resp[0].intNinguna.toString()) 
      localStorage.setItem('capacitaciones',resp[0].intCapacitaciones.toString()) 
      localStorage.setItem('otro',resp[0].intOtro.toString()) 
      
    })
  }

  insertaJuridico():boolean{

    const strTrabajoPropPub=this.formJuridico.get('trabPropPublica')?.value
    const strTrabajoPropPubSi=this.formJuridico.get('SitrabPropPublica')?.value
    const strPropEst=this.formJuridico.get('trabPropEstado')?.value
    const strPropEstSi=this.formJuridico.get('SitrabPropEstado')?.value
    const strComNegra=this.formJuridico.get('trabPropcomNegra')?.value
    const strComNegraSi=this.formJuridico.get('SitrabPropcomNegra')?.value
    const strAreaProhibida=this.formJuridico.get('trabPropProhibida')?.value
    const strAreaProhibidaSi=this.formJuridico.get('SitrabPropProhibida')?.value
    const strVecino=this.formJuridico.get('vecinoLugarTrabajo')?.value
    const strNoVecino=this.formJuridico.get('NovecinoLugarTrabajo')?.value
    const strGrupoSocial='si'
    const strGrupoSocialSi=this.formJuridico.get('GrupoSocialReconocido')?.value

    this.formService.insertarJuridico(
      strTrabajoPropPub,
      strTrabajoPropPubSi,
      strPropEst,
      strPropEstSi,
      strComNegra,
      strComNegraSi,
      strAreaProhibida,
      strAreaProhibidaSi,
      strVecino,
      strNoVecino,
      strGrupoSocial,
      strGrupoSocialSi
    ).subscribe(resp=>{
         this.status=resp?  true:  false;
        })
        return this.status;
  }

  leerJuridico(){
    const id:number = parseInt(localStorage.getItem('idMinero')!,10)
    this.formService.leerJuridico(id).subscribe(resp=> {
      localStorage.setItem('strTrabajoPropPub',resp[0].strTrabajoPropPub)
      localStorage.setItem('strTrabajoPropPubSi',resp[0].strTrabajoPropPubSi)
      localStorage.setItem('strPropEst',resp[0].strPropEst)
      localStorage.setItem('strPropEstSi',resp[0].strPropEstSi)
      localStorage.setItem('strComNegra',resp[0].strComNegra)
      localStorage.setItem('strComNegraSi',resp[0].strComNegraSi)
      localStorage.setItem('strAreaProhibida',resp[0].strAreaProhibida)
      localStorage.setItem('strAreaProhibidaSi',resp[0].strAreaProhibidaSi)
      localStorage.setItem('strVecino',resp[0].strVecino)
      localStorage.setItem('strNoVecino',resp[0].strNoVecino)
      localStorage.setItem('strGrupoSocial',resp[0].strGrupoSocial)
      localStorage.setItem('strGrupoSocialSi',resp[0].strGrupoSocialSi)
      
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
    this.insertarMinero();
    this.insertarEconomico();
    this.insertarTecnico();
    this.insertarSocial();
    this.insertaJuridico();
    this.insertarDocumentacion();
    this.insertarAmbiental();
    
    } 


  validarVentaOtrosMineros(){
   return  this.formEconomico.controls['compraotros'].value=='1' || this.formEconomico.controls['compraotros'].value=='-1'
  }
  validarAfiliacion(){
   return  this.formMineroSocial.controls['afiliacion'].value=='Si' 
  }
  validarTrabajopropPublica(){
   return  this.formJuridico.controls['trabPropPublica'].value=='Si' 
  }
  validarTrabajopropEstado(){
   return  this.formJuridico.controls['trabPropEstado'].value=='Si' 
  }
  validarTrabajopropcomNegra(){
   return  this.formJuridico.controls['trabPropcomNegra'].value=='Si' 
  }
  validarTrabajopropProhibida(){
   return  this.formJuridico.controls['trabPropProhibida'].value=='Si' 
  }
  validarVecinoTrabajo(){
   return  this.formJuridico.controls['vecinoLugarTrabajo'].value=='Si' 
  }
  validarCapacitacion(){
    if(this.formAmbiental.controls['capacitacionSeguridadSalud'].value!='Aun no'){
      
      return true;
    }
    else{
      return false;
    }
    
  }
  guardarValores(){
    //minero
    localStorage.setItem('nombre',this.datosBasicos.get('nombre')?.value)
    localStorage.setItem('apellido',this.datosBasicos.get('apellido')?.value)
    localStorage.setItem('email',this.datosBasicos.get('email')?.value)
    localStorage.setItem('telefono',this.datosBasicos.get('telefono')?.value)
    localStorage.setItem('genero',this.datosBasicos.get('genero')?.value)
    localStorage.setItem('tipoDocumento',this.datosBasicos.get('tipoDocumento')?.value)
    localStorage.setItem('numDocumento',this.datosBasicos.get('numDocumento')?.value)
    localStorage.setItem('tipoPersona',this.datosBasicos.get('tipoPersona')?.value)

  }
  GuardarSocial(){
    localStorage.setItem( 'strGradoEscolaridad', this.formMineroSocial.get('gradoEscolaridad')?.value)
    localStorage.setItem( 'strEstadoCivil', this.formMineroSocial.get('estadoCivil')?.value)
    localStorage.setItem( 'strTipoVivienda', this.formMineroSocial.get('tipoVivienda')?.value)
    localStorage.setItem( 'intLeescribir', this.formMineroSocial.get('leerEscribir')?.value)
    localStorage.setItem( 'strAfiliacion', this.formMineroSocial.get('afiliacion')?.value)
    localStorage.setItem( 'strNombreAsociacion', this.formMineroSocial.get('nombreAfiliacion')?.value)
  }
  GuardarTecnico(){
    //tecnico
    localStorage.setItem( 'intTipoMineroBarequero',this.formTecnico.get('barequero')?.value),
    localStorage.setItem( 'intTipoMineroChatarrero',this.formTecnico.get('chatarrero')?.value),
    localStorage.setItem( 'intTipoMineroOtro',this.formTecnico.get('otroTipoMinero')?.value),
    localStorage.setItem( 'intTipoMetalOro',this.formTecnico.get('metalOro')?.value),
    localStorage.setItem( 'intTipoMetalPlata',this.formTecnico.get('metalPlata')?.value),
    localStorage.setItem( 'intTipoMetalPlatino',this.formTecnico.get('metalPlatino')?.value),
    localStorage.setItem( 'intTipoMaterialArenaGrava',this.formTecnico.get('materialArenaGrava')?.value),
    localStorage.setItem( 'intTipoMaterialArcilla',this.formTecnico.get('materialArcilla')?.value),
    localStorage.setItem( 'intTipoPiedraPreciosaEsmeralda',this.formTecnico.get('piedraPreciosaEsmeralda')?.value),
    localStorage.setItem( 'intTipoPiedraPreciosaMorallas',this.formTecnico.get('piedraPreciosaMorallas')?.value),
    localStorage.setItem( 'intTipoOtro',this.formTecnico.get('tipoOtro')?.value),
    localStorage.setItem( 'intProdMensual',this.formTecnico.get('prodMensual')?.value)
  }
  GuardarEconomico(){
    //Economico
    localStorage.setItem('fltIngresoMensual',this.formEconomico.get('ingresoMensual')?.value)
    localStorage.setItem('intAnosMinero',this.formEconomico.get('añosLaborados')?.value)
    localStorage.setItem('intCompraVenta',this.formEconomico.get('compraotros')?.value)
    localStorage.setItem('intGrupoFamiliar',this.formEconomico.get('tamañoFamilia')?.value)
    localStorage.setItem('intLaborames',this.formEconomico.get('diasMensual')?.value)
    localStorage.setItem('strLugarVenta',this.formEconomico.get('lugarVenta')?.value )
  }
  GuardarJuridico(){
    localStorage.setItem('strTrabajoPropPub',this.formJuridico.get('trabPropPublica')?.value)
    localStorage.setItem('strTrabajoPropPubSi',this.formJuridico.get('SitrabPropPublica')?.value)
    localStorage.setItem('strPropEst',this.formJuridico.get('trabPropEstado')?.value)
    localStorage.setItem('strPropEstSi',this.formJuridico.get('SitrabPropEstado')?.value)
    localStorage.setItem('strComNegra',this.formJuridico.get('trabPropcomNegra')?.value)
    localStorage.setItem('strComNegraSi',this.formJuridico.get('SitrabPropcomNegra')?.value)
    localStorage.setItem('strAreaProhibida',this.formJuridico.get('trabPropProhibida')?.value)
    localStorage.setItem('strAreaProhibidaSi',this.formJuridico.get('SitrabPropProhibida')?.value)
    localStorage.setItem('strVecino',this.formJuridico.get('vecinoLugarTrabajo')?.value)
    localStorage.setItem('strNoVecino',this.formJuridico.get('NovecinoLugarTrabajo')?.value)
    localStorage.setItem('strGrupoSocial','si')
    localStorage.setItem('strGrupoSocialSi',this.formJuridico.get('GrupoSocialReconocido')?.value)
  }
  GuardarDocumentacion(){
    localStorage.setItem('RUT', this.documentacion.get('RUT')?.value)
    localStorage.setItem('SISBEN', this.documentacion.get('SISBEN')?.value)
    localStorage.setItem('RUCOM', this.documentacion.get('RUCOM')?.value)
    localStorage.setItem('origenMineral', this.documentacion.get('origenMineral')?.value)
    localStorage.setItem('ninguna', this.documentacion.get('ninguna')?.value)
    localStorage.setItem('capacitaciones', this.documentacion.get('capacitaciones')?.value)
    localStorage.setItem('otro', this.documentacion.get('otro')?.value)
  }
  GuardarAmbiental(){
    localStorage.setItem( 'capacitacionSeguridadSalud',this.formAmbiental.get('capacitacionSeguridadSalud')?.value)
    localStorage.setItem( 'respCapacitacionseguridadsalud',this.formAmbiental.get('respCapacitacionseguridadsalud')?.value)
    localStorage.setItem( 'capacitacionTecnologiasLimpias',this.formAmbiental.get('capacitacionTecnologiasLimpias')?.value)
    localStorage.setItem( 'respCapacitacionTecnologiasLimpias',this.formAmbiental.get('respCapacitacionTecnologiasLimpias')?.value)
    localStorage.setItem( 'respCapacitacionONG',this.formAmbiental.get('respCapacitacionONG')?.value)
}

}
