import React from 'react';
import { WeatherData } from '../types';
import { toBanglaNumber } from '../utils';
import { Icons } from '../constants';

interface WeatherDisplayProps {
  data: WeatherData;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({ data }) => {
  const getIcon = () => {
    switch(data.condition) {
      case 'sunny': return <Icons.Sun />;
      case 'rainy': return <Icons.Rain />;
      case 'cloudy': return <Icons.Cloud />;
      case 'stormy': return <Icons.Rain />;
      default: return <Icons.Sun />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-green-100 mb-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">{data.location}</h2>
          <p className="text-gray-500 text-sm">বর্তমান অবস্থা</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-full">
          {getIcon()}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-orange-50 p-3 rounded-xl">
          <div className="flex justify-center mb-1"><Icons.Thermometer /></div>
          <p className="text-gray-500 text-xs">তাপমাত্রা</p>
          <p className="text-lg font-bold text-gray-800">{toBanglaNumber(data.temperature)}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded-xl">
          <div className="flex justify-center mb-1"><Icons.Drop /></div>
          <p className="text-gray-500 text-xs">আর্দ্রতা</p>
          <p className="text-lg font-bold text-gray-800">{toBanglaNumber(data.humidity)}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-xl">
          <div className="flex justify-center mb-1"><Icons.Cloud /></div>
          <p className="text-gray-500 text-xs">বৃষ্টি</p>
          <p className="text-lg font-bold text-gray-800">{toBanglaNumber(data.rainChance)}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
