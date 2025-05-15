/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import ReactApexChart from "react-apexcharts";
import IMG from "../../Images/users/avatar-2.jpg"
import IMG1 from "../../Images/users/avatar-8.jpg"
import IMG2 from "../../Images/users/avatar-9.jpg"
import IMG3 from "../../Images/users/avatar-1.jpg"
// import IMG4 from "../../Images/logos/mon.png"
import IMG4 from "../../Images/users/avatar-1.jpg"
import { RiCheckboxCircleLine } from "react-icons/ri";
import { FaChevronDown, FaRegTrashCan } from "react-icons/fa6";
import { BsCalendar4Event } from "react-icons/bs";
import { MdFormatListBulleted, MdOutlineTimerOff } from "react-icons/md";
import { VscComment } from "react-icons/vsc";
import { TbAlertTriangle, TbHeadset } from "react-icons/tb";
import { AiOutlineClockCircle } from "react-icons/ai";
import { HiOutlinePencil } from "react-icons/hi";
import { LiaUserClockSolid } from "react-icons/lia";
const Project = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
  const [activeTab, setActiveTab] = useState("Project-2");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  const OverView = {
    chart: {
      height: 225,
      type: "area",
      stacked: !0,
      toolbar: { show: !1, autoSelected: "zoom" },
    },
    colors: ["#2a77f4"],
    dataLabels: { enabled: !1 },
    stroke: {
      curve: "smooth",
      width: [2, 2],
      dashArray: [0, 4],
      lineCap: "round",
    },
    grid: {
      borderColor: "#45404a2e",
      padding: { left: 0, right: 0 },
      strokeDashArray: 3,
    },
    markers: { size: 0, hover: { size: 0 } },
    series: [
      {
        name: "Unique Visits",
        data: [10, 10, 50, 20, 70, 20, 80, 30, 75, 40, 60, 60],
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
      axisBorder: { show: !0, color: "#45404a2e" },
      axisTicks: { show: !0, color: "#45404a2e" },
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

  const TaskOption = {
    chart: {
      type: "radialBar",
      height: 295,
      dropShadow: {
        enabled: !0,
        top: 5,
        left: 0,
        bottom: 0,
        right: 0,
        blur: 5,
        color: "#45404a2e",
        opacity: 0.35,
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: -10,
        startAngle: 0,
        endAngle: 270,
        hollow: { margin: 5, size: "50%", background: "transparent" },
        track: { show: !1 },
        dataLabels: {
          name: { fontSize: "18px" },
          value: { fontSize: "16px", color: "#50649c" },
        },
      },
    },
    colors: ["#2a76f4", "rgba(42, 118, 244, .5)", "rgba(42, 118, 244, .18)"],
    stroke: { lineCap: "round" },
    series: [71, 63, 100],
    labels: ["Completed", "Active", "Assigned"],
    legend: {
      show: !0,
      floating: !0,
      position: "left",
      offsetX: -10,
      offsetY: 0,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: !0,
            floating: !0,
            position: "left",
            offsetX: 10,
            offsetY: 0,
          },
        },
      },
    ],
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
                            Project
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
                            <li className="text-gray-500">Dashboard</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Project
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
              <div className="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12  gap-4">
                <div className="md:row-span-1 lg:row-span-1 xl:row-span-2 sm:col-span-12 md:col-span-6 lg:col-span-5 xl:col-span-4 order-3 md:order-2 mb-4 md:mb-0">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Calendar</h4>
                    </div>
                    <div className="flex-auto p-0 lg:p-4">
                      <input type="hidden" id="light_datepicker" />
                    </div>
                  </div>
                  <div className="w-full relative rounded mt-4">
                    <div className="flex-auto p-0">
                      <div className="container mx-auto px-0 w-full overflow-hidden relative">
                        <div
                          className="carousel-items flex items-center justify-center"
                          style={{
                            width: "fit-content",
                            animation:
                              "carouselAnim 20s infinite alternate linear",
                          }}
                        >
                          <div className="carousel-focus  relative bg-white dark:bg-slate-800 w-[420px] px-4 py-3 mx-2 rounded-lg shadow">
                            <div className="flex flex-wrap content-between">
                              <div className="">
                                <div className="flex items-center">
                                  <img
                                    src="assets/images/logos/gas.png"
                                    alt=""
                                    className="mr-2 h-10 inline-block rounded-full"
                                  />
                                  <div className="self-center">
                                    <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                      Project Launch Date
                                    </h5>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                      Banking
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-0 lg:ml-auto self-center">
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  60 Days
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  01 Jun 2023
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="carousel-focus  relative bg-white w-[420px] dark:bg-slate-800 px-4 py-3 mx-2 rounded-lg shadow">
                            <div className="flex flex-wrap content-between">
                              <div className="">
                                <div className="flex items-center">
                                  <img
                                    src="assets/images/logos/btc.png"
                                    alt=""
                                    className="mr-2 h-10 inline-block rounded-full"
                                  />
                                  <div className="self-center">
                                    <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                      Project Launch Date
                                    </h5>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                      Crypto
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-0 lg:ml-auto self-center">
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  110 Days
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  15 Mar 2023
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="carousel-focus  relative bg-white w-[420px] dark:bg-slate-800 px-4 py-3 mx-2 rounded-lg shadow">
                            <div className="flex flex-wrap content-between">
                              <div className="">
                                <div className="flex items-center">
                                  <img
                                    src={IMG4}
                                    alt=""
                                    className="mr-2 h-10 inline-block rounded-full"
                                  />
                                  <div className="self-center">
                                    <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                      Project Launch Date
                                    </h5>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                                      Coin Exchange
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="ml-0 lg:ml-auto self-center">
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  90 Days
                                </p>
                                <p className="text-sm text-slate-700 dark:text-slate-400 font-medium">
                                  28 Fab 2023
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" sm:col-span-12 md:col-span-6 lg:col-span-7 xl:col-span-8 order-1 md:order-1">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full p-4 relative">
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-12 xl:grid-cols-12  gap-4">
                      <div className="sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3 pb-4 xl:pb-0 border-b xl:border-b-0 border-r-0 lg:border-r border-dashed dark:border-slate-700">
                        <div className="text-center">
                          <h3 className="my-1 font-semibold text-3xl dark:text-slate-200">
                            45
                          </h3>
                          <p className="text-gray-500 font-medium dark:text-slate-400">
                            Projects
                          </p>
                          <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                            <span className="text-green-500">
                              {/* <i className="mdi mdi-checkbox-marked-circle-outline mr-1"></i> */}
                              <RiCheckboxCircleLine className="mr-1"/>
                            </span>
                            26 Project Complete
                          </p>
                        </div>
                      </div>
                      <div className="sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3 pb-4 lg:pb-0 border-b xl:border-b-0 border-r-0 lg:border-r-0 xl:border-r border-dashed dark:border-slate-700">
                        <div className="text-center">
                          <h3 className="my-1 font-semibold text-3xl dark:text-slate-200">
                            240
                          </h3>
                          <p className="text-gray-500 font-medium dark:text-slate-400">
                            Tasks
                          </p>
                          <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                            <span className="bg-green-600/5 text-green-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                              Active
                            </span>
                            Weekly Avg.Sessions
                          </p>
                        </div>
                      </div>
                      <div className="sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3 pb-4 lg:pb-0 border-b lg:border-b-0 border-r-0 lg:border-r border-dashed dark:border-slate-700">
                        <div className="text-center">
                          <h3 className="my-1 font-semibold text-3xl dark:text-slate-200">
                            982:30
                          </h3>
                          <p className="text-gray-500 font-medium dark:text-slate-400">
                            Total Hours
                          </p>
                          <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                            01:33 / 9:30 Duration
                          </p>
                        </div>
                      </div>
                      <div className="sm:col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-3">
                        <div className="text-center">
                          <h3 className="my-1 font-semibold text-3xl dark:text-slate-200">
                            $35250
                          </h3>
                          <p className="text-gray-500 font-medium dark:text-slate-400">
                            Budget
                          </p>
                          <p className="truncate text-gray-400 dark:text-slate-500 text-sm font-normal">
                            $14k Total used budgets
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" sm:col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-8 mb-0 md:mb-4 order-2 md:order-3">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Overview</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="overview" className="apex-charts">
                        <ReactApexChart
                          options={OverView}
                          series={OverView?.series}
                          type="area"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-12 md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative h-full">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <div className="flex-none md:flex">
                        <h4 className="font-medium flex-1 self-center mb-2 md:mb-0">
                          Tasks Performance
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
                      <div id="task_status" className="apex-charts">
                        <ReactApexChart
                          options={TaskOption}
                          series={TaskOption?.series}
                          type="radialBar"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-9 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 dark:text-slate-300/70">
                      <ul
                        className="flex flex-wrap lg:-mb-px"
                        id="myTab"
                        role="tablist"
                      >
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                              activeTab === "Project-1"
                                ? "text-gray-500 border-b-2 border-transparent"
                                : "text-gray-400 dark:text-gray-400"
                            } rounded-t-lg ${
                              activeTab === "Project-1"
                                ? "border-b-gray-300"
                                : ""
                            } hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                            id="Project-1-tab"
                            onClick={() => handleTabClick("Project-1")}
                            aria-controls="Project-1"
                            aria-selected={activeTab === "Project-1"}
                            role="tab"
                          >
                            Project-1
                          </button>
                        </li>
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                              activeTab === "Project-2"
                                ? "text-gray-500 border-b-2 border-transparent"
                                : "text-gray-400 dark:text-gray-400"
                            } rounded-t-lg ${
                              activeTab === "Project-2"
                                ? "border-b-gray-300"
                                : ""
                            } hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                            id="Project-2-tab"
                            onClick={() => handleTabClick("Project-2")}
                            aria-controls="Project-2"
                            aria-selected={activeTab === "Project-2"}
                            role="tab"
                          >
                            Project-2
                          </button>
                        </li>
                        <li className="mr-2" role="presentation">
                          <button
                            className={`inline-block py-4 px-4 text-sm font-medium text-center ${
                              activeTab === "Project-3"
                                ? "text-gray-500 border-b-2 border-transparent"
                                : "text-gray-400 dark:text-gray-400"
                            } rounded-t-lg ${
                              activeTab === "Project-3"
                                ? "border-b-gray-300"
                                : ""
                            } hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
                            id="Project-3-tab"
                            onClick={() => handleTabClick("Project-3")}
                            aria-controls="Project-3"
                            aria-selected={activeTab === "Project-3"}
                            role="tab"
                          >
                            Project-3
                          </button>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-auto p-4">
                      <div id="myTabContent">
                      {activeTab === 'Project-1' &&(
                        <div
                          id="Project-1"
                          role="tabpanel"
                          aria-labelledby="Project-1-tab"
                        >
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="">
                              <div className="flex items-center">
                                <img
                                  src="assets/images/logos/btc.png"
                                  alt=""
                                  className="mr-2 h-10 inline-block rounded-full"
                                />
                                <div className="self-center">
                                  <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                    Crypto
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    <span className="text-slate-700 dark:text-slate-400">
                                      Client :
                                    </span>{" "}
                                    Hyman M. Cross
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Start :
                                </span>{" "}
                                15 Nov 2022
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Deadline :
                                </span>{" "}
                                28 Fab 2023
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <ul className="flex-none md:flex m-auto overflow-hidden p-0 relative text-left md:text-center z-1 pt-2">
                              <li before="1" className="step complete">
                                <span>Planing</span>
                              </li>
                              <li
                                before="2"
                                className="step step-inner complete "
                              >
                                <span>Design</span>
                              </li>
                              <li
                                before="3"
                                className="step step-inner continuous"
                              >
                                <span>Development</span>
                              </li>
                              <li before="4" className="step step-inner">
                                <span>Testing</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="mt-4">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  All Hours :
                                </span>{" "}
                                530 / 281:30
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form.
                              </p>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Today :
                                </span>{" "}
                                2:45{" "}
                                <span className="bg-pink-600/5 text-pink-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                  {/* <i className="ti ti-calendar"></i> */}
                                  <BsCalendar4Event />
                                   35 days
                                  left
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex justify-end">
                              <p className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                                72% Complete
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div className="h-1 bg-primary-500 rounded-full w-[72%]"></div>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex -space-x-4">
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG2}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG3}
                                alt=""
                              />
                              <a
                                className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                href="#"
                              >
                                +6
                              </a>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <ul className="inline mb-0 self-center">
                                <li className="inline-block me-2">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-[15px]"></i> */}
                                    <MdFormatListBulleted className="text-green-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      15/100
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-comment-outline text-primary-500 text-[15px]"></i> */}
                                    <VscComment className="text-primary-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      3
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="ms-2" href="#">
                                    {/* <i className="mdi mdi-pencil-outline text-slate-400 text-[18px]"></i> */}
                                    <HiOutlinePencil className="text-slate-400 text-[18px]"/>  
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-trash-can-outline text-slate-400 text-[18px]"></i> */}
                                    <FaRegTrashCan className="text-slate-400 text-[18px]"/>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex items-center">
                              {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                              <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                              <div className="self-center">
                                <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                  Last Meeting
                                </h5>
                                <p className="text-sm text-slate-500 font-medium">
                                  28 Oct 2023 / 10:30AM - 12:30PM
                                </p>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <div className="flex items-center">
                                {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                                <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                                <div className="self-center">
                                  <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                    Next Meeting
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    06 Nov 2023 / 10:30AM - 12:30PM
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === 'Project-2' && (
                        <div
                          id="Project-2"
                          role="tabpanel"
                          aria-labelledby="Project-2-tab"
                        >
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="">
                              <div className="flex items-center">
                                <img
                                  src="assets/images/logos/gas.png"
                                  alt=""
                                  className="mr-2 h-10 inline-block rounded-full"
                                />
                                <div className="self-center">
                                  <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                    Banking
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    <span className="text-slate-700 dark:text-slate-400">
                                      Client :
                                    </span>{" "}
                                    Hyman M. Cross
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Start :
                                </span>{" "}
                                15 Nov 2022
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Deadline :
                                </span>{" "}
                                28 Fab 2023
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <ul className="flex-none md:flex m-auto overflow-hidden p-0 relative text-left md:text-center z-1 pt-2">
                              <li before="1" className="step complete">
                                <span>Planing</span>
                              </li>
                              <li
                                before="2"
                                className="step step-inner continuous "
                              >
                                <span>Design</span>
                              </li>
                              <li before="3" className="step step-inner">
                                <span>Development</span>
                              </li>
                              <li before="4" className="step step-inner">
                                <span>Testing</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="mt-4">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  All Hours :
                                </span>{" "}
                                530 / 281:30
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form.
                              </p>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Today :
                                </span>{" "}
                                2:45{" "}
                                <span className="bg-pink-600/5 text-pink-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                  {/* <i className="ti ti-calendar"></i> */}
                                  <BsCalendar4Event />
                                   35 days
                                  left
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex justify-end">
                              <p className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                                30% Complete
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div className="h-1 bg-primary-500 w-[30%] rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex -space-x-4">
                            <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG2}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG3}
                                alt=""
                              />
                              <a
                                className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                href="#"
                              >
                                +6
                              </a>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <ul className="inline mb-0 self-center">
                                <li className="inline-block me-2">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-[15px]"></i> */}
                                    <MdFormatListBulleted className="text-green-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      15/100
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-comment-outline text-primary-500 text-[15px]"></i> */}
                                    <VscComment className="text-primary-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      3
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="ms-2" href="#">
                                    {/* <i className="mdi mdi-pencil-outline text-slate-400 text-[18px]"></i> */}
                                    <HiOutlinePencil className="text-slate-400 text-[18px]"/>  
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-trash-can-outline text-slate-400 text-[18px]"></i> */}
                                    <FaRegTrashCan className="text-slate-400 text-[18px]"/>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex items-center">
                              {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                              <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                              <div className="self-center">
                                <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                  Last Meeting
                                </h5>
                                <p className="text-sm text-slate-500 font-medium">
                                  28 Oct 2023 / 10:30AM - 12:30PM
                                </p>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <div className="flex items-center">
                                {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                                <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                                <div className="self-center">
                                  <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                    Next Meeting
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    06 Nov 2023 / 10:30AM - 12:30PM
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === 'Project-3' &&(
                        <div
                          id="Project-3"
                          role="tabpanel"
                          aria-labelledby="Project-3-tab"
                        >
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="">
                              <div className="flex items-center">
                                <img
                                  src={IMG4}
                                  alt=""
                                  className="mr-2 h-10 inline-block rounded-full"
                                />
                                <div className="self-center">
                                  <h5 className="text-base font-semibold text-slate-700 dark:text-gray-400">
                                    Coin Exchange
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    <span className="text-slate-700 dark:text-slate-400">
                                      Client :
                                    </span>{" "}
                                    Hyman M. Cross
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Start :
                                </span>{" "}
                                15 Nov 2022
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Deadline :
                                </span>{" "}
                                28 Fab 2023
                              </p>
                            </div>
                          </div>
                          <div className="">
                            <ul className="flex-none md:flex m-auto overflow-hidden p-0 relative text-left md:text-center z-1 pt-2">
                              <li before="1" className="step complete">
                                <span>Planing</span>
                              </li>
                              <li
                                before="2"
                                className="step step-inner complete"
                              >
                                <span>Design</span>
                              </li>
                              <li
                                before="3"
                                className="step step-inner complete"
                              >
                                <span>Development</span>
                              </li>
                              <li before="4" className="step step-inner finish">
                                <span>Testing</span>
                              </li>
                            </ul>
                          </div>
                          <div className="flex flex-wrap content-between mb-5">
                            <div className="mt-4">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  All Hours :
                                </span>{" "}
                                530 / 281:30
                              </p>
                              <p className="text-sm text-slate-500 font-medium">
                                There are many variations of passages of Lorem
                                Ipsum available, but the majority have suffered
                                alteration in some form.
                              </p>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <p className="text-sm text-slate-500 font-medium">
                                <span className="text-slate-700 dark:text-slate-400">
                                  Today :
                                </span>{" "}
                                2:45{" "}
                                <span className="bg-pink-600/5 text-pink-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                  {/* <i className="ti ti-calendar"></i>  */}
                                  <BsCalendar4Event />
                                  35 days
                                  left
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="w-full">
                            <div className="flex justify-end">
                              <p className="text-sm font-semibold text-slate-500 dark:text-gray-400">
                                100% Complete
                              </p>
                            </div>
                            <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                              <div className="h-1 bg-primary-500 w-[100%] rounded-full"></div>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex -space-x-4">
                            <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG2}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG1}
                                alt=""
                              />
                              <img
                                className="w-10 h-10 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                src={IMG3}
                                alt=""
                              />
                              <a
                                className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                href="#"
                              >
                                +6
                              </a>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <ul className="inline mb-0 self-center">
                                <li className="inline-block me-2">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-[15px]"></i> */}
                                    <MdFormatListBulleted className="text-green-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      15/100
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-comment-outline text-primary-500 text-[15px]"></i> */}
                                    <VscComment className="text-primary-500 text-[15px]"/>
                                    <span className="text-slate-400 font-semibold">
                                      3
                                    </span>
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="ms-2" href="#">
                                    {/* <i className="mdi mdi-pencil-outline text-slate-400 text-[18px]"></i> */}
                                    <HiOutlinePencil className="text-slate-400 text-[18px]"/>  
                                  </a>
                                </li>
                                <li className="inline-block">
                                  <a className="" href="#">
                                    {/* <i className="mdi mdi-trash-can-outline text-slate-400 text-[18px]"></i> */}
                                    <FaRegTrashCan className="text-slate-400 text-[18px]"/>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-wrap content-between mt-4">
                            <div className="flex items-center">
                              {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                              <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                              <div className="self-center">
                                <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                  Last Meeting
                                </h5>
                                <p className="text-sm text-slate-500 font-medium">
                                  28 Oct 2023 / 10:30AM - 12:30PM
                                </p>
                              </div>
                            </div>
                            <div className="ml-0 lg:ml-auto self-center">
                              <div className="flex items-center">
                                {/* <i className="ti ti-headset mr-2 text-3xl inline-block text-slate-400"></i> */}
                                <TbHeadset className="mr-2 text-3xl inline-block text-slate-400"/>
                                <div className="self-center">
                                  <h5 className="text-sm font-medium text-slate-700 dark:text-gray-400">
                                    Next Meeting
                                  </h5>
                                  <p className="text-sm text-slate-500 font-medium">
                                    06 Nov 2023 / 10:30AM - 12:30PM
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
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
                          <div className=" ">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-gray-600/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Project Name
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Start Date
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    Deadline
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
                                    Progress
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/logos/gas.png"
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Banking
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          - Kevin J. Heal{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    20/03/2022
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    05/05/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-green-600/5 text-green-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Active
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          90%{" "}
                                          <small className="">Complate</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div className="h-1 bg-slate-400 w-[90%] rounded-full"></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src={IMG4}
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Transfer Money
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          - Frank M. Lyons{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10/03/2022
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    15/06/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Panding
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          40%{" "}
                                          <small className="">Complate</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div className="h-1 bg-slate-400 w-[40%] rounded-full"></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/logos/dollar.png"
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Payment App
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          - Hyman M. Cross{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    01/11/2022
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    15/08/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-green-600/5 text-green-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Active
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          55%{" "}
                                          <small className="">Complate</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div className="h-1 bg-slate-400 w-[55%] rounded-full"></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="bg-white border-b border-dashed dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/logos/btc.png"
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Crypto Exchange
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          - Angelo E. Butler{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    20/01/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    10/04/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Panding
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          25%{" "}
                                          <small className="">Complate</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div className="h-1 bg-slate-400 w-[25%] rounded-full"></div>
                                      </div>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="bg-white  dark:bg-gray-800 ">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <div className="flex items-center">
                                      <img
                                        src="assets/images/logos/dash.png"
                                        alt=""
                                        className="mr-2 h-8 inline-block"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          Ecommerce App
                                        </h5>
                                        <span className="block  font-normal text-slate-500">
                                          {" "}
                                          - Robert C. Golding{" "}
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    01/07/2022
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    05/05/2023
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <span className="bg-red-600/5 text-red-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                      Complate
                                    </span>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="w-full">
                                      <div className="flex justify-end">
                                        <p className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                          100%{" "}
                                          <small className="">Complate</small>
                                        </p>
                                      </div>
                                      <div className="w-full h-1 relative bg-gray-200 dark:bg-slate-600/30 rounded-full">
                                        <div className="h-1 bg-green-500 w-[100%] rounded-full"></div>
                                      </div>
                                    </div>
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
              </div>
              <Footer />
            </div>
          </div>
        </div>
    </>
  );
};

export default Project;
