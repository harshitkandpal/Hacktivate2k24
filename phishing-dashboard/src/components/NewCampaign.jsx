
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { parse } from 'papaparse';



const NewCampaign = () => {
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [csvFile, setCsvFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    domain: '',
    organization: '',
    industry: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram:'',
    youtube:'',
    country:'',
    company_type:'',
    description:''
    
  });

  const navigate = useNavigate();

  const fetchEmails = async () => {
    try {
      setIsLoading(true); // Set loading state to true
  
      const res = await fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=apikey`);
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
      console.error(error);
      setIsLoading(false); // Set loading state to false even in case of error
    }
  };
  

  return (
    <div className="min-h-screen   bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-center">New Campaign</h2>
      <div className="bg-white flex flex-row rounded-lg shadow-lg p-6 space-y-4" style={{  width: '1400px'}}>
        <form className="space-y-4 ">
          <div className="flex flex-row">
            <div>
              <label htmlFor="campaignName" className="block text-gray-700">
                Campaign Name:
              </label>
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
              <label htmlFor="targetDomain" className="block text-gray-700">
                Target Domain:
              </label>
              <input
                id="targetDomain"
                type="text"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required={!csvFile} // Domain input is required if no CSV file is uploaded
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ height: '50px' }}
              onClick={fetchEmails}
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Search for Emails'}
            </button>
          </div>
        </form>
      </div>
      <div>
        <div className="flex flex-row  " style={{ flexWrap: 'wrap', whiteSpace: 'nowrap' }}>
        <form className="flex flex-row  " style={{ flexWrap: 'wrap', whiteSpace: 'nowrap' }}>
          <h2>Company Profile:</h2>
          <div className="flex flex-row  " style={{ flexWrap: 'wrap', whiteSpace: 'nowrap'}}>
          <label htmlFor="domain">Domain:</label>
          <input
            type="text"
            id="domain"
            value={data.domain}
            style={{ width: 'fit-content'}}
            onChange={(event) => setFormData({ ...formData, domain: event.target.value })}
          />
          <label htmlFor="organization">Organization:</label>
          <input
            type="text"
            id="organization"
            value={data.organization}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, organization: event.target.value })}
          />
          <label htmlFor="industry">Industry:</label>
          <input
            type="text"
            id="industry"
            value={data.industry}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, industry: event.target.value })}
          />
          <label htmlFor="twitter">Twitter:</label>
          <input
            type="text"
            id="twitter"
            value={data.twitter}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, twitter: event.target.value })}
          />
          <label htmlFor="facebook">Facebook:</label>
          <input
            type="text"
            id="facebook"
            value={data.facebook}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, facebook: event.target.value })}
          />
          <label htmlFor="linkedin">Linkedin:</label>
          <input
            type="text"
            id="linkedin"
            value={data.linkedin}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, linkedin: event.target.value })}
          />
          <label htmlFor="instagram">Instagram:</label>
          <input
            type="text"
            id="instagram"
            value={data.instagram}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, instagram: event.target.value })}
          />
          <label htmlFor="youtube">Youtube:</label>
          <input
            type="text"
            id="youtube"
            value={data.youtube}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, youtube: event.target.value })}
          />
          <label htmlFor="country">Country:</label>
          <input
            type="text"
            id="country"
            value={data.country}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, country: event.target.value })}
          />
          
          <label htmlFor="company_type">Company Type:</label>
          <input
            type="text"
            id="company_type"
            value={data.company_type}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, company_type: event.target.value })}
          />
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            value={data.description}
            style={{ width: 'fit-content' }}
            onChange={(event) => setFormData({ ...formData, description: event.target.value })}
          />
          </div>

          
          <div style={{ marginTop:'20px'}}>
          <h1 style={{ marginBottom:'5px'}}>Emails with profiles:</h1>
        
          
          
    
          </div>
          
        </form>
        <div className='flex flex-column'>
        {data.emails && data.emails.length > 0 && (
          <div > {/* Change to flex-column */}
            {data.emails.map((email) => (
              <div key={email.value} className="email-container"> {/* Add a key and container class */}
                {/* Display email details */}
                <h1>{email.value}</h1>
                {/* {email.first_name && <p>First Name: {email.first_name}</p>}
                {email.last_name && <p>Last Name: {email.last_name}</p>} */}
                {/* ... add similar checks for other attributes */}
              </div>
            ))}
          </div>
        )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewCampaign;