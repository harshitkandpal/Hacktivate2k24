import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail';
import Papa from 'papaparse';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState(2); // Initially show 2 campaigns

  useEffect(() => {
    const fetchCampaigns = async () => {
      const querySnapshot = await getDocs(collection(db, 'campaigns'));
      const campaignsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCampaigns(campaignsData);
      setFilteredCampaigns(campaignsData.slice(0, visibleCampaigns)); // Show initial visible campaigns
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
      setFilteredCampaigns(campaigns.slice(0, visibleCampaigns)); // Filter visible campaigns
    } else {
      const filtered = campaigns.filter(campaign =>
        campaign.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCampaigns(filtered.slice(0, visibleCampaigns)); // Filter and limit visible campaigns
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

  // Styles object
  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff', // Text color
      padding: '20px', // Padding around the content
    },
    card: {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background
      backdropFilter: 'blur(10px)', // Apply backdrop filter for glassmorphism effect
      borderRadius: '12px', // Rounded corners
      padding: '20px', // Padding around the content
      margin: '10px', // Margin for spacing
      boxShadow: '0 0 10px #59CCB5', // Box shadow with color #59CCB5
    },
    input: {
      padding: '10px',
      border: '1px solid #666666',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent white background for input
      color: '#ffffff', // Text color
      marginBottom: '10px', // Margin bottom for spacing
    },
    list: {
      marginTop: '20px', // Margin top for spacing
      listStyleType: 'none', // Remove list styles
      padding: '0', // Remove padding
    },
    listItem: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)', // Transparent dark background for list items
      padding: '16px', // Padding for each item
      marginBottom: '10px', // Margin bottom for spacing
      borderRadius: '8px', // Rounded corners
      transition: 'background-color 0.3s ease', // Smooth background color transition
    },
    button: {
      backgroundColor: '#4caf50', // Green background for button
      color: '#000000', // Black text color
      padding: '10px 20px', // Padding for button
      border: 'none', // No border
      borderRadius: '8px', // Rounded corners
      cursor: 'pointer', // Pointer cursor
      transition: 'background-color 0.3s ease', // Smooth background color transition
    },
    loadButton: {
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      border: 'none',
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        background: 'linear-gradient(45deg, rgba(89, 204, 181, 0.2) 10%, rgba(6, 8, 8, 0.9) 90%)',
        transition: 'background-color 0.3s ease',
      }
    },
  };

  const loadMoreCampaigns = () => {
    setVisibleCampaigns(prev => prev + 2); // Increase visible campaigns by 2
  };

  const loadLessCampaigns = () => {
    setVisibleCampaigns(2); // Reset visible campaigns to 2
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 className="text-4xl font-bold p-4">Campaigns</h2>
        <input
          type="text"
          placeholder="Search campaigns..."
          className="p-2 border border-gray-600 rounded-lg"
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={styles.input}
        />
        <ul style={styles.list}>
          {filteredCampaigns.map((campaign, index) => (
            <li key={index} style={styles.listItem}  >
              <CampaignDetail campaign={campaign} campaignId={campaign.id} />
              <button
                className=" px-4 py-2 rounded-lg mt-2" 
                onClick={() => handleDownloadCSV(campaign)}
                style={styles.loadButton}
              >
                Download CSV
              </button>
            </li>
          ))}
        </ul>
        {visibleCampaigns < campaigns.length ? (
          <button
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={loadMoreCampaigns}
          >
            Load More
          </button>
        ) : (
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={loadLessCampaigns}
          >
            Load Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Campaigns;
