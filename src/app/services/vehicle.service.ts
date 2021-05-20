import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IvehicleBasic } from '../interfaces/ivehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private server_base_path = 'http://localhost:2424/vehicle/';
  constructor(
    private http:HttpClient
  ) { }

  public get_list():Promise<IvehicleBasic[]|null>{
    return new Promise((resolve, reject) => {
      this.http.get<IvehicleBasic>(this.server_base_path + 'all/').subscribe((objs:any) => {
        
        resolve(objs);
      }, (err) => {
        reject(err);
      })
    })
  }

  public create(vehicle:IvehicleBasic):Promise<IvehicleBasic>{
    return new Promise((resolve, reject) => {
      this.http.post(this.server_base_path, vehicle).subscribe((obj:any) => {
        resolve(obj);
      },(err) => {
        reject(err);
      });
    })
  }

  public edit(id:string, vehicle:IvehicleBasic):Promise<IvehicleBasic>{
    return new Promise((resolve, reject) => {
      this.http.patch(this.server_base_path + id, vehicle).subscribe((obj:any) => {
        resolve(obj);
      }, (err) => {
        reject(err);
      })
    })
  }

  public remove(id:string,):Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.http.delete(this.server_base_path + id).subscribe((obj:any) => {
        resolve(obj);
      }, (err) => {
        reject(err);
      })
    })
  }
}
