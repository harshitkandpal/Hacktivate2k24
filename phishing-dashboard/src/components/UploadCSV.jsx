import React from 'react';
import Papa from 'papaparse';

const UploadCSV = ({ onAddEmails }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        // header: true,
        complete: (results) => {
          console.log("Parsed Data:", results.data);
          const emails = results.data.map((row) => ({
            value: row,
            
          }));
          onAddEmails(emails);
        },
      });
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-white mb-2">Upload Emails via CSV:</label>
      <input type="file" accept=".csv" onChange={handleFileChange} />
    </div>
  );
};

export default UploadCSV;
