import React, { useState, useEffect } from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import CampaignAnalytics from './CampaignAnalytics';
import { db } from '../firebaseConfig';

const CampaignDetail = ({ campaign, fetchCampaignData }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [visibleEmails, setVisibleEmails] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (campaign && campaign.emails) {
      setVisibleEmails(campaign.emails.slice(0, itemsPerPage));
      setCurrentPage(1);
    }
  }, [campaign, itemsPerPage]);

  const handleEditClick = (index, email) => {
    setSelectedIndex(index);
    setEditMode(true);
    setEditedProfile({ ...email });
  };

  const handleSaveClick = async () => {
    try {
      if (selectedIndex === null) {
        console.error('No email selected for editing');
        return;
      }

      const updatedEmail = { ...campaign.emails[selectedIndex], ...editedProfile };
      const emailDocRef = doc(db, 'campaigns', campaign.id);

      setIsUpdating(true);

      await updateDoc(emailDocRef, {
        emails: campaign.emails.map((email, index) => (index === selectedIndex ? updatedEmail : email)),
      });

      console.log('Profile updated successfully:', updatedEmail);

      await fetchCampaignData();
      setEditMode(false);
      setSelectedIndex(null);
      setEditedProfile({});
      setIsUpdating(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setIsUpdating(false);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setSelectedIndex(null);
    setEditedProfile({});
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
  };

  const filteredEmails = campaign && campaign.emails ? campaign.emails.filter((email) =>
    email.email && email.email.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  const loadMoreEmails = () => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * itemsPerPage;
    const newVisibleEmails = [...visibleEmails, ...filteredEmails.slice(startIndex, startIndex + itemsPerPage)];
    setVisibleEmails(newVisibleEmails);
    setCurrentPage(nextPage);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-screen-xl bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h3 className="text-2xl font-bold mb-4">{campaign.name || "N/A"}</h3>
        <p><strong>Target Domain:</strong> {campaign.domain || "N/A"}</p>
        <p><strong>Created At:</strong> {campaign.createdAt ? new Date(campaign.createdAt.seconds * 1000).toLocaleString() : "N/A"}</p>

        {/* Render Analytics */}
        <CampaignAnalytics campaign={campaign} />

        {/* Email Profiles */}
        <div className="mt-8">
          <h4 className="text-xl font-bold">Email Profiles:</h4>
          {/* Search input */}
          <div className="mt-4">
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={handleInputChange}
              className="border border-gray-300 px-3 py-2 rounded-lg"
            />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {visibleEmails.map((email, index) => (
                  <tr key={index} className="bg-white">
                    <td className="px-6 py-4 whitespace-nowrap">{email.email || "N/A"}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="age"
                        value={editedProfile.age || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, age: e.target.value })}
                        className="border border-gray-300 px-3 py-1 rounded-lg"
                      />
                    ) : (
                      <span className="px-3 py-1 rounded-lg inline-block bg-gray-100">{email.age || "N/A"}</span>
                    )}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{editMode && selectedIndex === index ? (
                      <input
                        type="text"
                        name="gender"
                        value={editedProfile.gender || ''}
                        onChange={(e) => setEditedProfile({ ...editedProfile, gender: e.target.value })}
                        className="border border-gray-300 px-3 py-1 rounded-lg"
                      />
                    ) : (
                      <span className="px-3 py-1 rounded-lg inline-block bg-gray-100">{email.gender || "N/A"}</span>
                    )}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editMode && selectedIndex === index ? (
                        <div className="flex space-x-2">
                          <button
                            className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                            onClick={handleSaveClick}
                            disabled={isUpdating}
                          >
                            Save
                          </button>
                          <button
                            className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg"
                            onClick={handleCancelClick}
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          className="bg-blue-500 text-white px-4 py-1 rounded-lg"
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

          {/* Load more button */}
          {campaign.emails.length > visibleEmails.length &&
            <div className="mt-4 flex justify-center">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={loadMoreEmails}>Load More</button>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail;
