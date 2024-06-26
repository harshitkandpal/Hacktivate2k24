import React from 'react';

const CompanyProfile = ({ data, setData }) => {
  const {
    domain = '',
    organization = '',
    industry = '',
    twitter = '',
    facebook = '',
    linkedin = '',
    instagram = '',
    youtube = '',
    country = '',
    company_type = '',
    description = ''
  } = data;

  return (
    <div className="flex flex-row space-x-4 mt-4">
      <label htmlFor="domain" className="block text-white">Domain:</label>
      <input
        type="text"
        id="domain"
        value={domain}
        onChange={(event) => setData({ ...data, domain: event.target.value })}
        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {/* Add other input fields for company profile */}
    </div>
  );
};

export default CompanyProfile;
