import { DecimalPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../../environments/environment';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { IvehicleBasic } from 'src/app/interfaces/ivehicle';
import { MatDialog } from '@angular/material/dialog';
import { AddOrEditVehicleComponent } from 'src/app/modals/add-or-edit-vehicle/add-or-edit-vehicle.component';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class HomeComponent implements OnInit, AfterViewInit {

  application_title:string = environment.application_title;
  expandedElement!: IvehicleBasic | null;
  isLoading = false;
  ELEMENT_DATA: IvehicleBasic[] = [
    { ano: 1999, chassi:'BD456867', id:'1234567ujndf-dfwqfqnmfio-14561', marca:'Volkswagen', modelo: 'FOX', placa: 'KYW5466', renavam: '12365487923', fipe: ''}
  ];

  displayedColumns: string[] = ['id', 'placa', 'chassi', 'renavam', 'modelo', 'marca', 'ano', 'fipe', 'option'];
  mobileDisplayedColumns: string[] = ['renavam'];
  
  dataSource = new MatTableDataSource<IvehicleBasic>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.showFirstLastButtons = false;
    this.paginator._intl.getRangeLabel = (page: number, pageSize: number, length: number) => {
      return '';
    };
  }
  constructor(
    private dialogService:MatDialog
  ) {
  }

  ngOnInit(): void {
    
  }

  private editOrCreateModalCaller(element?:IvehicleBasic):Promise<any>{
    return new Promise((resolve, reject) => {
      const diagRef = this.dialogService.open(AddOrEditVehicleComponent, {
        data: element ? element : null,
        disableClose: true,
        panelClass: 'modal-default'
      });

      diagRef.afterClosed().subscribe((result) => {
        resolve(result);
      })
    })
    
  }

  create(){
    this.editOrCreateModalCaller().then((result) => {
      console.log(result);
    })
  }

  edit(element:IvehicleBasic){
    this.editOrCreateModalCaller(element).then((result) => {
      console.log(result);
    })
  }

  remove(element:IvehicleBasic){
    console.log('removeu', element);
  }

}
