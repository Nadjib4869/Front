import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";
const Data = [
  {
    name: 'Sun',
    event: 4000,
    product2: 2400,
  },
  {
    name: 'Mon',
    event: 3000,
    product2: 2210,
  },
  {
    name: 'Tue',
    event: 2000,
    product2: 2290,
  },
  {
    name: 'Wed',
    event: 2780,
    product2: 2000,
  },
  {
    name: 'Thu',
    event: 1890,
    product2: 2181,
  },
  {
    name: 'Fri',
    event: 2390,
    product2: 2500,
  },{
    name: 'Sat',
    event: 4000,
    product2: 2400,
  },{
    name: 'Sun',
    event: 4000,
    product2: 2400,
  },
  {
    name: 'Mon',
    event: 3000,
    product2: 2210,
  },
  {
    name: 'Tue',
    event: 2000,
    product2: 2290,
  },
  {
    name: 'Wed',
    event: 2780,
    product2: 2000,
  },
  {
    name: 'Thu',
    event: 1890,
    product2: 2181,
  },
  {
    name: 'Fri',
    event: 2390,
    product2: 2500,
  },{
    name: 'Sat',
    event: 4000,
    product2: 2400,
  },{
    name: 'Sun',
    event: 4000,
    product2: 2400,
  },
  {
    name: 'Mon',
    event: 3000,
    product2: 2210,
  },
  {
    name: 'Tue',
    event: 2000,
    product2: 2290,
  },
  {
    name: 'Wed',
    event: 2780,
    product2: 2000,
  },
  {
    name: 'Thu',
    event: 1890,
    product2: 2181,
  },
  {
    name: 'Fri',
    event: 2390,
    product2: 2500,
  },{
    name: 'Sat',
    event: 4000,
    product2: 2400,
  },
];

export default function LineChartDay() {
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
