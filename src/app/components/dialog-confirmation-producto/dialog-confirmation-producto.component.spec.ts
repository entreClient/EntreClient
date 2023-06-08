import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmationProductoComponent } from './dialog-confirmation-producto.component';

describe('DialogConfirmationProductoComponent', () => {
  let component: DialogConfirmationProductoComponent;
  let fixture: ComponentFixture<DialogConfirmationProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogConfirmationProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirmationProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
