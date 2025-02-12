"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaCloudUploadAlt } from 'react-icons/fa';

export default function UploadQuery() {
  const router = useRouter();
  const [text, setText] = useState('');
  // const [file, setFile] = useState(null);
  const [file, setFile] = useState<File | null>(null);

  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];  // Use optional chaining to prevent errors
  
    if (uploadedFile && uploadedFile.type === 'text/csv') {
      setFile(uploadedFile);
      setError('');
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = (event.target as FileReader).result; // Ensure TypeScript knows it's a FileReader
        sessionStorage.setItem('uploadedData', JSON.stringify(result));
      };
      
      reader.readAsText(uploadedFile);
    } else {
      setError('Only CSV files are allowed.');
    }
  };

  const handleSubmit = () => {
    if (!text && !file) {
      setError('Please enter text or upload a file.');
      return;
    }
    setError('');
    
    if (text) {
      sessionStorage.setItem('uploadedData', JSON.stringify(text));
    }
    
    router.push('/preview-data');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white p-10">
      <div className="bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-purple-500">
        <h1 className="text-5xl font-extrabold mb-6 animate-pulse">📂 Upload Query</h1>
        <p className="text-lg mb-6 text-gray-300">Enter text or upload a CSV file to analyze</p>
        
        <textarea
          placeholder="Enter your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:ring-4 hover:ring-purple-400 transition duration-200"
        />
        
        <label className="w-full flex flex-col items-center p-6 mb-4 border-2 border-dashed border-gray-400 rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition duration-200">
          <FaCloudUploadAlt className="text-4xl text-gray-300 mb-2" />
          <span className="text-gray-300">Click to upload CSV</span>
          <input type="file" accept=".csv" className="hidden" onChange={handleFileUpload} />
        </label>
        
        {file && <p className="text-green-400 mb-2">Uploaded: {file.name}</p>}
        {error && <p className="text-red-400 mb-4 font-semibold">{error}</p>}
        
        <button 
          className="w-full px-8 py-4 rounded-xl font-bold transition-transform transform hover:scale-110 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white"
          onClick={handleSubmit} 
        >
          🚀 Proceed to Preview
        </button>
      </div>
    </div>
  );
}
