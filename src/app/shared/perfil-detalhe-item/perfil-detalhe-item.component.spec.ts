import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilDetalheItemComponent } from './perfil-detalhe-item.component';

describe('PerfilDetalheItemComponent', () => {
  let component: PerfilDetalheItemComponent;
  let fixture: ComponentFixture<PerfilDetalheItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilDetalheItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilDetalheItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
