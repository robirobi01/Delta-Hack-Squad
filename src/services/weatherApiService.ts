import { CloudSun, Cloud, CloudRain, Sun } from "lucide-react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '119764b8fc09983754c56e1b4a78c003';

interface WeatherResponse {
    main: {
        temp: number;
        humidity: number;
    };
    weather: Array<{
        main: string;
        description: string;
    }>;
    name: string;
}

interface ForecastResponse {
    list: Array<{
        dt: number;
        main: {
            temp: number;
            humidity: number;
        };
        weather: Array<{
            main: string;
            description: string;
        }>;
    }>;
}

export interface WeatherDataItem {
    day: string;
    dayBn: string;
    temp: number;
    condition: string;
    conditionBn: string;
    icon: any;
    humidity: number;
}

const getWeatherIcon = (condition: string) => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return CloudRain;
    if (cond.includes('cloud')) return Cloud;
    if (cond.includes('clear') || cond.includes('sun')) return Sun;
    return CloudSun;
};

const getConditionInBangla = (condition: string): string => {
    const cond = condition.toLowerCase();
    if (cond.includes('rain')) return 'বৃষ্টি';
    if (cond.includes('cloud') && cond.includes('few')) return 'আংশিক মেঘলা';
    if (cond.includes('cloud')) return 'মেঘলা';
    if (cond.includes('clear') || cond.includes('sun')) return 'রোদ্রজ্জ্বল';
    return 'আংশিক মেঘলা';
};

const getDayName = (dateStr: number): { en: string; bn: string } => {
    const days = [
        { en: 'Sun', bn: 'রবি' },
        { en: 'Mon', bn: 'সোম' },
        { en: 'Tue', bn: 'মঙ্গল' },
        { en: 'Wed', bn: 'বুধ' },
        { en: 'Thu', bn: 'বৃহ' },
        { en: 'Fri', bn: 'শুক্র' },
        { en: 'Sat', bn: 'শনি' },
    ];

    const date = new Date(dateStr * 1000);
    const dayIndex = date.getDay();
    return days[dayIndex];
};

export const fetchLiveWeather = async (location: string): Promise<WeatherDataItem[]> => {
    try {
        // Fetch current weather
        const currentResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${location},BD&units=metric&appid=${API_KEY}`
        );

        if (!currentResponse.ok) {
            throw new Error('Failed to fetch current weather');
        }

        const currentData: WeatherResponse = await currentResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${location},BD&units=metric&appid=${API_KEY}`
        );

        if (!forecastResponse.ok) {
            throw new Error('Failed to fetch forecast');
        }

        const forecastData: ForecastResponse = await forecastResponse.json();

        // Process current weather
        const currentWeather: WeatherDataItem = {
            day: 'Today',
            dayBn: 'আজ',
            temp: Math.round(currentData.main.temp),
            condition: currentData.weather[0].main,
            conditionBn: getConditionInBangla(currentData.weather[0].main),
            icon: getWeatherIcon(currentData.weather[0].main),
            humidity: currentData.main.humidity,
        };

        // Process forecast - get one entry per day (around noon)
        const dailyForecasts: WeatherDataItem[] = [];
        const processedDays = new Set<string>();

        forecastData.list.forEach((item) => {
            const date = new Date(item.dt * 1000);
            const dateKey = date.toDateString();

            // Skip today and get one forecast per day (preferably around noon)
            if (!processedDays.has(dateKey) && dailyForecasts.length < 6) {
                const hour = date.getHours();
                if (hour >= 11 && hour <= 14) { // Around noon
                    processedDays.add(dateKey);
                    const dayName = getDayName(item.dt);

                    dailyForecasts.push({
                        day: dayName.en,
                        dayBn: dayName.bn,
                        temp: Math.round(item.main.temp),
                        condition: item.weather[0].main,
                        conditionBn: getConditionInBangla(item.weather[0].main),
                        icon: getWeatherIcon(item.weather[0].main),
                        humidity: item.main.humidity,
                    });
                }
            }
        });

        return [currentWeather, ...dailyForecasts];

    } catch (error) {
        console.error('Error fetching weather data:', error);
        // Return fallback static data
        return [
            {
                day: "Today",
                dayBn: "আজ",
                temp: 28,
                condition: "Partly Cloudy",
                conditionBn: "আংশিক মেঘলা",
                icon: CloudSun,
                humidity: 75,
            },
            { day: "Tue", dayBn: "মঙ্গল", temp: 30, condition: "Sunny", conditionBn: "রোদ্রজ্জ্বল", icon: Sun, humidity: 65 },
            { day: "Wed", dayBn: "বুধ", temp: 27, condition: "Cloudy", conditionBn: "মেঘলা", icon: Cloud, humidity: 80 },
            { day: "Thu", dayBn: "বৃহ", temp: 25, condition: "Rain", conditionBn: "বৃষ্টি", icon: CloudRain, humidity: 90 },
            { day: "Fri", dayBn: "শুক্র", temp: 26, condition: "Rain", conditionBn: "বৃষ্টি", icon: CloudRain, humidity: 85 },
            { day: "Sat", dayBn: "শনি", temp: 29, condition: "Partly Cloudy", conditionBn: "আংশিক মেঘলা", icon: CloudSun, humidity: 70 },
            { day: "Sun", dayBn: "রবি", temp: 31, condition: "Sunny", conditionBn: "রোদ্রজ্জ্বল", icon: Sun, humidity: 60 },
        ];
    }
};
