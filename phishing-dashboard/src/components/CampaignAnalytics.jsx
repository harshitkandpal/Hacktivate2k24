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
    if (campaign.collectedEmails !== 0) return ((campaign.clickThroughRate / campaign.collectedEmails) * 100).toFixed(2) || 10;
    return ((campaign.data.clickThroughRate / campaign.data.collectedEmails) * 100).toFixed(2) || 10;
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
          labels: ['Extracted Targets', 'Interaction Rate'],
          datasets: [
            {
              label: campaign.name,
              data: [
                campaign.data.collectedEmails || campaign.collectedEmails || 10,
                campaign.data.clickThroughRate || campaign.clickThroughRate || 1
              ],
              backgroundColor: ['#00ffcc', '#0c66e4'],
              borderColor: ['#00ffcc', '#0c66e4'],
              borderWidth: 1,
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
                color: '#9ca3af', // Legend label color - gray-400
                font: { family: 'monospace' }
              },
            },
          },
          scales: {
            x: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: {
                color: '#9ca3af', // X-axis label color - gray-400
                font: { family: 'monospace' }
              },
            },
            y: {
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              ticks: {
                color: '#9ca3af', // Y-axis label color - gray-400
                font: { family: 'monospace' }
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
        type: 'doughnut',
        data: {
          labels: ['Compromised', 'Secure'],
          datasets: [
            {
              label: 'Infiltration Success vs Failure',
              data: [calculateSuccessRate(), 100 - calculateSuccessRate()],
              backgroundColor: ['#ef4444', '#00ffcc'],
              borderColor: 'rgba(10, 17, 24, 1)',
              borderWidth: 2,
            },
          ],
        },
        options: {
          cutout: '75%',
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'right',
              labels: {
                color: '#9ca3af', // Legend label color
                font: { family: 'monospace' }
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
    <div className="border border-white/5 bg-[#0a1118]/80 p-6 rounded-xl overflow-hidden mt-6 shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
      <h3 className="text-sm font-tech text-gray-400 tracking-widest uppercase mb-6 flex items-center gap-2 m-0 border-b border-white/5 pb-4">
        <svg className="w-4 h-4 text-cyber-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
        OPERATION TELEMETRY DASHBOARD
      </h3>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-[#050a0f] border border-white/5 rounded-lg p-4">
          <h5 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Volume Metrics</h5>
          <div className="w-full h-[300px]">
            <canvas ref={barChartRef}></canvas>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-[#050a0f] border border-white/5 rounded-lg p-4 flex flex-col">
          <h4 className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-4">Infiltration Efficacy</h4>

          <div className="flex-1 flex items-center justify-center relative min-h-[200px]">
            <div className="w-full h-[220px] flex items-center justify-center relative">
              <div className="w-[85%] h-full">
                <canvas ref={pieChartRef}></canvas>
              </div>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pr-[25%] lg:pr-[30%]">
              <span className="text-3xl font-bold font-tech text-red-500 tracking-tighter shadow-red-500/50 drop-shadow-md">
                {calculateSuccessRate()}%
              </span>
              <span className="text-[9px] text-gray-500 font-mono tracking-widest uppercase mt-1">
                COMPROMISED
              </span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-4 text-center">
            <div className="bg-red-900/10 border border-red-500/20 rounded p-2">
              <span className="block text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1">Breach Rate</span>
              <span className="block text-red-400 font-mono font-bold">{calculateSuccessRate()}%</span>
            </div>
            <div className="bg-green-900/10 border border-green-500/20 rounded p-2">
              <span className="block text-[10px] text-gray-400 font-mono tracking-widest uppercase mb-1">Defense Rate</span>
              <span className="block text-green-400 font-mono font-bold">{(100 - calculateSuccessRate()).toFixed(2)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignAnalytics;
