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
    <div className="flex flex-col md:flex-row md:space-x-4">
      <div className="mb-4 md:w-1/2">
        <label htmlFor="campaignName" className="block text-white">
          Campaign Name:
        </label>
        <input
          id="campaignName"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ maxWidth: 'calc(100% - 8rem)' }} // Adjusted width here
          required
        />
      </div>
      <div className="mb-4 md:w-1/2">
        <label htmlFor="targetDomain" className="block text-white">
          Target Domain:
        </label>
        <input
          id="targetDomain"
          type="text"
          value={domain}
          onChange={handleDomainChange}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          style={{ maxWidth: 'calc(100% - 8rem)' }} // Adjusted width here
          required
        />
      </div>
      <button
        type="button" // Change type to button because it's not a submit button here
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 md:self-end"
        style={{ height: '50px', minWidth: '9rem' }} // Adjusted minimum width here
        onClick={fetchData}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search Emails'}
      </button>
    </div>
  );
};

export default FormSection;
