import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  url : string = "http://localhost:3000/employees/"
  constructor(private _http: HttpClient) {
  }
  getEmployees() {
   return this._http.get(this.url);
  }
  addEmployee(data : any){
    return this._http.post(this.url,data);
  }
  deleteEmployee(id: number){
   return this._http.delete(this.url+id);
  }
  updateEmployee(id: number, data: any) {
    return this._http.put(this.url+id, data)
  }
}
