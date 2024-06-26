import React from 'react';
import EditableEmailProfile from './EditableEmailProfile';

const EmailsTable = ({ emails, selectedEmailIndex, onEmailClick, isEditMode, onSaveEmail }) => {
  if (!emails || emails.length === 0) {
    return <div>No emails to display</div>;
  }

  return (
    <div className="bg-gray-700 rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-2">Emails</h3>
      <table className="min-w-full divide-y divide-gray-600">
        <thead>
          <tr className="bg-gray-800">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-600">
          {emails.map((email, index) => (
            <React.Fragment key={index}>
              <tr className="bg-gray-900" onClick={() => onEmailClick(index)}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 cursor-pointer">{email.value}</td>
              </tr>
              {selectedEmailIndex === index && isEditMode && (
                <tr>
                  <td colSpan="1">
                    <EditableEmailProfile
                      email={email}
                      onSave={(updatedEmail) => onSaveEmail(updatedEmail)}
                    />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmailsTable;
