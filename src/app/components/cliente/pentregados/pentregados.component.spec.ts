import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PentregadosComponent } from './pentregados.component';

describe('PentregadosComponent', () => {
  let component: PentregadosComponent;
  let fixture: ComponentFixture<PentregadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PentregadosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PentregadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
