import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MaterialModule } from './material.module';
import { AddOrEditVehicleComponent } from './modals/add-or-edit-vehicle/add-or-edit-vehicle.component';
import { RmVehicleComponent } from './modals/rm-vehicle/rm-vehicle.component';


const pages_components = [
  HomeComponent,
  AboutComponent,
  AddOrEditVehicleComponent,
  RmVehicleComponent
];

@NgModule({
  declarations: [pages_components],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [pages_components]
})
export class PagesModule { }
