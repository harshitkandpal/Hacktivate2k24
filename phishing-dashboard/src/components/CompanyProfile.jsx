import React from 'react';

const CompanyProfile = ({ data, setData }) => {
  const {
    domain,
    organization,
    industry,
    twitter,
    facebook,
    linkedin,
    instagram,
    youtube,
    country,
    company_type,
    description
  } = data.data;

  const handleChange = (key, value) => {
    setData({ ...data, [key]: value });
  };

  // Function to render "NA" if value is null or empty
  const renderValue = (value) => {
    return value ? value : 'NA';
  };

  return (
    <div className="flex flex-wrap mt-4">
      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        {domain && (
          <div className="mb-4">
            <label htmlFor="domain" className="block text-white">Domain:</label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(event) => handleChange('domain', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {organization && (
          <div className="mb-4">
            <label htmlFor="organization" className="block text-white">Organization:</label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(event) => handleChange('organization', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {industry && (
          <div className="mb-4">
            <label htmlFor="industry" className="block text-white">Industry:</label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(event) => handleChange('industry', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        {twitter && (
          <div className="mb-4">
            <label htmlFor="twitter" className="block text-white">Twitter:</label>
            <input
              type="text"
              id="twitter"
              value={twitter}
              onChange={(event) => handleChange('twitter', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {facebook && (
          <div className="mb-4">
            <label htmlFor="facebook" className="block text-white">Facebook:</label>
            <input
              type="text"
              id="facebook"
              value={facebook}
              onChange={(event) => handleChange('facebook', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {linkedin && (
          <div className="mb-4">
            <label htmlFor="linkedin" className="block text-white">LinkedIn:</label>
            <input
              type="text"
              id="linkedin"
              value={linkedin}
              onChange={(event) => handleChange('linkedin', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        {instagram && (
          <div className="mb-4">
            <label htmlFor="instagram" className="block text-white">Instagram:</label>
            <input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(event) => handleChange('instagram', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {youtube && (
          <div className="mb-4">
            <label htmlFor="youtube" className="block text-white">YouTube:</label>
            <input
              type="text"
              id="youtube"
              value={youtube}
              onChange={(event) => handleChange('youtube', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 md:mb-0">
        {country && (
          <div className="mb-4">
            <label htmlFor="country" className="block text-white">Country:</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(event) => handleChange('country', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        {company_type && (
          <div className="mb-4">
            <label htmlFor="companyType" className="block text-white">Company Type:</label>
            <input
              type="text"
              id="companyType"
              value={company_type}
              onChange={(event) => handleChange('company_type', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="w-full mb-4">
        {description && (
          <div className="mb-4">
            <label htmlFor="description" className="block text-white">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(event) => handleChange('description', event.target.value)}
              className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyProfile;
