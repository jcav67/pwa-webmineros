// To parse this data:
//
//   import { Convert, GeoJSONGIS } from "./file";
//
//   const geoJSONGIS = Convert.toGeoJSONGIS(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface GeoJSONGIS {
    type:     string;
    name:     string;
    crs:      CRS;
    features: Feature[];
}

export interface CRS {
    type:       string;
    properties: CRSProperties;
}

export interface CRSProperties {
    name: string;
}

export interface Feature {
    type:       FeatureType;
    properties: FeatureProperties;
    geometry:   Geometry;
}

export interface Geometry {
    type:        GeometryType;
    coordinates: Array<Array<Array<number[]>>>;
}

export enum GeometryType {
    MultiPolygon = "MultiPolygon",
}

export interface FeatureProperties {
    MAP_NAME:   MapName;
    ID:         string;
    SHAPE_AREA: number;
    SHAPE_LEN:  number;
    CODIGO_EXP: string;
    CODIGO_RMN: string;
    FECHA_INSC: string;
    ESTADO_EXP: EstadoExp;
    MODALIDADE: Modalidade;
    MINERALES:  string;
    TITULARES:  string;
    MUNICIPIOS: string;
    FECHA_TERM: null | string;
}

export enum EstadoExp {
    TituloVigenteEnEjecucion = "TITULO VIGENTE-EN EJECUCION",
    TituloVigenteReactivado = "TITULO VIGENTE-REACTIVADO",
    TituloVigenteSuspendido = "TITULO VIGENTE-SUSPENDIDO",
}

export enum MapName {
    TMIN19ANMIMULKV1Shp = "TMIN19ANMIMULKV1.shp",
}

export enum Modalidade {
    AutorizacionTemporal = "AUTORIZACION TEMPORAL",
    ContratoDeConcesionD2655 = "CONTRATO DE CONCESION (D 2655)",
    ContratoDeConcesionL685 = "CONTRATO DE CONCESION (L 685)",
    LicenciaDeExploracion = "LICENCIA DE EXPLORACION",
    LicenciaDeExploracionContratoDeConcesionL685 = "LICENCIA DE EXPLORACION\\ CONTRATO DE CONCESION (L 685)",
    LicenciaDeExplotacion = "LICENCIA DE EXPLOTACION",
    LicenciaDeExplotacionContratoDeConcesionL685 = "LICENCIA DE EXPLOTACION\\ CONTRATO DE CONCESION (L 685)",
    Permiso = "PERMISO",
    ReconocimientoPropiedadPrivada = "RECONOCIMIENTO PROPIEDAD PRIVADA",
}

export enum FeatureType {
    Feature = "Feature",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toGeoJSONGIS(json: string): GeoJSONGIS {
        return cast(JSON.parse(json), r("GeoJSONGIS"));
    }

    public static geoJSONGISToJson(value: GeoJSONGIS): string {
        return JSON.stringify(uncast(value, r("GeoJSONGIS")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "GeoJSONGIS": o([
        { json: "type", js: "type", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "crs", js: "crs", typ: r("CRS") },
        { json: "features", js: "features", typ: a(r("Feature")) },
    ], false),
    "CRS": o([
        { json: "type", js: "type", typ: "" },
        { json: "properties", js: "properties", typ: r("CRSProperties") },
    ], false),
    "CRSProperties": o([
        { json: "name", js: "name", typ: "" },
    ], false),
    "Feature": o([
        { json: "type", js: "type", typ: r("FeatureType") },
        { json: "properties", js: "properties", typ: r("FeatureProperties") },
        { json: "geometry", js: "geometry", typ: r("Geometry") },
    ], false),
    "Geometry": o([
        { json: "type", js: "type", typ: r("GeometryType") },
        { json: "coordinates", js: "coordinates", typ: a(a(a(a(3.14)))) },
    ], false),
    "FeatureProperties": o([
        { json: "MAP_NAME", js: "MAP_NAME", typ: r("MapName") },
        { json: "ID", js: "ID", typ: "" },
        { json: "SHAPE_AREA", js: "SHAPE_AREA", typ: 3.14 },
        { json: "SHAPE_LEN", js: "SHAPE_LEN", typ: 3.14 },
        { json: "CODIGO_EXP", js: "CODIGO_EXP", typ: "" },
        { json: "CODIGO_RMN", js: "CODIGO_RMN", typ: "" },
        { json: "FECHA_INSC", js: "FECHA_INSC", typ: "" },
        { json: "ESTADO_EXP", js: "ESTADO_EXP", typ: r("EstadoExp") },
        { json: "MODALIDADE", js: "MODALIDADE", typ: r("Modalidade") },
        { json: "MINERALES", js: "MINERALES", typ: "" },
        { json: "TITULARES", js: "TITULARES", typ: "" },
        { json: "MUNICIPIOS", js: "MUNICIPIOS", typ: "" },
        { json: "FECHA_TERM", js: "FECHA_TERM", typ: u(null, "") },
    ], false),
    "GeometryType": [
        "MultiPolygon",
    ],
    "EstadoExp": [
        "TITULO VIGENTE-EN EJECUCION",
        "TITULO VIGENTE-REACTIVADO",
        "TITULO VIGENTE-SUSPENDIDO",
    ],
    "MapName": [
        "TMIN19ANMIMULKV1.shp",
    ],
    "Modalidade": [
        "AUTORIZACION TEMPORAL",
        "CONTRATO DE CONCESION (D 2655)",
        "CONTRATO DE CONCESION (L 685)",
        "LICENCIA DE EXPLORACION",
        "LICENCIA DE EXPLORACION\\ CONTRATO DE CONCESION (L 685)",
        "LICENCIA DE EXPLOTACION",
        "LICENCIA DE EXPLOTACION\\ CONTRATO DE CONCESION (L 685)",
        "PERMISO",
        "RECONOCIMIENTO PROPIEDAD PRIVADA",
    ],
    "FeatureType": [
        "Feature",
    ],
};
