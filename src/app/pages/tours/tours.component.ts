import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ITour } from '../../models/tours';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { isValid } from "date-fns";




@Component({
  selector: 'app-tours',
  imports: [CardModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule, SlicePipe, SearchPipe, FormsModule], //SlicePipe
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class ToursComponent implements OnInit { 
  tours: ITour[] = [];
  toursStore: ITour[]=[];
  searchValue = '';
  constructor(private toursService: ToursService, 
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    this.toursService.tourTypes$.subscribe ((tour)=>{
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
    this.toursService.tourDate$.subscribe((date)=> {
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
    this.toursService.getTours().subscribe((data) =>{
      if(Array.isArray(data?.tours)){
        this.tours = data.tours;
        this.toursStore=[...data.tours];
      }
    });
  }

goToTour (item: ITour): void {
  this.router.navigate(['tour', item.id], {relativeTo: this.route});
}

searchTour (ev:Event): void {
  const target = ev.target as HTMLInputElement;
  const targetValue = target.value;
  this.tours = this.toursService.searchTours(this.toursStore, targetValue);
}
}
