import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioService } from '../../servicios/perfil-usuario.service';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


describe('PerfilUsuarioComponent', () => {
  let component: PerfilUsuarioComponent;
  let fixture: ComponentFixture<PerfilUsuarioComponent>;
  let compile:HTMLElement;
  let service:PerfilUsuarioService;
  let httpMock:HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilUsuarioComponent ],
      imports:[HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,],
      providers:[PerfilUsuarioService, FormBuilder,
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUsuarioComponent);
    component = fixture.componentInstance;
    service=TestBed.inject(PerfilUsuarioService);
    httpMock=TestBed.inject(HttpTestingController);

    fixture.detectChanges();
    compile=fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('Debe ser igual al snapshot',()=>{
    expect(compile.innerHTML).toMatchSnapshot();

  });

  test('la informacion debe guardarse en local storage',()=>{
    const request=httpMock.expectOne('http://localhost:3000/api/querys/minero/datosminero?minero=5');
    expect(request.request.method).toBe('GET');


  });

  test('Guardado de datos en el local storage',()=>{
    const dummy={
      "ok": true,
      "DatosMinero": [
          {
              "strIdentificacion": "1017222708",
              "strTipoIdentificacion": "Pasaporte",
              "strTipoPersona": "juridica",
              "strGenero": "Masculino",
              "strNombre": "Camilo Arango",
              "strApellido": "Apellido prueba1",
              "strTelefono": "3006885478"
          }
      ]
  }
    const request=httpMock.expectOne('http://localhost:3000/api/querys/minero/datosminero?minero=5');
    request.flush(dummy)
    const Nombre = localStorage.getItem('perfilNombre');
    expect(Nombre).toBe(dummy.DatosMinero[0].strNombre)
  })


});
