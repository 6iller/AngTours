import { Component } from '@angular/core';
import { OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { ITour } from '../../models/tours';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { NearestToursComponent } from './nearest-tours/nearest-tours/nearest-tours.component';


@Component({
  selector: 'app-tour-item',
  templateUrl: './tour-item.component.html',
  styleUrls: ['./tour-item.component.scss'],
  standalone: true, // Добавлено standalone: true
  imports: [CommonModule, ButtonModule, CardModule, NearestToursComponent] //RouterLink removed
})
export class TourItemComponent implements OnInit {
  tourId: string;
  tour: ITour;

  constructor(
    private toursService: ToursService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id');

    this.toursService.getTours().subscribe(data => {
      if (Array.isArray(data?.tours)) {
        this.tour = data.tours.find(t => t.id === this.tourId);
      } else {
      }
    });
  }
}











// @Component({
//   selector: 'app-tour-item',
//   imports: [],
//   templateUrl: './tour-item.component.html',
//   styleUrl: './tour-item.component.scss',
// })
// export class TourItemComponent implements OnInit{ 
//   tourId: string;
//   tour: ITour;
//   constructor (
//     private toursService: ToursService,
//     private route: ActivatedRoute,
//     private router: Router
//   ) {}
//   ngOnInit(): void {
//     this.tourId = this.route.snapshot.paramMap.get('id');
//     console.log ('tourId', this.tourId)
//     this.toursService.getTourByID(this.tourId).subscribe((tour) =>{
//       this.tour = tour;
//     });
//   }
// }
