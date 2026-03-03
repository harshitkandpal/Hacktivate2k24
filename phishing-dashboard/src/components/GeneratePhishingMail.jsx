import React, { useState } from 'react';
import CampaignAnalytics from './CampaignAnalytics'; // Adjust the path if necessary
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

async function run(prompt) {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);

  return text;
}


const GeneratePhishingMail = ({ onSendMail }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCampaignRunning, setIsCampaignRunning] = useState(false);
  const [mailData, setMailData] = useState({
    subject: '',
    body: '',
  });
  const [emailsSentCount, setEmailsSentCount] = useState(0);
  const [campaignCompleted, setCampaignCompleted] = useState(false); // State to track campaign completion

  const companies = ['Google', 'Facebook', 'Amazon', 'Microsoft', 'Apple'];
  const positions = ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'Backend Developer', 'Product Manager'];

  const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

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
      // Randomly select a company and position
      const company = getRandomItem(companies);
      const position = getRandomItem(positions);

      // Subject Prompt with random company and position
      const subjectPrompt = `Generate a single line subject for an email, which I am sending to inform that the recipient's resume has been shortlisted for the ${company} ${position} position. Congratulate first.`;
      const subject = await run(subjectPrompt);

      // Description Prompt with random company and position
      const descriptionPrompt = `Write an email description in 300 words. Don't give the subject of the email, give only the body. You are the HR manager of ${company}. You have to write the mail to congratulate the recipient on being shortlisted. Write that your 'resume has been shortlisted. Fill the info in the given link.' Appreciate the recipient on their skills. The position name is: ${position}. Receiver's name: Hacker. Skills to appreciate: Full stack development knowledge, communication skills. Deadline Date to fill details in the link is 28th June 2024. The link to fill details is: 'http://127.0.0.1:5500/server/index.html'. Sender's name: Christina Cian. The tone should be catchy. Don't keep any spaces for me to add data, I just directly want to copy your response, so generate accordingly.`;
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
            throw new Error('Failed to send emails');
          }
          const responseData = await response.json();
          console.log('Emails sent successfully:', responseData);
          setEmailsSentCount(emails.length); // Update emailsSentCount
          setCampaignCompleted(true); // Set campaign completion flag
        } catch (error) {
          console.error('Error sending emails:', error);
        }
      };

      await sendEmailsToServer();

      setIsCampaignRunning(false); // Stop campaign after sending
      console.log('Campaign stopped');

    } catch (error) {
      console.error('Error starting campaign:', error);
    }
  };

  return (
    <div className="border border-white/5 bg-[#0a1118]/80 p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all">
      <h3 className="text-xl font-bold font-tech text-white tracking-widest flex items-center gap-2 mb-6">
        <svg className="w-6 h-6 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        PAYLOAD GENERATOR
      </h3>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">Payload Subject Header</label>
          <input
            name="subject"
            value={mailData.subject}
            onChange={handleChange}
            placeholder="[Auto-generated subject line...] "
            className="w-full px-4 py-3 bg-[#050a0f] text-cyber-accent font-mono border border-white/20 rounded-lg shadow-inner focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-700 disabled:opacity-50"
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block text-gray-400 font-mono text-sm tracking-widest uppercase mb-2">Payload Body Content</label>
          <textarea
            name="body"
            value={mailData.body}
            onChange={handleChange}
            placeholder="[Auto-generated email body...]"
            className="w-full px-4 py-3 bg-[#050a0f] text-white font-mono text-sm border border-white/20 rounded-lg shadow-inner focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all placeholder-gray-700 min-h-[150px] disabled:opacity-50"
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center border-t border-white/5 pt-6 mt-6">
        <button
          className="w-full sm:w-auto bg-transparent border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-black font-bold tracking-wider uppercase text-sm py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-wait flex items-center justify-center gap-2 shadow-[0_0_10px_rgba(0,255,204,0.1)]"
          onClick={handleGenerateMail}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              SYNTHESIZING...
            </>
          ) : (
            '1. SYNTHESIZE PAYLOAD'
          )}
        </button>

        <div className="hidden sm:block text-gray-600 font-mono">&rarr;</div>

        {!isCampaignRunning ? (
          <button
            type="button"
            onClick={handleStartCampaign}
            disabled={!mailData.subject || !mailData.body}
            className="w-full sm:w-auto bg-cyber-primary/20 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black font-bold tracking-wider uppercase text-sm py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-cyber-primary disabled:cursor-not-allowed shadow-[0_0_10px_rgba(0,255,204,0.1)]"
          >
            2. LAUNCH CAMPAIGN
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsCampaignRunning(false)}
            className="w-full sm:w-auto bg-red-900/40 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold tracking-wider uppercase text-sm py-3 px-6 rounded-lg transition-all duration-300 animate-pulse"
          >
            ABORT OPERATION
          </button>
        )}
      </div>

      {/* Status Messages */}
      <div className="mt-6 font-mono text-sm border-t border-white/5 pt-4">
        {emailsSentCount > 0 && (
          <div className="text-cyber-accent flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-accent shadow-[0_0_10px_#00ffcc]"></span>
            SUCCESS: {emailsSentCount} TARGET{emailsSentCount !== 1 ? 'S' : ''} INFILTRATED
          </div>
        )}
        {campaignCompleted && (
          <div className="text-green-500 mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_#22c55e]"></span>
            OPERATION COMPLETED SUCCESSFULLY
          </div>
        )}
      </div>

      {isCampaignRunning || !isLoading ? (
        <CampaignAnalytics campaign={''} />
      ) : (
        <div className="text-center mt-8 text-gray-500 font-mono text-xs uppercase tracking-widest border border-dashed border-white/10 p-4 rounded-lg">
          Telemetry inactive. Awaiting campaign execution...
        </div>
      )}
    </div>
  );
};

export default GeneratePhishingMail;
