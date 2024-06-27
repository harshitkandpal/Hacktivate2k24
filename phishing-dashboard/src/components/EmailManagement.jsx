import React, { useState } from 'react';
import AddEmailManually from './AddEmailManually';
import EmailsTable from './EmailsTable';

const EmailManagement = () => {
  const [emails, setEmails] = useState([]);

  const handleAddEmail = (newEmail) => {
    setEmails([...emails, newEmail]);
  };

  const handleSaveProfile = (index, updatedProfile) => {
    const updatedEmails = [...emails];
    updatedEmails[index].profile = updatedProfile;
    setEmails(updatedEmails);
  };

  const handleDeleteEmail = (index) => {
    const updatedEmails = emails.filter((email, i) => i !== index);
    setEmails(updatedEmails);
  };

  return (
    <div className="container mx-auto p-4">
      <AddEmailManually onAddEmail={handleAddEmail} />
      <EmailsTable
        emails={emails}
        onSaveProfile={handleSaveProfile}
        onDeleteEmail={handleDeleteEmail}
      />
    </div>
  );
};

export default EmailManagement;
