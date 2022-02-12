import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiserveService {
  constructor(private _http: HttpClient) {}

  //CONNECT FRONTEND TO BACKEND

  apiUrl = 'http://localhost:8080/song';

  // READ ALL DATA (GET)

  getAllData(): Observable<any> {
    return this._http.get(`${this.apiUrl}`);
  }

  //CREATE SINGLE DATA (POST)

  createData(data: any): Observable<any> {
    //console.log(data, 'createapi=>');

    return this._http.post(`${this.apiUrl}`, data);
  }

  // DELETE SINGLE DATA(DELETE)

  deleteData(id: any): Observable<any> {
    let ids = id;
    return this._http.delete(`${this.apiUrl}/${ids}`);
  }

  //UPDATE SINGLE DATA(PUT)

  updateData(data: any, id: any): Observable<any> {
    let ids = id;
    return this._http.put(`${this.apiUrl}/${ids}`, data);
  }

  //GET SINGLE DATA
  getSingleData(id: any): Observable<any> {
    let ids = id;
    return this._http.get(`${this.apiUrl}/${ids}`);
  }
}
