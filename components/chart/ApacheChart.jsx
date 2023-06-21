import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const ApacheChart = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);


    const getRadius = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1440) {
          return ['30%', '60%']; // Radius for 1440px and above
        } else if (screenWidth >= 1024) {
          return ['20%', '50%']; // Radius for 1024px to 1439px
        } else if (screenWidth >= 426) {
          return ['30%', '50%']; // Radius for 426px to 1023px
        } else if (screenWidth >= 375) {
          return ['20%', '40%']; // Radius for 375px to 425px
        } else {
          return ['10%', '30%']; // Radius for less than 375px
        }
      };

    const option = {
      
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      series: [
        {
          type: 'pie',
          radius: getRadius(),
          center: ['50%', '50%'],
          selectedMode: 'single',
          data: [
            { value: 20, name: 'Staking Rewards 20%', itemStyle: { color: '#008F95' } },
            { value: 10, name: 'Team 10%', itemStyle: { color: '#D1D5E3' } },
            { value: 10, name: 'Reserve 10%', itemStyle: { color: '#CCBADF' } },
            { value: 20, name: 'Marketing (including airdrops) 20%', itemStyle: { color: '#2D8EA4' } },
            { value: 20, name: 'Liquidity Pools 20%', itemStyle: { color: '#29647C' } },
            { value: 10, name: 'Presale 10%', itemStyle: { color: '#33E2C9' } },
            { value: 10, name: 'Development Fund 10%', itemStyle: { color: '#A0A5C2' } },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
          itemStyle: {
            color: ['#33E2C9', '#008F95', '#D1D5E3', '#2D8EA4', '#29647C', '#A0A5C2', '#CCBADF'],
          },
          label: {
            formatter: function (params) {
              const colorList = ['#33E2C9', '#008F95', '#D1D5E3', '#2D8EA4', '#29647C', '#A0A5C2', '#CCBADF'];
              const colorIndex = params.dataIndex % colorList.length;
              const labelColor = colorList[colorIndex];
              return `{b|${params.name}}`;
            },
            rich: {
              b: {
                color: ['#33E2C9', '#008F95', '#D1D5E3', '#2D8EA4', '#29647C', '#A0A5C2', '#CCBADF'],
                align: 'center',
                fontSize: 14,
                fontWeight: 'bold',
                padding: [2, 0],
              },
            },
          },
        },
      ],
    };

    // Set responsive settings for different screen sizes
    option && myChart.setOption(option);

    window.addEventListener('resize', () => {
      myChart.resize();
    });

    return () => {
      myChart.dispose();
      window.removeEventListener('resize', () => {
        myChart.resize();
      });
    };
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '490px' }}></div>;
};

export default ApacheChart;
