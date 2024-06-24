import React from 'react';
import CampaignAnalytics from './CampaignAnalytics';

const CampaignDetail = ({ campaign }) => {
  if (!campaign || !campaign.emails) return <div>Loading...</div>;

  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">{campaign.name}</h3>
      <p><strong>Target Domain:</strong> {campaign.domain}</p>
      <p><strong>Created At:</strong> {new Date(campaign.createdAt.seconds * 1000).toLocaleString()}</p>

      {/* Render Analytics */}
      <CampaignAnalytics campaign={campaign} />

      {/* Email Profiles */}
      <div className="mt-8">
        <h4 className="text-xl font-bold">Email Profiles:</h4>
        <ul className="space-y-4 mt-4">
          {campaign.emails.map((email) => (
            <li key={email.email} className="border border-gray-200 p-4 rounded-lg shadow-sm">
              <p><strong>Email:</strong> {email.email}</p>
              <p><strong>Profile:</strong></p>
              <ul>
                <li><strong>Age:</strong> {email.profile.age}</li>
                <li><strong>Gender:</strong> {email.profile.gender}</li>
                <li><strong>Interests:</strong> {email.profile.interests ? email.profile.interests.join(', ') : 'N/A'}</li>
                <li><strong>Job Title:</strong> {email.profile.jobTitle}</li>
                <li><strong>Country:</strong> {email.profile.country}</li>
                <li><strong>Social Media Profiles:</strong> {email.profile.socialMediaProfiles ? Object.values(email.profile.socialMediaProfiles).join(', ') : 'N/A'}</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CampaignDetail;
