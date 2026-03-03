import React, { useState, useEffect } from 'react';

const EditableEmailProfile = ({ email, onSave }) => {
  const [editedEmail, setEditedEmail] = useState({ ...email });

  useEffect(() => {
    setEditedEmail({ ...email });
  }, [email]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedEmail({ ...editedEmail, [name]: value });
  };

  const handleSave = () => {
    onSave(editedEmail);
  };

  return (
    <div className="bg-[#050a0f] border border-white/10 p-5 rounded-lg shadow-inner">
      <div className="mb-4">
        <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-2">Network Endpoint (Email)</label>
        <input
          type="text"
          name="value"
          value={editedEmail.value}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-black/50 text-cyber-accent font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
        />
      </div>
      <div>
        <label className="block text-gray-500 font-mono text-xs uppercase tracking-widest mb-3 border-b border-white/5 pb-2">Profile Intel Attributes</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <input
              type="text"
              name="first_name"
              value={editedEmail.first_name || ''}
              onChange={handleChange}
              placeholder="Primary Alias (First Name)"
              className="w-full px-3 py-2 bg-black/50 text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              value={editedEmail.last_name || ''}
              onChange={handleChange}
              placeholder="Secondary Alias (Last Name)"
              className="w-full px-3 py-2 bg-black/50 text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              name="position"
              value={editedEmail.position || ''}
              onChange={handleChange}
              placeholder="Authorization Level (Position)"
              className="w-full px-3 py-2 bg-black/50 text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              name="department"
              value={editedEmail.department || ''}
              onChange={handleChange}
              placeholder="Sector (Department)"
              className="w-full px-3 py-2 bg-black/50 text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
          <div>
            <input
              type="text"
              name="phone_number"
              value={editedEmail.phone_number || ''}
              onChange={handleChange}
              placeholder="Comms Endpoint (Phone)"
              className="w-full px-3 py-2 bg-black/50 text-gray-300 font-mono text-sm border border-white/10 rounded focus:outline-none focus:border-cyber-accent focus:ring-1 focus:ring-cyber-accent transition-all"
            />
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-end">
        <button
          onClick={handleSave}
          className="bg-cyber-primary/20 hover:bg-cyber-primary text-cyber-primary hover:text-black border border-cyber-primary font-bold tracking-wider uppercase text-xs py-2 px-6 rounded transition-all duration-300"
        >
          UPDATE TARGET RECORD
        </button>
      </div>
    </div>
  );
};

export default EditableEmailProfile;
