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
    if (campaign && campaign.emails) {
      setVisibleEmails(campaign.emails.slice(0, itemsPerPage));
      setCurrentPage(1);
      setFilteredEmails(campaign.emails);
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

      if (!campaignData.emails || !Array.isArray(campaignData.emails)) {
        console.error('Invalid emails data structure in campaign document');
        return;
      }

      const emailIndex = selectedIndex;
      if (emailIndex === null || emailIndex < 0 || emailIndex >= campaignData.emails.length) {
        console.error('Invalid email index');
        return;
      }

      const updatedEmails = [...campaignData.emails];
      updatedEmails[emailIndex] = { ...updatedEmail };

      await updateDoc(campaignDocRef, { emails: updatedEmails });

      console.log('Email profile updated successfully:', updatedEmail);

      // Reload campaign data
      const updatedCampaignDoc = await getDoc(campaignDocRef);
      const updatedCampaignData = updatedCampaignDoc.data();
      if (updatedCampaignData && updatedCampaignData.emails) {
        setVisibleEmails(updatedCampaignData.emails.slice(0, itemsPerPage));
        setFilteredEmails(updatedCampaignData.emails);
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

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff',
      padding: '20px',
    },
    card: {
      width: '100%',
      borderRadius: '12px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 0 10px #59CCB5',
    },
    input: {
      padding: '10px',
      border: '1px solid #666666',
      borderRadius: '8px',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      color: '#ffffff',
      marginBottom: '10px',
    },
    list: {
      marginTop: '20px',
      listStyleType: 'none',
      padding: '0',
    },
    listItem: {
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      padding: '16px',
      marginBottom: '10px',
      borderRadius: '8px',
      transition: 'background-color 0.3s ease',
      boxShadow: 'inset 0 0 6px rgba(255, 255, 255, 0.1)',
    },
    button: {
      backgroundColor: '#4caf50',
      color: '#000000',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    loadButton: {
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      border: 'none',
      color: '#ffffff',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
      '&:hover': {
        // background: 'rgba(89, 204, 181, 0.5)',
        background:"#fff"
      }
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-opacity-25 backdrop-filter backdrop-blur-lg">
      <div style={styles.card} className="bg-opacity-25 backdrop-filter backdrop-blur-lg">
        <h3 className="text-2xl font-bold mb-4">{campaign.name || "N/A"}</h3>
        <p><strong>Target Domain:</strong> {campaign.domain || "N/A"}</p>
        <p><strong>Created At:</strong> {campaign.timestamp ? new Date(campaign.timestamp * 1000).toLocaleString() : "N/A"}</p>

        {/* Render Analytics */}
        <CampaignAnalytics campaign={campaign} />

        {/* Email Profiles */}
        <div className="mt-8">
          <h4 className="text-xl font-bold">Email Profiles:</h4>
          
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 bg-teal-800 ">
              <thead className="bg-teal-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Verified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Quality</th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-teal-800 divide-y divide-teal-700 ">
                {visibleEmails.map((email, index) => (
                  <tr key={index} className="bg-teal-800">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode && selectedIndex === index ? (
                        <input
                          type="text"
                          name="email"
                          value={editedProfile.email || ''}
                          onChange={handleInputChange}
                          className="border border-teal-600 px-3 py-1 rounded-lg bg-teal-700"
                        />
                      ) : (
                        <span className="px-3 py-1 rounded-lg inline-block bg-teal-700">{email.email || "N/A"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode && selectedIndex === index ? (
                        <input
                          type="text"
                          name="name"
                          value={editedProfile.name || ''}
                          onChange={handleInputChange}
                          className="border border-gray-600 px-3 py-1 rounded-lg bg-teal-700"
                        />
                      ) : (
                        <span className="px-3 py-1 rounded-lg inline-block bg-teal-700">{email.name || "N/A"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode && selectedIndex === index ? (
                        <input
                          type="checkbox"
                          name="verified"
                          checked={editedProfile.verified || false}
                          onChange={handleInputChange}
                          className="border border-teal-600 px-3 py-1 rounded-lg bg-teal-700"
                        />
                      ) : (
                        <span className="px-3 py-1 rounded-lg inline-block bg-teal-700">{email.verified ? 'Yes' : 'No'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editMode && selectedIndex === index ? (
                        <input
                          type="number"
                          name="quality"
                          value={editedProfile.quality || ''}
                          onChange={handleInputChange}
                          className="border border-teal-600 px-3 py-1 rounded-lg bg-teal-700"
                        />
                      ) : (
                        <span className="px-3 py-1 rounded-lg inline-block bg-teal-700">{email.quality || "N/A"}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editMode && selectedIndex === index ? (
                        <div className="flex space-x-2">
                          <button
                            className="bg-green-500 px-4 py-1 rounded-lg"
                            onClick={handleSaveClick}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-600 px-4 py-1 rounded-lg"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-green-500 px-4 py-1 rounded-lg"
                          onClick={() => handleEditClick(index, email)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Load More / Load Less Buttons */}
          <div className="mt-4 flex justify-center">
            {currentPage === 1 ? (
              <button style={styles.loadButton} onClick={loadMoreEmails}>Load More</button>
            ) : (
              <div className="flex space-x-2">
                <button style={styles.loadButton} onClick={loadLessEmails}>Load Less</button>
                <button style={styles.loadButton} onClick={loadMoreEmails}>Load More</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;