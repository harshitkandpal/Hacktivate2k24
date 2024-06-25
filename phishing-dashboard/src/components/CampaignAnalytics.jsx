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

  // Options for the Pie chart
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Disable aspect ratio
    plugins: {
      legend: {
        display: true,
        position: 'right', // Adjust legend position as needed
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
  };

  return (
        <>
        <h4 className="text-xl font-bold mb-2">Analytics:</h4>
    <div className="mt-4 flex flex-wrap justify-between">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pr-4">

        {/* General Analytics - Bar Chart */}
        <div className="mb-4" style={{width:'500px', height:"500px"}}>
          <h5 className="text-lg font-bold mb-2">General Analytics:</h5>
          <Bar data={barChartData} />
        </div>
      </div>

      {/* Phishing Success vs Failure - Pie Chart */}
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pl-4">
        <h4 className="text-xl font-bold mb-2">Phishing Success vs Failure:</h4>
        <div className="" style={{width:'500px', height:"400px"}}>
          {/* Ensure width and height are set appropriately */}
          <Pie data={pieChartData} options={pieChartOptions} width={300} height={300} />
          <div className="ml-4">
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
    </div>
        </>
  );
};

export default CampaignAnalytics;
