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
    clickThroughRate:0,
    collectedEmails: 0,
    data: { emails: [] }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [campaignSaved, setCampaignSaved] = useState(false);
  const [campaignCompleted, setCampaignCompleted] = useState(false); // New state for campaign completion
  const [campaignData, setCampaignData] = useState(null);

  const navigate = useNavigate();

  
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData);
        setData(jsonData);
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
    <div className="bg-opacity-25 backdrop-filter backdrop-blur-lg min-h-screen bg-gray-900 text-white p-4 rounded-2xl">
      <h2 className="text-4xl font-bold text-center p-5">New Campaign</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        {campaignSaved && (
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 text-center">
            Campaign saved successfully!
          </div>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormSection data={data} setData={setData} isLoading={isLoading} />
          <CompanyProfile data={data} setData={setData} />
          <EmailsTable
            emails={data.data.emails}
            selectedEmailIndex={selectedEmailIndex}
            onEmailClick={handleEmailClick}
            isEditMode={isEditMode}
            onSaveProfile={handleSaveProfile}
            onSaveEmail={handleSaveEmail}
          />
          <UploadCSV onAddEmails={handleUploadCSV} />
          <AddEmailManually onAddEmails={handleAddEmails} />
          <GeneratePhishingMail onSendMail={handleFetchAndSendEmail} /> {/* Pass the function here */}
          <Chatbot emails={data.data.emails || []} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Save Campaign
          </button>
        </form>
        {campaignSaved && !campaignCompleted && (
          <button onClick={handleCompleteCampaign} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4">
            Complete Campaign
          </button>
        )}
        {campaignCompleted && (
          <div className="bg-green-500 text-white font-bold py-2 px-4 rounded mt-4 text-center">
            Phishing campaign completed successfully!
            <CampaignAnalytics campaign={data}/>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCampaign;
