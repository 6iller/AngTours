import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  constructor(private http: HttpClient) { }

  getTours (): Observable<any> { // TODO add types for responce
    return this.http.get(API.tours);
  }

}

//сформировать данные как дом. задание