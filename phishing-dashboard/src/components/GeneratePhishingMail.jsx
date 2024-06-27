import React, { useState } from 'react';
import CampaignAnalytics from './CampaignAnalytics';

const GeneratePhishingMail = ({ onSendMail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCampaignRunning, setIsCampaignRunning] = useState(false);
  const [mailData, setMailData] = useState({
    subject: '',
    body: '',
    recipient: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMailData({ ...mailData, [name]: value });
  };

  const handleSendMail = () => {
    onSendMail(mailData);
    setMailData({ subject: '', body: '', recipient: '' }); // Reset the form
  };

  const handleStartCampaign = async () => {
    setIsCampaignRunning(true);

    // Fetching email list from email.json
    try {
      const response = await fetch('/email.json'); // Assuming email.json is in your public directory
      const emailData = await response.json();
      const emails = emailData.emails;

      // Send the list of emails to the server
      const res = await fetch('http://localhost:3001/send-emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emails, mailData }),
      });

      if (res.ok) {
        console.log('Phishing campaign started successfully');
      } else {
        console.error('Failed to start phishing campaign:', res.statusText);
      }
    } catch (error) {
      console.error('Error starting phishing campaign:', error);
    }
  };

  const handleStopCampaign = () => {
    setIsCampaignRunning(false);
    console.log('Phishing campaign stopped');
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold mb-2">Generate Phishing Mail</h3>
      <div className="mb-4">
        <label className="block text-white">Body:</label>
        <textarea
          name="body"
          value={mailData.body}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleSendMail}
        style={{ marginRight: '5px' }}
      >
        Generate Phishing Email
      </button>
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
      {isCampaignRunning || !isLoading ? (
        <CampaignAnalytics campaign={''} />
      ) : (
        <div className="text-center mt-8 text-gray-400">
          Analytics will appear here once the campaign is running or stopped.
        </div>
      )}
    </div>
  );
};

export default GeneratePhishingMail;
