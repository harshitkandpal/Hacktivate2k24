import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from './FormSection';
import CompanyProfile from './CompanyProfile';
import EmailsTable from './EmailsTable';
import GeneratePhishingMail from './GeneratePhishingMail';
import UploadCSV from './UploadCSV';
import AddEmailManually from './AddEmailManually';
import CampaignAnalytics from './CampaignAnalytics'; // Import CampaignAnalytics component

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
  const [isCampaignRunning, setIsCampaignRunning] = useState(false); // State to manage campaign status
  const navigate = useNavigate();

  // Example implementation of handleSaveProfile
  const handleSaveProfile = (index, updatedProfile) => {
    const updatedEmails = [...data.data.emails];
    updatedEmails[index].profile = updatedProfile;
    setData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, emails: updatedEmails },
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/data.json');
        const jsonData = await response.json();
        console.log('Fetched data:', jsonData); // Log fetched data
        setData(jsonData); // Set initial data from data.json
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', data);
    navigate('/success');
  };

  const handleEmailClick = (index) => {
    setSelectedEmailIndex(index);
    setIsEditMode(true);
  };

  const handleSaveEmail = (updatedEmail) => {
    const updatedEmails = [...data.data.emails];
    updatedEmails[selectedEmailIndex] = updatedEmail;
    setData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, emails: updatedEmails },
    }));
    setIsEditMode(false);
  };

  const handleAddEmails = (newEmails) => {
    setData((prevData) => ({
      ...prevData,
      data: { ...prevData.data, emails: [...prevData.data.emails, ...newEmails] },
    }));
  };

  const handleSendMail = (mailData) => {
    console.log('Sending phishing mail:', mailData);
    // Implement the logic to send the phishing mail here
  };

  const handleStartCampaign = () => {
    setIsCampaignRunning(true);
    // Implement logic to start the phishing campaign
    console.log('Phishing campaign started');
  };

  const handleStopCampaign = () => {
    setIsCampaignRunning(false);
    // Implement logic to stop the phishing campaign
    console.log('Phishing campaign stopped');
  };

  return (
    <div className="bg-opacity-25 backdrop-filter backdrop-blur-lg min-h-screen bg-gray-900  text-white p-4 rounded-2xl ">
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
          <UploadCSV onAddEmails={handleAddEmails} />
          <AddEmailManually onAddEmails={handleAddEmails} />
          <GeneratePhishingMail onSendMail={handleSendMail} />
          {!isCampaignRunning ? (
            <button
              type="button"
              onClick={handleStartCampaign}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            >
              Start Campaign
            </button>
          ) : (
            <button
              type="button"
              onClick={handleStopCampaign}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
            >
              Stop Campaign
            </button>
          )}
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Save Campaign
          </button>
        </form>
      </div>

      {/* Render CampaignAnalytics component if campaign is running or stopped */}
      {isCampaignRunning || !isLoading ? (
        <CampaignAnalytics campaign={data} />
      ) : (
        <div className="text-center mt-8 text-gray-400">
          Analytics will appear here once the campaign is running or stopped.
        </div>
      )}
    </div>
  );
};

export default NewCampaign;
