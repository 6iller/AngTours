import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { InputTextModule } from 'primeng/inputtext'; 
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-password-change',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule, PasswordModule, ButtonModule], 
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent {
  oldPassword = '';
  newPassword = '';
  confirmPassword = '';

  changePassword() {
    // логика смены пароля 
    console.log('Смена пароля:', this.oldPassword, this.newPassword, this.confirmPassword);
    // консолинг для отображения данных
  }
}