import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ApacheChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        bottom: 'left',
        textStyle: {
          fontFamily: 'Jost',
          color: 'inherit', 
          fontWeight: 'bold',
          fontSize: 15
        }
      },
      series: [
        {
          name: 'MAW Tokenomics',
          type: 'pie',
          radius: '50%',
          data: [
            {
              value: 10,
              name: 'Presale 10%',
              itemStyle: { color: '#33E2C9' },
              label: { color: '#33E2C9', fontSize: 15, fontWeight: 'bold' } 
            },
            {
              value: 10,
              name: 'Team 10%',
              itemStyle: { color: '#D1D5E3' },
              label: { color: '#D1D5E3', fontSize: 15, fontWeight: 'bold' } 
            },
            {
              value: 5,
              name: 'Reserve 5%',
              itemStyle: { color: '#CCBADF' },
              label: { color: '#CCBADF', fontSize: 15, fontWeight: 'bold' } 
            },
            {
              value: 20,
              name: 'Staking Rewards 20%',
              itemStyle: { color: '#008F95' },
              label: { color: '#008F95', fontSize: 15, fontWeight: 'bold' } 
            },
            {
              value: 55,
              name: 'Public 55%',
              itemStyle: { color: '#29647C' },
              label: { color: '#29647C', fontSize: 15, fontWeight: 'bold' } 
            },
              
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    // Set the chart option
    myChart.setOption(option);

    // Cleanup when component unmounts
    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width:'100%',height: '490px' }} />;
};

export default ApacheChart;
