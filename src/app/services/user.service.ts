import { Injectable } from '@angular/core';
import { IUser, IUserRegister } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { API } from '../shared/api';
import { Observable, of, throwError } from 'rxjs';


import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userStorage: IUser[] = [];
  private currentUser: IUser | null = null;

  constructor(private http: HttpClient) {}

  private getUser (login: string): IUser | null {
    return this.userStorage.find((user) => login === user.login) || null;
  }

  addUser(user:IUser, isRememberMe?: boolean): true | string {
    if(this.getUser(user.login)) {
      return 'user already exists';
    }
    this.userStorage.push(user);
    return true;
  }

  checkUser(login: string): boolean {
    return !!this.getUser(login);
  }
  registerUser(user: IUserRegister): Observable<string> {
    return this.http.post(API.registration, user, {responseType: 'text'});
  }

  authUser(user: IUser): Observable<IUser> {
    return this.http.post<IUser>(API.auth, user);
  }
  //  для варианта реализации 2 - создание переменной currentUser для хранения данных в сервисе 
    setCurrentUser(user: IUser) {
    this.currentUser = user;
  }
  // (можно вызывать данные для доступа в других компонентах через this.userService.getCurrentUser()), но для текущего задания вызов не требуется
  getCurrentUser(): IUser | null {
    return this.currentUser;
  }
}
