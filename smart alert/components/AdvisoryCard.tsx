import React from 'react';
import { AdvisoryResult } from '../types';

interface AdvisoryCardProps {
  data: AdvisoryResult | null;
  loading: boolean;
}

const AdvisoryCard: React.FC<AdvisoryCardProps> = ({ data, loading }) => {
  // Determine styles based on risk level
  const isCritical = data?.isCritical || false;
  
  const bgClass = isCritical 
    ? "bg-gradient-to-r from-red-600 to-orange-600" 
    : "bg-gradient-to-r from-green-600 to-green-700";
    
  const icon = isCritical ? "⚠️" : "💡";
  const title = isCritical ? "জরুরি সতর্কবার্তা" : "স্মার্ট কৃষি পরামর্শ";

  return (
    <div className={`${bgClass} text-white rounded-2xl p-6 shadow-xl mb-6 relative overflow-hidden transition-colors duration-500`}>
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full"></div>
      
      <h3 className="text-xl font-bold mb-3 flex items-center">
        <span className="mr-2 text-2xl">{icon}</span> {title}
      </h3>
      
      {loading ? (
        <div className="flex items-center space-x-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150"></div>
          <span className="text-sm">পরামর্শ তৈরি হচ্ছে...</span>
        </div>
      ) : (
        <div className="min-h-[3rem]">
          {data ? (
            <p className="text-lg leading-relaxed font-medium">
              {data.advice}
            </p>
          ) : (
            <p className="text-green-100 italic text-sm">
              তথ্য দেখার জন্য বাটন চাপুন...
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvisoryCard;