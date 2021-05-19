import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { MaterialModule } from './material.module';


const pages_components = [
  HomeComponent,
  AboutComponent
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
