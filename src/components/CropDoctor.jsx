import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';

const CropDoctor = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [showCamera, setShowCamera] = useState(false);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setData(null);
        }
    };

    const startCamera = async () => {
        try {
            setShowCamera(true);
            const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
            streamRef.current = stream;
            // Wait for state update and ref to be available
            setTimeout(() => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            }, 100);
        } catch (err) {
            console.error("Error accessing camera:", err);
            alert("ক্যামেরা চালু করা যাচ্ছে না। অনুমতি আছে কিনা দেখুন।");
            setShowCamera(false);
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;

            // Set canvas dimensions to match video
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw video frame to canvas
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Convert to blob/file
            canvas.toBlob((blob) => {
                const file = new File([blob], "captured_crop.jpg", { type: "image/jpeg" });
                setImage(file);
                setPreview(URL.createObjectURL(file));
                setData(null);
                stopCamera();
            }, 'image/jpeg');
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

            {/* Camera Modal */}
            {showCamera && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex flex-col items-center justify-center p-4">
                    <div className="relative w-full max-w-md bg-black rounded-lg overflow-hidden">
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-[60vh] object-cover"
                        />
                        <canvas ref={canvasRef} className="hidden" />

                        <button
                            onClick={stopCamera}
                            className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                            <button
                                onClick={captureImage}
                                className="w-16 h-16 bg-white rounded-full border-4 border-green-500 flex items-center justify-center active:scale-95 transition-transform"
                            >
                                <div className="w-12 h-12 bg-green-500 rounded-full" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Upload Section */}
            <div className="bg-white p-4 rounded-xl shadow-md mb-6">
                <div className="border-2 border-dashed border-green-300 rounded-lg p-6 flex flex-col items-center justify-center bg-green-50 relative">
                    {preview ? (
                        <img src={preview} alt="Crop" className="h-48 object-cover rounded-md mb-4" />
                    ) : (
                        <div className="text-gray-400 mb-2 text-6xl">📸</div>
                    )}

                    <div className="flex gap-2 w-full mt-2">
                        <label className="flex-1 cursor-pointer bg-white border border-green-500 text-green-700 py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-50 transition-colors">
                            ফাইল আপলোড
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>

                        <button
                            onClick={startCamera}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <Camera className="w-4 h-4" />
                            ক্যামেরা
                        </button>
                    </div>
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
