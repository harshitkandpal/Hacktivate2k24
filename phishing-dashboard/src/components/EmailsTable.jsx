import React from 'react';
import EditableEmailProfile from './EditableEmailProfile';

const EmailsTable = ({ emails, selectedEmailIndex, onEmailClick, isEditMode, onSaveProfile, onSaveEmail }) => {
  const handleEditClick = (index) => {
    onEmailClick(index);
  };

  return (
    <div className="bg-gray-700 rounded-lg p-4">
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
            <tr key={index} className="bg-gray-900">
              <td
                className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 cursor-pointer"
                onClick={() => handleEditClick(index)}
              >
                {email.value}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
                {isEditMode && selectedEmailIndex === index && (
                  <EditableEmailProfile
                    email={email}
                    onSave={(updatedEmail) => onSaveEmail(updatedEmail)}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailsTable;
