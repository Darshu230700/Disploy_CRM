import React, { useState, useEffect } from "react";
import ReactECharts from "echarts-for-react";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
const BarChart = () => {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFrozen, setIsFrozen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isFrozen) {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % data.length);
      }
    }, 1000); // Change the interval as per your requirement

    return () => clearInterval(interval);
  }, [data, isFrozen]);

  useEffect(() => {
    // Sample data (you can replace it with your data)
    const sampleData = [
      { name: "A", value: Math.random() * 100 },
      { name: "B", value: Math.random() * 100 },
      { name: "C", value: Math.random() * 100 },
      { name: "D", value: Math.random() * 100 },
      { name: "E", value: Math.random() * 100 },
    ];
    setData(sampleData);
  }, []);

  useEffect(() => {
    // Freeze the chart when all data points have been shown
    if (currentIndex === data.length - 1) {
      setIsFrozen(true);
    }
  }, [currentIndex, data]);

  const option = {
    xAxis: {
      type: "value",
      boundaryGap: [0, 0.01],
    },
    yAxis: {
      type: "category",
      data: data.map((item) => item.name),
    },
    series: [
      {
        type: "bar",
        data: data.map((item) => item.value),
        label: {
          show: true,
          position: "right",
          formatter: "{c}",
        },
      },
    ],
  };
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <ReactECharts option={option} />
    </div>
  );
};

export default BarChart;
