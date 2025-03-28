import { Component } from '@angular/core';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ITours } from '../../models/tours';

@Component({
  selector: 'app-tour-item',
  imports: [],
  templateUrl: './tour-item.component.html',
  styleUrl: './tour-item.component.scss',
})
export class TourItemComponent implements OnInit{ 
  tourId: string;
  tour: ITours;
  constructor (
    private toursService: ToursService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');
    console.log ('tourId', this.tourId)
    this.toursService.getTourByID(this.tourId).subscribe((tour) =>{
      this.tour = tour;
    });
  }

}
