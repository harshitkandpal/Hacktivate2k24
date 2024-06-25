
const Profile = ({ campaign }) => {
  if (!campaign || !campaign.emails) return <div>Loading...</div>;
  
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">Profile for {campaign.email}</h3>
      <p><strong>Name:</strong> {campaign.name}</p>
      <p><strong>Age:</strong> {campaign.age}</p>
      <p><strong>Gender:</strong> {campaign.gender}</p>
      <p><strong>Job Title:</strong> {campaign.jobTitle}</p>
      <p><strong>Country:</strong> {campaign.country}</p>
      <p><strong>Interests:</strong> {campaign.interests ? campaign.interests.join(', ') : 'N/A'}</p>
      <p><strong>Social Media Profiles:</strong> {campaign.socialMediaProfiles ? Object.values(campaign.socialMediaProfiles).join(', ') : 'N/A'}</p>
    </div>
  );
};

export default Profile;
