import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorization',
  imports: [ButtonModule, InputTextModule, FormsModule, NgClass],
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss',
})
export class AuthorizationComponent implements OnInit, OnDestroy { 
  login: string;
  password: string;
  constructor(private userService: UserService,  //инжектирование сервиса под будущие задачи
  private router: Router
) {}
  ngOnInit(): void {
    console.log('init')
  } 
  ngOnDestroy(): void {
    console.log('destr')
  }
  onAuth(): void {
    const user: IUser = {
      login: this.login, password: this.password
    }
    this.userService.authUser(user);
    this.router.navigate(['tickets']);
}
}

