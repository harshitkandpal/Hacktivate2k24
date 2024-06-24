import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseConfig';
import NewCampaign from './NewCampaign';
import Campaigns from './Campaigns';
import Profile from './Profile';

const Dashboard = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [view, setView] = useState('list');
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [selectedEmail, setSelectedEmail] = useState('');
  const navigate = useNavigate();

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
      alert('Error fetching campaigns. Please check console for details.');
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

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
      setView('list');
      fetchCampaigns();
    } catch (error) {
      console.error('Error adding campaign:', error);
      alert('Error adding campaign');
    }
  };

  const handleProfileEmail = (campaignId, email) => {
    setSelectedCampaign(campaignId);
    setSelectedEmail(email);
    setView('profile');
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
            <Campaigns campaigns={campaigns} onProfileEmail={handleProfileEmail} />
          </div>
        ) : view === 'profile' ? (
          <div>
            <button onClick={() => setView('list')} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">Back to Campaigns</button>
            <Profile campaignId={selectedCampaign} email={selectedEmail} />
          </div>
        ) : (
          <div>
            <button onClick={() => setView('list')} className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md">Back to Campaigns</button>
            <NewCampaign onCreateCampaign={handleCreateCampaign} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
