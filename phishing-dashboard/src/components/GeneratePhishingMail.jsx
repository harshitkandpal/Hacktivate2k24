import React, { useState } from 'react';
import CampaignAnalytics from './CampaignAnalytics';

const GeneratePhishingMail = ({ onSendMail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCampaignRunning, setIsCampaignRunning] = useState(false);
  const [mailData, setMailData] = useState({
    subject: '',
    body: '',
  });
  const [emailsSentCount, setEmailsSentCount] = useState(0);
  const [campaignCompleted, setCampaignCompleted] = useState(false); // State to track campaign completion

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMailData({ ...mailData, [name]: value });
  };

  const handleSendMail = () => {
    onSendMail(mailData); // Assuming onSendMail function sends single email
    setMailData({ subject: '', body: '' }); // Reset the form after sending
  };

  const handleStartCampaign = async () => {
    setIsCampaignRunning(true);

    try {
      const response = await fetch('email.json');
      if (!response.ok) {
        throw new Error('Failed to fetch emails');
      }
      const data = await response.json();

      const emails = data.emails; // Assuming emails are in an array in emails.json
      
      const sendEmailsToServer = async () => {
        try {
          const response = await fetch('http://localhost:3001/send-emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ emails, mailData }),
          });

          if (!response.ok) {
            throw new Error('Failed to send phishing emails');
          }
          const responseData = await response.json();
          console.log('Phishing emails sent successfully:', responseData);
          setEmailsSentCount(emails.length); // Update emailsSentCount
          setCampaignCompleted(true); // Set campaign completion flag
        } catch (error) {
          console.error('Error sending phishing emails:', error);
        }
      };

      await sendEmailsToServer();

      setIsCampaignRunning(false); // Stop campaign after sending
      console.log('Phishing campaign stopped');

    } catch (error) {
      console.error('Error starting phishing campaign:', error);
    }
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
          onClick={() => setIsCampaignRunning(false)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-4 mr-2"
        >
          Stop Campaign
        </button>
      )}
      {emailsSentCount > 0 && (
        <div className="text-center mt-4 text-gray-400">
          {emailsSentCount} email{emailsSentCount !== 1 ? 's' : ''} sent
        </div>
      )}
      {campaignCompleted && ( // Conditionally render completion message
        <div className="text-center mt-4 text-green-500">
          Phishing campaign completed successfully!
        </div>
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
