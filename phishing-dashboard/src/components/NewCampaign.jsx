import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from './FormSection';
import CompanyProfile from './CompanyProfile';
import EmailsTable from './EmailsTable';
import GeneratePhishingMail from './GeneratePhishingMail';
import UploadCSV from './UploadCSV';
import AddEmailManually from './AddEmailManually';
import CampaignAnalytics from './CampaignAnalytics';
import { db } from '../firebaseConfig'; // Import Firestore and its functions
import { collection, addDoc } from 'firebase/firestore';

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
    data: { emails: [] }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmailIndex, setSelectedEmailIndex] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
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

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', data);
  
    try {
      await addDoc(collection(db, 'campaigns'), data);
      console.log('Campaign saved successfully');
      // Instead of navigating, you can show a success message or handle it in your UI
    } catch (error) {
      console.error('Error saving campaign:', error);
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

  const handleuploadcsv = (newEmails) => {
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

  return (
    <div className="bg-opacity-25 backdrop-filter backdrop-blur-lg min-h-screen bg-gray-900 text-white p-4 rounded-2xl">
      <h2 className="text-4xl font-bold text-center p-5">New Campaign</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
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
          <UploadCSV onAddEmails={handleuploadcsv} />
          <AddEmailManually onAddEmails={handleAddEmails} />
          <GeneratePhishingMail onSendMail={handleGenerateMail} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Save Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
