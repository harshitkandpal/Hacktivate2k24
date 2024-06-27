import React, { useState } from 'react';

const Chatbot = ({ emails = [] }) => {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState('');
  const [selectedEmail, setSelectedEmail] = useState('');

  const handleSendMessage = async () => {
    // Simulate sending a message to the bot and getting a reply
    // Replace this with actual bot interaction logic
    const botReply = `Bot reply to message: "${message}" for email: "${selectedEmail}"`;
    setReply(botReply);
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
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleSendMessage}
      >
        Send Message
      </button>
      {reply && (
        <div className="bg-gray-700 text-white p-2 rounded mt-4">
          <p>{reply}</p>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
