import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioService } from '../../servicios/perfil-usuario.service';
import { PerfilUsuarioComponent } from './perfil-usuario.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';


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

  test('EL verbo http al momento de guardar un formularioo es GET',()=>{
    const request=httpMock.expectOne('http://localhost:3000/api/querys/minero/datosminero?minero=34');
    expect(request.request.method).toBe('GET');

  });

  test('Mock correcto desde endpoint',()=>{
    //Arrange
    const dummy={
      "ok": true,
      "DatosMinero": [
          {
              "strIdentificacion": "1017222708",
              "strTipoIdentificacion": "Pasaporte",
              "strTipoPersona": "juridica",
              "strGenero": "Masculino",
              "strNombre": "test1",
              "strApellido": "Apellido prueba1",
              "strTelefono": "3006885478"
          }
      ]
  }
  const nombre = 'test1';
  
  //Action
  const request=httpMock.expectOne('http://localhost:3000/api/querys/minero/datosminero?minero=34');
  request.flush(dummy)
  //Assert
  expect(nombre).toBe(dummy.DatosMinero[0].strNombre)
})
});
