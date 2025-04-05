import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, Subject } from 'rxjs';
import { ITour, ITourServerRes } from '../models/tours';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  //type
  private tourTypesSubject = new Subject<any>();
  readonly tourTypes$ = this.tourTypesSubject.asObservable(); 

  //date
  private tourDateSubject = new Subject<Date>();
  readonly tourDate$ = this.tourDateSubject.asObservable();

  constructor(private http: HttpClient) { }

  getTours (): Observable<ITourServerRes> { 
    return this.http.get<ITourServerRes>(API.tours);
  }
  getTourByID(id:string): Observable<ITour> {
    return this.http.get<ITour>(`${API.tours}/${id}`);
  }

  getNearestTourByLocationId(id:string): Observable<ITour[]> {
    return this.http.get<ITour[]>(API.nearestTours, {
      params:{locationId: id}
    });
  }

  searchTours (tours:ITour[], value: string): ITour[] {
    if(Array.isArray(tours)) {
      return tours.filter((tour)=> {
        if(tour&& typeof tour.name === 'string') {
          return tour.name.toLocaleLowerCase().includes(value.toLocaleLowerCase());
        } else {
          return false;
        }

      });
    } else {
      return [];
    }
    }

  initChangeTourType(val:any): void { //todo define type
    this.tourTypesSubject.next(val);
  }
  initChangeTourDate(val:Date): void { //todo define type
    this.tourDateSubject.next(val);
  }
  } 
//сформировать данные как дом. задание

