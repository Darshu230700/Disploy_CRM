/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Footer from "../Common/Footer";
import IMG from "../../Images/users/avatar-7.jpg";
import IMG1 from "../../Images/users/avatar-8.jpg";
import IMG2 from "../../Images/users/avatar-1.jpg";
import IMG3 from "../../Images/users/avatar-2.jpg";
import IMG4 from "../../Images/users/avatar-3.jpg";
import IMG5 from "../../Images/users/avatar-4.jpg";
import IMG6 from "../../Images/users/avatar-5.jpg";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import { FaArrowRight, FaCheck, FaChevronDown, FaPlay } from "react-icons/fa6";
import { FiEdit, FiFacebook, FiPhone, FiTwitter } from "react-icons/fi";
import { BsCalendar4Event } from "react-icons/bs";
import { LiaUserClockSolid } from "react-icons/lia";
import { MdOutlineTimerOff } from "react-icons/md";
import { TbAlertTriangle } from "react-icons/tb";
import { LuTrash2 } from "react-icons/lu";
import { AiOutlineClockCircle } from "react-icons/ai";
import ReactApexChart from "react-apexcharts";
const CRM = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
  var CRMDashboard = {
    chart: {
      height: 335,
      type: "area",
      width: "100%",
      stacked: !0,
      toolbar: { show: !1, autoSelected: "zoom" },
    },
    colors: ["#2a77f4", "#a5c2f1"],
    dataLabels: { enabled: !1 },
    stroke: {
      curve: "smooth",
      width: [1.5, 1.5],
      dashArray: [0, 4],
      lineCap: "round",
    },
    grid: { padding: { left: 0, right: 0 }, strokeDashArray: 3 },
    markers: { size: 0, hover: { size: 0 } },
    series: [
      {
        name: "New Visits",
        data: [0, 60, 20, 90, 45, 110, 55, 130, 44, 110, 75, 120],
      },
      {
        name: "Unique Visits",
        data: [0, 45, 10, 75, 35, 94, 40, 115, 30, 105, 65, 110],
      },
    ],
    xaxis: {
      type: "month",
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
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.3,
        stops: [0, 90, 100],
      },
    },
    tooltip: { x: { format: "dd/MM/yy HH:mm" } },
    legend: { position: "top", horizontalAlign: "right" },
  };

  const EmailReport = {
    chart: { height: 205, type: "donut" },
    plotOptions: { pie: { donut: { size: "85%" } } },
    dataLabels: { enabled: !1 },
    stroke: { show: !0, width: 2, colors: ["transparent"] },
    series: [10, 65, 25],
    legend: {
      show: !1,
      position: "bottom",
      horizontalAlign: "center",
      verticalAlign: "middle",
      floating: !1,
      fontSize: "14px",
      offsetX: 0,
      offsetY: 5,
    },
    labels: ["Sent", "Opened", "Not Opened"],
    colors: ["#fdb5c8", "#2a76f4", "#67c8ff"],
    responsive: [
      {
        breakpoint: 600,
        options: {
          plotOptions: { donut: { customScale: 0.2 } },
          chart: { height: 200 },
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
                            CRM Dashboard
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
                            <li className="text-gray-500">Pages</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              CRM Dashboard
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
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Leads And Vendors
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2" />
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
                    <div className="flex-auto p-4 relative">
                      <div className="flex items-center relative md:absolute">
                        <div className="">
                          {/* <i className="la la-phone self-center text-4xl text-slate-400"></i> */}
                          <FiPhone className="self-center text-4xl text-slate-400" />
                        </div>
                        <div className="ml-2">
                          <h5 className="dark:text-slate-200 font-medium text-base">
                            76% Deals Successfull{" "}
                            {/* <i className="fas fa-check text-green-500"></i> */}
                            <FaCheck className="text-green-500" />
                          </h5>
                          <p
                            tabindex="0"
                            className="focus:outline-none text-gray-500 dark:text-gray-400 text-xs font-medium"
                          >
                            This is a simple hero unit, a simple jumbotron-style
                            component.
                          </p>
                        </div>
                      </div>
                      <div id="crm-dash" className="apex-charts mt-5">
                        <ReactApexChart
                          options={CRMDashboard}
                          series={CRMDashboard?.series}
                          type="area"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative ">
                      <div className="flex-auto p-4 text-center">
                        <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                          64k
                        </h4>
                        <h6 className="text-gray-400 mb-0 font-medium uppercase">
                          Happy Customers
                        </h6>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative ">
                      <div className="flex-auto p-4 text-center">
                        <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                          10k
                        </h4>
                        <h6 className="text-gray-400 mb-0 font-medium uppercase">
                          New Customers
                        </h6>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative ">
                      <div className="flex-auto p-4 text-center">
                        <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                          720
                        </h4>
                        <h6 className="text-gray-400 mb-0 font-medium uppercase">
                          New Deals
                        </h6>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative ">
                      <div className="flex-auto p-4 text-center">
                        <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                          964
                        </h4>
                        <h6 className="text-gray-400 mb-0 font-medium uppercase">
                          New Register
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                        <h4 className="font-medium">Monthly Trends</h4>
                      </div>
                      <div className="flex-auto p-4">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-6">
                            <div id="email_report" className="apex-charts">
                              <ReactApexChart
                                options={EmailReport}
                                series={EmailReport?.series}
                                type="donut"
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-6 self-center">
                            <ol className="list-none list-inside mb-3">
                              <li className="mb-1 text-slate-700 dark:text-slate-400 text-sm">
                                {/* <i className="fas fa-play mr-2 text-primary-500"></i>{" "} */}
                                <FaPlay className="mr-2 text-primary-500" />
                                Sent
                              </li>
                              <li className="mb-1 text-slate-700 dark:text-slate-400 text-sm">
                                {/* <i className="fas fa-play mr-2 text-sky-400"></i>{" "} */}
                                <FaPlay className="mr-2 text-sky-400" />
                                Opened
                              </li>
                              <li className="mb-1 text-slate-700 dark:text-slate-400 text-sm">
                                <FaPlay className="mr-2 text-[#fdb5c8]" />
                                {/* <i className="fas fa-play mr-2 text-[#fdb5c8]"></i>{" "} */}
                                Not Opened
                              </li>
                            </ol>
                            <button
                              type="button"
                              className="inline-block focus:outline-none text-slate-600 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-400 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                            >
                              View Details
                              <FaArrowRight />
                            </button>
                          </div>
                        </div>
                        <h6 className="bg-slate-50 dark:bg-slate-700/40 py-3 px-2 mb-0 rounded-md  text-center text-slate-500 font-medium mt-3">
                          {/* <i className="ti ti-calendar self-center text-lg mr-1"></i> */}
                          <BsCalendar4Event className="self-center text-lg mr-1" />
                          01 January 2022 to 31 December 2022
                        </h6>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                      <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                        <h4 className="font-medium">Social Report</h4>
                      </div>
                      <div className="flex-auto p-4">
                        <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 text-center">
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 border-b lg:border-b-0 pb-3 lg:pb-0  border-r-0 md:border-r-0 lg:border-r border-dashed dark:border-slate-700">
                            <span className="inline-flex  justify-center items-center h-14 w-14 rounded-full bg-blue-500/10 ">
                              {/* <i className="ti ti-brand-facebook text-blue-500 text-3xl"></i> */}
                              <FiFacebook className="text-blue-500 text-3xl" />
                            </span>
                            <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              186k
                            </h4>
                            <h6 className="text-gray-400 mb-0 font-medium uppercase">
                              Followers
                            </h6>
                          </div>
                          <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 self-center">
                            <span className="inline-flex  justify-center items-center h-14 w-14 rounded-full bg-sky-500/10 ">
                              {/* <i className="ti ti-brand-twitter text-sky-400 text-3xl"></i> */}
                              <FiTwitter className="text-sky-400 text-3xl" />
                            </span>
                            <h4 className="my-1 font-semibold text-2xl dark:text-slate-200">
                              106k
                            </h4>
                            <h6 className="text-gray-400 mb-0 font-medium uppercase">
                              Followers
                            </h6>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
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
                            {/* <i className="fas fa-chevron-down text-xs ml-2"></i> */}
                            <FaChevronDown className="text-xs ml-2" />
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
                    <div className="flex-auto p-4 h-[355px]" data-simplebar>
                      <div className="flex my-1 relative min-h-[60px] before:absolute before:bottom-0 before:top-[38px] before:left-[16px] before:border-l-2 before:border-slate-200 dark:before:border-slate-700 before:border-dotted">
                        <div className="">
                          {/* <i className="las la-user-clock bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]"></i> */}
                          <LiaUserClockSolid className="bg-primary-600/5 text-primary-500 border-white dark:border-slate-800 border-solid border-2 rounded-full flex items-center justify-center h-8 text-lg ml-px w-8 shadow-[0_0_1px_0.25px_rgba(0,0,0,0.6)] dark:shadow-[0_0_1px_0.25px_rgba(225,225,225,0.7)]" />
                        </div>
                        <div className="ml-4 w-full">
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-400  w-3/4">
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
                            src={IMG}
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
                            src={IMG1}
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
                          Leads Report
                        </h4>
                        <div className="dropdown inline-block">
                          <button
                            data-dropdown-toggle="dropdown"
                            className="dropdown-toggle px-3 py-1 text-xs font-medium text-gray-500 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-50 hover:text-slate-800 focus:z-10   dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            type="button"
                          >
                            This Month
                            <i className="fas fa-chevron-down text-xs ml-2"></i>
                            <FaChevronDown className="text-xs ml-2" />
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
                                    Lead
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Email
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Phone No
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Company
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
                                      src={IMG2}
                                      alt=""
                                      className="mr-2 h-8 rounded-full inline-block"
                                    />
                                    Donald Gardner
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    xyx@gmail.com
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    +123456789
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    Starbucks coffee
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-indigo-600/5 text-indigo-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      New Lead
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      {/* <i className="ti ti-edit text-lg text-gray-500 dark:text-gray-400"></i> */}
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      {/* <i className="ti ti-trash text-lg text-red-500 dark:text-red-400"></i> */}
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src={IMG6}
                                      alt=""
                                      className="mr-2 h-8 rounded-full inline-block"
                                    />
                                    Matt Rosales
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    xyx@gmail.com
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    +123456789
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    Starbucks coffee
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-indigo-600/5 text-indigo-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      New Lead
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      {/* <i className="ti ti-edit text-lg text-gray-500 dark:text-gray-400"></i> */}
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      {/* <i className="ti ti-trash text-lg text-red-500 dark:text-red-400"></i> */}
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src={IMG5}
                                      alt=""
                                      className="mr-2 h-8 rounded-full inline-block"
                                    />
                                    Michael Hill
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    xyx@gmail.com
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    +123456789
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    Starbucks coffee
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-red-600/5 text-red-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Lost
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      {/* <i className="ti ti-edit text-lg text-gray-500 dark:text-gray-400"></i> */}
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      {/* <i className="ti ti-trash text-lg text-red-500 dark:text-red-400"></i> */}
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src={IMG4}
                                      alt=""
                                      className="mr-2 h-8 rounded-full inline-block"
                                    />
                                    Nancy Flanary
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    xyx@gmail.com
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    +123456789
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    Starbucks coffee
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-sky-600/5 text-sky-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Follow Up
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      {/* <i className="ti ti-edit text-lg text-gray-500 dark:text-gray-400"></i> */}
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      {/* <i className="ti ti-trash text-lg text-red-500 dark:text-red-400"></i> */}
                                      <LuTrash2 className="text-lg text-red-500 dark:text-red-400" />
                                    </a>
                                  </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <img
                                      src={IMG3}
                                      alt=""
                                      className="mr-2 h-8 rounded-full inline-block"
                                    />
                                    Dorothy Key
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    xyx@gmail.com
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    +123456789
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    Starbucks coffee
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-green-600/5 text-green-600 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Converted
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <a href="#">
                                      {/* <i className="ti ti-edit text-lg text-gray-500 dark:text-gray-400"></i> */}
                                      <FiEdit className="text-lg text-gray-500 dark:text-gray-400" />
                                    </a>
                                    <a href="#">
                                      {/* <i className="ti ti-trash text-lg text-red-500 dark:text-red-400"></i> */}
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

export default CRM;
