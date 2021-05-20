import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IvehicleBasic } from 'src/app/interfaces/ivehicle';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { VehicleService } from 'src/app/services/vehicle.service';
@Component({
  selector: 'app-add-or-edit-vehicle',
  templateUrl: './add-or-edit-vehicle.component.html',
  styleUrls: ['./add-or-edit-vehicle.component.scss']
})
export class AddOrEditVehicleComponent implements OnInit {

  step = 0;
  modalForm = new FormGroup({
    marca: new FormControl('', [Validators.required, Validators.minLength(2)]),
    modelo: new FormControl('', [Validators.required, Validators.minLength(2)]),
    renavam: new FormControl('', [Validators.required, Validators.minLength(9), Validators.maxLength(11)]),
    placa: new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]),
    chassi: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(17)]),
    ano: new FormControl('', [Validators.required, Validators.min(1500), Validators.max(2021)]),
  });
  optionMarca: string[] = ['One', 'Two', 'Three'];
  optionModelo: string[] = ['Fusca', 'Gol', 'Tinder'];
  filteredOptionsMarca!: Observable<string[]>;
  filteredOptionsModelo!: Observable<string[]>;
  errorMessage = '';
  ngOnInit() {

    if(this.data){
      this.modalForm.get('marca')?.setValue(this.data?.marca);
      this.modalForm.get('modelo')?.setValue(this.data?.modelo);
      this.modalForm.get('renavam')?.setValue(this.data?.renavam);
      this.modalForm.get('placa')?.setValue(this.data?.placa);
      this.modalForm.get('chassi')?.setValue(this.data?.chassi);
      this.modalForm.get('ano')?.setValue(this.data?.ano);
    }

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
    private diagRef: MatDialogRef<AddOrEditVehicleComponent>,
    private vehicleService: VehicleService
  ) { }


  regOrEdit(){
    this.step = 1;
    if(this.modalForm.valid){
      if(this.isCreating){
        this.vehicleService.create(this.modalForm.value).then((out) => {
          this.step = 2;
        }).catch((err) => {
          this.step = 3;
          this.errorMessage = err.error;
          console.log(err);
        })
      } else {
        this.vehicleService.edit(this.data.id, this.modalForm.value).then((out) => {
          this.step = 2;
        }).catch((err) => {
          this.step = 3;
          this.errorMessage = err.error;
          console.log(err);
        })
      }
    }
    
  }

  cancel(){
    this.diagRef.close(null);
  }

  finish(){
    this.diagRef.close('reload');
  }

  backTopFirstStep(){
    this.step = 0;
  }


}
