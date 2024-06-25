import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { parse } from 'papaparse';

const NewCampaign = () => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [targets, setTargets] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Display confirmation alert
    if (!window.confirm('Are you sure you want to create this campaign?')) {
      return; // Cancel submission if user clicks Cancel in the confirmation dialog
    }

    try {
      // Create a new campaign document in Firestore
      const campaignRef = await addDoc(collection(db, 'campaigns'), {
        domain,
        name,
        createdAt: Timestamp.now(), // Firestore Timestamp for current time
        emails: targets.map(target => ({
          email: target.email,
          verified: target.verified || false,
          quality: target.quality || 0,
          name: target.name || null,
          saved: false // Default value for saved
        })),
        extensive: true, // Example of static value
        pattern: "{firstname}.{lastname}@infosys.com", // Example of static value
        timestamp: 1719297148.66983, // Example of static value
      });

      console.log('Campaign added with ID: ', campaignRef.id);

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
        if (result.data && result.data.length > 0) {
          const csvTargets = result.data.slice(1); // Skip header row
          const formattedTargets = csvTargets.map((target) => ({
            email: target[3], // Adjust index based on your CSV structure
            name: target[6] || null, // Adjust index based on your CSV structure
            verified: target[4] === 'true', // Example of boolean parsing
            quality: parseInt(target[5]) || 0, // Example of integer parsing
            saved: false // Default value for saved
          }));
          setTargets(formattedTargets);
        }
      },
      error: (error) => {
        console.error('CSV parsing error:', error);
        alert('CSV parsing error');
      }
    });
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff', // Text color
      padding: '20px', // Padding around the content
    },
    card: {
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent dark background
      backdropFilter: 'blur(10px)', // Apply backdrop filter for glassmorphism effect
      borderRadius: '12px', // Rounded corners
      padding: '20px', // Padding around the content
      margin: '10px', // Margin for spacing
      boxShadow: '0 0 10px #59CCB5', // Box shadow with color #59CCB5
    },
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4" style={styles.container}>
      <div className="w-full max-w-lg  rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center">New Campaign</h2>
        <form onSubmit={handleSubmit} className="space-y-4" style={styles.card}>
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
              required={!csvFile}
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
                      {`${target.email}, ${target.name}`}
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
