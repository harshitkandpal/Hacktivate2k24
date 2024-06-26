import React from 'react';

const FormSection = ({ data, setData, isLoading }) => {
  const { name = '', domain = '' } = data;

  const handleNameChange = (event) => {
    setData({ ...data, name: event.target.value });
  };

  const handleDomainChange = (event) => {
    setData({ ...data, domain: event.target.value });
  };

  const handleSearchEmails = () => {
    // Implement email search logic here
  };

  return (
    <div className="flex flex-row space-x-4">
      <div>
        <label htmlFor="campaignName" className="block text-white">
          Campaign Name:
        </label>
        <input
          id="campaignName"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label htmlFor="targetDomain" className="block text-white">
          Target Domain:
        </label>
        <input
          id="targetDomain"
          type="text"
          value={domain}
          onChange={handleDomainChange}
          className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="button" // Change type to button because it's not a submit button here
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        style={{ height: '50px' }}
        onClick={handleSearchEmails}
        disabled={isLoading}
      >
        {isLoading ? 'Searching...' : 'Search for Emails'}
      </button>
    </div>
  );
};

export default FormSection;
