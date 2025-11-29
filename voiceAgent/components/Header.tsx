import React from 'react';
import { Sprout } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-green-700 text-white p-4 shadow-md flex items-center justify-between shrink-0 z-10">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-white rounded-full text-green-700">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="text-xl font-bold leading-tight">কৃষি বন্ধু</h1>
          <p className="text-green-100 text-xs">আপনার ডিজিটাল কৃষি সহায়ক</p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs font-medium bg-green-800 px-2 py-1 rounded">
          অনলাইন
        </span>
      </div>
    </header>
  );
};

export default Header;