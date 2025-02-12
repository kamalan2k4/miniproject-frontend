"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PredictionResult() {
  const router = useRouter();
  // const [prediction, setPrediction] = useState(null);
  type PredictionType = {
    label: string;
    offensiveness: number;
    message: string;
  };
  
  const [prediction, setPrediction] = useState<PredictionType | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('predictionResult');
    if (storedResult) {
      setPrediction(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white p-10">
      <div className="bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-3xl text-center transform transition duration-300 hover:scale-105 hover:shadow-purple-500">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">🧠 Prediction Result</h1>
        <p className="text-lg mb-6 text-gray-300">Check the AI's analysis of your input</p>
        
        {loading ? (
          <p className="text-xl text-gray-400 animate-pulse">Processing...</p>
        ) : prediction ? (
          <div className="overflow-y-auto max-h-80 border border-gray-700 rounded-lg p-4 bg-gray-800">
            <h2 className="text-3xl font-bold mb-4">{prediction?.label}</h2>
<p className="text-lg mb-4">
  Offensiveness Score: <span className="font-bold text-yellow-400">
    {(prediction?.offensiveness ?? 0) * 100}%
  </span>
</p>
<p className="text-md text-gray-300">{prediction?.message}</p>

          </div>
        ) : (
          <p className="text-xl text-red-400">No prediction available. Please try again.</p>
        )}
        
        <button 
          className="w-full mt-6 px-8 py-4 rounded-xl font-bold transition-transform transform hover:scale-110 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white"
          onClick={() => router.push('/analysis')}
        >
          📊 Proceed to Analysis
        </button>
      </div>
    </div>
  );
}
