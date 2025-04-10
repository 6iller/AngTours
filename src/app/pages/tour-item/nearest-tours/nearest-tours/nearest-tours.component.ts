import { AfterViewInit, Component, ElementRef, EventEmitter, inject, 
  Input, model, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ITour } from '../../../../models/tours';
import { ToursService } from '../../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { fromEvent, Subscription } from 'rxjs';;


@Component({
  selector: 'app-nearest-tours',
  imports: [GalleriaModule, InputGroupModule, InputGroupAddonModule, ButtonModule, InputTextModule],
  templateUrl: './nearest-tours.component.html',
  styleUrl: './nearest-tours.component.scss',
})
export class NearestToursComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy{ 
  @Input() tourNearest: ITour = null;
  @Output() onTourChange = new EventEmitter<ITour>();
  @ViewChild('searchInput') searchInput: ElementRef;

  tourService = inject(ToursService);
  toursArr: ITour[] = [];
  toursArrCopy: ITour[] = [];
  activateLocationId: string;
  subscription: Subscription;
  noToursFound: boolean = false; //туров не найдено 



  ngOnInit(): void {
    // console.log('tourNearest', this.tourNearest) 
    // console.log('searchInput', this.searchInput)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = (changes['tourNearest']?.currentValue as ITour);
    if (tour?.locationId) {
      this.tourService.getNearestTourByLocationId(tour.locationId).subscribe((data)=>{
        this.toursArr = data;
        this.toursArrCopy = [...data];
        this.noToursFound = this.toursArr.length === 0;

        

      });

    } 


}

ngAfterViewInit(): void {
  this.subscription = fromEvent<InputEvent>(this.searchInput.nativeElement, 'input').subscribe(event => {
    const inputValue = (event.target as HTMLInputElement).value;
    if (!inputValue) {
      this.toursArr = [...this.toursArrCopy]; 
    } else {
      this.toursArr = this.tourService.searchTours(this.toursArrCopy, inputValue);
    }
    this.noToursFound = this.toursArr.length === 0;
  });
}

ngOnDestroy(): void {
  if (this.subscription) { // Проверка на существование подписки перед отпиской
      this.subscription.unsubscribe();
  }
}
activeIndexChange(index: number): void {
  if (this.toursArr && this.toursArr.length > index) {
    this.onTourChange.emit(this.toursArr[index]);
  }
}
}