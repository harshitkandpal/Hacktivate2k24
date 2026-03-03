import React, { useState } from 'react';

const FormSection = ({ data, setData, isLoading, setDomain }) => {
  const [name, setName] = useState('');
  const [domain, setDomainState] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
    setData((prevData) => ({ ...prevData, name: event.target.value }));
  };

  const handleDomainChange = (event) => {
    setDomainState(event.target.value);
    setData((prevData) => ({ ...prevData, domain: event.target.value }));
    setDomain(event.target.value);
  };

  const fetchData = async () => {
    try {
      const response = await fetch();
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData);
      setData((prevData) => ({ ...prevData, ...jsonData }));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:space-x-6 items-end border border-white/5 bg-[#0a1118] p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all">
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-accent opacity-5 rounded-full blur-3xl -mr-10 -mt-10"></div>

      <div className="mb-4 md:mb-0 w-full md:w-5/12 z-10">
        <label htmlFor="campaignName" className="block text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">
          Target Operation Code Name
        </label>
        <input
          id="campaignName"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="e.g. OP_TITAN_FALL"
          className="w-full px-4 py-3 bg-[#050a0f] text-cyber-accent font-mono border border-white/20 rounded-lg shadow-inner focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-700"
          required
        />
      </div>
      <div className="mb-4 md:mb-0 w-full md:w-5/12 z-10">
        <label htmlFor="targetDomain" className="block text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">
          Target Network Domain
        </label>
        <input
          id="targetDomain"
          type="text"
          value={domain}
          onChange={handleDomainChange}
          placeholder="e.g. targetcompany.com"
          className="w-full px-4 py-3 bg-[#050a0f] text-cyber-accent font-mono border border-white/20 rounded-lg shadow-inner focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-700"
          required
        />
      </div>
      <button
        type="button"
        className="w-full md:w-2/12 z-10 h-[50px] bg-cyber-accent/10 border border-cyber-accent text-cyber-accent font-bold tracking-wider uppercase rounded-lg hover:bg-cyber-accent hover:text-black hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={fetchData}
        disabled={isLoading}
      >
        {isLoading ? 'Scanning...' : 'Extract Data'}
      </button>
    </div>
  );
};

export default FormSection;
