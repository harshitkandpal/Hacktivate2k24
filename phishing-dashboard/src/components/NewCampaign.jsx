import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from './FormSection';
import CompanyProfile from './CompanyProfile';
import EmailsTable from './EmailsTable';
import GeneratePhishingMail from './GeneratePhishingMail';
import UploadCSV from './UploadCSV';
import AddEmailManually from './AddEmailManually';
import CampaignAnalytics from './CampaignAnalytics'; // Import CampaignAnalytics component
import Chatbot from './Chatbot';
import { db } from '../firebaseConfig';
import { collection, addDoc, getDoc, doc } from 'firebase/firestore';

const NewCampaign = () => {
  const [data, setData] = useState({
    name: '', // Added name field here
    domain: '',
    organization: '',
    industry: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
    country: '',
    company_type: '',
    description: '',
    clickThroughRate: 1,
    collectedEmails: 10,
    data: { emails: [] }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [campaignSaved, setCampaignSaved] = useState(false);
  const [campaignCompleted, setCampaignCompleted] = useState(false); // New state for campaign completion
  const [campaignData, setCampaignData] = useState(null);
  const [domain, setDomain] = useState('');

  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch();
      const jsonData = await response.json();
      console.log('Fetched data:', jsonData);
      setData((prevData) => ({ ...prevData, ...jsonData }));
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', data);

    try {
      const campaignData = {
        ...data,
        createdAt: Date.now()
      };

      const docRef = await addDoc(collection(db, 'campaigns'), campaignData);
      console.log('Campaign saved successfully with ID:', docRef.id);
      setCampaignSaved(true);
      setCampaignData(campaignData);
      console.log('Campaign Saved:', campaignSaved);
      console.log('Campaign Data:', campaignData);
    } catch (error) {
      console.error('Error saving campaign:', error);
    }
  };

  const handleFetchAndSendEmail = async () => {
    try {
      const docRef = doc(db, 'campaigns', '<CAMPAIGN_ID>'); // Replace with the actual campaign ID
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const campaignData = docSnap.data();
        console.log('Fetched campaign data:', campaignData);
        handleGenerateMail(campaignData);
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error fetching campaign data:', error);
    }
  };

  const handleEmailClick = (index) => {
    setSelectedEmailIndex(index);
    setIsEditMode(true);
  };

  const handleSaveProfile = (index, updatedProfile) => {
    setData((prevData) => {
      const updatedEmails = [...prevData.data.emails];
      updatedEmails[index] = updatedProfile;
      return {
        ...prevData,
        data: { ...prevData.data, emails: updatedEmails },
      };
    });
  };

  const handleSaveEmail = (updatedEmail) => {
    console.log('Saving email:', updatedEmail);
    setData((prevData) => {
      const updatedEmails = [...prevData.data.emails];
      updatedEmails[selectedEmailIndex] = updatedEmail;
      console.log('Updated emails:', updatedEmails);
      return {
        ...prevData,
        data: { ...prevData.data, emails: updatedEmails },
      };
    });
    setIsEditMode(false);
  };

  const handleUploadCSV = (newEmails) => {
    setData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, emails: [...prevData.data.emails, ...newEmails] },
    }));
  };

  const handleAddEmails = (newEmail) => {
    setData((prevData) => ({
      ...prevData,
      data: {
        ...prevData.data,
        emails: [...prevData.data.emails, newEmail],
      },
    }));
  };

  const handleGenerateMail = (mailData) => {
    console.log('Sending phishing mail:', mailData);
  };

  const handleCompleteCampaign = () => {
    console.log('Campaign completed!');
    setCampaignCompleted(true); // Mark the campaign as completed
  };

  console.log('Campaign Saved:', campaignSaved);
  console.log('Campaign Completed:', campaignCompleted);
  console.log('Campaign Data:', data);

  return (
    <div className="w-full relative">
      <div className="bg-[#0a1118]/80 border border-white/5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.2)] p-8 relative overflow-hidden">
        {/* subtle glow at top of card */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyber-accent/30 to-transparent"></div>

        {campaignSaved && (
          <div className="mb-8 border border-cyber-accent/30 bg-cyber-accent/10 px-4 py-3 rounded-lg flex items-center gap-3">
            <svg className="w-5 h-5 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            <span className="text-cyber-accent font-mono text-sm">OPERATION SAVED AND READY FOR DEPLOYMENT</span>
          </div>
        )}

        <form className="space-y-0" onSubmit={handleSubmit}>
          <FormSection data={data} setData={setData} isLoading={isLoading} setDomain={setDomain} />
          <CompanyProfile data={data} setData={setData} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-white/5 mt-6">
            <div className="space-y-0 relative">
              <UploadCSV onAddEmails={handleUploadCSV} />
              <AddEmailManually onAddEmails={handleAddEmails} />
            </div>
            <div>
              <EmailsTable
                emails={data.data.emails}
                selectedEmailIndex={selectedEmailIndex}
                onEmailClick={handleEmailClick}
                isEditMode={isEditMode}
                onSaveProfile={handleSaveProfile}
                onSaveEmail={handleSaveEmail}
              />
            </div>
          </div>

          <div className="pt-6 border-t border-white/5 mt-6">
            <GeneratePhishingMail onSendMail={handleFetchAndSendEmail} />
          </div>

          <div className="pt-6 border-t border-white/5 mt-6">
            <Chatbot emails={data.data.emails || []} />
          </div>

          <div className="pt-8 flex gap-4 mt-8 border-t border-white/5">
            <button
              type="submit"
              className="px-8 py-3 bg-cyber-primary/20 text-cyber-primary border border-cyber-primary font-bold rounded-xl hover:bg-cyber-primary hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2 tracking-wider uppercase"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
              Save Parameters
            </button>

            {campaignSaved && !campaignCompleted && (
              <button
                type="button"
                onClick={handleCompleteCampaign}
                className="px-8 py-3 bg-cyber-accent/20 text-cyber-accent border border-cyber-accent font-bold rounded-xl hover:bg-cyber-accent hover:text-black hover:shadow-[0_0_15px_rgba(0,255,204,0.4)] transition-all duration-300 flex items-center gap-2 tracking-wider uppercase"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Deploy Now
              </button>
            )}
          </div>
        </form>

        {campaignCompleted && (
          <div className="mt-8">
            <div className="mb-6 border border-cyber-accent/30 bg-cyber-accent/10 px-4 py-3 rounded-lg flex items-center gap-3">
              <svg className="w-5 h-5 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
              <span className="text-cyber-accent font-mono text-sm uppercase tracking-widest">Operation Successfully Deployed</span>
            </div>
            <CampaignAnalytics campaign={data} />
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCampaign;
