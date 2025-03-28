import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-authorization',
  imports: [ButtonModule, InputTextModule, FormsModule, NgClass],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy { 
  login: string;
  password: string;
  isLoading = false;
  constructor(private userService: UserService,  //инжектирование сервиса под будущие задачи
  private router: Router,
  private messageService: MessageService
) {}
  ngOnInit(): void {
    console.log('init')
  } 
  ngOnDestroy(): void {
    console.log('destr')
  }
  initToast(type: 'error', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });
  }

  //создание объекта с интефейсом iuser
onAuth(): void {
  const user: IUser = { login: this.login, password: this.password };

  // вызов функции authUser сервиса userService (для обращения к серверу)
  // subscribe это метод подписки на результат от this.userService.authUser(user) (отправки на сервер заполненных данных)
  // после получения асинхронного результата subscribe примет объект с двумя свойствами: next и error
  // next выполнится при успешном response. данные сохранятся в localStorage в формате json, далее прозойдет редирект
  // иначе вызовется функция initToast (вспл. окно) с ошибкой авторизации
  this.userService.authUser(user).subscribe({
    next: () => {
        this.userService.setUser(user)
        this.router.navigate(['tours']);
    },
    error: () => {
      this.initToast('error', 'Ошибка авторизации');
    }
  });
}
};