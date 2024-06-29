import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CampaignAnalytics = ({ campaign }) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    if (campaign) {
      renderCharts();
    } else {
      destroyCharts(); // Ensure charts are destroyed if campaign data becomes unavailable
    }
    return () => {
      destroyCharts();
    };
  }, [campaign]);

  const calculateSuccessRate = () => {
    if (!campaign || !campaign.data) return 10;
    if(campaign.collectedEmails !== 0 ) return ((campaign.clickThroughRate / campaign.collectedEmails) * 100).toFixed(2)||10;
    return ((campaign.data.clickThroughRate / campaign.data.collectedEmails) * 100).toFixed(2)||10;
  };

  const renderCharts = () => {
    if (campaign && campaign.data) {
      renderBarChart();
      renderPieChart();
    }
  };

  const renderBarChart = () => {
    if (barChartRef.current && campaign && campaign.data) {
      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
      const ctx = barChartRef.current.getContext('2d');
      barChartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Collected Emails','Click-Through Rate'],
          datasets: [
            {
              label: campaign.name,
              data: [
                campaign.data.collectedEmails || campaign.collectedEmails || 10,
                campaign.data.clickThroughRate || campaign.clickThroughRate || 1
              ],
              backgroundColor: ['#4caf50', '#2196f3'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: 'white', // Legend label color
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white', // X-axis label color
              },
            },
            y: {
              ticks: {
                color: 'white', // Y-axis label color
              },
            },
          },
        },
      });
    }
  };

  const renderPieChart = () => {
    if (pieChartRef.current && campaign && campaign.data) {
      if (pieChartRef.current.chart) {
        pieChartRef.current.chart.destroy();
      }
      const ctx = pieChartRef.current.getContext('2d');
      pieChartRef.current.chart = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['Success Rate', 'Failure Rate'],
          datasets: [
            {
              label: 'Phishing Success vs Failure',
              data: [calculateSuccessRate(), 100 - calculateSuccessRate()],
              backgroundColor: ['#f44336', '#4caf50'],
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: 'white', // Legend label color
              },
            },
          },
        },
      });
    }
  };

  const destroyCharts = () => {
    if (barChartRef.current && barChartRef.current.chart) {
      barChartRef.current.chart.destroy();
    }
    if (pieChartRef.current && pieChartRef.current.chart) {
      pieChartRef.current.chart.destroy();
    }
  };

  if (!campaign || !campaign.data) {
    return null; // If campaign data is not available, do not render anything
  }

  return (
    <div className="mt-4 flex justify-between bg-opacity-25 backdrop-filter backdrop-blur-lg">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pr-4">
        <div className="mb-4" style={{ width: '500px', height: '500px', borderRadius: '12px' }}>
          <h5 className="text-lg font-bold mb-2 text-white">General Analytics:</h5>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pl-4">
        <h4 className="text-xl font-bold mb-2 text-white">Phishing Success vs Failure:</h4>
        <div style={{ width: '500px', height: '400px', borderRadius: '12px' }}>
          <canvas ref={pieChartRef}></canvas>
          <div className="ml-4">
            <h5 className="text-lg font-bold mb-2 text-white">Phishing Success Rate:</h5>
            <p className="mb-2 text-white">
              <strong>Success Rate:</strong> {calculateSuccessRate()}%
            </p>
            <p className="mb-2 text-white">
              <strong>Failure Rate:</strong> {(100 - calculateSuccessRate()).toFixed(2)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
