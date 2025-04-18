import { ICountriesResponseItem } from "./tours";

export interface IWeatherResponse {
    current: IWeatherCurrent,
    hourly: IWeatherHourly
}

export type WeatherCurrentValue = 0 | 1;

export interface IWeatherCurrent {
    is_day: WeatherCurrentValue,
    rain: WeatherCurrentValue,
    snowfall: WeatherCurrentValue,
}

export interface IWeatherHourly {
    temperature_2m: number[],
}

export interface ICombinedData {
    countryData: ICountriesResponseItem;
    weatherData: IWeatherCurrent & { temperature: number }; // + температура как дополнительное поле
}