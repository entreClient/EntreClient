import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsliderComponent } from './matslider.component';

describe('MatsliderComponent', () => {
  let component: MatsliderComponent;
  let fixture: ComponentFixture<MatsliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatsliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatsliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
