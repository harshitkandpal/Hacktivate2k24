import React, { useState } from 'react';

const EditableEmailProfile = ({ email, onSave }) => {
  const [editedEmail, setEditedEmail] = useState({ ...email });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedEmail({ ...editedEmail, [name]: value });
  };

  const handleSave = () => {
    onSave(editedEmail);
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <div>
        <label className="block text-white">Email:</label>
        <input
          type="text"
          name="value"
          value={editedEmail.value}
          onChange={handleChange}
          className="w-full px-3 py-2 mb-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
        />
      </div>
      <div className="mt-4">
        <label className="block text-white">Additional Info:</label>
        <div className="mt-2 text-white grid grid-cols-1 gap-y-2">
          <input
            type="text"
            name="first_name"
            value={editedEmail.first_name || ''}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="last_name"
            value={editedEmail.last_name || ''}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="position"
            value={editedEmail.position || ''}
            onChange={handleChange}
            placeholder="Position"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="seniority"
            value={editedEmail.seniority || ''}
            onChange={handleChange}
            placeholder="Seniority"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="department"
            value={editedEmail.department || ''}
            onChange={handleChange}
            placeholder="Department"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="linkedin"
            value={editedEmail.linkedin || ''}
            onChange={handleChange}
            placeholder="LinkedIn"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="twitter"
            value={editedEmail.twitter || ''}
            onChange={handleChange}
            placeholder="Twitter"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
          <input
            type="text"
            name="phone_number"
            value={editedEmail.phone_number || ''}
            onChange={handleChange}
            placeholder="Phone Number"
            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg"
          />
        </div>
      </div>
      <button
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default EditableEmailProfile;
