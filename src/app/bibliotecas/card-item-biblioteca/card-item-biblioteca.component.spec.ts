import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemBibliotecaComponent } from './card-item-biblioteca.component';

describe('CardItemBibliotecaComponent', () => {
  let component: CardItemBibliotecaComponent;
  let fixture: ComponentFixture<CardItemBibliotecaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardItemBibliotecaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemBibliotecaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
