import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, of, throwError } from 'rxjs';


import { catchError, map } from 'rxjs/operators';
const USER_STORAGE_KEY = 'current_user'; // Ключ для sessionStorage
@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) {
    this.loadUserFromStorage(); // Загрузка пользователя при инициализации сервиса
  }

  // private getUser (login: string): IUser | null {
  //   return this.userStorage.find((user) => login === user.login) || null;
  // }

  // addUser(user:IUser, isRememberMe?: boolean): true | string {
  //   if(this.getUser(user.login)) {
  //     return 'user already exists';
  //   }
  //   this.userStorage.push(user);
  //   return true;
  // }

  // checkUser(login: string): boolean {
  //   return !!this.getUser(login);
  // }
  registerUser(user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, {responseType: 'text'});
  }

  authUser(user: IUser): Observable<string> {
    return this.http.post<string>(API.auth, user);
  }

  getUser(): IUser | null {
    return this.currentUser
  }

    setUser(user: IUser | null): void {
    this.currentUser = user;
    this.saveUserToStorage(); // Сохранение пользователя в sessionStorage
  }
  private saveUserToStorage(): void {
    if (this.currentUser) {
      sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.currentUser));
    } else {
      sessionStorage.removeItem(USER_STORAGE_KEY);
    }
  }
  private loadUserFromStorage(): void {
    const storedUser = sessionStorage.getItem(USER_STORAGE_KEY);
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
    }
  }
}
