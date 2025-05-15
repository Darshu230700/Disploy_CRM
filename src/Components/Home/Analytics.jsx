/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-dupe-keys */
import React, {  useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { FiActivity, FiHexagon, FiUsers } from "react-icons/fi";
import { FaCaretDown, FaCaretUp, FaRegClock } from "react-icons/fa6";
import { TbConfetti } from "react-icons/tb";
import ReactApexChart from "react-apexcharts";
import Footer from "../Common/Footer";
import "jsvectormap";
import "jsvectormap/dist/maps/world.js";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import BarChart from "../Chart/BarChart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark}) => {
  const SessionsOption = {
    chart: { height: 255, type: "donut" },
    plotOptions: { pie: { donut: { size: "85%" } } },
    dataLabels: { enabled: !1 },
    stroke: { show: !0, width: 2, colors: ["transparent"] },
    series: [50, 25, 25],
    legend: {
      show: !0,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: !1,
      fontSize: "13px",
      offsetX: 0,
      offsetY: 0,
    },
    labels: ["Mobile", "Tablet", "Desktop"],
    colors: ["#2a76f4", "rgba(42, 118, 244, .5)", "rgba(42, 118, 244, .18)"],
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: { donut: { customScale: 0.2 } },
          chart: { height: 240 },
          legend: { show: !1 },
        },
      },
    ],
    tooltip: {
      y: {
        formatter: function (_) {
          return _ + " %";
        },
      },
    },
  };
  const AudienceData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Monthly Report",
        data: [12, 19, 13, 9, 12, 11, 12, 19, 13, 9, 12, 11],
        borderRadius: 100,
        borderSkipped: !1,
        backgroundColor: "#367de4",
        borderColor: "#367de4",
        borderWidth: 1,
        indexAxis: "x",
        barThickness: 15,
        grouped: !0,
        maxBarThickness: 9,
        barPercentage: 50,
      },
      {
        label: "Monthly Report",
        data: [8, 12, 15, 11, 8, 14, 16, 13, 10, 7, 19, 16],
        borderRadius: 100,
        borderSkipped: !1,
        backgroundColor: "rgba(34, 183, 176, 0.15)",
        borderColor: "rgba(34, 183, 176, 0.45)",
        borderWidth: 1,
        indexAxis: "x",
        barThickness: 15,
        grouped: !0,
        maxBarThickness: 9,
      },
    ],
  };

  const AudienceOptions = {
    maintainAspectRatio: !1,
    responsive: !0,
    plugins: {
      legend: { display: !1, position: "top", labels: { color: "#7c8ea7" } },
      title: { display: !1, text: "Chart.js Bar Chart" },
    },
    scales: {
      y: {
        beginAtZero: !0,
        ticks: {
          callback: function (_, e, a) {
            return "$" + _;
          },
          color: "#7c8ea7",
        },
        grid: {
          drawBorder: "border",
          color: "rgba(132, 145, 183, 0.15)",
          borderDash: [3],
          borderColor: "rgba(132, 145, 183, 0.15)",
        },
        beginAtZero: !0,
      },
      x: {
        ticks: { color: "#7c8ea7" },
        grid: {
          display: !1,
          color: "rgba(132, 145, 183, 0.09)",
          borderDash: [3],
          borderColor: "rgba(132, 145, 183, 0.09)",
        },
      },
    },
  };

  const Revenu_Status = {
    chart: {
      height: 300,
      type: "area",
      toolbar: { show: !1 },
      dropShadow: {
        enabled: !0,
        top: 12,
        left: 0,
        bottom: 0,
        right: 0,
        blur: 2,
        color: "rgba(132, 145, 183, 0.3)",
        opacity: 0.35,
      },
    },
    colors: ["#f1a760", "#6d81f5"],
    dataLabels: { enabled: !1 },
    stroke: {
      show: !0,
      curve: "smooth",
      width: [2, 2],
      dashArray: [0, 4],
      lineCap: "round",
    },
    series: [
      {
        name: "Income",
        data: [31, 40, 28, 51, 31, 40, 28, 51, 31, 40, 28, 51],
      },
      {
        name: "Expenses",
        data: [0, 30, 10, 40, 30, 60, 50, 80, 70, 100, 90, 130],
      },
    ],
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    yaxis: {
      labels: {
        formatter: function (_) {
          return _ + "k";
        },
        offsetX: -12,
        offsetY: 0,
      },
    },
    grid: {
      strokeDashArray: 3,
      xaxis: { lines: { show: !0 } },
      yaxis: { lines: { show: !1 } },
    },
    legend: { show: !1 },
    fill: {
      type: "gradient",
      gradient: {
        type: "vertical",
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.05,
        opacityTo: 0.05,
        stops: [45, 100],
      },
    },
  };

  useEffect(() => {
    // Initialize map when component mounts
   
    // const map = new window.jsVectorMap({
    //   map: "world",
    //   selector: "#map_1",
    //   zoomOnScroll: false,
    //   zoomButtons: false,
    //   selectedMarkers: [1, 1],
    //   markersSelectable: true,
    //   markers: [
    //     { name: "Russia", coords: [61.524, 105.3188] },
    //     { name: "Canada", coords: [56.1304, -106.3468] },
    //     { name: "Palestine", coords: [31.9474, 35.2272] },
    //     { name: "Greenland", coords: [71.7069, -42.6043] },
    //   ],
    //   markerStyle: {
    //     initial: { fill: "#5c5cff" },
    //     selected: { fill: "#ff5da0" },
    //   },
    //   labels: { markers: { render: (_) => _.name } },
    // });

    // Return a cleanup function to remove the map when the component unmounts
    return () => {
      // Get the map container element
      const mapContainer = document.getElementById("map_1");
      // Remove the map container and its children to clean up
      if (mapContainer) {
        mapContainer.innerHTML = "";
      }
    };
  }, []);

  // const Visitor = {
  //   series: [
  //     {
  //       data: [470, 690, 1200, 1380],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       type: "bar",
  //       height: 200,
  //       toolbar: {
  //         show: false,
  //       },
  //       zoom: {
  //         enabled: false,
  //       },
  //     },
  //     axisPointer: {
  //       show: false,
  //     },
  //     markers: {
  //       size: 2,
  //     },
  //     dataLabels: {
  //       enabled: true,
  //     },
  //     grid: {
  //       show: false,
  //     },
  //     plotOptions: {
  //       bar: {
  //         borderRadius: 4,
  //         horizontal: true,
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     xaxis: {
  //       categories: ["Organic", "Direct", "Campaign", "Social Media"],
  //     },
  //     tooltip: {
  //       enabled: false, // Set to false to disable the tooltip on hover
  //     },
  //   },
  // };

  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
        <div className="flex flex-1">
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
            <div className="xl:w-full">
              <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                  <div className="w-full">
                    <div className="">
                      <div className="flex flex-wrap justify-between">
                        <div className="items-center ">
                          <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                            Analytics
                          </h1>
                          <ol className="list-reset flex text-sm">
                            <li>
                              <a href="/Analytics" className="text-gray-500">
                                Disploy
                              </a>
                            </li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-gray-500">Dashboards</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Analytics
                            </li>
                          </ol>
                        </div>
                        <div className="flex items-center">
                          <button className="px-3 py-2 lg:px-4 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded hover:bg-blue-600">
                            Create New
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4  mb-4">
                <div className=" sm:col-span-3 md:col-span-4 lg:col-span-4 xl:col-span-3">
                  <div className="grid sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                        <div className="flex justify-between xl:gap-x-2 items-center">
                          <div className="relative overflow-hidden text-transparent -m-3">
                            <FiHexagon className="h-20 w-20 fill-slate-500/5 group-hover:fill-white/10 mx-auto rotate-90 relative top-1" />
                            <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-slate-500 rounded-xl group-hover:text-white transition-all duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                              {/* <i className="ti ti-users text-3xl"></i> */}
                              <FiUsers className="text-3xl" />
                            </div>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              24k
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Sessions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="relative overflow-hidden text-transparent -m-3">
                            <FiHexagon className="h-20 w-20 fill-slate-500/5 group-hover:fill-white/10 mx-auto rotate-90 relative top-1" />
                            <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-slate-500 rounded-xl group-hover:text-white transition-all duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                              {/* <i className="ti ti-clock text-3xl"></i> */}
                              <FaRegClock className="text-3xl" />
                            </div>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              01
                              <span className="text-sm text-slate-500">m</span>
                              03
                              <span className="text-sm text-slate-500">s</span>
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Avg.Sessions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="relative overflow-hidden text-transparent -m-3">
                            <FiHexagon className="h-20 w-20 fill-slate-500/5 group-hover:fill-white/10 mx-auto rotate-90 relative top-1" />
                            <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-slate-500 rounded-xl group-hover:text-white transition-all duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                              {/* <i className="ti ti-activity text-3xl"></i> */}
                              <FiActivity className="text-3xl" />
                            </div>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              $1800
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Bounce Rate
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-1 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full p-4 relative">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="relative overflow-hidden text-transparent -m-3">
                            <FiHexagon className="h-20 w-20 fill-slate-500/5 group-hover:fill-white/10 mx-auto rotate-90 relative top-1" />
                            <div className="absolute top-2/4 -translate-y-2/4 left-0 right-0 mx-auto text-slate-500 rounded-xl group-hover:text-white transition-all duration-500 ease-in-out text-3xl flex align-middle justify-center items-center">
                              {/* <i className="ti ti-confetti text-3xl"></i> */}
                              <TbConfetti className="text-3xl" />
                            </div>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              75000
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium truncate ">
                              Goal Completions
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:row-span-1 lg:row-span-1 xl:row-span-2 md:col-span-4 lg:col-span-4 xl:col-span-1">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full overflow-hidden">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Sessions Device</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <ReactApexChart
                        options={SessionsOption}
                        series={SessionsOption?.series}
                        type="donut"
                      />
                      <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                          <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                              <table className="min-w-full">
                                <thead className="bg-gray-50 dark:bg-slate-600/20">
                                  <tr>
                                    <th
                                      scope="col"
                                      className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                      Device
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                      Sessions
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                      Day
                                    </th>
                                    <th
                                      scope="col"
                                      className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                    >
                                      Week
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                    <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-slate-300">
                                      Dasktops
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      1843
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -3
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -12
                                    </td>
                                  </tr>
                                  <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                    <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-slate-300">
                                      Tablets
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      2543
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -5
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -2
                                    </td>
                                  </tr>

                                  <tr className="bg-white dark:bg-gray-800">
                                    <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-slate-300">
                                      Mobiles
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      3654
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -5
                                    </td>
                                    <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                      -6
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 lg:col-span-4 xl:col-span-3">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Audience Overview</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="chart-container">
                        {/* <canvas id="bar" height="290"></canvas> */}
                        <Bar
                          data={AudienceData}
                          options={AudienceOptions}
                          height={290}
                        ></Bar>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mb-4">
                <div className="sm:col-span-1  md:col-span-2 lg:col-span-4 xl:col-span-1 ">
                  <div className="h-full bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium dark:text-slate-300">
                        Total Visits
                      </h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="map_1" className="w-full h-60">
                        {/* <VectorMap map="world_mill" options={mapOptions} /> */}
                      </div>
                      <div className="grid gap-0 xl:gap-4 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-2 mt-2">
                        <div className="col-span-4 xs:col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 border-r-0 xs:border-r border-dashed dark:border-slate-700 border-b md:border-b-0 xl:border-b-0">
                          <div className="p-4 text-center">
                            <p className="my-1 font-semibold text-2xl inline-block relative dark:text-slate-300">
                              $15,520{" "}
                              <span className="w-1 h-1 rounded-full bg-pink-500 absolute top-0 right-0"></span>
                            </p>
                            <h6 className="uppercase text-slate-400 mt-2 text-xs font-semibold">
                              Domestic
                            </h6>
                          </div>
                        </div>
                        <div className="col-span-4 xs:col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1">
                          <div className="p-4 text-center">
                            <p className="my-1 font-semibold text-2xl inline-block relative dark:text-slate-300">
                              $36,880{" "}
                              <span className="w-1 h-1 rounded-full bg-blue-500 absolute top-0 right-0"></span>
                            </p>
                            <h6 className="uppercase text-slate-400 mt-2 text-xs font-semibold">
                              International
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col flex-auto p-4">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="bg-gray-50 dark:bg-slate-700/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Channel
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Sessions
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Prev.Period
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    % Change
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <a href="" className="text-blue-500">
                                      Organic search
                                    </a>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%{" "}
                                    <FaCaretUp className="text-green-500 text-base"/>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <a href="" className="text-blue-500">
                                      Direct
                                    </a>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%{" "}
                                    <FaCaretDown className="text-red-500 text-base"/>
                                    
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <a href="" className="text-blue-500">
                                      Referal
                                    </a>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%{" "}
                                    <FaCaretUp className="text-green-500 text-base"/>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <a href="" className="text-blue-500">
                                      Email
                                    </a>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%{" "}
                                    <FaCaretDown className="text-red-500 text-base"/>
                                  </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <a href="" className="text-blue-500">
                                      Social
                                    </a>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%{" "}
                                    <FaCaretUp className="text-green-500 text-base"/>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-1  md:col-span-2 lg:col-span-4 xl:col-span-1">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium dark:text-slate-300">
                        Active Users
                      </h4>
                    </div>
                    <div className="flex-auto p-4">
                      {/* <div id="Revenu_Status" className="apex-charts"></div>
                       */}
                      <ReactApexChart
                        options={Revenu_Status}
                        series={Revenu_Status?.series}
                        type="area"
                      />
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium dark:text-slate-300">
                        Browser Used By Users
                      </h4>
                    </div>
                    <div className="flex flex-col flex-auto p-4">
                      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block py-2 min-w-full sm:px-6 lg:px-8">
                          <div className="overflow-hidden">
                            <table className="min-w-full">
                              <thead className="bg-gray-50 dark:bg-slate-700/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Browser
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Sessions
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Bounce Rate
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Transactions
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src="assets/images/logos/chrome.png"
                                      alt=""
                                      className="mr-2 h-5 inline-block"
                                    />
                                    Chrome
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566{" "}
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src="assets/images/logos/in-explorer.png"
                                      alt=""
                                      className="mr-2 h-5 inline-block"
                                    />
                                    Explorer
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566{" "}
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src="assets/images/logos/safari.png"
                                      alt=""
                                      className="mr-2 h-5 inline-block"
                                    />
                                    Safari
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566{" "}
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src="assets/images/logos/mozilla.png"
                                      alt=""
                                      className="mr-2 h-5 inline-block"
                                    />
                                    Mozilla
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566{" "}
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src="assets/images/logos/opera.png"
                                      alt=""
                                      className="mr-2 h-5 inline-block"
                                    />
                                    Opera
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10853
                                    <small className="text-gray-400">
                                      (52%)
                                    </small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    52.80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    566{" "}
                                    <small className="text-gray-400">
                                      (92%)
                                    </small>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Users at a Time</h4>
                    </div>
                    <div className="flex-auto p-4">
                      {/* <div id="Users_Time" className="h-60 my-6"></div>
                       */}
                      {/* <HeatmapChart/> */}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Live Visits Our New Site</h4>
                    </div>
                    <div className="flex-auto p-4">
                      {/* <div id="visitors" className="h-60 my-6"> */}
                      {/* <ReactApexChart
                            options={Visitor.options}
                            series={Visitor.series}
                            type="bar"
                            height={200}
                          /> */}
                      <BarChart />
                      {/* </div> */}
                    </div>
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
    </>
  );
};

export default Analytics;
