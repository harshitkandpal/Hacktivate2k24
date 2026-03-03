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
    <div className="border border-white/5 bg-[#0a1118]/80 p-6 rounded-xl relative overflow-hidden group hover:border-cyber-accent/30 transition-all">
      <h3 className="text-sm font-tech text-gray-400 tracking-widest uppercase mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
        BATCH TARGET INGESTION (CSV)
      </h3>

      <div className="relative border-2 border-dashed border-white/10 hover:border-cyber-accent/50 rounded-lg p-6 text-center transition-all bg-[#050a0f]">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="pointer-events-none">
          <svg className="mx-auto h-12 w-12 text-gray-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="block text-sm text-gray-300 font-mono">Drag and drop file data here, or browse</span>
          <span className="block text-xs text-cyber-accent font-mono mt-1 uppercase tracking-wider">.csv formats only</span>
        </div>
      </div>
    </div>
  );
};

export default UploadCSV;
