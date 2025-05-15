/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { LiaUserClockSolid } from "react-icons/lia";
import { MdOutlineTimerOff } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { TbAlertTriangle } from "react-icons/tb";
import { BsCalendar4Event } from "react-icons/bs";
import { FiEdit, FiPhone } from "react-icons/fi";
import { LuTrash2 } from "react-icons/lu";
import ReactApexChart from "react-apexcharts";
import { FaChevronDown, FaRegClock } from "react-icons/fa6";

const Helpdesk = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
  const CustomerOption = {
    chart: { height: 275, type: "donut" },
    plotOptions: { pie: { donut: { size: "70%" } } },
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
    labels: ["Excellent", "Very Good", "Good"],
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
        formatter: function (e) {
          return e + " %";
        },
      },
    },
  };

  const TicketOption = {
    chart: { height: 300, type: "bar", toolbar: { show: !1 } },
    plotOptions: {
      bar: { horizontal: !1, endingShape: "rounded", columnWidth: "25%" },
    },
    dataLabels: { enabled: !1 },
    stroke: { show: !0, width: 2, colors: ["transparent"] },
    colors: ["#2c77f4", "rgba(42, 118, 244, .5)"],
    series: [
      {
        name: "New Tickets",
        data: [68, 44, 55, 57, 56, 61, 58, 63, 60, 66, 70, 75],
      },
      {
        name: "Solved Tickets",
        data: [51, 76, 85, 101, 98, 87, 105, 91, 114, 94, 72, 84],
      },
    ],
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
      axisBorder: { show: !0 },
      axisTicks: { show: !0 },
    },
    legend: { offsetY: 0 },
    yaxis: { title: { text: "Tickets" } },
    fill: { opacity: 1 },
    grid: {
      row: { colors: ["transparent", "transparent"], opacity: 0.2 },
      padding: { left: 0, right: 0 },
      strokeDashArray: 3,
    },
    tooltip: {
      y: {
        formatter: function (e) {
          return "" + e;
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
                            Helpdesk
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
                              Helpdesk
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
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className=" sm:col-span-12 md:col-span-4 lg:col-span-4 xl:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4">
                      <div className="grid-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                          <div className="p-4">
                            <h3 className="my-1 font-semibold text-[30px] dark:text-slate-200">
                              155
                            </h3>
                            <p className="text-gray-600 font-semibold dark:text-slate-400">
                              New Tickets
                            </p>
                            <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <div id="dash_spark_1" className="mt-5"></div>
                        </div>
                      </div>
                      <div className="grid-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                          <div className="p-4">
                            <h3 className="my-1 font-semibold text-[30px] dark:text-slate-200">
                              105
                            </h3>
                            <p className="text-gray-600 font-semibold dark:text-slate-400">
                              Open Tickets
                            </p>
                            <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <div id="dash_spark_2" className="mt-5"></div>
                        </div>
                      </div>
                      <div className="grid-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                          <div className="p-4">
                            <h3 className="my-1 font-semibold text-[30px] dark:text-slate-200">
                              12
                            </h3>
                            <p className="text-gray-600 font-semibold dark:text-slate-400">
                              On Hold
                            </p>
                            <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <div id="dash_spark_4" className="mt-5"></div>
                        </div>
                      </div>
                      <div className="grid-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                        <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                          <div className="p-4">
                            <h3 className="my-1 font-semibold text-[30px] dark:text-slate-200">
                              75
                            </h3>
                            <p className="text-gray-600 font-semibold dark:text-slate-400">
                              Unassigned
                            </p>
                            <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry.
                            </p>
                          </div>
                          <div id="dash_spark_3" className="mt-5"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Customer Satisfaction</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="ana_device" className="apex-charts">
                        <ReactApexChart
                          options={CustomerOption}
                          series={CustomerOption?.series}
                          type="donut"
                        />
                      </div>
                      <h6 className="bg-slate-50 dark:bg-slate-800 py-3 px-2 mb-0 rounded-md  text-center text-slate-500 font-medium mt-3">
                        {/* <i className="ti ti-calendar self-center text-lg mr-1"></i> */}
                        <BsCalendar4Event className="self-center text-lg mr-1" />
                        01 January 2023 to 31 December 2023
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-6 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="flex-auto p-4">
                      <span className="flex  justify-center items-center w-12 h-12 bg-slate-100 rounded-full dark:bg-slate-700/40">
                        {/* <i className="ti ti-phone text-slate-800 dark:text-slate-400 text-3xl"></i> */}
                        <FiPhone className="text-slate-800 dark:text-slate-400 text-3xl"/>  
                      </span>
                      <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                        00<span className="text-sm text-slate-500">m</span>
                        <span>:</span>27
                        <span className="text-sm text-slate-500">s</span>
                      </h3>
                      <p className="text-gray-600 font-semibold dark:text-slate-400">
                        Avg.Speed of answer
                      </p>
                      <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                        It is a long established fact that a reader.
                      </p>
                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full mt-4">
                        <div className="h-1 bg-slate-400 rounded-full w-[45%]"></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto p-4">
                      <span className="flex  justify-center items-center w-12 h-12 bg-slate-100 rounded-full dark:bg-slate-700/40">
                        {/* <i className="ti ti-clock text-slate-800 dark:text-slate-400 text-3xl"></i> */}
                        <FaRegClock className="text-slate-800 dark:text-slate-400 text-3xl"/>
                      </span>
                      <h3 className="my-1 font-semibold text-2xl dark:text-slate-200">
                        04<span className="text-sm text-slate-500">m</span>
                        <span>:</span>30
                        <span className="text-sm text-slate-500">s</span>
                      </h3>
                      <p className="text-gray-600 font-semibold dark:text-slate-400">
                        Time to Resolved Complaint
                      </p>
                      <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                        It is a long established fact that a reader.
                      </p>
                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full mt-4">
                        <div className="h-1 bg-slate-400 rounded-full w-[45%]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Tickets Status
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
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
                      <div id="ana_dash_1" className="apex-charts">
                      <ReactApexChart
                          options={TicketOption}
                          series={TicketOption?.series}
                          type="bar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Support Status
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
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
                      <h2 className="text-3xl font-medium mb-4 dark:text-slate-300">
                        1530{" "}
                        <span className="text-slate-500 text-sm">Tickets</span>
                      </h2>
                      <div className="w-full mx-auto mb-2">
                        <div className="flex items-center">
                          <div className="w-1/4 bg-blue-500 h-2 rounded-tl rounded-bl mr-0.5"></div>
                          <div className="w-1/4 bg-gray-200 dark:bg-slate-700 h-2 mr-0.5 relative">
                            <div className="h-2 bg-yellow-500"></div>
                          </div>
                          <div className="w-1/4 bg-gray-200 dark:bg-slate-700 h-2 mr-0.5 relative">
                            <div className="h-2 w-1/2 bg-pink-500"></div>
                          </div>
                          <div className="w-1/4 bg-gray-200 dark:bg-slate-700 h-2 rounded-tr rounded-br"></div>
                        </div>
                      </div>
                      <div className="sm:-mx-6 lg:-mx-8">
                        <div className="relative scroll-inner block w-full sm:px-6 lg:px-8">
                          <div className=" ">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-gray-600/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Status
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-right text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    % Change
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                    <span className="w-1 h-1 rounded-full bg-blue-500 relative inline-block self-center mr-2"></span>{" "}
                                    Open Tickets
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <span className="focus:outline-none text-[12px] bg-blue-500/10 text-blue-700 dark:text-blue-600 rounded font-medium py-1 px-2">
                                      +6.8
                                    </span>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                    <span className="w-1 h-1 rounded-full bg-yellow-500 relative inline-block self-center mr-2"></span>{" "}
                                    Resolved Tickets
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <span className="focus:outline-none text-[12px] bg-yellow-500/10 text-yellow-700 dark:text-yellow-600 rounded font-medium py-1 px-2">
                                      +4.5
                                    </span>
                                  </td>
                                </tr>

                                <tr className="bg-white dark:bg-gray-800">
                                  <td className="p-3 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center">
                                    <span className="w-1 h-1 rounded-full bg-pink-500 relative inline-block self-center mr-2"></span>{" "}
                                    Unresolved Tickets
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400 text-right">
                                    <span className="focus:outline-none text-[12px] bg-pink-600/10 text-pink-700 dark:text-pink-600 rounded font-medium py-1 px-2">
                                      -1.2
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <button className="px-3 py-2 lg:px-4 bg-blue-500/5 collapse:bg-green-100 text-primary-500 text-sm font-semibold rounded hover:bg-blue-600 hover:text-white w-full mt-4">
                              Create New Ticket
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-5 xl:col-span-4 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Activity
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            All
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
                                  Purchases
                                </a>
                              </li>
                              <li>
                                <a
                                  href="#"
                                  className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                  Emails
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-auto p-4 h-[395px]" data-simplebar>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          {/* <i className="las la-user-clock bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]"></i> */}
                          <LiaUserClockSolid className="bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]" />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Donald
                              </span>
                              updated the status of{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Refund #1234
                              </a>{" "}
                              to awaiting customer response
                            </p>
                            <small className="text-slate-400 text-xs">
                              10 Min ago
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          {/* <i className="mdi mdi-timer-off bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]"></i> */}
                          <MdOutlineTimerOff className="bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]" />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Lucy Peterson
                              </span>
                              was added to the group, group name is{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Overtake
                              </a>
                            </p>
                            <small className="text-slate-400 text-xs">
                              50 Min ago
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          <img
                            src="assets/images/users/avatar-7.jpg"
                            alt=""
                            className="rounded-full h-8 w-8 flex items-center justify-center ml-px"
                          />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Joseph Rust
                              </span>
                              opened new showcase{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Mannat #112233
                              </a>{" "}
                              with theme market
                            </p>
                            <small className="text-slate-400 text-xs">
                              01h ago
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          {/* <i className="mdi mdi-clock-outline bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]"></i> */}
                          <AiOutlineClockCircle className="bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]" />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Donald
                              </span>
                              updated the status of{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Refund #1234
                              </a>{" "}
                              to awaiting customer response
                            </p>
                            <small className="text-slate-400 text-xs">
                              yesterday
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          {/* <i className="mdi mdi-alert-outline bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]"></i> */}
                          <TbAlertTriangle className="bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]" />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Lucy Peterson
                              </span>
                              was added to the group, group name is{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Overtake
                              </a>
                            </p>
                            <small className="text-slate-400 text-xs">
                              14 Nov 2022
                            </small>
                          </div>
                        </div>
                      </div>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          <img
                            src="assets/images/users/avatar-8.jpg"
                            alt=""
                            className="rounded-full h-8 w-8 flex items-center justify-center ml-px"
                          />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400 w-3/4">
                              <span className="text-slate-600 dark:text-slate-300">
                                Joseph Rust
                              </span>
                              opened new showcase{" "}
                              <a
                                href=""
                                className="text-slate-600 dark:text-slate-300"
                              >
                                Mannat #112233
                              </a>{" "}
                              with theme market
                            </p>
                            <small className="text-slate-400 text-xs">
                              15 Nov 2022
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-7 xl:col-span-8 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative overflow-x-hidden">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Agent Performance
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
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
                          <div className=" ">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-gray-600/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Agent
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Total Calls
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Calls Answered
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Avg.Speed of answer
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Adherence %
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
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/users/avatar-1.jpg"
                                        alt=""
                                        className="mr-2 h-8 inline-block rounded"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Donald Gardner
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          Dummy text of the printing.{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    38
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    32
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    3:12s
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    80%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/users/avatar-2.jpg"
                                        alt=""
                                        className="mr-2 h-8 inline-block rounded"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Nicholas Smith
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          Dummy text of the printing.
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    50
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    45
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    2:45s
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    84%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/users/avatar-3.jpg"
                                        alt=""
                                        className="mr-2 h-8 inline-block rounded"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Paula Anderson
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          Dummy text of the printing.{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    32
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    24
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    4:15s
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    73%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/users/avatar-4.jpg"
                                        alt=""
                                        className="mr-2 h-8 inline-block rounded"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Lucy Peterson
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          Dummy text of the printing.
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    25
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    21
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    5:42s
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    93%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>

                                <tr className="bg-white  dark:bg-gray-800 ">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/users/avatar-5.jpg"
                                        alt=""
                                        className="mr-2 h-8 inline-block rounded"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Joseph Rust
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          Dummy text of the printing.{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    50
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    45
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    2:45s
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    84%
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
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
              </div>
              <Footer />
            </div>
          </div>
        </div>
    </>
  );
};

export default Helpdesk;
