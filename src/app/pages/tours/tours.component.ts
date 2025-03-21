import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ToursService } from '../../services/tours.service';
import {CardModule} from 'primeng/card'

@Component({
  selector: 'app-tours',
  imports: [CardModule],
  templateUrl: './tours.component.html',
  styleUrl: './tours.component.scss',
  // encapsulation: ViewEncapsulation.None,
})
export class ToursComponent implements OnInit { 
  tours: any = [];
  constructor(private toursService: ToursService) {
    
  }

  ngOnInit(): void {
    this.toursService.getTours().subscribe((data) =>{
      if(Array.isArray(data?.tours)){
        this.tours = data.tours;
      }
    });
  }
}

// обработать ошибку в виде callback и законсолить error (отображение не будет для пользователя)