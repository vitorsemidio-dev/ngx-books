import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgItemComponent } from './img-item.component';

describe('ImgItemComponent', () => {
  let component: ImgItemComponent;
  let fixture: ComponentFixture<ImgItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImgItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImgItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
