import { Injectable } from "@angular/core";
import { ITour } from "../models/tours";
import { BehaviorSubject } from "rxjs";



@Injectable ({
    providedIn:'root'
})

export class BasketService {
    private basketStore: ITour[] = [];
    // private basketSubject = new BehaviorSubject(this.basketStore);
    private basketSubject = new BehaviorSubject<ITour[]>(this.basketStore); // + BehaviorSubject
    basketStore$ = this.basketSubject.asObservable();


    constructor() {
        this.loadFromLocalStorage(); // Загружаем данные при создании сервиса
    }
    setItemToBasket(item:ITour): void {
        this.basketStore.push(item);
        item.inBasket = true;
        // this.basketSubject.next(this.basketStore);
        this.updateLocalStorage(); // Обновляем localStorage после добавления
        this.basketSubject.next([...this.basketStore]); // + для функционала корзины, чтобы не обнулялся статус
        
    }

    removeItemFromBasket(item:ITour): void {
        // this.basketStore = this.basketStore.filter((tour)=>tour !==item);
        this.basketStore = this.basketStore.filter((tour) => tour.id !== item.id); // Используем id для фильтрации для функционала корзины
        item.inBasket = false;
        // this.basketSubject.next(this.basketStore);
        this.updateLocalStorage(); // Обновляем localStorage после удаления
        this.basketSubject.next([...this.basketStore]); // создаем новый массив для функционала корзины
    }
    isInBasket(item: ITour): boolean { //  метод для проверки наличия в корзине
        return this.basketStore.some(tour => tour.id === item.id);
    }

    // добавялем 2 метода для функционала корзины
    private loadFromLocalStorage(): void {
        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
          this.basketStore = JSON.parse(storedBasket);
          this.basketSubject.next([...this.basketStore]);
        }
      }
  
      private updateLocalStorage(): void {
        localStorage.setItem('basket', JSON.stringify(this.basketStore));
      }
}

