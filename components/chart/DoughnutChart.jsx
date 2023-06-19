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
      data: [15 , 30, 15, 30, 30, 10, 10],
      backgroundColor: [
        '#000000',     
        '#01161d',     
        '#022b3b',     
        '#034353',     
        '#045d6b',     
        '#057484',     
        '#0adab9',     
      ],
      borderColor: [
        '#0adab9',     
        '#0adab9',     
        '#0adab9',     
        '#0adab9',     
        '#0adab9',     
        '#0adab9',     
        '#0adab9',     
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
