import React, { useState } from 'react';
import { UPAZILAS, CROPS } from './constants';
import { WeatherData, CropType, AdvisoryResult } from './types';
import { fetchWeatherData } from './services/weatherService';
import { generateFarmingAdvisory } from './services/geminiService';
import WeatherDisplay from './components/WeatherDisplay';
import ForecastList from './components/ForecastList';
import AdvisoryCard from './components/AdvisoryCard';

const App: React.FC = () => {
  const [selectedUpazila, setSelectedUpazila] = useState<string>('');
  const [selectedCrop, setSelectedCrop] = useState<CropType>(CropType.RICE);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [advisoryData, setAdvisoryData] = useState<AdvisoryResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [advisoryLoading, setAdvisoryLoading] = useState<boolean>(false);

  const handleFetchData = async () => {
    if (!selectedUpazila) {
      alert("দয়া করে একটি উপজেলা নির্বাচন করুন");
      return;
    }

    setLoading(true);
    setAdvisoryData(null); // Clear previous advisory
    
    try {
      // 1. Fetch Weather (Simulating Backend)
      const data = await fetchWeatherData(selectedUpazila);
      setWeatherData(data);

      // 2. Generate Advisory (Using Gemini AI)
      setAdvisoryLoading(true);
      
      // We start the advisory fetch but don't await it immediately to let UI update weather first
      generateFarmingAdvisory(data, selectedCrop).then(result => {
        setAdvisoryData(result);
        setAdvisoryLoading(false);
      });

    } catch (error) {
      console.error(error);
      alert("তথ্য লোড করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 pb-10">
      {/* Header */}
      <header className="bg-green-700 text-white p-6 rounded-b-3xl shadow-lg mb-6 relative">
        <h1 className="text-3xl font-bold text-center">কৃষি সহায়ক</h1>
        <p className="text-center text-green-100 text-sm mt-1">আপনার ফসলের স্মার্ট বন্ধু</p>
      </header>

      <main className="max-w-md mx-auto px-4">
        
        {/* Controls Section */}
        <div className="bg-white p-5 rounded-2xl shadow-sm mb-6">
          
          {/* Location Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">উপজেলা নির্বাচন করুন</label>
            <select 
              value={selectedUpazila}
              onChange={(e) => setSelectedUpazila(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            >
              <option value="">তালিকা থেকে বেছে নিন...</option>
              {UPAZILAS.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          {/* Crop Selector */}
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">ফসল নির্বাচন করুন</label>
            <div className="grid grid-cols-3 gap-2">
              {CROPS.map((crop) => (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCrop(crop.id)}
                  className={`p-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                    selectedCrop === crop.id 
                    ? 'bg-green-100 border-2 border-green-600 text-green-800' 
                    : 'bg-slate-50 border border-gray-100 text-gray-500'
                  }`}
                >
                  <span className="text-2xl mb-1">{crop.icon}</span>
                  <span className="text-sm font-medium">{crop.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleFetchData}
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow-md transition-all ${
              loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 active:scale-95'
            }`}
          >
            {loading ? 'লোড হচ্ছে...' : 'আবহাওয়া ও পরামর্শ দেখুন'}
          </button>
        </div>

        {/* Results Section */}
        {weatherData && (
          <div className="animate-fade-in-up">
            {/* Advisory Section - Shows loading independently */}
            <AdvisoryCard data={advisoryData} loading={advisoryLoading} />
            
            {/* Current Weather */}
            <WeatherDisplay data={weatherData} />

            {/* Forecast */}
            <ForecastList forecast={weatherData.forecast} />
          </div>
        )}
        
      </main>
    </div>
  );
};

export default App;