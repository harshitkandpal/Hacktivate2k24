import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { parse } from 'papaparse'; // Importing Papaparse for CSV parsing

const Profile = ({ campaignId, email }) => {
  const [profileData, setProfileData] = useState(null);
  const [excelFile, setExcelFile] = useState(null);
  const [loading, setLoading] = useState(false); // State to manage loading state

  useEffect(() => {
    if (campaignId && email) {
      fetchProfileData(); // Fetch profile data if campaignId and email are provided
    }
  }, [campaignId, email]);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      // Example: Fetch profile data from backend endpoint based on campaignId and email
      const response = await axios.get(`/api/profile/${campaignId}/${email}`);
      setProfileData(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExcelUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setExcelFile(file);

    try {
      // Parse CSV file using Papaparse
      const parsedData = await parse(file, { header: true });
      // Assuming the first row contains header fields and subsequent rows contain data
      const data = parsedData.data;

      // Example: Save manually entered data to Firestore
      const batch = collection(db, 'profiles');
      data.forEach(async (item) => {
        await addDoc(batch, {
          campaignId,
          email,
          ...item,
        });
      });

      // Inform the user that the data has been successfully uploaded
      alert('Data uploaded successfully!');
    } catch (error) {
      console.error('Error parsing CSV:', error);
      alert('Error parsing CSV file');
    }
  };

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Profile for {email}</h3>

      <button onClick={fetchProfileData} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
        {loading ? 'Fetching...' : 'Fetch Profile Data'}
      </button>

      {profileData && (
        <div className="mt-4">
          <h4 className="text-lg font-bold">Automated Profile:</h4>
          <p><strong>Name:</strong> {profileData.name}</p>
          <p><strong>Job Title:</strong> {profileData.jobTitle}</p>
          {/* Add more parameters as per your definition */}
        </div>
      )}

      <div className="mt-4">
        <input type="file" accept=".csv" onChange={handleExcelUpload} className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
        <small className="block text-gray-500">Upload CSV file for manual profiling</small>
      </div>
    </div>
  );
};

export default Profile;
