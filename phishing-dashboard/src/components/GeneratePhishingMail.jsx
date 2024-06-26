import React, { useState } from 'react';

const GeneratePhishingMail = ({ onSendMail }) => {
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

  return (
    <div className="bg-gray-700 rounded-lg p-4 mt-4">
      <h3 className="text-xl font-semibold mb-2">Generate Phishing Mail</h3>
      <div className="mb-4">
        <label className="block text-white">Subject:</label>
        <input
          type="text"
          name="subject"
          value={mailData.subject}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Body:</label>
        <textarea
          name="body"
          value={mailData.body}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
        />
      </div>
      <div className="mb-4">
        <label className="block text-white">Recipient Email:</label>
        <input
          type="email"
          name="recipient"
          value={mailData.recipient}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-gray-800 text-white border border-gray-600 rounded-lg"
        />
      </div>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        onClick={handleSendMail}
      >
        Generate Phishing Email
      </button>
    </div>
  );
};

export default GeneratePhishingMail;
