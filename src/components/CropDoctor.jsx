import React, { useState } from 'react';

const CropDoctor = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setData(null); // Reset previous results
        }
    };

    const handleAnalyze = async () => {
        if (!image) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('image', image);

        try {
            // Replace with your backend URL
            const response = await fetch('http://localhost:5000/api/analyze', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error("Error:", error);
            alert("সার্ভারে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        } finally {
            setLoading(false);
        }
    };

    // Helper to determine badge color
    const getRiskColor = (level) => {
        if (level === 'High') return 'bg-red-500';
        if (level === 'Medium') return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-bold text-center text-green-700 mb-6">
                🌾 ফসলের ডাক্তার (Crop Doctor)
            </h1>

            {/* Upload Section */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 flex flex-col items-center justify-center bg-green-50">
                    {preview ? (
                        <img src={preview} alt="Crop" className="h-48 object-cover rounded-md mb-4" />
                    ) : (
                        <div className="text-gray-400 mb-2 text-6xl">📸</div>
                    )}
                    
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="block w-full text-sm text-slate-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-green-50 file:text-green-700
                        hover:file:bg-green-100"
                    />
                </div>

                <button
                    onClick={handleAnalyze}
                    disabled={!image || loading}
                    className={`w-full mt-4 py-3 rounded-lg text-white font-bold text-lg shadow-md transition-all
                        ${loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700 active:scale-95'}
                    `}
                >
                    {loading ? 'রোগ নির্ণয় হচ্ছে...' : 'সমস্যা জানুন (Analyze)'}
                </button>
            </div>

            {/* Results Section */}
            {data && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-slate-800 p-4 flex justify-between items-center">
                        <h2 className="text-white font-bold text-lg">{data.pest_name}</h2>
                        <span className={`${getRiskColor(data.risk_level)} text-white px-3 py-1 rounded-full text-xs font-bold uppercase`}>
                            {data.risk_level} Risk
                        </span>
                    </div>

                    <div className="p-5">
                        {/* Diagnosis */}
                        <div className="mb-4">
                            <h3 className="text-gray-500 text-sm font-bold uppercase mb-1">রোগের বিবরণ:</h3>
                            <p className="text-gray-800 leading-relaxed">{data.diagnosis}</p>
                        </div>

                        <hr className="border-gray-200 my-3" />

                        {/* Action Plan */}
                        <div>
                            <h3 className="text-green-600 text-sm font-bold uppercase mb-2">সমাধান ও করণীয়:</h3>
                            <ul className="space-y-3">
                                {data.solution_steps.map((step, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <span className="bg-green-100 text-green-700 min-w-[24px] h-6 flex items-center justify-center rounded-full text-xs font-bold mr-3 mt-1">
                                            {idx + 1}
                                        </span>
                                        <span className="text-gray-700 text-sm">{step}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CropDoctor;
