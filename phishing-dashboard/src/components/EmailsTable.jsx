import React, { useState, useEffect } from 'react';
import EditableEmailProfile from './EditableEmailProfile';

const EmailsTable = ({ emails, onSaveProfile }) => {
  const [expandedEmailIndex, setExpandedEmailIndex] = useState(-1);
  const [verifiedEmails, setVerifiedEmails] = useState([]);
  const [emailVerificationStatus, setEmailVerificationStatus] = useState(
    new Map() // Map for email verification status (true/false)
  );

  const toggleExpand = (index) => {
    setExpandedEmailIndex(index === expandedEmailIndex ? -1 : index);
  };
  const handleSaveProfile = (index, updatedProfile) => {
    onSaveProfile(index, updatedProfile);
    setExpandedEmailIndex(-1); // Close the expanded view after saving
  };

  const handleVerifyEmail = async (email) => {
    try {
      const response = await fetch(
        
      );



      const data = await response.json();
      console.log(data); // For debugging purposes (optional)
      console.log(data.data.status);

      if (data.data.status === 'accept_all') {
        setVerifiedEmails([...verifiedEmails, email]);
        setEmailVerificationStatus(new Map(emailVerificationStatus).set(email, true));
      } else {
        setEmailVerificationStatus(new Map(emailVerificationStatus).set(email, false));
      }
    } catch (error) {
      console.error('Email verification error:', error);
      // Handle errors appropriately (e.g., display an error message to the user)
    }
  };


  const handleVerifyAll = async () => {
    for (const email of emails) {
      await handleVerifyEmail(email.value);
    }
  };

  useEffect(() => {
    // Verify all emails upon initial render
    handleVerifyAll();
  }, []);

  if (!emails || emails.length === 0) {
    return <div>No emails to display</div>;
  }
  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <div className="flex justify-end mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleVerifyAll}
        >
          Verify All
        </button>
      </div>
      <h3 className="text-xl font-semibold mb-2">Emails</h3>
      <table className="min-w-full divide-y divide-gray-600">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {emails.map((email, index) => (
            <React.Fragment key={index}>
              <tr className="bg-gray-900">
              <td
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 cursor-pointer"
                  onClick={() => toggleExpand(index)}
                >
                  {email.value}
                  {emailVerificationStatus.has(email.value) &&
                    emailVerificationStatus.get(email.value) ? (
                    <span className="ml-2 text-green-500 font-semibold">Verified</span>
                  ) : emailVerificationStatus.has(email.value) &&
                    !emailVerificationStatus.get(email.value) ? (
                    <span className="ml-2 text-red-500 font-semibold">Invalid</span>
                  ) : null}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                  {expandedEmailIndex === index && (
                    <EditableEmailProfile
                      email={email}
                      onSave={(updatedProfile) => handleSaveProfile(index, updatedProfile)}
                    />
                  )}
                </td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailsTable;
