import React, { useState } from 'react';

const AddEmailManually = ({ onAddEmails }) => {
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState({});

  const handleAddEmail = () => {
    const newEmail = {
      value: email,
      profile,
    };
    onAddEmails([newEmail]);
    setEmail('');
    setProfile({});
  };

  return (
    <div className="mt-4">
      <label className="block text-white mb-2">Add Email Manually:</label>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
      />
      {/* Add inputs for other profile details */}
      <button
        type="button"
        onClick={handleAddEmail}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Add Email
      </button>
    </div>
  );
};

export default AddEmailManually;
