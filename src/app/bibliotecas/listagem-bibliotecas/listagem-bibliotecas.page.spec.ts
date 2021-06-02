import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemBibliotecasPage } from './listagem-bibliotecas.page';

describe('ListagemBibliotecasPage', () => {
  let component: ListagemBibliotecasPage;
  let fixture: ComponentFixture<ListagemBibliotecasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemBibliotecasPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemBibliotecasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
