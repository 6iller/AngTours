import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from '../shared/api';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  static config: any;

  constructor(private http: HttpClient) { }
  loadObservable(): Observable<any> {
    const jsonFile = `${API.config}`;
    return this.http.get(jsonFile);
  }
  loadPromise(): Promise<any> {
    const jsonFile = `${API.config}`;
    
    const configPromise = new Promise<any>((resolve, reject) => {
      
      this.http.get(jsonFile).toPromise().then((response: any)=>{
        if(response && typeof (response) === 'object') { 
        if (Array.isArray(response?.rules)) {
          ConfigService.config = response;
          resolve(response);
        } else {
          reject ('Ошибка инициализации конфига - неверный формат' + response);
                  }

        } else {
          reject ('ошибка инициализации конфига - неверный формат ответа' + response);        
        }
      }). catch((response: any)=> {
        reject (`Ошибка при загрузке файла '$(jsonFile)': ${JSON.stringify(response)}`);
      });
    });

const promiseArr = [configPromise];
return Promise.all(promiseArr);
  }
}

