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
    <div className="min-h-screen bg-cyber-dark text-gray-200 font-sans">

      {/* Top Navbar / Header */}
      <nav className="fixed w-full z-50 bg-[#0c141d]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cyber-accent/10 border border-cyber-accent/30 flex items-center justify-center">
                <div className="w-4 h-4 bg-cyber-accent rounded-sm animate-pulse"></div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">
                Command <span className="text-cyber-accent">Center</span>
              </h1>
            </div>

            <div className="flex items-center gap-4">
              {view === 'list' ? (
                <button
                  onClick={() => setView('create')}
                  className="px-5 py-2 rounded-lg bg-cyber-accent text-black font-semibold hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  New Campaign
                </button>
              ) : (
                <button
                  onClick={() => setView('list')}
                  className="px-5 py-2 rounded-lg border border-white/10 hover:bg-white/5 text-gray-300 font-semibold transition-all flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                  Back to Campaigns
                </button>
              )}

              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 font-medium transition-all"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="pt-28 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
        <div className="bg-[#0c141d]/60 backdrop-blur-xl border border-white/5 rounded-2xl shadow-xl overflow-hidden relative">

          {/* subtle glow at top of container */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-accent/50 to-transparent"></div>

          <div className="p-8">
            {view === 'list' && (
              <div className="animate-fadeIn">
                <Campaigns campaigns={campaigns} onProfileEmail={handleProfileEmail} />
              </div>
            )}

            {view === 'profile' && (
              <div className="animate-fadeIn">
                <h2 className="text-xl text-cyber-accent mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                  Target Intelligence Profile
                </h2>
                <Profile campaignId={selectedCampaign} email={selectedEmail} />
              </div>
            )}

            {view === 'create' && (
              <div className="animate-fadeIn">
                <h2 className="text-xl text-cyber-accent mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                  Deploy New Operation
                </h2>
                <NewCampaign onCreateCampaign={handleCreateCampaign} />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
