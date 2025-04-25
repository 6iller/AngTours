import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule, SlicePipe } from '@angular/common';
import { ICombinedData, ICountriesResponseItem, ILocation, ITour } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { isSameDay, isValid } from "date-fns";
import { combineLatest, Subject, Subscription } from 'rxjs';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { startWith, takeUntil } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog' 
import { MapComponent } from '../../shared/components/map/map/map.component';
import { BasketService } from '../../services/basket.service';




@Component({
  selector: 'app-tours',
  imports: [
    CardModule, 
    InputGroupModule, 
    InputGroupAddonModule, 
    ButtonModule, 
    InputTextModule, 
    SlicePipe, 
    SearchPipe, 
    FormsModule, 
    HighlightDirective,
    MapComponent,
    DialogModule,
    CommonModule,
    SlicePipe
  ], //SlicePipe
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class ToursComponent implements OnInit, OnDestroy{ 
  tours: ITour[] = [];
  toursStore: ITour[]=[];
  searchValue = '';
  destroyer = new Subject<boolean>();
  showModal=false;
  location: ILocation = null;
  weatherData: ICombinedData["weatherData"] | null = null;
  country: ICountriesResponseItem | null = null;
  weatherInfo: any = {day: null, rain: null};
  selectedTour: ITour = null;

  // typeTourFilter: IFilter 
  // typeTourSubscriber: Subscription;
  // dateTourSubscriber: Subscription;

  constructor(private toursService: ToursService, 
    private route: ActivatedRoute,
    private router: Router,
    public basketService: BasketService
  
  ){}
     

  // ngOnInit(): void {
    
  //   //tour
  //   // this.typeTourSubscriber = this.toursService.tourTypes$.subscribe((tour)=>{
  //   //   this.typeTourFilter = tour;
  //   //   this.initTourFilterLogic();
  //   // });

  //   // добавляем takeUntill в подписку на типы туров
  //   // this.toursService.tourTypes$.subscribe ((tour)=>{
  //     this.toursService.tourTypes$.pipe(
  //       takeUntil(this.destroyer) // Используем takeUntil
  //     ).subscribe((tour) => {
  //   console.log('tour', tour)
  //     switch(tour.key) {
  //       case 'group':
  //         this.tours=this.toursStore.filter((el)=> el.type==='group')
  //         break;
  //         case 'single':
  //           this.tours=this.toursStore.filter((el)=> el.type==='single')
  //           break;
  //           case 'all':
  //           this.tours=[...this.toursStore];
  //           break;
  //     }
  //   });

  //   // Date
  //   // переделываем для использования takeUntill
  //   //this.toursService.tourDate$.subscribe((date)=> {
  //     this.toursService.tourDate$.pipe(
  //       takeUntil(this.destroyer) // Используем takeUntil
  //     ).subscribe((date) => {
  //   console.log('****date', date)
  //     this.tours = this.toursStore.filter((tour) => {
  //       if (isValid(new Date(tour.date))) {
  //         const tourDate = new Date(tour.date).setHours(0,0,0,0);
  //         console.log('****tourDate', tourDate)
  //         const calendarDate = new Date(date).setHours(0,0,0);
  //         console.log('****calendarDate', calendarDate);
  //         return tourDate === calendarDate;

  //       } else {
  //         return false;
  //       }
  //     });
  //   })


  //   console.log ('activatedRoute', this.route)
  //   //получение туров - используем takeUntill
  //   // this.toursService.getTours().subscribe((data) =>{
  //     this.toursService.getTours().pipe(
  //       takeUntil(this.destroyer) // Используем takeUntil
  //     ).subscribe((data) => {
  //     if(Array.isArray(data?.tours)){
  //       this.tours = data.tours;
  //       this.toursStore=[...data.tours];
  //     }
  //   });
  // }

  // новый ngOnInit для календаря
  ngOnInit(): void {
    this.toursService.getTours().pipe(
        takeUntil(this.destroyer)
    ).subscribe((data) => {
        if (Array.isArray(data?.tours)) {
            this.tours = data.tours;
            this.toursStore = [...data.tours];
        }
    });

    combineLatest([
      this.toursService.tourTypes$.pipe(startWith(null)), // Добавляем startWith(null)
      this.toursService.tourDate$.pipe(startWith(null))   // Добавляем startWith(null)
  ]).pipe(
      takeUntil(this.destroyer)
  ).subscribe(([type, date]) => {
      this.tours = [...this.toursStore];

        if (type) {
            switch (type.key) {
                case 'group':
                    this.tours = this.tours.filter(el => el.type === 'group');
                    break;
                case 'single':
                    this.tours = this.tours.filter(el => el.type === 'single');
                    break;
            }
        }

        if (date && isValid(date)) {
            this.tours = this.tours.filter(tour => {
                // Создаем НОВЫЕ объекты Date для сравнения
                const tourDate = new Date(tour.date);
                const calendarDate = new Date(date);
                return isSameDay(tourDate, calendarDate); // Используем isSameDay из date-fns
            });
        }
    });
}


  ngOnDestroy(): void {
    this.destroyer.next(true); // Уведомляем об отписке
    this.destroyer.complete(); // Завершаем Subject
  }
goToTour (item: ITour): void {
  this.router.navigate(['tour', item.id], {relativeTo: this.route});
}

searchTour (ev:Event): void {
  const target = ev.target as HTMLInputElement;
  const targetValue = target.value;
  this.tours = this.toursService.searchTours(this.toursStore, targetValue);
}

selectActive (index: number): void {
  console.log('index', index)
  const targetTour = this.tours.find((tour, i)=> i ===index);
  if (targetTour) {
    this.goToTour(targetTour);
  }
}

getCountryDetail(ev:Event, code:string, tour: ITour): void {
  ev.stopPropagation();
  this.toursService.getCountryByCode(code).pipe(
    takeUntil(this.destroyer) // Добавляем управление подпиской
  ).subscribe((data: ICombinedData)=>{
    if((data && data.countryData && data.weatherData)) {
      const countryInfo = data.countryData;
      this.country = countryInfo; // Сохраняем countryInfo 
      console.log('countryInfo', countryInfo)
      this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};
      this.weatherData = data.weatherData; // Сохраняем weatherData
      this.weatherInfo.day = this.weatherData.isDay ? 'День' : 'Ночь'
      this.selectedTour=tour;
      this.showModal = true;
    } else {
      console.error("ошибка данных");
    }
  });
}

setItemToBasket (ev: Event, item: ITour): void {
  ev.stopPropagation();
  this.basketService.setItemToBasket(item);
}
removeItemFromBasket (ev: Event, item: ITour):void {
  ev.stopPropagation();
  this.basketService.removeItemFromBasket(item);
}
trackById(index: number, item: ITour): any {
  return item.id; //   идентификатор тура для кода шаблона V.2 работы корзины
}


}
