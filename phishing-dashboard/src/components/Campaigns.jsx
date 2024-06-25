import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail';
import * as XLSX from 'xlsx';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [visibleCampaignsCount, setVisibleCampaignsCount] = useState(5);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const campaignsCollection = collection(db, 'campaigns');
      const campaignSnapshot = await getDocs(campaignsCollection);
      let campaignList = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt || { seconds: 0 }
      }));

      campaignList.sort((a, b) => {
        const aCreatedAt = a.createdAt ? a.createdAt.seconds : 0;
        const bCreatedAt = b.createdAt ? b.createdAt.seconds : 0;
        return bCreatedAt - aCreatedAt;
      });

      setCampaigns(campaignList);
      setFilteredCampaigns(campaignList);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      setLoading(false);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
    filterCampaigns(event.target.value);
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

  const loadMoreCampaigns = () => {
    setVisibleCampaignsCount(prevCount => prevCount + 5);
  };

  const handleDownloadExcel = (campaign) => {
    // Prepare data for Excel
    const excelData = [
      ['Name', 'Domain', 'Created At'],
      [campaign.name || '', campaign.domain || '', campaign.createdAt ? new Date(campaign.createdAt.seconds * 1000).toLocaleString() : 'N/A']
      // Add more fields as needed
    ];

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(excelData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Campaign Details');

    // Convert and save to blob
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Create blob object
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Create URL for blob
    const url = URL.createObjectURL(blob);

    // Create anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = `${campaign.name || 'campaign'}_details.xlsx`;

    // Append anchor to body
    document.body.appendChild(a);

    // Click anchor to trigger download
    a.click();

    // Remove anchor from body
    document.body.removeChild(a);

    // Revoke URL
    URL.revokeObjectURL(url);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold">Campaigns</h2>

        <input
          type="text"
          placeholder="Search campaigns..."
          className="p-2 border border-gray-300 rounded-lg"
          value={searchTerm}
          onChange={handleSearchInputChange}
        />

        <ul className="mt-4 space-y-4">
          {filteredCampaigns.slice(0, visibleCampaignsCount).map((campaign) => (
            <li key={campaign.id} className="p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
              <CampaignDetail campaign={campaign} fetchCampaignData={fetchCampaigns} />
              <button
                className="bg-green-500 text-black px-4 py-2 rounded-lg mt-2"
                onClick={() => handleDownloadExcel(campaign)}
              >
                Download Excel
              </button>
            </li>
          ))}
        </ul>

        {visibleCampaignsCount < filteredCampaigns.length && (
          <button
            className="bg-blue-500 text-black px-4 py-2 rounded-lg"
            onClick={loadMoreCampaigns}
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Campaigns;