import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormSection from './FormSection';
import CompanyProfile from './CompanyProfile';
import EmailsTable from './EmailsTable';
import GeneratePhishingMail from './GeneratePhishingMail';
import UploadCSV from './UploadCSV';
import AddEmailManually from './AddEmailManually';

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

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <h2 className="text-3xl font-bold text-center">New Campaign</h2>
      <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormSection data={data} setData={setData} isLoading={isLoading} />
          <CompanyProfile data={data} setData={setData} />
          <EmailsTable
            emails={data.data.emails}
            selectedEmailIndex={selectedEmailIndex}
            onEmailClick={handleEmailClick}
            isEditMode={isEditMode}
            onSaveEmail={handleSaveEmail}
          />
          <UploadCSV onAddEmails={handleAddEmails} />
          <AddEmailManually onAddEmails={handleAddEmails} />
          <GeneratePhishingMail onSendMail={handleSendMail} />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-4">
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
