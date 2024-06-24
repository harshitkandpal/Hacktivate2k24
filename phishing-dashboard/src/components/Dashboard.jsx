import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import NewCampaign from './NewCampaign'; // Import NewCampaign component

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [view, setView] = useState('list'); // 'list' or 'create'
  const navigate = useNavigate();

  // Define fetchCampaigns function outside useEffect
  const fetchCampaigns = async () => {
    try {
      const campaignsCollection = collection(db, 'campaigns');
      const campaignSnapshot = await getDocs(campaignsCollection);
      const campaignList = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(campaignList);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
      alert('Error fetching campaigns');
    }
  };

  useEffect(() => {
    fetchCampaigns(); // Call fetchCampaigns when component mounts
  }, []); // Empty dependency array means this effect runs once on mount

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
    }
  };

  const handleCreateCampaign = async (campaignData) => {
    try {
      await addDoc(collection(db, 'campaigns'), {
        ...campaignData,
        createdAt: new Date()
      });
      setView('list'); // Switch back to list view after campaign creation
      fetchCampaigns(); // Refetch campaigns
    } catch (error) {
      console.error('Error adding campaign:', error);
      alert('Error adding campaign');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <button onClick={handleLogout} className="text-sm font-medium text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md">Logout</button>
        </div>
        {view === 'list' ? (
          <div>
            <button onClick={() => setView('create')} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">New Campaign</button>
            <h3 className="text-2xl font-bold mt-4">Campaigns</h3>
            <ul className="mt-4 space-y-4">
              {campaigns.map(campaign => (
                <li key={campaign.id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h4 className="text-xl font-bold">{campaign.name}</h4>
                  <p className="text-gray-700">Domain: {campaign.domain}</p>
                  <p className="text-gray-700">Created At: {new Date(campaign.createdAt.seconds * 1000).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            <button onClick={() => setView('list')} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">Back to Campaigns</button>
            <NewCampaign onCreateCampaign={handleCreateCampaign} /> {/* Pass handleCreateCampaign as prop */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
