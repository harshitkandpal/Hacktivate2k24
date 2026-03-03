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
    return <div className="text-gray-500 font-mono text-xs uppercase tracking-widest text-center py-10 mt-6 border border-dashed border-white/10 rounded-lg">No target profiles extracted</div>;
  }
  return (
    <div className="border border-white/5 bg-[#0a1118]/80 p-0 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all mt-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <div className="p-6 border-b border-white/5 bg-[#0c141d]/50 flex justify-between items-center">
        <h3 className="text-sm font-tech text-gray-400 tracking-widest uppercase flex items-center gap-2 m-0">
          <svg className="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
          EXTRACTED TARGET POOL
        </h3>

        <button
          className="px-4 py-2 bg-transparent border border-cyber-accent text-cyber-accent font-bold tracking-wider text-xs uppercase rounded-md shadow-md hover:bg-cyber-accent hover:text-black transition-colors"
          onClick={handleVerifyAll}
        >
          Verify All Targets
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#111a24] text-gray-400 text-xs font-mono uppercase tracking-wider border-b border-white/5">
              <th className="px-6 py-4 font-semibold">
                Network Identifier
              </th>
              <th className="px-6 py-4 font-semibold text-right">
                Profile Configuration
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {emails.map((email, index) => (
              <React.Fragment key={index}>
                <tr className="hover:bg-white/[0.02] transition-colors group">
                  <td
                    className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300 cursor-pointer font-mono"
                    onClick={() => toggleExpand(index)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-cyber-accent/80">{email.value}</span>

                      {emailVerificationStatus.has(email.value) &&
                        emailVerificationStatus.get(email.value) ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-green-500/10 border border-green-500/30 text-green-400 uppercase tracking-widest">Verified</span>
                      ) : emailVerificationStatus.has(email.value) &&
                        !emailVerificationStatus.get(email.value) ? (
                        <span className="px-2 py-0.5 rounded text-[10px] bg-red-500/10 border border-red-500/30 text-red-400 uppercase tracking-widest">Invalid</span>
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <button
                      className="text-xs font-semibold text-gray-500 hover:text-cyber-accent uppercase tracking-wider transition-colors"
                      onClick={() => toggleExpand(index)}
                    >
                      {expandedEmailIndex === index ? 'Collapse' : 'Configure'}
                    </button>
                  </td>
                </tr>
                {expandedEmailIndex === index && (
                  <tr className="bg-[#050a0f] border-t-0">
                    <td colSpan="2" className="px-6 py-6">
                      <EditableEmailProfile
                        email={email}
                        onSave={(updatedProfile) => handleSaveProfile(index, updatedProfile)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmailsTable;
