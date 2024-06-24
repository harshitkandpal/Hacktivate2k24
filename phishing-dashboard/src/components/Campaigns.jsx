// src/components/Campaigns.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get('/api/campaigns');
        setCampaigns(response.data);
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold">Campaigns</h2>
        <ul className="mt-4 space-y-4">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <h4 className="text-xl font-bold">{campaign.name}</h4>
              <p className="text-gray-700">Domain: {campaign.domain}</p>
              <p className="text-gray-700">Created At: {new Date(campaign.createdAt.seconds * 1000).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;
