import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../../../material/material.module';
import { ActividadDiariaComponent } from './actividad-diaria.component';

describe('ActividadDiariaComponent', () => {
  let component: ActividadDiariaComponent;
  let fixture: ComponentFixture<ActividadDiariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActividadDiariaComponent ],
      imports:[HttpClientTestingModule, MaterialModule,
        ReactiveFormsModule,
        FormsModule,BrowserAnimationsModule],
      providers:[
        FormBuilder, FormsModule, ReactiveFormsModule
       ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadDiariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
