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
      setIsLoading(true); // Set loading state to true
  
      const res = await fetch('data.json');
      const fetchedData = await res.json();
  
      console.log(fetchedData); // Inspect the data structure
  
      if (fetchedData.data) { // Check for "data" key
        const domainData = fetchedData.data; // Access the domain information
        setData(domainData); // Set the correct data
      } else {
        console.log('No domain information found.');
      }
  
      setIsLoading(false); // Set loading state to false after fetching
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
      minHeight: '95vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#ffffff', // Text color
      padding: '20px', // Padding around the content
    },
    formContainer: {
      width: '100%',
      background: 'linear-gradient(135deg, rgba(89, 204, 181, 0.1) 10%, rgba(6, 8, 8, 0.7) 90%)',
      padding: '20px', // Padding around the content
      margin: '10px',
      borderRadius: '0.5rem', // 8px / 16px = 0.5rem
      boxShadow: '0 0.25rem 0.375rem rgba(0, 0, 0, 0.1)', // 4px / 16px = 0.25rem, 6px / 16px = 0.375rem
      backdropFilter: 'blur(0.625rem)', // 10px / 16px = 0.625rem
      border: '0.0625rem solid rgba(255, 255, 255, 0.18)', // 1px / 16px = 0.0625rem
    },
    heading: {
      fontSize: '1.5rem', // 24px / 16px = 1.5rem
      fontWeight: 'bold',
      marginBottom: '1rem', // 16px / 16px = 1rem
      color: 'white',
    },
    label: {
      display: 'block',
      color: 'white',
      marginBottom: '0.5rem', // 8px / 16px = 0.5rem
    },
    input: {
      width: '100%',
      padding: '0.5rem', // 8px / 16px = 0.5rem
      border: '0.0625rem solid #4A5568', // 1px / 16px = 0.0625rem
      backgroundColor: '#1A202C',
      color: 'white',
      borderRadius: '0.25rem', // 4px / 16px = 0.25rem
      marginBottom: '1rem', // 16px / 16px = 1rem
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#59CCB5',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#49b09b',
    },
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4" style={styles.container}>
      <div className="w-full max-w-lg  rounded-lg shadow-lg p-6 space-y-4">
        <h2 className="text-3xl font-bold text-center" >New Campaign</h2>
        <form onSubmit={handleSubmit} className="space-y-4" style={styles.formContainer}>
          <div>
            <label htmlFor="campaignName" className="block" style={styles.label}>Campaign Name:</label>
            <input
              id="campaignName"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div>
            <label htmlFor="targetDomain" className="block" style={styles.label}>Target Domain:</label>
            <input
              id="targetDomain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              style={styles.input}
              required={!csvFile}
            />
          </div>
          <div>
            <label htmlFor="csvFile" className="block" style={styles.label}>Upload CSV File:</label>
            <input
              id="csvFile"
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              style={styles.input}
            />
            <small className="block" style={styles.label}>Upload a CSV file with targets.</small>
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
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Create Campaign
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewCampaign;
