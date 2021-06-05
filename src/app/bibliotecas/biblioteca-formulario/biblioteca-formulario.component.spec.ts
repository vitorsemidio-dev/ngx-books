import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaFormularioComponent } from './biblioteca-formulario.component';

describe('BibliotecaFormularioComponent', () => {
  let component: BibliotecaFormularioComponent;
  let fixture: ComponentFixture<BibliotecaFormularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaFormularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
