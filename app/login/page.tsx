"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash } from 'react-icons/fa';


export default function AuthForm() {
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  // const validatePassword = (password) => password.length >= 6;
  const validateEmail = (email: string): boolean => /\S+@\S+\.\S+/.test(email);
const validatePassword = (password: string): boolean => password.length >= 6;


  const handleAuth = () => {
    setLoading(true);
    setError('');
    
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      setLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      setError('Password must be at least 6 characters long.');
      setLoading(false);
      return;
    }
    
    setTimeout(() => {
      if (isSignUp) {
        alert('Account created successfully! Please log in.');
        setIsSignUp(false);
      } else {
        router.push('/upload-query');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 via-purple-800 to-black text-white p-10">
      <div className="bg-white bg-opacity-10 p-10 rounded-2xl shadow-2xl border border-gray-600 w-full max-w-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-purple-500">
        <h1 className="text-6xl font-extrabold mb-6 animate-bounce">{isSignUp ? '📝 Sign Up' : '🔐 Login'}</h1>
        <p className="text-xl mb-6 text-gray-300">{isSignUp ? 'Create an account to get started' : 'Access the cyberbullying detection tool'}</p>
        
        {isSignUp && (
          <input 
            type="text" 
            placeholder="Full Name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:ring-4 hover:ring-purple-400 transition duration-200"
          />
        )}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full p-4 mb-4 rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:ring-4 hover:ring-purple-400 transition duration-200"
        />
        
        <div className="relative w-full">
          <input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-4 mb-6 rounded-lg text-black focus:outline-none focus:ring-4 focus:ring-indigo-500 hover:ring-4 hover:ring-purple-400 transition duration-200"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-4 flex items-center text-gray-700 hover:text-gray-900"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>
        
        {error && <p className="text-red-400 mb-4 font-semibold">{error}</p>}
        
        <button 
          className="w-full px-8 py-4 rounded-xl font-bold transition-transform transform hover:scale-110 shadow-lg bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-400 hover:to-blue-500 text-white"
          onClick={handleAuth} 
          disabled={loading}
        >
          {loading ? '🔄 Processing...' : isSignUp ? '🚀 Sign Up' : '🚀 Log In'}
        </button>
        
        <p className="mt-6 text-md text-gray-400">
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <span 
            className="text-blue-400 cursor-pointer hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Log In' : 'Sign Up'}
          </span>
        </p>
      </div>
    </div>
  );
}
