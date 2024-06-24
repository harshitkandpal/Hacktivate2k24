import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';

const CampaignAnalytics = ({ campaign }) => {
  if (!campaign) return null;

  // Calculate phishing success rate
  const calculateSuccessRate = () => {
    if (campaign.collectedEmails === 0) return 0;
    return ((campaign.phishedEmails / campaign.collectedEmails) * 100).toFixed(2);
  };

  // Data object for the Bar chart
  const barChartData = {
    labels: ['Collected Emails', 'Open Rate', 'Click-Through Rate', 'Phished Emails'],
    datasets: [
      {
        label: campaign.name,
        data: [
          campaign.collectedEmails,
          campaign.openRate,
          campaign.clickThroughRate,
          campaign.phishedEmails,
        ],
        backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336'],
      },
    ],
  };

  // Data object for the Pie chart with percentages
  const pieChartData = {
    labels: ['Success Rate', 'Failure Rate'],
    datasets: [
      {
        label: 'Phishing Success vs Failure',
        data: [calculateSuccessRate(), 100 - calculateSuccessRate()],
        backgroundColor: ['#f44336', '#4caf50'],
      },
    ],
  };

  return (
    <div className="mt-4">
      <h4 className="text-xl font-bold mb-2">Analytics:</h4>

      {/* General Analytics - Bar Chart */}
      <div className="mb-4">
        <h5 className="text-lg font-bold mb-2">General Analytics:</h5>
        <Bar data={barChartData} />
      </div>

      {/* Phishing Success vs Failure - Pie Chart */}
      <div className="flex items-center justify-between">
        <div className="w-1/2 pr-4">
          <h5 className="text-lg font-bold mb-2">Phishing Success vs Failure:</h5>
          <Pie data={pieChartData} />
        </div>
        <div className="w-1/2">
          <h5 className="text-lg font-bold mb-2">Phishing Success Rate:</h5>
          <p className="mb-2">
            <strong>Success Rate:</strong> {calculateSuccessRate()}%
          </p>
          <p className="mb-2">
            <strong>Failure Rate:</strong> {(100 - calculateSuccessRate()).toFixed(2)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
