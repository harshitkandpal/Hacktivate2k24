import React, { useState } from 'react';
import CampaignAnalytics from './CampaignAnalytics';
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI('AIzaSyCxQoJfIaFajlgVHNIW3rqYBkHikfpZ1w0');

async function run(prompt) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  return text;
}

const GenerateMail = ({ onSendMail }) => {
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

  const handleGenerateMail = async () => {
    setIsLoading(true);

    try {
      // Subject Prompt (replace with your specific prompt)
      const subjectPrompt = "Generate a single line subject for an email, which i am sending to inform that the recipients resume has been shortlisted for the Google SDE-2 position. Congratulate first.";
      const subject = await run(subjectPrompt);

      // Description Prompt (replace with your specific prompt)
      const descriptionPrompt = "Write an email description in 300 words Dont give the subject of the email, give only the body. you are HR manager of Google. you have to right the mail to congratulate the recipient on being short listed. Write that your 'resume has been shortlisted. Fill the info in the given link.' Appreciate the recipient on their skills. The position name is: SDE-2. Reciever's name: Hacker.  Skills to appreciate: Full stack development knowledge, communication skills. Deadline Date to fill details in link is 28th June 2024. link to fill details is: 'http://127.0.0.1:5500/server/index.html'. Senders name: Christina Cian the tone should be catchy. Dont keep any spaces for me to add data, i just directly want to copy your response, so generate accordingly.";
      const description = await run(descriptionPrompt);

      setMailData({ ...mailData, subject, body: description }); // Update mailData with generated content
    } catch (error) {
      console.error('Error generating mail content:', error);
    } finally {
      setIsLoading(false);
    }
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
            throw new Error('Failed to send  emails');
          }
          const responseData = await response.json();
          console.log(' emails sent successfully:', responseData);
          setEmailsSentCount(emails.length); // Update emailsSentCount
          setCampaignCompleted(true); // Set campaign completion flag
        } catch (error) {
          console.error('Error sending  emails:', error);
        }
      };

      await sendEmailsToServer();

      setIsCampaignRunning(false); // Stop campaign after sending
      console.log(' campaign stopped');

    } catch (error) {
      console.error('Error starting  campaign:', error);
    }
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold mb-2">Generate  Mail</h3>
      <div className="mb-4">
      <label className="block text-white">Subject:</label>
        <textarea
          name="subject"
          value={mailData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
          disabled={isLoading} // Disable subject field while generating
        />
        <label className="block text-white">Body:</label>
        <textarea
          name="body"
          value={mailData.body}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
          disabled={isLoading} // Disable body field while generating
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleGenerateMail}
        style={{marginRight:'5px'}}
        disabled={isLoading} // Disable Generate Mail button while generating
      >
        Generate Mail
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
           campaign completed successfully!
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

export default GenerateMail;
