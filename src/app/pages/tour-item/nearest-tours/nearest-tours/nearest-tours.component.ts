import { AfterViewInit, Component, ElementRef, EventEmitter, inject, 
  Input, model, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ITour } from '../../../../models/tours';
import { ToursService } from '../../../../services/tours.service';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { fromEvent, Subscription } from 'rxjs';
import { NgOptimizedImage } from '@angular/common';


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
  toursArr = model<ITour[]>([]);
  toursArrCopy= model<ITour[]>([]);
  activateLocationId: string;
  subscription: Subscription;

  ngOnInit(): void {
    // console.log('tourNearest', this.tourNearest) 
    // console.log('searchInput', this.searchInput)
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('changes', changes)
    const tour = (changes['tourNearest']?.currentValue as ITour);
    if (tour?.locationId) {
      this.tourService.getNearestTourByLocationId(tour.locationId).subscribe((data)=>{
        this.toursArr.set(data);
        this.toursArrCopy.set(data);
      });

    } 


}

  ngAfterViewInit(): void {
    console.log('searchInput afterView', this.searchInput)

    const eventObservable = fromEvent <InputEvent>(this.searchInput.nativeElement, 'input');

    this,this.subscription=eventObservable.subscribe((ev)=> { //this.searchInput.nativeElement
      const inputTargetValue = (ev.target as HTMLInputElement).value;
      console.log('inputTargetValue')
      if (inputTargetValue=== '') {
        this.toursArr.set(this.toursArrCopy());
              } else {
                const newTours = this.tourService.searchTours(this.toursArrCopy(), inputTargetValue);
                this.toursArr.set(newTours);
              }
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
activeIndexChange (index:number) {
  console.log('index', index);
  const tours = this.toursArr();
  const activeTour = tours.find((el, i)=> i === index);
  this.onTourChange.emit(activeTour);

}
}