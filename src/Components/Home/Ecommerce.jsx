/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import IMG from "../../Images//widgets/wallet-dark.png";
// import IMG1 from "../../Images/widgets/wallet-light.png"
import IMG2 from "../../Images/flags/us_flag.jpg";
import IMG3 from "../../Images/flags/french_flag.jpg";
import IMG4 from "../../Images/flags/spain_flag.jpg";
import IMG5 from "../../Images/flags/germany_flag.jpg";
import IMG6 from "../../Images/products/01.png";
import IMG7 from "../../Images/products/02.png";
import IMG8 from "../../Images/products/03.png";
import IMG9 from "../../Images/products/04.png";
import ReactApexChart from "react-apexcharts";
import { BsCalendar4Event } from "react-icons/bs";
import { TbChartArrowsVertical, TbShoppingCart } from "react-icons/tb";
import { FaChevronDown } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import { HiOutlineCash } from "react-icons/hi";
const Ecommerce = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
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
  const RevenuOption = {
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
        offsetX: -12,
        offsetY: 0,
        formatter: function (o) {
          return "$" + o;
        },
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

  const ConversionOption = {
    series: [
      {
        name: "Inflation",
        data: [2.3, 3.1, 4, 10.1, 4, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    chart: { height: 300, type: "bar", toolbar: { show: !1 } },
    plotOptions: { bar: { borderRadius: 10, dataLabels: { position: "top" } } },
    colors: ["#394766"],
    dataLabels: {
      enabled: !0,
      formatter: function (o) {
        return o + "%";
      },
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#304758"] },
    },
    xaxis: {
      categories: [
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
      position: "top",
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: !0 },
    },
    yaxis: {
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      labels: {
        show: !1,
        formatter: function (o) {
          return o + "%";
        },
      },
    },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      strokeDashArray: 2.5,
    },
  };

  const colors = ["#55b18f", "#367de4", "#f1a760", "#109ae7"];
  const CategoriesOption = {
    chart: {
      height: 250,
      type: "bar",
      toolbar: { show: !1 },
      dropShadow: {
        enabled: !0,
        top: 0,
        left: 5,
        bottom: 5,
        right: 0,
        blur: 5,
        color: "#45404a2e",
        opacity: 0.35,
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        dataLabels: { position: "top" },
        columnWidth: "30",
        distributed: !0,
      },
    },
    dataLabels: {
      enabled: !0,
      formatter: function (o) {
        return o + "%";
      },
      offsetY: -20,
      style: { fontSize: "12px", colors: ["#8997bd"] },
    },
    series: [{ name: "Inflation", data: [4, 10.1, 6, 9.1] }],
    xaxis: {
      categories: ["Electronics", "Fashion", "Furniture", "Toys"],
      position: "top",
      labels: { offsetY: 0, style: { cssClass: "apexcharts-xaxis-label" } },
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: !0, offsetY: -37 },
    },
    fill: {
      gradient: {
        type: "gradient",
        gradientToColors: [
          "#FEB019",
          "#775DD0",
          "#FEB019",
          "#FF4560",
          "#775DD0",
        ],
      },
    },
    yaxis: {
      axisBorder: { show: !1 },
      axisTicks: { show: !1 },
      labels: {
        show: !1,
        formatter: function (o) {
          return o + "%";
        },
      },
    },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      strokeDashArray: 2.5,
    },
  };

  const DeviceOption = {
    chart: { height: 270, type: "donut" },
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
        formatter: function (o) {
          return o + " %";
        },
      },
    },
  };
  return (
    <>
      <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Navbar isVisible={isVisible} setIsVisible={setIsVisible} isDark={isDark} setIsDark={setIsDark}/>
        <div className="flex flex-1 ">
          <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
            <div className="xl:w-full">
              <div className="flex flex-wrap">
                <div className="flex items-center py-4 w-full">
                  <div className="w-full">
                    <div className="">
                      <div className="flex flex-wrap justify-between">
                        <div className="items-center ">
                          <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                            Ecommerce
                          </h1>
                          <ol className="list-reset flex text-sm">
                            <li>
                              <a href="#" className="text-gray-500">
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
                              Ecommerce
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
                <div className="md:row-span-1 lg:row-span-1 xl:row-span-2 md:col-span-2 lg:col-span-2 xl:col-span-1  ">
                  <div className="h-full bg-white dark:bg-slate-800 shadow rounded-md w-full p-4 relative overflow-hidden grid md:gap-4 lg:gap-2 xl:gap-4 md:grid-cols-1 lg:grid-cols-4">
                    <div className="md:col-span-4 lg:col-span-2 xl:col-span-4 self-center">
                      <h3 className="text-slate-800 dark:text-slate-200 text-center xl:text-lg font-semibold pb-2 md:pb-2 lg:pb-1 xl:pb-2">
                        Total Revenue
                      </h3>
                      <h3 className="text-slate-800 dark:text-slate-200 text-center text-[26px] md:text-[26px] lg:text-[26px] xl:text-[30px] font-bold leading-8 py-2 md:py-2 lg:py-1 xl:py-2">
                        <span className="inline-block xl:block">
                          $50,445.00
                        </span>
                      </h3>

                      <div className="text-center text-slate-400 text-base md:text-base lg:text-sm xl:text-base font-medium py-3">
                        We Design and Develop Clean and High Quality Web
                        Applications
                      </div>
                      <div className="text-center py-3 md:mb-0 lg:mb-0 xl:mb-3">
                        <button className="px-3 py-2 lg:px-4 bg-slate-700 text-white text-sm font-normal lg:font-normal xl:font-semibold rounded hover:bg-slate-800">
                          Withdrawal
                        </button>
                      </div>
                    </div>
                    <div className="md:col-span-4 lg:col-span-2 xl:col-span-4 block dark:hidden self-center">
                      <img
                        src={IMG}
                        alt=""
                        className="px-3 mb-2 w-60 mx-auto "
                      />
                    </div>
                    <div className="md:col-span-4 lg:col-span-2 xl:col-span-4 hidden dark:block self-center">
                      {/* <img
                        src={IMG1}
                        alt=""
                        className="px-3 mb-2 w-60 mx-auto"
                      /> */}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-3 md:col-span-2 lg:col-span-2 xl:col-span-3">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative overflow-hidden  bg-no-repeat bg-contain">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="absolute -left-6 -top-4 text-slate-400 dark:text-slate-500 p-3 text-center inline-flex items-center justify-center w-32 h-32 ">
                            {/* <i className="ti ti-calendar text-4xl"></i> */}
                            <BsCalendar4Event className="text-4xl"/>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              $24,500
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Weekly Sales
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative overflow-hidden bg-no-repeat bg-contain">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="absolute -left-6 -top-4 text-slate-400 dark:text-slate-500 p-3 text-center inline-flex items-center justify-center w-32 h-32 ">
                            {/* <i className="ti ti-shopping-cart text-4xl"></i> */}
                            <TbShoppingCart className="text-4xl"/>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              535
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Orders Placed
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative overflow-hidden  bg-no-repeat bg-contain">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="absolute -left-6 -top-4 text-slate-400 dark:text-slate-500 p-3 text-center inline-flex items-center justify-center w-32 h-32 ">
                            {/* <i className="ti ti-cash text-4xl"></i> */}
                            <HiOutlineCash className="text-4xl"/>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              82.8%
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Conversion Rate
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-1">
                      <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full p-4 relative overflow-hidden bg-no-repeat bg-contain">
                        <div className="flex justify-between xl:gap-x-2 items-cente">
                          <div className="absolute -left-6 -top-4 text-slate-400 dark:text-slate-500 p-3 text-center inline-flex items-center justify-center w-32 h-32 ">
                            {/* <i className="ti ti-chart-arrows-vertical text-4xl"></i> */}
                            <TbChartArrowsVertical className="text-4xl"/>
                          </div>
                          <div className="self-center ml-auto">
                            <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              $80.5
                            </h3>
                            <p className="text-gray-400 mb-0 font-medium">
                              Avg. Value
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:col-span-4 lg:col-span-4 xl:col-span-3">
                  <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                        <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                          <div className="flex-none md:flex">
                            <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                              Revenu Status
                            </h4>
                            <div className="dropdown inline-block">
                              <button
                                data-dropdown-toggle="dropdown"
                                className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                              >
                                This Month
                                {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                                <FaChevronDown className="text-xs ml-2"/> 
                              </button>

                              <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownDefault"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Today
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Last Week
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Last Month
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      This Year
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-auto p-4">
                          <div className="chart-container">
                            <div
                              id="Revenu_Status"
                              className="apex-charts  bg-contain bg-no-repeat bg-center"
                            >
                              <ReactApexChart
                                options={RevenuOption}
                                series={RevenuOption?.series}
                                type="area"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2 lg:col-span-2 xl:col-span-2">
                      <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                        <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                          <div className="flex-none md:flex">
                            <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                              Conversion Rate
                            </h4>
                            <div className="dropdown inline-block">
                              <button
                                data-dropdown-toggle="dropdown"
                                className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                type="button"
                              >
                                This Month
                                {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                                <FaChevronDown className="text-xs ml-2"/> 

                              </button>

                              <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                <ul
                                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                  aria-labelledby="dropdownDefault"
                                >
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Today
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Last Week
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      Last Month
                                    </a>
                                  </li>
                                  <li>
                                    <a
                                      href="#"
                                      className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                    >
                                      This Year
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex-auto p-4">
                          <div className="chart-container">
                            <div id="products_sold" className="">
                              <ReactApexChart
                                options={ConversionOption}
                                series={ConversionOption?.series}
                                type="bar"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-6 lg:col-span-6 xl:col-span-3 order-1 md:order-1 lg:order-1 xl:order-1">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Categories Reports
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2"/> 

                          </button>

                          <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefault"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Today
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Week
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Month
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  This Year
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div id="barchart" className="apex-charts">
                        <ReactApexChart
                          options={CategoriesOption}
                          series={CategoriesOption?.series}
                          type="bar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-6 order-3 md:order-3 lg:order-3 xl:order-2">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Earnings Reports
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2"/> 

                          </button>

                          <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefault"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Today
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Week
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Month
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  This Year
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                        <div className="sm:col-span-12  md:col-span-8 lg:col-span-8 xl:col-span-9">
                          <div id="map_1" className="w-full h-60"></div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-3 self-center">
                          <div className="w-full mb-6">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-slate-400 leading-none text-left pb-1">
                                <img src={IMG2} alt="" className="h-3" />
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-none text-right pb-1">
                                $19,054.00
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div
                                className="h-1 bg-slate-400 w-[84%] rounded-full"
                                // style="width: 84%"
                              ></div>
                            </div>
                          </div>
                          <div className="w-full mb-6">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-slate-400 leading-none text-left pb-1">
                                <img src={IMG3} alt="" className="h-3" />
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-none text-right pb-1">
                                $10,124.00
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div
                                className="h-1 bg-slate-400 w-[66%] rounded-full"
                                // style="width: 66%"
                              ></div>
                            </div>
                          </div>
                          <div className="w-full mb-6">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-slate-400 leading-none text-left pb-1">
                                <img src={IMG5} alt="" className="h-3" />
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-none text-right pb-1">
                                $6,954.00
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div
                                className="h-1 bg-slate-400 w-[45%] rounded-full"
                                // style="width: 45%"
                              ></div>
                            </div>
                          </div>
                          <div className="w-full mb-6">
                            <div className="flex justify-between">
                              <p className="text-sm font-semibold text-slate-400 leading-none text-left pb-1">
                                <img src={IMG4} alt="" className="h-3" />
                              </p>
                              <p className="text-sm font-semibold text-slate-400 leading-none text-right pb-1">
                                $3,054.00
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div
                                className="h-1 bg-slate-40 w-[30%] rounded-full"
                                // style="width: 30%"
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-6 lg:col-span-6 xl:col-span-3 order-2 md:order-2 lg:order-2 xl:order-3">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Device Reports
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2"/> 

                          </button>

                          <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefault"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Today
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Week
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Month
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  This Year
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div id="eco_device" className="apex-charts">
                        <ReactApexChart
                          options={DeviceOption}
                          series={DeviceOption?.series}
                          type="donut"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Earnings Reports
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2"/> 

                          </button>

                          <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                            <ul
                              className="py-1 text-sm text-gray-700 dark:text-gray-200"
                              aria-labelledby="dropdownDefault"
                            >
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Today
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Week
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Last Month
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  This Year
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 p-4">
                      <div className="sm:-mx-6 lg:-mx-8">
                        <div className="relative scroll-inner block w-full sm:px-6 lg:px-8">
                          <table className="min-w-full">
                            <thead className="bg-gray-50 dark:bg-gray-600/20">
                              <tr>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Date
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Item Counts
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Tax
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Earning
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  03 March
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  50
                                </td>
                                <td className="p-3 text-sm text-red-500 whitespace-nowrap dark:text-red-400">
                                  -$40
                                </td>
                                <td className="p-3 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-400">
                                  $15,500.00
                                </td>
                              </tr>

                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  04 March
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  120
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  -
                                </td>
                                <td className="p-3 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-400">
                                  $20,900.00
                                </td>
                              </tr>

                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  05 March
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  90
                                </td>
                                <td className="p-3 text-sm text-red-500 whitespace-nowrap dark:text-red-400">
                                  -$20
                                </td>
                                <td className="p-3 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-400">
                                  $10,500.00
                                </td>
                              </tr>

                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  06 March
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  160
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  -
                                </td>
                                <td className="p-3 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-400">
                                  $35,000.00
                                </td>
                              </tr>

                              <tr className="bg-white dark:bg-gray-800">
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  07 March
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  80
                                </td>
                                <td className="p-3 text-sm text-red-500 whitespace-nowrap dark:text-red-400">
                                  -$60
                                </td>
                                <td className="p-3 text-sm font-medium text-gray-600 whitespace-nowrap dark:text-gray-400">
                                  $18,880.00
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Most Populer Products</h4>
                    </div>
                    <div className="grid grid-cols-1 p-4 overflow-hidden">
                      <div className="sm:-mx-6 lg:-mx-8">
                        <div className="relative scroll-inner block w-full sm:px-6 lg:px-8">
                          <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-600/20">
                              <tr>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Product
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Price
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Sell
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Status
                                </th>
                                <th
                                  scope="col"
                                  className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                >
                                  Action
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                  <img
                                    src={IMG6}
                                    alt=""
                                    className="mr-2 h-5 inline-block"
                                  />
                                  Disploy Camera EDM 5D(White)
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  $50 <del className="text-gray-400">$90</del>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  450
                                  <small className="text-gray-400">(500)</small>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <span className="focus:outline-none text-[12px] bg-green-600/10 text-green-700 dark:text-green-600 rounded font-medium py-1 px-2">
                                    Stock
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <a href="#">
                                    <FiEdit className="text-lg text-gray-500 dark:text-gray-400"/>
                                    
                                  </a>
                                  <a href="#">
                                    <LuTrash2 className="text-lg text-red-500 dark:text-red-400"/>

                                  </a>
                                </td>
                              </tr>

                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                  <img
                                    src={IMG7}
                                    alt=""
                                    className="mr-2 h-5 inline-block"
                                  />
                                  Disploy Shoes Max-Zon
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  $49 <del className="text-gray-400">$88</del>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  850
                                  <small className="text-gray-400">(900)</small>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <span className="focus:outline-none text-[12px] bg-green-600/10 text-green-700 dark:text-green-600 rounded font-medium py-1 px-2">
                                    Stock
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <a href="#">
                                    <FiEdit className="text-lg text-gray-500 dark:text-gray-400"/>
                                  </a>
                                  <a href="#">
                                    <LuTrash2 className="text-lg text-red-500 dark:text-red-400"/>
                                  </a>
                                </td>
                              </tr>

                              <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                  <img
                                    src={IMG8}
                                    alt=""
                                    className="mr-2 h-5 inline-block"
                                  />
                                  Disploy VR 5D (Black)
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  $39 <del className="text-gray-400">$99</del>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  700
                                  <small className="text-gray-400">(700)</small>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <span className="focus:outline-none text-[12px] bg-red-500/10 text-red-700 dark:text-red-400 rounded font-medium py-1 px-2">
                                    Sold
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <a href="#">
                                    <FiEdit className="text-lg text-gray-500 dark:text-gray-400"/>
                                  </a>
                                  <a href="#">
                                    <LuTrash2 className="text-lg text-red-500 dark:text-red-400"/>
                                  </a>
                                </td>
                              </tr>

                              <tr className="bg-white dark:bg-gray-800">
                                <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                  <img
                                    src={IMG9}
                                    alt=""
                                    className="mr-2 h-5 inline-block"
                                  />
                                  Disploy Mask N99 [ISI]
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  $5 <del className="text-gray-400">$9</del>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  1850
                                  <small className="text-gray-400">
                                    (2000)
                                  </small>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <span className="focus:outline-none text-[12px] bg-green-600/10 text-green-700 dark:text-green-600 rounded font-medium py-1 px-2">
                                    Stock
                                  </span>
                                </td>
                                <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                  <a href="#">
                                    <FiEdit className="text-lg text-gray-500 dark:text-gray-400"/>
                                  </a>
                                  <a href="#">
                                    <LuTrash2 className="text-lg text-red-500 dark:text-red-400"/>
                                  </a>
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
              <Footer />
            </div>
          </div>
        </div>
    </>
  );
};

export default Ecommerce;
