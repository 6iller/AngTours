import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { catchError, delay, forkJoin, map, Observable, Subject, switchMap, tap, of, withLatestFrom, BehaviorSubject } from 'rxjs';
import { Coords, ICountriesResponseItem, IFilterTypeLogic, ITour, ITourServerRes, TourType } from '../models/tours';
import { MapService } from './map.service';
import { LoaderService } from './loader.service';
import { set } from 'date-fns';
import { BasketService } from './basket.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  //type
  private tourTypesSubject = new Subject<TourType>();// !IFilterTypeLogic
  readonly tourTypes$ = this.tourTypesSubject.asObservable(); 

  //date
  // private tourDateSubject = new Subject<Date>();
  private tourDateSubject = new BehaviorSubject<Date | null>(null); // Используем BehaviorSubject<Date | null> для календаря
  readonly tourDate$ = this.tourDateSubject.asObservable();

  private showBasketOnlySubject = new BehaviorSubject<boolean>(false);
  showBasketOnly$ = this.showBasketOnlySubject.asObservable();

  constructor(private http: HttpClient, private mapService: MapService, private loaderService: LoaderService, private basketService: BasketService) { }

  // getTours (): Observable<ITourServerRes> {  //lection: ITour[] 
  //   const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
  //   const tours = this.http.get<ITourServerRes>(API.tours); // проверить 
  //   // return this.http.get<ITourServerRes>(API.tours);
  //   return forkJoin<[ICountriesResponseItem[], ITourServerRes]>([countries,tours]).pipe (
  //     map((data)=>{
  //       let toursWithCountries = [] as ITour[];
  //       const tourArr = data[1].tours;
  //       const countriesMap = new Map();
        
      //   data[0].forEach(country =>{
      //     countriesMap.set(country.iso_code2, country);
      //   });
        
      //   if (Array.isArray(tourArr)) {
      //     console.log('***toursArr', tourArr)
      //     toursWithCountries = tourArr.map((tour)=>{
      //       return {
      //         ...tour,
      //         country: countriesMap.get(tour.code) || null // add new prop
      //       }
      //     });
      //   } 
      //   return toursWithCountries;
      // }
//       countriesResponse.forEach(country => {
//         countriesMap.set(country.iso_code2, country);
//       });

//       if (Array.isArray(tourArr)) {
//         console.log('***toursArr', tourArr);
//         toursWithCountries.push(...tourArr.map((tour) => {
//           return {
//             ...tour,
//             country: countriesMap.get(tour.code) || null // добавляем новое свойство
//           };
//         }));
//       }

//       // Возвращаем объект с массивом туров внутри свойства 'tours'
//       return { tours: toursWithCountries }; // Изменяем здесь
//     })
//   );
// }
getTours(): Observable<ITourServerRes> {
  // set loader
  this.loaderService.setLoader(true);
  const countries = this.http.get<ICountriesResponseItem[]>(API.countries);
  const tours = this.http.get<ITourServerRes>(API.tours);

  return forkJoin<[ICountriesResponseItem[], ITourServerRes]>([countries, tours]).pipe(
    delay(1000),
    // withLatestFrom(this.basketService.basketStore$),
    map(([countriesResponse, toursResponse]) => { // Объявляем переменные
      const toursWithCountries: ITour[] = []; // Инициализируем массив для туров
      const tourArr = toursResponse.tours; // Получаем массив туров из ответа
      const countriesMap = new Map<string, ICountriesResponseItem>(); // Создаем карту для стран

      // Заполняем карту странами
      countriesResponse.forEach((country) => {
        countriesMap.set(country.iso_code2, country);
      });

      if (Array.isArray(tourArr)) {
        console.log('***toursArr', tourArr);
        toursWithCountries.push(...tourArr.map((tour) => {
          return {
            ...tour,
            country: countriesMap.get(tour.code) || null // добавляем новое свойство
          };
        }));
      }

      // Возвращаем объект с массивом туров внутри свойства 'tours'
      return { tours: toursWithCountries }; // Возвращаем корректный объект
    }),
    tap((data)=> {
      // hide loader
      this.loaderService.setLoader(false);
    }),
    catchError((err)=>{
      this.loaderService.setLoader(false);
      return of(null);
    })
  );
}
  
  getTourByID(id:string): Observable<ITour> {
    return this.http.get<ITour>(`${API.tour}/${id}`);
  }
  
  deleteTourByID(id:string): Observable<ITour> {
    return this.http.delete<ITour>(`${API.tours}/${id}`);
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

  initChangeTourType(type: TourType): void { 
    this.tourTypesSubject.next(type);
  }
  // initChangeTourDate(date:Date): void { 
  //   this.tourDateSubject.next(date);
  // }
  // для календаря меняем метод выше на:
  initChangeTourDate(date: Date | null): void {
    this.tourDateSubject.next(date); // Передаем null для очистки
}

  getCountryByCode(code:string):Observable<any> {
    return this.http.get<Coords[]>(API.countryByCode, {params: {codes:code}}).pipe(
      //send new data
      map((countryDataArr)=>countryDataArr[0]),
     
      // send new Observable
     
      switchMap((countryData)=>{
      console.log('countryData', countryData);
      const coords = {lat: countryData.latlng[0], lng: countryData.latlng[1]};
        //new Observable
        return this.mapService.getWeather(coords).pipe(
          map((weatherResponse)=>{
            const current = weatherResponse.current;
            const hourly = weatherResponse.hourly;
            const weatherData = {
              isDay: current.is_day,
              snowfall: current.snowfall,
              rain: current.rain,
              currentWeather: hourly.temperature_2m[15] // индекс 15 для времени температуры
            };
            console.log('weatherData', weatherData)
            return {countryData, weatherData}
          })
        )
      }
    
    ),
    );
  }
  postOrder(orderBody:any): Observable<any> {
    return this.http.post<any>(API.order,orderBody);
  }
  initShowBasketOnly(show: boolean): void {
    this.showBasketOnlySubject.next(show);
  }

  

  } 

