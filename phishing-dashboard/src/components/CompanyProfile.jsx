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

  const renderValue = (value) => {
    return value ? value : 'NA';
  };

  // Only render container if we have at least one field
  const hasProfileData = [domain, organization, industry, twitter, facebook, linkedin, instagram, youtube, country, company_type, description].some(v => v);

  if (!hasProfileData) return null;

  return (
    <div className="border border-white/5 bg-[#0a1118]/80 p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all mt-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <h3 className="text-sm font-tech text-gray-400 tracking-widest uppercase mb-6 flex items-center gap-2 m-0 border-b border-white/5 pb-4">
        <svg className="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
        TARGET PROFILE INTELLIGENCE
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {domain && (
          <div>
            <label htmlFor="domain" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Domain</label>
            <input
              type="text"
              id="domain"
              value={domain}
              onChange={(event) => handleChange('domain', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {organization && (
          <div>
            <label htmlFor="organization" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Organization</label>
            <input
              type="text"
              id="organization"
              value={organization}
              onChange={(event) => handleChange('organization', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {industry && (
          <div>
            <label htmlFor="industry" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Industry</label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(event) => handleChange('industry', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {twitter && (
          <div>
            <label htmlFor="twitter" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Twitter</label>
            <input
              type="text"
              id="twitter"
              value={twitter}
              onChange={(event) => handleChange('twitter', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {facebook && (
          <div>
            <label htmlFor="facebook" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Facebook</label>
            <input
              type="text"
              id="facebook"
              value={facebook}
              onChange={(event) => handleChange('facebook', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {linkedin && (
          <div>
            <label htmlFor="linkedin" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">LinkedIn</label>
            <input
              type="text"
              id="linkedin"
              value={linkedin}
              onChange={(event) => handleChange('linkedin', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {instagram && (
          <div>
            <label htmlFor="instagram" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Instagram</label>
            <input
              type="text"
              id="instagram"
              value={instagram}
              onChange={(event) => handleChange('instagram', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {youtube && (
          <div>
            <label htmlFor="youtube" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">YouTube</label>
            <input
              type="text"
              id="youtube"
              value={youtube}
              onChange={(event) => handleChange('youtube', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {country && (
          <div>
            <label htmlFor="country" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(event) => handleChange('country', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
        {company_type && (
          <div>
            <label htmlFor="companyType" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Company Type</label>
            <input
              type="text"
              id="companyType"
              value={company_type}
              onChange={(event) => handleChange('company_type', event.target.value)}
              className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        )}
      </div>

      {description && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <label htmlFor="description" className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => handleChange('description', event.target.value)}
            className="w-full px-3 py-2 bg-[#050a0f] text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            rows={4}
          />
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
