import React, { useState } from 'react';

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(); // Replace with your actual API key

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
    const emailPrompt = 'Generate an email description within 300 words. THe email is send to "Amitabh Nangia". Write an email to congratulate him on winning the employee contest that infosys had organized. He has got a gift which will be redeemed after filling the info in this link: https://www.oyehappy.com/, http://127.0.0.1:5500/server/index.html before 28th June 2024. Congratulate him and excite him. The tone of the email should be catchy. Do not add any spaces for me to fill info I directly want to copy the mail and paste it.' ; // Customize this prompt
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
    const phishingResult = isPhishing ? 'This email might be a phishing attempt.' : 'This email appears safe.';

    setReply(phishingResult);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 space-y-4">
      <h2 className="text-2xl font-bold">Chatbot</h2>
      <select
        className="bg-gray-700 text-white p-2 rounded"
        value={selectedEmail}
        onChange={(e) => setSelectedEmail(e.target.value)}
      >
        <option value="" disabled>Select Email</option>
        {emails.map((email, index) => (
          <option key={index} value={email.value}>
            {email.value}
          </option>
        ))}
      </select>
      <textarea
        className="bg-gray-700 text-white p-2 rounded w-full"
        rows="3"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className="flex space-x-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleGenerateEmail}
        >
          Generate Email
        </button>
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
          onClick={handleCheckPhishing}
        >
          Check for Phishing
        </button>
      </div>
      {reply && (
        <div className="bg-gray-700 text-white p-2 rounded mt-4">
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;


