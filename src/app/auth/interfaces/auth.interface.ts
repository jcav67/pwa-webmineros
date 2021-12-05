export interface authResponse{
    ok: boolean,
    nombre?: string,
    idMinero?:string,
    jwt ?: string,
    email?:string,
    msg?:string
}

export interface Usuario{
    idMinero?:string,
    nombre?:string,
    email?:string
}