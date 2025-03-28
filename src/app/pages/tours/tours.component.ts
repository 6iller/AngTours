import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card'
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ITours } from '../../models/tours';

@Component({
  selector: 'app-tours',
  imports: [CardModule, SlicePipe], //SlicePipe
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class ToursComponent implements OnInit { 
  tours: ITours[] = [];
  constructor(private toursService: ToursService, 
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    console.log ('activatedRoute', this.route)
    this.toursService.getTours().subscribe((data) =>{
      if(Array.isArray(data?.tours)){
        this.tours = data.tours;
      }
    });
  }

goToTour (item: ITours): void {
  this.router.navigate(['tour', item.id], {relativeTo: this.route});
}
}
