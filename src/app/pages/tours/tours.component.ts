import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { CountryWeatherData, ICountriesResponseItem, ILocation, ITour } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { isValid } from "date-fns";
import { Subject, Subscription } from 'rxjs';
import { HighlightDirective } from '../../shared/directives/highlight.directive';
import { takeUntil } from 'rxjs/operators';
import { DialogModule } from 'primeng/dialog' 
import { MapComponent } from '../../shared/components/map/map/map.component';




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
    DialogModule
  ], //SlicePipe
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class ToursComponent implements OnInit { 
  tours: ITour[] = [];
  toursStore: ITour[]=[];
  searchValue = '';
  destroyer = new Subject<boolean>();
  showModal=false;
  location: ILocation = null;
  weatherData: CountryWeatherData["weatherData"] | null = null; // Новое свойство ДЗ
  country: ICountriesResponseItem | null = null; // Новое свойство ДЗ

  // typeTourFilter: IFilter 
  // typeTourSubscriber: Subscription;
  // dateTourSubscriber: Subscription;

  constructor(private toursService: ToursService, 
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    
    //tour
    // this.typeTourSubscriber = this.toursService.tourTypes$.subscribe((tour)=>{
    //   this.typeTourFilter = tour;
    //   this.initTourFilterLogic();
    // });

    // добавляем takeUntill в подписку на типы туров
    // this.toursService.tourTypes$.subscribe ((tour)=>{
      this.toursService.tourTypes$.pipe(
        takeUntil(this.destroyer) // Используем takeUntil
      ).subscribe((tour) => {
    console.log('tour', tour)
      switch(tour.key) {
        case 'group':
          this.tours=this.toursStore.filter((el)=> el.type==='group')
          break;
          case 'single':
            this.tours=this.toursStore.filter((el)=> el.type==='single')
            break;
            case 'all':
            this.tours=[...this.toursStore];
            break;
      }
    });

    // Date
    // переделываем для использования takeUntill
    //this.toursService.tourDate$.subscribe((date)=> {
      this.toursService.tourDate$.pipe(
        takeUntil(this.destroyer) // Используем takeUntil
      ).subscribe((date) => {
    console.log('****date', date)
      this.tours = this.toursStore.filter((tour) => {
        if (isValid(new Date(tour.date))) {
          const tourDate = new Date(tour.date).setHours(0,0,0,0);
          console.log('****tourDate', tourDate)
          const calendarDate = new Date(date).setHours(0,0,0);
          console.log('****calendarDate', calendarDate);
          return tourDate === calendarDate;

        } else {
          return false;
        }
      });
    })


    console.log ('activatedRoute', this.route)
    //получение туров - используем takeUntill
    // this.toursService.getTours().subscribe((data) =>{
      this.toursService.getTours().pipe(
        takeUntil(this.destroyer) // Используем takeUntil
      ).subscribe((data) => {
      if(Array.isArray(data?.tours)){
        this.tours = data.tours;
        this.toursStore=[...data.tours];
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

getCountryDetail(ev:Event, code:string): void {
  ev.stopPropagation();
  this.toursService.getCountryByCode(code).subscribe((data)=>{
    if((data)) {
      const countryInfo = data.countryData;
      console.log('countryInfo', countryInfo)
      this.location = {lat: countryInfo.latlng[0], lng: countryInfo.latlng[1]};
      this.country = data.countryData; // Заполняем данные страны ДЗ
          this.weatherData = data.weatherData; // Заполняем данные погоды ДЗ
      this.showModal = true;
    }
  });
}
}
