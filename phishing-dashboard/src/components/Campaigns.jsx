import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail';
import Papa from 'papaparse';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState(2);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const q = query(collection(db, 'campaigns'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const campaignsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setCampaigns(campaignsData);
        setFilteredCampaigns(campaignsData.slice(0, visibleCampaigns));
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, [visibleCampaigns]);

  const handleSearchInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterCampaigns(term);
  };

  const filterCampaigns = (term) => {
    if (term.trim() === '') {
      setFilteredCampaigns(campaigns.slice(0, visibleCampaigns));
    } else {
      const filtered = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCampaigns(filtered.slice(0, visibleCampaigns));
    }
  };

  const handleDownloadCSV = (campaign) => {
    const csvData = [];
    csvData.push(['Campaign Name', 'Domain', 'Created At', 'EMAIL', 'FIRST NAME', 'LAST NAME', 'POSITION', 'DEPARTMENT', 'PHONE NUMBER']);
    campaign.data.emails.forEach(value => {
      csvData.push([
        campaign.name || '',
        campaign.domain || '',
        new Date(campaign.createdAt).toLocaleString() || 'N/A',
        value.value || '',
        value.first_name || 'N/A',
        value.last_name || 'N/A',
        value.position || 'N/A',
        value.department || 'N/A',
        value.phone_number || 'N/A'
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

  const loadMoreCampaigns = () => setVisibleCampaigns(prev => prev + 2);
  const loadLessCampaigns = () => setVisibleCampaigns(2);

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Active Campaigns</h2>
          <p className="text-gray-400">Monitor and analyze your deployed phishing operations.</p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-cyber-accent opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search campaigns..."
            className="w-full md:w-80 bg-[#0a1118] border border-white/10 text-white rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-cyber-accent focus:border-cyber-accent transition-all placeholder-gray-600"
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredCampaigns.map((campaign, index) => (
          <div key={index} className="bg-[#0c141d]/80 border border-white/5 hover:border-cyber-accent/30 rounded-2xl p-6 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.2)] group">

            <CampaignDetail campaign={campaign} campaignId={campaign.id} />

            <div className="mt-6 flex justify-end border-t border-white/5 pt-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-cyber-primary/20 text-cyber-accent border border-cyber-accent/30 rounded-lg transition-colors text-sm font-semibold"
                onClick={() => handleDownloadCSV(campaign)}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                Export CSV Data
              </button>
            </div>
          </div>
        ))}

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl bg-white/5">
            <p className="text-gray-500">No campaigns found. Ready to initialize a new operation?</p>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        {visibleCampaigns < campaigns.length && (
          <button
            className="px-6 py-2.5 rounded-lg bg-cyber-primary text-white font-medium hover:bg-cyber-primary/80 transition-colors shadow-lg"
            onClick={loadMoreCampaigns}
          >
            Load More Archives
          </button>
        )}

        {visibleCampaigns > 2 && (
          <button
            className="px-6 py-2.5 rounded-lg bg-transparent border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 font-medium transition-colors"
            onClick={loadLessCampaigns}
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
