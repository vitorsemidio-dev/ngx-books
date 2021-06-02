import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemLivrosPage } from './listagem-livros.page';

describe('ListagemLivrosPage', () => {
  let component: ListagemLivrosPage;
  let fixture: ComponentFixture<ListagemLivrosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListagemLivrosPage ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemLivrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
