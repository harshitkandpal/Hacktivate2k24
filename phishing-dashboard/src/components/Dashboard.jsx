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


  const styles = {
    container:{
      background:'#060808',
      color:'#fff'
    },
    dashContainer: {
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      padding: '1rem 2rem',
      position: 'relative', // Ensure relative positioning for pseudo-element
    },
    curveBorder: {
      
      position: 'absolute',
      left: 0,
      bottom: '-10px', // Adjust this value to control the curve's depth
      width: '100%',
      height: '10px', // Adjust height as needed
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%',
      zIndex: 1,
      boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)', // Optional: Add shadow for depth
    },
    logout_btn:{
      color:'#59CCB5'
    },
    btn: {
      backgroundImage: 'linear-gradient(to right, #59CCB5, #0F4364)',
      backgroundSize: '200% auto',
      transition: 'background-position 0.5s ease',
      '&:hover': {
        backgroundPosition: 'right center',
      },
    },
  }


  return (
    <div style={styles.container} className="min-h-screen flex flex-col items-center justify-center">
      <div className="w-full rounded-lg space-y-4">
        <div className="flex justify-between items-center w-full mb-4 px-4" style={styles.dashContainer}>
          <h2 className="text-5xl font-bold">Phishing</h2>
          <button 
          style={styles.logout_btn}
          onMouseEnter={(e) => e.target.style.color = '#797C7C'}
          onMouseLeave={(e) => e.target.style.color = '#59CCB5'}
          onClick={handleLogout} 
          className="text-m font-medium px-4 py-2 rounded-md">Logout</button>
          <div style={styles.curveBorder}></div>
        </div>
        {view === 'list' ? (
          <div className="px-4" style={styles.dashContainer}> {/* Reduced padding */}
            <button onClick={() => setView('create')} className="text-sm font-medium text-white px-4 py-2 rounded-md" style={styles.btn}>New Campaign</button>
            <Campaigns campaigns={campaigns} onProfileEmail={handleProfileEmail} />
          </div>
        ) : view === 'profile' ? (
          <div className="px-4" style={styles.dashContainer}> {/* Reduced padding */}
            <button onClick={() => setView('list')} className="text-sm font-medium text-white px-4 py-2 rounded-md" style={styles.btn}>Back to Campaigns</button>
            <Profile campaignId={selectedCampaign} email={selectedEmail} />
          </div>
        ) : (
          <div className="px-4"style={styles.dashContainer}> {/* Reduced padding */}
            <button onClick={() => setView('list')} className="text-sm font-medium text-white px-4 py-2 rounded-md" style={styles.btn}>Back to Campaigns</button>
            <NewCampaign onCreateCampaign={handleCreateCampaign} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;