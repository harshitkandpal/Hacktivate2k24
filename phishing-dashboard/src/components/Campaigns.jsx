import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail';
import Papa from 'papaparse';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const querySnapshot = await getDocs(collection(db, 'campaigns'));
      const campaignsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCampaigns(campaignsData);
      setFilteredCampaigns(campaignsData);
    };

    fetchCampaigns();
  }, []);

  const handleSearchInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterCampaigns(term);
  };

  const filterCampaigns = (term) => {
    if (term.trim() === '') {
      setFilteredCampaigns(campaigns);
    } else {
      const filtered = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCampaigns(filtered);
    }
  };

  const handleDownloadCSV = (campaign) => {
    const csvData = [];

    // Header row
    csvData.push(['Campaign Name', 'Domain', 'Created At', 'Email', 'Verified', 'Quality', 'Name']);

    // Campaign details row
    campaign.emails.forEach(email => {
      csvData.push([
        campaign.name || '',
        campaign.domain || '',
        new Date(campaign.timestamp * 1000).toLocaleString() || 'N/A',
        email.email || '',
        email.verified ? 'Yes' : 'No',
        email.quality || '',
        email.name || 'N/A'
      ]);
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.setAttribute('download', `${campaign.name || 'campaign'}_details.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-black p-4">
      <div className="w-full max-w-screen-xl bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold">Campaigns</h2>
        <input
          type="text"
          placeholder="Search campaigns..."
          className="p-2 border border-gray-600 rounded-lg bg-gray-700 text-black"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />
        <ul className="mt-4 space-y-4">
          {filteredCampaigns.map((campaign, index) => (
            <li key={index} className="p-4 bg-gray-700 rounded-lg shadow-sm cursor-pointer">
              <CampaignDetail campaign={campaign} campaignId={campaign.id} />
              <button
                className="bg-green-500 text-black px-4 py-2 rounded-lg mt-2"
                onClick={() => handleDownloadCSV(campaign)}
              >
                Download CSV
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;
