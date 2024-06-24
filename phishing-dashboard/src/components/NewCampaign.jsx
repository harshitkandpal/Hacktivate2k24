// NewCampaign.js - Component for creating new campaigns and uploading CSV files

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, writeBatch } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { parse } from 'papaparse'; // Library for parsing CSV

const NewCampaign = () => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [csvFile, setCsvFile] = useState(null); // State to hold the CSV file
  const [targets, setTargets] = useState([]); // State to hold parsed targets from CSV
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a new campaign document in Firestore
      const campaignRef = await addDoc(collection(db, 'campaigns'), {
        name,
        domain,
        createdAt: new Date()
      });

      // Upload campaign targets if CSV file is uploaded
      if (csvFile) {
        await uploadTargets(campaignRef.id);
      }

      // Redirect to campaigns list after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Error adding campaign:', error);
      alert('Error adding campaign');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setCsvFile(file);

    // Parse CSV file on change
    parse(file, {
      complete: (result) => {
        // result.data is an array of arrays representing rows and columns
        if (result.data && result.data.length > 0) {
          // Assuming first row is header and subsequent rows are data
          const csvTargets = result.data.slice(1); // Skip header row
          setTargets(csvTargets);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert('CSV parsing error');
      }
    });
  };

  const uploadTargets = async (campaignId) => {
    try {
      // Batch upload targets to Firestore
      const batch = writeBatch(db);
      const campaignDocRef = doc(db, 'campaigns', campaignId);
      const targetsCollection = collection(campaignDocRef, 'targets');

      targets.forEach((target) => {
        const targetRef = doc(targetsCollection);
        batch.set(targetRef, {
          // Adjust fields as per your CSV structure
          name: target[0], // Assuming first column is name
          email: target[1], // Assuming second column is email
          // Add more fields as needed
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Error uploading targets:', error);
      alert('Error uploading targets');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center">New Campaign</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="campaignName" className="block text-gray-700">Campaign Name:</label>
            <input
              id="campaignName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="targetDomain" className="block text-gray-700">Target Domain:</label>
            <input
              id="targetDomain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required={!csvFile} // Domain input is required if no CSV file is uploaded
            />
          </div>
          <div>
            <label htmlFor="csvFile" className="block text-gray-700">Upload CSV File:</label>
            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <small className="block text-gray-500">Upload a CSV file with targets.</small>
          </div>
          <div>
            {targets.length > 0 && (
              <div>
                <h3 className="text-lg font-bold">Uploaded Targets:</h3>
                <ul className="list-disc list-inside">
                  {targets.map((target, index) => (
                    <li key={index}>
                      {target.join(', ')}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
