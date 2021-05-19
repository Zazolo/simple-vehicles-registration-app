import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IvehicleBasic } from 'src/app/interfaces/ivehicle';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'app-add-or-edit-vehicle',
  templateUrl: './add-or-edit-vehicle.component.html',
  styleUrls: ['./add-or-edit-vehicle.component.scss']
})
export class AddOrEditVehicleComponent implements OnInit {

  modalForm = new FormGroup({
    marca: new FormControl(),
    modelo: new FormControl(),
    renavam: new FormControl(),
    placa: new FormControl(),
    chassi: new FormControl(),
    ano: new FormControl(),
  });
  optionMarca: string[] = ['One', 'Two', 'Three'];
  optionModelo: string[] = ['Fusca', 'Gol', 'Tinder'];
  filteredOptionsMarca!: Observable<string[]>;
  filteredOptionsModelo!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptionsMarca = this.modalForm.valueChanges
      .pipe(
        startWith(''),
        
        map(value => this._filter('marca', value))
      );

    this.filteredOptionsModelo = this.modalForm.valueChanges
      .pipe(
        startWith(''),
        
        map(value => this._filter('modelo', value))
      );
  }

  private _filter(modo:string, value: string|number): string[] {
    if(typeof value != 'string'){
      value = value.toString();
    }
    const filterValue = value.toLowerCase();

    if(modo == 'marca'){
      return this.optionMarca.filter(option => option.toLowerCase().includes(filterValue));
    }

    if(modo == 'modelo'){
      return this.optionModelo.filter(option => option.toLowerCase().includes(filterValue));
    }

    return [];
  }


  isCreating = this.data ? false : true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: IvehicleBasic,
    private diagRef: MatDialogRef<AddOrEditVehicleComponent>
  ) { }


  regOrEdit(){
    console.log(this.modalForm.value)
  }

  cancel(){
    this.diagRef.close(null);
  }

}
