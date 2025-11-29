import { WeatherData, DailyForecast } from '../types';

// In a real MERN stack, this would be an Axios call to your Express backend
// e.g., axios.get(`http://localhost:5000/api/weather?location=${location}`)

const getRandomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

export const fetchWeatherData = async (location: string): Promise<WeatherData> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Generate realistic random weather for the demo
    const tempVal = getRandomInt(28, 36);
    const rainChanceVal = getRandomInt(10, 90);
    const humidityVal = getRandomInt(60, 95);

    let condition: WeatherData['condition'] = 'sunny';
    if (rainChanceVal > 70) condition = 'stormy';
    else if (rainChanceVal > 40) condition = 'rainy';
    else if (humidityVal > 80) condition = 'cloudy';

    const forecast: DailyForecast[] = [];
    const days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
    const todayIndex = new Date().getDay();

    for (let i = 1; i <= 5; i++) {
        const dayIndex = (todayIndex + i) % 7;
        const fRain = getRandomInt(10, 90);
        let fIcon: DailyForecast['icon'] = 'sun';

        if (fRain > 70) fIcon = 'storm';
        else if (fRain > 40) fIcon = 'rain';
        else if (fRain > 20) fIcon = 'cloud';

        forecast.push({
            day: days[dayIndex],
            rain: `${fRain}%`,
            temp: `${getRandomInt(28, 34)}°C`,
            icon: fIcon
        });
    }

    return {
        location,
        temperature: `${tempVal}°C`,
        humidity: `${humidityVal}%`,
        rainChance: `${rainChanceVal}%`,
        forecast,
        condition
    };
};
