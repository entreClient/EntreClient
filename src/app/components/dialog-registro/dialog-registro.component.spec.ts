import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRegistroComponent } from './dialog-registro.component';

describe('DialogRegistroComponent', () => {
  let component: DialogRegistroComponent;
  let fixture: ComponentFixture<DialogRegistroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogRegistroComponent]
    });
    fixture = TestBed.createComponent(DialogRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
