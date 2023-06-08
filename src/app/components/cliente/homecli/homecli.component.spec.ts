import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecliComponent } from './homecli.component';

describe('HomecliComponent', () => {
  let component: HomecliComponent;
  let fixture: ComponentFixture<HomecliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomecliComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomecliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
