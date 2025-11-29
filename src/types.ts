export interface DailyForecast {
    day: string;
    rain: string;
    temp: string;
    icon: 'sun' | 'rain' | 'cloud' | 'storm';
}

export interface WeatherData {
    location: string;
    temperature: string;
    humidity: string;
    rainChance: string;
    forecast: DailyForecast[];
    condition: 'sunny' | 'rainy' | 'cloudy' | 'stormy';
}

export enum CropType {
    RICE = 'ধান',
    WHEAT = 'গম',
    POTATO = 'আলু',
    VEGETABLE = 'সবজি',
    JUTE = 'পাট',
    CORN = 'ভুট্টা',
}

export interface AdvisoryResult {
    advice: string;
    isCritical: boolean;
}

export interface AdvisoryResponse {
    advice: string;
}
