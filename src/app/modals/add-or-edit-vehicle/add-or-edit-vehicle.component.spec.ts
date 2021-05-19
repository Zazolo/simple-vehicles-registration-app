import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrEditVehicleComponent } from './add-or-edit-vehicle.component';

describe('AddOrEditVehicleComponent', () => {
  let component: AddOrEditVehicleComponent;
  let fixture: ComponentFixture<AddOrEditVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOrEditVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrEditVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
