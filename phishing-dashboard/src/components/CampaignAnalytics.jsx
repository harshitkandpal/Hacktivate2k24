import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const CampaignAnalytics = ({ campaign }) => {
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    renderCharts();
    return () => {
      destroyCharts();
    };
  }, [campaign]);

  const calculateSuccessRate = () => {
    if (!campaign || campaign.collectedEmails === 0) return 0;
    return ((campaign.phishedEmails / campaign.collectedEmails) * 100).toFixed(2);
  };

  const renderCharts = () => {
    renderBarChart();
    renderPieChart();
  };

  const renderBarChart = () => {
    if (barChartRef.current) {
      if (barChartRef.current.chart) {
        barChartRef.current.chart.destroy();
      }
      const ctx = barChartRef.current.getContext('2d');
      barChartRef.current.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Collected Emails', 'Open Rate', 'Click-Through Rate', 'Phished Emails'],
          datasets: [
            {
              label: campaign.name,
              data: [
                campaign.collectedEmails || 0,
                campaign.openRate || 0,
                campaign.clickThroughRate || 0,
                campaign.phishedEmails || 0,
              ],
              backgroundColor: ['#4caf50', '#2196f3', '#ffeb3b', '#f44336'],
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
            },
          },
        },
      });
    }
  };

  const renderPieChart = () => {
    if (pieChartRef.current) {
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

  return (
    <div className="mt-4 flex flex-wrap justify-between">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pr-4">
        <div className="mb-4" style={{ width: '500px', height: '500px' }}>
          <h5 className="text-lg font-bold mb-2">General Analytics:</h5>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 mb-4 pl-4">
        <h4 className="text-xl font-bold mb-2">Phishing Success vs Failure:</h4>
        <div style={{ width: '500px', height: '400px' }}>
          <canvas ref={pieChartRef}></canvas>
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
  );
};

export default CampaignAnalytics;
