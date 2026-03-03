import React, { useState } from 'react';

const AddEmailManually = ({ onAddEmails }) => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState({
    name: '',
    position: '',
    company: '',
    linkedin: '',
    twitter: '',
    phone: '',
  });

  const handleAddEmail = () => {
    console.log(onAddEmails);
    const newEmail = {
      value: email,
      profile: profile,
    };
    onAddEmails(newEmail);
    setEmail('');
    setProfile({
      name: '',
      position: '',
      company: '',
      linkedin: '',
      twitter: '',
      phone: '',
    });
  };

  return (
    <div className="border border-white/5 bg-[#0a1118]/80 p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all mt-6">
      <h3 className="text-sm font-tech text-gray-400 tracking-widest uppercase mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
        MANUAL TARGET ENTRY
      </h3>

      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="email"
          placeholder="target@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-[#050a0f] text-cyber-accent font-mono border border-white/20 rounded-lg shadow-inner focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-700"
        />

        <button
          type="button"
          onClick={handleAddEmail}
          className="bg-cyber-accent/10 border border-cyber-accent text-cyber-accent font-bold tracking-wider text-sm px-6 py-2.5 rounded-lg hover:bg-cyber-accent hover:text-black hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-300 whitespace-nowrap"
        >
          INJECT TARGET
        </button>
      </div>
    </div>
  );
};

export default AddEmailManually;
