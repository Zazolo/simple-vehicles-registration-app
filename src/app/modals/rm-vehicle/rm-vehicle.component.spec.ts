import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmVehicleComponent } from './rm-vehicle.component';

describe('RmVehicleComponent', () => {
  let component: RmVehicleComponent;
  let fixture: ComponentFixture<RmVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
