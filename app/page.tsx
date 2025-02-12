"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-900 via-purple-900 to-black text-white p-10">
      <div className="text-center">
        <h1 className="text-5xl font-extrabold mb-6 animate-pulse">🚀 Cyberbullying Detection</h1>
        <p className="text-xl mb-8 italic text-gray-300">Identify and prevent harmful online interactions</p>
      </div>
      
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-lg border border-gray-700 w-full max-w-lg text-center">
        <h2 className="text-2xl font-semibold mb-4">Choose the category you want to analyze:</h2>
        <div className="flex flex-col space-y-6">
          <button 
            className="w-full px-8 py-4 rounded-xl text-lg font-bold transition-transform transform hover:scale-105 shadow-md bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-500 hover:to-purple-600 text-white"
            onClick={() => router.push('/login?category=hate-speech')}
          >
            🔥 Hate Speech Tweets
          </button>
          
          <button 
            className="w-full px-8 py-4 rounded-xl text-lg font-bold transition-transform transform hover:scale-105 shadow-md bg-gradient-to-r from-red-600 to-pink-700 hover:from-red-500 hover:to-pink-600 text-white"
            onClick={() => router.push('/login?category=personal-attack')}
          >
            ⚔️ Personal Attack
          </button>
        </div>
      </div>

      <div className="absolute bottom-6 text-gray-400 text-sm">
        <p>💡 Stay safe online. Report and prevent cyberbullying.</p>
      </div>
    </div>
  );
}
