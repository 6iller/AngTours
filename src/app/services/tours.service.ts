import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';
import { ITours, ITourServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours (): Observable<ITourServerRes> { 
    return this.http.get<ITourServerRes>(API.tours);
  }
  getTourByID(id:string): Observable<ITours> {
    // const path = API.tours+ '/' +id;
    return this.http.get<ITours>(`${API.tours}/${id}`);
  }
}

//сформировать данные как дом. задание

