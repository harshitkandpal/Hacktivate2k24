import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import CampaignDetail from './CampaignDetail'; // Import CampaignDetail component

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true); // State to track loading state

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const campaignsCollection = collection(db, 'campaigns');
        const campaignSnapshot = await getDocs(campaignsCollection);
        let campaignList = campaignSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        // Sort campaignList by createdAt timestamp in descending order
        campaignList.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds);

        setCampaigns(campaignList);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setLoading(false); // Ensure loading state is updated even on error
      }
    };

    fetchCampaigns();
  }, []);

  if (loading) return <div>Loading...</div>; // Show loading indicator

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold">Campaigns</h2>
        <ul className="mt-4 space-y-4">
          {campaigns.map((campaign) => (
            <li key={campaign.id} className="p-4 bg-gray-50 rounded-lg shadow-sm cursor-pointer">
              <CampaignDetail campaign={campaign} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Campaigns;
