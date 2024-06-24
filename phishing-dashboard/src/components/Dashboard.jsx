// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [view, setView] = useState('list'); // 'list' or 'create'
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCampaigns = async () => {
      const campaignsCollection = collection(db, 'campaigns');
      const campaignSnapshot = await getDocs(campaignsCollection);
      const campaignList = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(campaignList);
    };
    fetchCampaigns();
  }, []);

  const handleCreateCampaign = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'campaigns'), {
        name,
        domain,
        createdAt: new Date()
      });
      setName('');
      setDomain('');
      setView('list');
      // Refetch campaigns
      const campaignsCollection = collection(db, 'campaigns');
      const campaignSnapshot = await getDocs(campaignsCollection);
      const campaignList = campaignSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setCampaigns(campaignList);
    } catch (error) {
      console.error('Error adding campaign:', error);
      alert('Error adding campaign');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Error logging out');
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
            <h3 className="text-2xl font-bold mt-4">Create New Campaign</h3>
            <form onSubmit={handleCreateCampaign} className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Target Domain</label>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Create Campaign
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
