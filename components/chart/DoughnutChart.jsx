import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import Heading2 from "../headings/Heading2";
import Heading5 from "../headings/Heading5";

const data = {
  labels: ['Presale 10% 15 million tokens', 'Staking Rewards 20% 30 million tokens', 'Team 10% 15 million tokens', 'Marketing (including airdrops) 20% 30 million tokens', 'Liquidity Pools 20% 30 million tokens', 'Development Fund 10% 15 million tokens', 'Reserve 10% 15 million tokens'],
  datasets: [
    {
      label: 'Tokenomics Distribution',
      data: [15, 30, 15, 30, 30, 10, 10],
      backgroundColor: [
        '#0adab9',     // Presale
        '#bfc6d7',     // Staking Rewards
        '#6a7ba8',     // Team
        '#181830',     // Marketing
        '#454c5f',     // Liquidity Pools
        '#ffcc00',     // Development Fund (Updated color)
        '#ff6666'      // Reserve (Updated color)
      ],
      borderColor: [
        '#0adab9',     // Presale
        '#bfc6d7',     // Staking Rewards
        '#6a7ba8',     // Team
        '#181830',     // Marketing
        '#454c5f',     // Liquidity Pools
        '#ffcc00',     // Development Fund (Updated color)
        '#ff6666'      // Reserve (Updated color)
      ],
      
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        color: '#ffffff', // Set the font color to white
        font: {
          size: 18,
        },
      },
    },
  },
};

const DoughnutChart = () => (
  <>
    <Doughnut data={data} options={options} />
  </>
);

export default DoughnutChart;
