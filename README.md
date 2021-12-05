# **Proyecto WebGis Mineros de subsistencia**
## trabajo de grado universidad San Buenaventura 2021
## Realizado por
- Arango Valle Juan Camilo
- Villa Marín Santiago

# Estructura del proyecto
## Modulos
### **auth**
- Este modulo contiene todos los componentes referentes a la autenticación y creación de usuarios dentro de la aplicación, este modulo además contiene los servicios utilizados en estas páginas.
### **material**
- Este modulo importa los componentes necesarios de Angular Material el cual es un manejador de estilos propio de Angular
### **principal**
- Este modulo contiene las diferentes pantallas de la aplicación principal, como son el `Home`, `formularios`, `inicio`y `mapas`, este modulo además contiene los servicios utilizados en estas páginas.
# Componentes
- auth
    - log-in: 
        Componente que permite el inicio de sesión de los usuarios autenticados a la aplicación
    - registro:
        Componente que permite crear nuevos usuarios en la aplicación

- principal
    - home: 
    Página que muestra la barra de navegación y permite renderizar los demás componentes del proyecto
    - formularios:
    Contiene todos los formularios requeridos para el proyecto y su funcionamiento
    - incio:
    Página principal del poryecto
    - mapas:
    Renderiza un mapa interactivo que permite ver ciertos geoJson y ubicar al usuario
# guards
Permiten la activacion de ciertas rutas si el usuario esta autenticado
# Servicios
## authService
Permiten la conexion con la base de datos y la creación y autenticación de usuarios

## FormulariosService
Permite el ingreso de información de los formularios a la base de datos y la lectura de los mismmos
<hr>

## URL de la aplicación desplegada en Heroku
[Aplicacion desplegada en heroku][url]

[url]:https://webappmineros.herokuapp.com/


# Consideraciones de Angular
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
