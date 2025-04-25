import { Component, NgModule, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';
import { TourType } from '../../models/tours';
import { PrimeNG } from 'primeng/config';
import { TranslateService } from '@ngx-translate/core';
// import { ru } from 'primeng/api';
import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';



registerLocaleData(localeRu);
@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [SelectModule, FormsModule, DatePickerModule, CheckboxModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss',
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);
  date: Date | null = null;
  selectedType: TourType = null;
  showBasketOnly = false; // свойство для чекбокса
  

  tourTypes: TourType[] = [
    {key: 'single', label: 'одиночный'},
    {key: 'group', label: 'групповой'},
    {key: 'all', label: 'все'}
  ]

  // constructor(private config: PrimeNG, private translateService: TranslateService) {}



  ngOnInit(): void {

    // this.translateService.setDefaultLang('en');
    this.selectedType=this.tourTypes.find((type)=> type.key==='all');
    
  }
  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType);
  }
//метод для шаблона для очистки фильтра в календаре
//метод для шаблона для очистки фильтра в календаре
//метод для шаблона для очистки фильтра в календаре
clearDate() {
  
  this.date = null;
  console.log(this.date)
  this.tourService.initChangeTourDate(null);
}
  changeDate(ev:any): void {
    console.log ('date', ev);
    this.tourService.initChangeTourDate(ev);
    // console.log ('****change date');
    // this.tourService.initChangeTourDate(ev);
  }
  toggleShowBasketOnly(): void { // Новый метод для обработки чекбокса
    this.tourService.initShowBasketOnly(this.showBasketOnly);
  }

  
  ruLocale = {
    firstDayOfWeek: 1,
    dayNames: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
    dayNamesShort: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
    today: 'Сегодня',
    clear: 'Очистить'
  };
}
//   translate(lang: string) {
//     this.translateService.use(lang);
//     this.translateService.get('primeng').subscribe(res => this.primeng.setTranslation(res));
// }
// translate(lang: string): void {
//   this.translateService.use(lang);
//   this.translateService.get('primeng').subscribe((res: any) => this.config.setTranslation(res));

  
  // clearDate(): void {
  //   this.date = null; // Сброс значения даты
  //   this.tourService.initChangeTourDate(this.date); // Обновление даты в сервисе
  //   console.log('Date cleared');
  // }

