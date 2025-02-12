"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

export default function AnalysisPage() {
  const router = useRouter();
  // const [analysis, setAnalysis] = useState(null);
  type AnalysisType = {
    label: string;
    offensiveness: number;
    message: string;
  };
  
  const [analysis, setAnalysis] = useState<AnalysisType | null>(null);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedResult = sessionStorage.getItem('predictionResult');
    if (storedResult) {
      setAnalysis(JSON.parse(storedResult));
    }
    setLoading(false);
  }, []);

  const data = {
    labels: ['Offensive Content', 'Non-Offensive Content'],
    datasets: [
      {
        label: 'Analysis Breakdown',
        // data: analysis ? [analysis.offensiveness * 100, (1 - analysis.offensiveness) * 100] : [50, 50],
        data: analysis
  ? [analysis.offensiveness * 100, (1 - analysis.offensiveness) * 100]
  : [50, 50],

        backgroundColor: ['#ff4d4d', '#4CAF50'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white p-10">
      <div className="bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-3xl text-center transform transition duration-300 hover:scale-105 hover:shadow-purple-500">
        <h1 className="text-5xl font-extrabold mb-6 animate-fade-in">📊 Analysis Report</h1>
        <p className="text-lg mb-6 text-gray-300">See the breakdown of your input's offensiveness</p>
        
        {loading ? (
          <p className="text-xl text-gray-400 animate-pulse">Generating analysis...</p>
        ) : analysis ? (
          <div className="w-full flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-4">Offensiveness Score: <span className="text-yellow-400">{(analysis.offensiveness * 100).toFixed(2)}%</span></h2>
            <p className="text-md text-gray-300 mb-6">{analysis.message}</p>
            <div className="w-72 h-72">
              <Pie data={data} />
            </div>
          </div>
        ) : (
          <p className="text-xl text-red-400">No analysis available. Please try again.</p>
        )}
        
        <button 
          className="w-full mt-6 px-8 py-4 rounded-xl font-bold transition-transform transform hover:scale-110 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white"
          onClick={() => router.push('/')}
        >
          🔄 Start New Analysis
        </button>
      </div>
    </div>
  );
}
