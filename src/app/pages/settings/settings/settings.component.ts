import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-settings',
  imports: [CommonModule, RouterLink, ButtonModule, RouterModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent { 
  menuItems = [
    { label: 'Статистика', route: 'statistic' }, 
    { label: 'Смена пароля', route: 'password-change' }, 
  ]
}
