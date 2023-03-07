import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GasStation } from '../models/gas-station';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class GasService {
  BASE_URL: string = 'http://192.168.0.34:3000/';
  constructor(private http: HttpClient) { }

  /**  GET gas api */
  getGasStation(): Observable<GasStation[]> {
    console.log('---------------<Entrou>----Service------- 0')
    
    var url: string = this.BASE_URL + 'gas-stations';
    console.log(url)
    return this.http.get<GasStation[]>(url)
  }
  
  addGasStation(gas: any): Observable<GasStation> {
    console.log(gas);
    var url: string = this.BASE_URL + 'gas-stations';
    return this.http.post<GasStation>(url, gas, httpOptions);
  }

  /**  PUT gas api EDIT gas Function  */
  editGasStation(gas: any): Observable<GasStation> {
    var url: string = this.BASE_URL + 'gas-stations/' + gas.id;;
    return this.http.put<GasStation>(url, gas, httpOptions);
  }

  deleteGasStation(gas: GasStation | string): Observable<GasStation> {
    const id = typeof gas === 'string' ? gas : gas.id;
    var url: string = this.BASE_URL + 'gas-stations/' + id;
    return this.http.delete<GasStation>(url, httpOptions);
  }

  deleteUser(gas: GasStation | string): Observable<GasStation> {
    const id = typeof gas === 'string' ? gas : gas.id;
    var url: string = this.BASE_URL + 'gas-stations/' + id;
    return this.http.delete<GasStation>(url, httpOptions);
  }

  
}
