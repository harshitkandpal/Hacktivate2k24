import React, { useState } from 'react';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

async function generateEmail(prompt) {
  // The Gemini 1.5 models are versatile and work with text prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text;
}

async function isPhishingEmail(emailBody) {
  // Consider a toxicity detection model or a model specifically trained for phishing detection
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Placeholder model, adjust based on availability

  const prompt = `Is the following email a phishing attempt? \n${emailBody}`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return text.toLowerCase().includes('phishing'); // Check for "phishing" case-insensitively
}

const Chatbot = ({ emails = [] }) => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');
  const [attempts, setAttempts] = useState(0); // Track phishing check attempts

  const handleGenerateEmail = async () => {
    // Consider adding logic to tailor email generation based on user input or selected email
    const emailPrompt = 'Generate an email description within 300 words. THe email is send to "Amitabh Nangia". Write an email to congratulate him on winning the employee contest that infosys had organized. He has got a gift which will be redeemed after filling the info in this link: https://www.oyehappy.com/, http://127.0.0.1:5500/server/index.html before 28th June 2024. Congratulate him and excite him. The tone of the email should be catchy. Do not add any spaces for me to fill info I directly want to copy the mail and paste it.'; // Customize this prompt
    const generatedEmail = await generateEmail(emailPrompt);
    setMessage(generatedEmail);
  };

  const handleCheckPhishing = async () => {
    if (!message) {
      return; // Don't proceed if no email is generated
    }

    if (!message) { // Check if generatedEmail exists before using it
      console.error('Email generation failed or is not yet complete!');
      return;
    }

    const isPhishing = await isPhishingEmail(message);
    const phishingResult = isPhishing ? 'ALERT: This payload has high probability of being flagged as a phishing attempt.' : 'SCAN COMPLETE: This payload currently appears safe against standard filters.';

    setReply(phishingResult);
  };

  return (
    <div className="border border-white/5 bg-[#0a1118] p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all">
      <h2 className="text-xl font-bold font-tech text-cyber-accent tracking-widest flex items-center gap-2 mb-4">
        <svg className="w-5 h-5 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
        AI ASSISTANT TERMINAL
      </h2>

      <div className="space-y-4">
        <select
          className="w-full bg-[#050a0f] border border-white/20 text-gray-400 font-mono text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-cyber-accent transition-all appearance-none"
          value={selectedEmail}
          onChange={(e) => setSelectedEmail(e.target.value)}
        >
          <option value="" disabled>--- Select Target Profile ---</option>
          {emails.map((email, index) => (
            <option key={index} value={email.value}>
              TARGET: {email.value}
            </option>
          ))}
        </select>

        <textarea
          className="w-full bg-[#050a0f] border border-white/20 text-white font-mono text-sm px-4 py-3 rounded-lg focus:outline-none focus:border-cyber-accent transition-all placeholder-gray-700 resize-y"
          rows="4"
          placeholder="> Enter custom prompt or instructions for AI generation..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            className="flex-1 bg-cyber-primary/20 border border-cyber-primary text-cyber-primary hover:bg-cyber-primary hover:text-black font-bold tracking-wider text-sm py-2 px-4 rounded-lg transition-all duration-300"
            onClick={handleGenerateEmail}
          >
            GENERATE PAYLOAD
          </button>
          <button
            className="flex-1 bg-cyber-accent/20 border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-black font-bold tracking-wider text-sm py-2 px-4 rounded-lg transition-all duration-300"
            onClick={handleCheckPhishing}
          >
            RUN FILTER SCAN
          </button>
        </div>

        {reply && (
          <div className={`mt-4 border px-4 py-3 rounded-lg font-mono text-sm flex items-start gap-3 ${reply.includes('ALERT') ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-green-900/20 border-green-500/50 text-green-400'}`}>
            <svg className={`w-5 h-5 mt-0.5 flex-shrink-0 ${reply.includes('ALERT') ? 'text-red-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={reply.includes('ALERT') ? "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" : "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}></path></svg>
            <p>{reply}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;


