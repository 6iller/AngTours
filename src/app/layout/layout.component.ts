import { Component } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AsideComponent } from './aside/aside.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [FooterComponent, HeaderComponent, AsideComponent, RouterModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
