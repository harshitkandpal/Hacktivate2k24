import React, { useState, useEffect } from 'react';
import CampaignAnalytics from './CampaignAnalytics';
import { db, updateDoc, doc, getDoc } from '../firebaseConfig';

const CampaignDetail = ({ campaign, campaignId }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [visibleEmails, setVisibleEmails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    if (campaign && campaign.data && campaign.data.emails) {
      setVisibleEmails(campaign.data.emails.slice(0, itemsPerPage));
      setCurrentPage(1);
      setFilteredEmails(campaign.data.emails);
    }
  }, [campaign, itemsPerPage]);

  const updateEmailProfile = async (updatedEmail, campaignId) => {
    try {
      if (!campaignId) {
        console.error('Invalid campaign ID');
        return;
      }

      const campaignDocRef = doc(db, 'campaigns', campaignId);
      const campaignDocSnapshot = await getDoc(campaignDocRef);

      if (!campaignDocSnapshot.exists()) {
        console.error('Campaign document not found');
        return;
      }

      const campaignData = campaignDocSnapshot.data();

      if (!campaignData.data || !campaignData.data.emails || !Array.isArray(campaignData.data.emails)) {
        console.error('Invalid emails data structure in campaign document');
        return;
      }

      const updatedEmails = campaignData.data.emails.map(email => {
        if (email.value === updatedEmail.value) {
          return { ...updatedEmail };
        }
        return email;
      });

      await updateDoc(campaignDocRef, { data: { emails: updatedEmails } });

      console.log('Email profile updated successfully:', updatedEmail);

      // Reload campaign data
      const updatedCampaignDoc = await getDoc(campaignDocRef);
      const updatedCampaignData = updatedCampaignDoc.data();
      if (updatedCampaignData && updatedCampaignData.data && updatedCampaignData.data.emails) {
        setVisibleEmails(updatedCampaignData.data.emails.slice(0, itemsPerPage));
        setFilteredEmails(updatedCampaignData.data.emails);
      }
    } catch (error) {
      console.error('Error updating email profile:', error);
    }
  };

  const handleEditClick = (index, email) => {
    setSelectedIndex(index);
    setEditMode(true);
    setEditedProfile({ ...email });
  };

  const handleSaveClick = async () => {
    if (selectedIndex === null) {
      console.error('No email selected for editing');
      return;
    }

    const updatedEmail = { ...editedProfile };
    await updateEmailProfile(updatedEmail, campaignId);

    setEditMode(false);
    setSelectedIndex(null);
    setEditedProfile({});
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setSelectedIndex(null);
    setEditedProfile({});
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setEditedProfile({
      ...editedProfile,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const loadMoreEmails = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newVisibleEmails = [...visibleEmails, ...filteredEmails.slice(startIndex, endIndex)];
    setVisibleEmails(newVisibleEmails);
    setCurrentPage(nextPage);
  };

  const loadLessEmails = () => {
    const nextPage = currentPage - 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newVisibleEmails = filteredEmails.slice(startIndex, endIndex);
    setVisibleEmails(newVisibleEmails);
    setCurrentPage(nextPage);
  };

  return (
    <div className="w-full relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-white/5">
        <div>
          <h3 className="text-2xl font-bold font-tech text-cyber-accent tracking-tighter mb-1">
            {campaign.name || "UNNAMED_OPERATION"}
          </h3>
          <div className="flex gap-4 text-sm">
            <span className="text-gray-400">
              <strong className="text-gray-500 font-mono">TARGET:</strong> {campaign.domain || "N/A"}
            </span>
            <span className="text-gray-600">|</span>
            <span className="text-gray-400">
              <strong className="text-gray-500 font-mono">INITIATED:</strong> {campaign.createdAt ? new Date(campaign.createdAt).toLocaleString() : "N/A"}
            </span>
          </div>
        </div>
      </div>

      {/* Render Analytics */}
      <div className="mb-8">
        <CampaignAnalytics campaign={campaign} />
      </div>

      {/* Email Profiles Wrapper */}
      <div className="mt-8 bg-[#0a1118]/80 border border-white/5 rounded-xl overflow-hidden shadow-inner">
        <div className="px-6 py-4 border-b border-white/5 bg-[#0c141d]/50">
          <h4 className="text-lg font-bold font-tech text-white flex items-center gap-2">
            <svg className="w-5 h-5 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Harvested Targets
          </h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#111a24] text-gray-400 text-xs font-mono uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-semibold">Email terminal</th>
                <th className="px-6 py-4 font-semibold">First Name</th>
                <th className="px-6 py-4 font-semibold">Last Name</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">Department</th>
                <th className="px-6 py-4 font-semibold">Direct line</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {visibleEmails.map((email, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="email"
                        value={editedProfile.value || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-cyber-accent text-white px-3 py-1.5 rounded focus:outline-none"
                      />
                    ) : (
                      <span className="font-mono text-cyber-accent/90">{email.value || "N/A"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="first_name"
                        value={editedProfile.first_name || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-white/20 text-white px-3 py-1.5 rounded focus:outline-none focus:border-cyber-accent"
                      />
                    ) : (
                      email.first_name || "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="last_name"
                        value={editedProfile.last_name || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-white/20 text-white px-3 py-1.5 rounded focus:outline-none focus:border-cyber-accent"
                      />
                    ) : (
                      email.last_name || "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="position"
                        value={editedProfile.position || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-white/20 text-white px-3 py-1.5 rounded focus:outline-none focus:border-cyber-accent"
                      />
                    ) : (
                      <span className="px-2 py-0.5 rounded text-xs bg-white/5 border border-white/10 text-gray-400">
                        {email.position || "Unknown"}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="department"
                        value={editedProfile.department || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-white/20 text-white px-3 py-1.5 rounded focus:outline-none focus:border-cyber-accent"
                      />
                    ) : (
                      email.department || "—"
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                    {editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="phone_number"
                        value={editedProfile.phone_number || ''}
                        onChange={handleInputChange}
                        className="w-full bg-[#050a0f] border border-white/20 text-white px-3 py-1.5 rounded focus:outline-none focus:border-cyber-accent"
                      />
                    ) : (
                      <span className="font-mono text-gray-400">{email.phone_number || "—"}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    {editMode && selectedIndex === index ? (
                      <div className="flex justify-end gap-2 text-xs">
                        <button
                          className="px-3 py-1.5 bg-cyber-accent text-black font-bold rounded shadow-[0_0_10px_rgba(0,255,204,0.2)] hover:bg-white transition-colors"
                          onClick={handleSaveClick}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1.5 bg-transparent border border-white/20 text-gray-400 rounded hover:text-white transition-colors"
                          onClick={handleCancelClick}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-semibold text-cyber-accent hover:text-white pb-1 border-b border-transparent hover:border-cyber-accent"
                        onClick={() => handleEditClick(index, email)}
                      >
                        Modify Target
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {visibleEmails.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500 text-sm">
                    No target profiles found in this campaign database.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {filteredEmails.length > 5 && (
          <div className="px-6 py-4 border-t border-white/5 bg-[#0a1118] flex justify-center gap-3">
            {currentPage > 1 && (
              <button
                className="px-4 py-1.5 text-xs font-semibold text-gray-400 border border-white/10 rounded-full hover:bg-white/5 hover:text-white transition-colors"
                onClick={loadLessEmails}
              >
                &larr; Previous Page
              </button>
            )}

            {(currentPage * itemsPerPage) < filteredEmails.length && (
              <button
                className="px-4 py-1.5 text-xs font-semibold text-cyber-accent border border-cyber-accent/30 rounded-full hover:bg-cyber-accent/10 transition-colors"
                onClick={loadMoreEmails}
              >
                Next Page &rarr;
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignDetail;