import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../../src/environments/environment';
import { ActividadDiariaService } from './actividad-diaria.service';

describe('ActividadDiariaService', () => {
  let service: ActividadDiariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientModule
      ]
      
    });
    service = TestBed.inject(ActividadDiariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  test('traer actividad',(done)=>{
    service.leerRegistroMinero().subscribe((resp)=>{
      expect(resp[0].strUnidadMedida).toBe('Kilogramo');
      done();
    }

    )
  })
});
