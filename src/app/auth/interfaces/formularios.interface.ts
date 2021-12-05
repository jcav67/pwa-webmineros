export interface formEconomico{
    strNombre?:string,
    strApellido?:string,
    intAnosMinero:number,
    intLaborames:number,
    fltIngresoMensual:number,
    intGrupoFamiliar:number,
    intCompraVenta:number,
    strLugarVenta:string
}
export interface respEconomico{
    ok:boolean,
    Economico:formEconomico
    
}

export interface formMinero{
    strNombreDepartamento?:string,
    strNombreMunicipio?:string,
    strTipoIdentificacion:string,
    strIdentificacion:string,
    strTipoPersona:string,
    strGenero:string,       
    strTelefono:string,
    intIdminero:number
}
export interface respMinero{
    ok:boolean,
    DatosMinero:formMinero
    
}

export interface formReponse{
    ok: boolean,
    msg?:string
}
