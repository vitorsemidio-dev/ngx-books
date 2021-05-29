import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardItemLivroComponent } from './card-item-livro.component';

describe('CardItemLivroComponent', () => {
  let component: CardItemLivroComponent;
  let fixture: ComponentFixture<CardItemLivroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardItemLivroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardItemLivroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
