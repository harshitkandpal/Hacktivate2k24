import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail';
import * as XLSX from 'xlsx';

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

  const handleDownloadExcel = (campaign) => {
    const excelData = [
      ['Name', 'Domain', 'Created At'],
      [campaign.name || '', campaign.domain || '', new Date(campaign.timestamp * 1000).toLocaleString() || 'N/A']
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);
    XLSX.utils.book_append_sheet(wb, ws, 'Campaign Details');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.name || 'campaign'}_details.xlsx`;
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
                onClick={() => handleDownloadExcel(campaign)}
              >
                Download Excel
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;
