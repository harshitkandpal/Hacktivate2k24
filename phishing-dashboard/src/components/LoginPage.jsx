import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebaseConfig';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error);
      alert('Error logging in');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error logging in with Google:', error);
      alert('Error logging in with Google');
    }
  };

  const handleGoToSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-cyber-dark text-gray-200 font-sans relative flex flex-col justify-center items-center overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-primary rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-pulse-slow object-none"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex gap-12 items-center justify-between p-8">

        {/* Left Side: Branding/Hero */}
        <div className="flex-1 animate-float">
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyber-accent/30 bg-cyber-accent/10 text-cyber-accent text-sm font-semibold tracking-wider uppercase mb-6 shadow-[0_0_15px_rgba(0,255,204,0.15)]">
            AI-PhishBot v2.0
          </div>
          <h1 className="text-6xl md:text-7xl font-bold tracking-tight mb-6 leading-tight text-white drop-shadow-md">
            Unlock the Secrets of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-accent to-[#0099ff] drop-shadow-[0_0_25px_rgba(0,255,204,0.4)]">
              Phishing Attacks.
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
            Empower your security teams with advanced AI-driven phishing simulations. Target, track, and train your organization against modern cyber threats.
          </p>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-[450px] bg-cyber-card/60 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-2xl relative group">

          {/* Subtle Glow Border inside card */}
          <div className="absolute -inset-[1px] bg-gradient-to-b from-cyber-accent/30 to-transparent rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none"></div>

          <h2 className="text-3xl font-extrabold text-white mb-2">Secure Login</h2>
          <p className="text-gray-400 mb-8 text-sm">Access your command center.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Email Terminal</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#0a1118] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all placeholder-gray-600"
                placeholder="agent@domain.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest pl-1">Passcode</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#0a1118] border border-white/10 text-white rounded-xl px-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-cyber-accent focus:border-transparent transition-all placeholder-gray-600"
                placeholder="••••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyber-accent text-black font-bold text-lg py-4 rounded-xl hover:bg-white transition-all transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(0,255,204,0.3)] duration-300"
            >
              Initialize Session
            </button>
          </form>

          <div className="mt-8 flex items-center mb-8">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="mx-4 text-xs text-gray-500 uppercase font-semibold">or access via</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center gap-2 bg-[#1a2332] hover:bg-[#253043] border border-white/5 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google SSO
            </button>
            <button
              type="button"
              onClick={handleGoToSignUp}
              className="bg-transparent hover:bg-white/5 border border-white/10 py-3 rounded-xl text-sm font-semibold transition-colors"
            >
              Request Access
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
