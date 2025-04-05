import { Component, NgModule, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { ToursService } from '../../services/tours.service';
import { DatePickerModule } from 'primeng/datepicker';


@Component({
  selector: 'app-aside',
  imports: [SelectModule, FormsModule, DatePickerModule],
  templateUrl: './aside.component.html',
  styleUrl: './aside.component.scss'
})
export class AsideComponent implements OnInit {
  private tourService = inject(ToursService);
  date: Date = null;
  selectedType: any = null;

  tourTypes= [
    {key: 'single', label: 'одиночный'},
    {key: 'group', label: 'групповой'},
    {key: 'all', label: 'все'}
  ]


  ngOnInit(): void {
    this.selectedType=this.tourTypes.find((type)=> type.key==='all');
  }
  changeTourType(ev: SelectChangeEvent): void {
    this.tourService.initChangeTourType(this.selectedType);
  }

  changeDate(ev:Date): void {
    console.log ('date', ev);
    this.tourService.initChangeTourDate(ev);
    // console.log ('****change date');
    // this.tourService.initChangeTourDate(ev);
  }

}
