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
import { finalize, tap } from 'rxjs/operators';

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
  initToast(type: 'error' | 'success', text: string): void {
    this.messageService.add({ severity: type, detail: text, life: 3000 });
  }
onAuth(): void {
  this.isLoading = true;
  const user: IUser = { login: this.login, password: this.password };

  this.userService.authUser(user).pipe(
    finalize(() => this.isLoading = false)
  ).subscribe({
    next: (response) => {
      if (response) {
        localStorage.setItem('user', JSON.stringify(response));
        this.router.navigate(['tickets']);  
      }
    },
    error: () => {
      this.initToast('error', 'Ошибка авторизации');
    }
  });
}


}

