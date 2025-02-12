"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PreviewData() {
  const router = useRouter();
  const [uploadedData, setUploadedData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedData = sessionStorage.getItem('uploadedData');
    if (storedData) {
      setUploadedData(JSON.parse(storedData));
    }
    setLoading(false);
  }, []);

  const handleProceed = async () => {
    if (!uploadedData) return;
    
    try {
      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: uploadedData })
      });
      
      const result = await response.json();
      sessionStorage.setItem('predictionResult', JSON.stringify(result));
      router.push('/prediction');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white p-10">
      <div className="bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-3xl text-center transform transition duration-300 hover:scale-105 hover:shadow-purple-500">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">📂 Data Preview</h1>
        <p className="text-lg mb-6 text-gray-300">Review your uploaded content before proceeding</p>
        
        {loading ? (
          <p className="text-xl text-gray-400 animate-pulse">Loading...</p>
        ) : uploadedData ? (
          <div className="overflow-y-auto max-h-80 border border-gray-700 rounded-lg p-4 bg-gray-800">
            <pre className="text-left text-white whitespace-pre-wrap">{typeof uploadedData === 'string' ? uploadedData : JSON.stringify(uploadedData, null, 2)}</pre>
          </div>
        ) : (
          <p className="text-xl text-red-400">No data available. Please upload again.</p>
        )}
        
        <button 
          className="w-full mt-6 px-8 py-4 rounded-xl font-bold transition-transform transform hover:scale-110 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white"
          onClick={handleProceed}
          disabled={!uploadedData}
        >
          🚀 Proceed to Prediction
        </button>
      </div>
    </div>
  );
}
