export interface RespDatosEconomico {
    ok:        boolean;
    Economico: Economico[];
}

export interface Economico {
    intIdMinero:       number;
    strNombre:         string;
    strApellido:       string;
    intAnosMinero:     number;
    intLaborames:      number;
    fltIngresoMensual: number;
    intGrupoFamiliar:  number;
    intCompraVenta:    number;
    strLugarVenta:     string;
}

export interface RespDatosMinero {
    ok:          boolean;
    DatosMinero: DatosMinero[];
}

export interface DatosMinero {
    strIdentificacion:     string;
    strTipoIdentificacion: string;
    strTipoPersona:        string;
    strGenero:             string;
    strNombre:             string;
    strApellido:           string;
    strTelefono:           string;
    strEmail:              string;
}

export interface formReponse{
    ok: boolean,
    msg?:string
}


export interface RegistroMinero {
    intIdRegistroMinero:    number;
    strUnidadMedida:        string;
    fltCantidadRecolectada: number;
    strMaterialRecolectado: string;
    strFechaRecoleccion:    string;
}
export interface RespRegistroMinero{
    ok: boolean,
    RegistroMinero:RegistroMinero[]
    
}


export interface RespDatosMineros {
    ok:          boolean;
    DatosMinero: DatosMinero[];
}

export interface DatosMinero {
    strIdentificacion:     string;
    strTipoIdentificacion: string;
    strTipoPersona:        string;
    strGenero:             string;
    strNombre:             string;
    strApellido:           string;
    strTelefono:           string;
}

export interface RespDatosTecnico {
    ok:      boolean;
    Tecnico: Tecnico[];
}

export interface Tecnico {
    intIdMinero:                    number;
    strNombre:                      string;
    strApellido:                    string;
    intTipoMineroBarequero:         number;
    intTipoMineroChatarrero:        number;
    intTipoMineroOtro:              number;
    intTipoMetalOro:                number;
    intTipoMetalPlata:              number;
    intTipoMetalPlatino:            number;
    intTipoMaterialArenaGrava:      number;
    intTipoMaterialArcilla:         number;
    intTipoPiedraPreciosaEsmeralda: number;
    intTipoPiedraPreciosaMorallas:  number;
    intTipoOtro:                    number;
    intProdMensual:                 number;
}

export interface RespDatosSocial {
    ok:     boolean;
    Social: Social[];
}

export interface Social {
    intIdMinero:         number;
    strNombre:           string;
    strApellido:         string;
    strGradoEscolaridad: string;
    strEstadoCivil:      string;
    strTipoVivienda:     string;
    intLeescribir:       number;
    strAfiliacion:       string;
    strNombreAsociacion: string;
}

export interface RespDatosJuridico {
    ok:       boolean;
    Juridico: Juridico[];
}

export interface Juridico {
    intIdMinero:         number;
    strNombre:           string;
    strApellido:         string;
    strTrabajoPropPub:   string;
    strTrabajoPropPubSi: string;
    strPropEst:          string;
    strPropEstSi:        string;
    strComNegra:         string;
    strComNegraSi:       string;
    strAreaProhibida:    string;
    strAreaProhibidaSi:  string;
    strVecino:           string;
    strNoVecino:         string;
    strGrupoSocial:      string;
    strGrupoSocialSi:    string;
}
export interface RespDocumentacion {
    ok:            boolean;
    Documentacion: Documentacion[];
}

export interface Documentacion {
    intIdMinero:       number;
    strNombre:         string;
    strApellido:       string;
    intRut:            number;
    intSisben:         number;
    intRucom:          number;
    intOrigenMIneral:  number;
    intCapacitaciones: number;
    intOtro:           number;
    intNinguna:        number;
}

export interface RespAmbiental {
    ok:              boolean;
    MineroAmbiental: MineroAmbiental[];
}

export interface MineroAmbiental {
    intIdMinero:          number;
    strNombre:            string;
    strApellido:          string;
    strCapSeguridadSalud: string;
    strCapssRespuesta:    string;
    strCaptecnologia:     string;
    intCaptecRespuesta:   string;
    strCapOng:            string;
}