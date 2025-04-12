

import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule } from '@angular/router';
import { map, filter, Subscription } from 'rxjs';
import { LoaderComponent } from '../shared/components/loader/loader/loader.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, HeaderComponent, AsideComponent, RouterModule, LoaderComponent, AsyncPipe, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, OnDestroy {
  showAside=false;
  subscription: Subscription;
  loader$ = inject(LoaderService).loader$;
  constructor (private router: Router, private activatedRoute: ActivatedRoute) {}
  
  

  ngOnInit(): void {
    this.showAside=this.recursFindChildData(this.activatedRoute.snapshot, 'showAside'); 
      this.subscription=this.router.events.pipe(
filter((routes)=> routes instanceof ActivationEnd),
map((data)=>data.snapshot)

      ).subscribe((data)=> {
        this.showAside=this.recursFindChildData(data, 'showAside');
      });
    }

recursFindChildData(children: ActivatedRouteSnapshot, prop: string): boolean {
  console.log ('children', children)
  if (!children.data[prop] && children.firstChild) {
    return this.recursFindChildData(children.firstChild, prop);

  } else {
    return !!children.data[prop];
  }
}    



ngOnDestroy(): void {
  this.subscription.unsubscribe();    
    }



  }



  // import { Component, OnDestroy, OnInit } from '@angular/core';
// import { FooterComponent } from './footer/footer.component';
// import { HeaderComponent } from './header/header.component';
// import { AsideComponent } from './aside/aside.component';
// import { ActivatedRoute, ActivatedRouteSnapshot, ActivationEnd, Router, RouterModule } from '@angular/router';
// import { map, filter, Subscription } from 'rxjs';

// @Component({
//   selector: 'app-layout',
//   imports: [FooterComponent, HeaderComponent, AsideComponent, RouterModule],
//   templateUrl: './layout.component.html',
//   styleUrl: './layout.component.scss'
// })
// export class LayoutComponent implements OnInit, OnDestroy {
//   showAside=false;
//   subscription: Subscription;
//   constructor (private router: Router, private activatedRoute: ActivatedRoute) {}
  
  

//   ngOnInit(): void {
//     this.showAside=this.recursFindChildData(this.activatedRoute.snapshot, 'showAside'); 
//       this.subscription=this.router.events.pipe(
// filter((routes)=> routes instanceof ActivationEnd),
// map((data)=>data.snapshot)

//       ).subscribe((data)=> {
//         this.showAside=this.recursFindChildData(data, 'showAside');
//       });
//     }

// recursFindChildData(children: ActivatedRouteSnapshot, prop: string): boolean {
//   console.log ('children', children)
//   if (!children.data[prop] && children.firstChild) {
//     return this.recursFindChildData(children.firstChild, prop);

//   } else {
//     return !!children.data[prop];
//   }
// }    



// ngOnDestroy(): void {
//   this.subscription.unsubscribe();    
//     }



//   }