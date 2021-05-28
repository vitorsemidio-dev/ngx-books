import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaDetalheComponent } from './biblioteca-detalhe.component';

describe('BibliotecaDetalheComponent', () => {
  let component: BibliotecaDetalheComponent;
  let fixture: ComponentFixture<BibliotecaDetalheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibliotecaDetalheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibliotecaDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
