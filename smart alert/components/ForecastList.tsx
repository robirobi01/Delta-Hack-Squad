import React from 'react';
import { DailyForecast } from '../types';
import { toBanglaNumber } from '../utils';
import { Icons } from '../constants';

interface ForecastListProps {
  forecast: DailyForecast[];
}

const ForecastList: React.FC<ForecastListProps> = ({ forecast }) => {
  const getIcon = (type: string) => {
    if (type === 'sun') return <Icons.Sun />;
    if (type === 'rain' || type === 'storm') return <Icons.Rain />;
    return <Icons.Cloud />;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">আগামী ৫ দিনের পূর্বাভাস</h3>
      <div className="space-y-3">
        {forecast.map((day, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
            <span className="font-medium w-20 text-gray-700">{day.day}</span>
            <div className="flex items-center space-x-2">
              <span className="w-6 h-6">{getIcon(day.icon)}</span>
              <span className="text-blue-600 font-bold text-sm">{toBanglaNumber(day.rain)}</span>
            </div>
            <span className="font-bold text-orange-600">{toBanglaNumber(day.temp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ForecastList;
