import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { IUserRegister } from '../../../models/user';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-registration',
  imports: [ButtonModule, CheckboxModule, InputTextModule, FormsModule, NgClass],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export class RegistrationComponent implements OnInit { 
  login: string;
  password: string;
  repeatPassword: string;
  cardNumber: string;
  email: string;
  isRemember: boolean;
  labelText = 'Сохранить пользователя в хранилище';
  constructor (private userService: UserService,
    private messageService: MessageService) {
  }
    ngOnInit(): void {

    }
    onAuth(ev: Event): void {
      console.log('ev', ev);
      const postObj = {login: this.login, password: this.password, email: this.email} as IUserRegister;
      this.userService.registerUser(postObj).subscribe({
        next: () => {
          this.initToast('success', 'Регистрация прошла успешно')
        },
        error: () => {
          this.initToast('error', 'Произошла ошибка')
        }
      })
  }
initToast(type: 'error' | 'success', text: string): void {
  this.messageService.add({ severity: type, detail: text, life: 3000 });
}
 
}
