import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any [], searchValue: string, prop:string): any[] {
    console.log('searchValue', searchValue);
    if (!searchValue) return value; 
    if (Array.isArray(value)) {
      
        const regExp = new RegExp(searchValue, 'i');
        return value.filter ((el)=>{
          if (el[prop] && typeof el[prop] ==='string') {
            return regExp.test(el[prop]);
          } else {
            console.log(el[prop] + 'не строка');
            return false;
          }
      })
    } else {
      console.log (value + 'не массив');
      return [];
    }
  }

}
