export interface ITour {
    name: string,
    id: string,
    description: string,
    tourOperator: string,
    price: string,
    img: string,
    type?: string,
    locationId: string,
    date?: Date,
    country?: ICountriesResponseItem, // действие 1
    code?: string,
    inBasket?: boolean,

}

export interface ITourServerRes {
tours: ITour[];
}


export interface TourType {
    key: string;
    label: string;
  }

  export interface ICountriesResponseItem {
    iso_code2: string;
    iso_code3: string;
    name_ru: string;
    flag_url: string; // действие 2
    latlng: [number, number]; 
  }

  export interface IFilterTypeLogic {
    key: 'all' | 'single' | 'group',
    label?: string
  }

  export interface ILocation {
    lat: number;
    lng: number;
  }

  export type Coords = {
    latlng: [number,number]
  }
  
 export interface CountryWeatherData { // Новый интерфейс
    countryData: Coords,

    weatherData: {
      isDay: 0 | 1;
      snowfall: 0 | 1;
      rain: 0 | 1;
      currentWeather: number;
    };
  }

  export interface ICombinedData {
    countryData: ICountriesResponseItem;
    weatherData: {
        isDay: 0 | 1;
        snowfall: 0 | 1;
        rain: 0 | 1;
        currentWeather: number;
    };
}