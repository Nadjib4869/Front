import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const Data = [
  {
    name: '2010',
    event: 4000,
    product2: 2400,
  },
  {
    name: '2011',
    event: 3000,
    product2: 2210,
  },
  {
    name: '2012',
    event: 2000,
    product2: 2290,
  },
  {
    name: '2013',
    event: 2780,
    product2: 2000,
  },
  {
    name: '2014',
    event: 1890,
    product2: 2181,
  },
  {
    name: '2015',
    event: 2390,
    product2: 2500,
  },{
    name: '2016',
    event: 4000,
    product2: 2400,
  },
  {
    name: '2017',
    event: 3000,
    product2: 2210,
  },
  {
    name: '2018',
    event: 2000,
    product2: 2290,
  },
  {
    name: '2019',
    event: 2780,
    product2: 2000,
  },
  {
    name: '2020',
    event: 1890,
    product2: 2181,
  },
  {
    name: '2021',
    product1: 2390,
    product2: 2500,
  },
];

export default function LineChartYear () {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Cleanup previous chart instance if it exists
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    // Get the 2D context of the canvas element
    const myChartRef = chartRef.current.getContext("2d");

    // Create a new Chart instance
    chartInstance.current = new Chart(myChartRef, {
      type: "line",
      data: {
        labels:  Data.map((data) => data.name),
        datasets: [
          {
            label: "Line Chart",
            data: Data.map((data)=> data.event ),
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
          },
        ],
      },
    });

    // Cleanup the chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount

  return (
    <div className="ps-16 max-[1300px]:ps-4">
    <canvas ref={chartRef} className="w-[275px] h-[100px] rounded-lg bg-white" />
  </div>
  );
}
