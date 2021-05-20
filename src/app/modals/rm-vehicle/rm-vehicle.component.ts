import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IvehicleBasic } from 'src/app/interfaces/ivehicle';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-rm-vehicle',
  templateUrl: './rm-vehicle.component.html',
  styleUrls: ['./rm-vehicle.component.scss']
})
export class RmVehicleComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IvehicleBasic,
    private diagRef: MatDialogRef<RmVehicleComponent>,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

  remove(){
    this.vehicleService.remove(this.data.id).then((r) => {
      this.diagRef.close('reload');
    })
  }
}

