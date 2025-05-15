/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import {
  FaArrowRight,
  FaCheck,
  FaComment,
  FaEllipsisVertical,
  FaHeart,
  FaMinus,
  FaRegCalendar,
  FaRegCircle,
  FaRegClock,
  FaRegFlag,
  FaRegImage,
  FaRegStar,
  FaRegTrashCan,
  FaShareNodes,
} from "react-icons/fa6";
import { HiOutlinePencil } from "react-icons/hi";
import IMG from "../../Images/users/avatar-2.jpg";
import IMG1 from "../../Images/users/avatar-8.jpg";
import IMG2 from "../../Images/users/avatar-9.jpg";
import IMG3 from "../../Images/users/avatar-1.jpg";
import IMG4 from "../../Images/users/avatar-6.jpg";
import IMG5 from "../../Images/users/avatar-5.jpg";
import IMG6 from "../../Images/users/avatar-3.jpg";
import IMG7 from "../../Images/users/avatar-7.jpg";
import IMG8 from "../../Images/users/avatar-4.jpg";
import IMG9 from "../../Images/widgets/bg-p.png";
import facebook from "../../Images/logos/facebook.png";
import Instagram from "../../Images/logos/insta.png";
import twitter from "../../Images/logos/twitter.png";
import Post2 from "../../Images/widgets/post-2.jpg";
import Post1 from "../../Images/widgets/post-1.jpg";
import Post3 from "../../Images/widgets/post-3.jpg";

import {
  IoCameraOutline,
  IoGiftOutline,
  IoVideocamSharp,
} from "react-icons/io5";
import { TbLanguageHiragana, TbShieldCheckered } from "react-icons/tb";
import { MdOutlineComment, MdOutlineFormatListBulleted } from "react-icons/md";

const Profile = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen,isDark, setIsDark }) => {
  const [activeTab, setActiveTab] = useState("Posts");

  // Function to handle tab clicks
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };
  return (
    <>
        <Sidebar
          isVisible={isVisible}
          setIsVisible={setIsVisible}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
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
                            Profile
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
                              Profile
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
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto p-0">
                      <img
                        src={IMG9}
                        alt=""
                        className="bg-cover bg-center h-48 w-fit rounded-md clip-path-bottom"
                      />
                    </div>
                    <div className="flex-auto p-4 pt-0">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                          <div className="flex items-center relative -mt-[74px]">
                            <div className="w-36 h-36 relative">
                              <img
                                src={IMG8}
                                alt=""
                                className="rounded-full border-[8px] border-white dark:border-slate-800"
                              />
                              <span className="absolute cursor-pointer w-7 h-7 bg-green-600 rounded-full bottom-4 right-3 flex items-center justify-center border-2 border-white dark:border-slate-800">
                                {/* <i className="fas fa-camera text-white text-xs"></i> */}
                                <IoCameraOutline className="text-white text-xs" />
                              </span>
                            </div>
                            <div className="self-end ml-3">
                              <h5 className="text-xl  md:text-[28px] font-semibold sm:text-white md:text-slate-700 dark:text-gray-300 mb-0 md:mb-2">
                                Rosa Dodson
                              </h5>
                              <p className="block text-xs lg:text-base  font-medium text-slate-500">
                                UI/UX Designer, USA
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 self-center flex mt-5">
                          <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                            <div className="col-span-6  md:col-span-3 lg:col-span-3 xl:col-span-3 ">
                              <div className="border-2 border-slate-200/50 dark:border-slate-600/60 inline-flex rounded-full cursor-pointer">
                                <img
                                  src={facebook}
                                  alt=""
                                  className="rounded-full h-9 w-9"
                                />
                                <span className="self-center px-2 font-medium dark:text-slate-400">
                                  Facebook
                                </span>
                              </div>
                            </div>
                            <div className="col-span-6  md:col-span-3 lg:col-span-3 xl:col-span-3 ">
                              <div className="border-2 border-slate-200/50 dark:border-slate-600/60 inline-flex rounded-full cursor-pointer ml-0 md:ml-1">
                                <img
                                  src={Instagram}
                                  alt=""
                                  className="rounded-full h-9 w-9"
                                />
                                <span className="self-center px-2 font-medium dark:text-slate-400">
                                  instagram
                                </span>
                              </div>
                            </div>
                            <div className="col-span-6  md:col-span-3 lg:col-span-3 xl:col-span-3 ">
                              <div className="border-2 border-slate-200/50 dark:border-slate-600/60 inline-flex rounded-full cursor-pointer ml-0 md:ml-1">
                                <img
                                  src={twitter}
                                  alt=""
                                  className="rounded-full h-9 w-9"
                                />
                                <span className="self-center px-2 font-medium dark:text-slate-400">
                                  Twitter
                                </span>
                              </div>
                            </div>
                            <div className="col-span-6  md:col-span-3 lg:col-span-3 xl:col-span-3 ">
                              <button className="px-3 py-2 lg:px-6 bg-blue-500 collapse:bg-green-100 text-white text-sm font-semibold rounded-full hover:bg-blue-600 ml-0 md:ml-1">
                                Follow
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 ">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                  <div className="w-full relative overflow-hidden">
                    <div className="p-0 xl:p-4">
                      <div className="mb-4 border-b border-dashed border-gray-200 dark:border-gray-700 flex flex-wrap justify-start lg:justify-between">
                        <ul
                          className="flex flex-wrap mb-5 lg:-mb-px"
                          id="myTab"
                          data-tabs-toggle="#myTabContent"
                        >
                          <li className="mr-2" role="presentation">
                            <button
                              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent ${
                                activeTab !== "Groups"
                                  ? "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 dark:border-gray-700"
                                  : "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500"
                              }`}
                              id="Groups-tab"
                              data-tabs-target="#Groups"
                              type="button"
                              role="tab"
                              aria-controls="Groups"
                              aria-selected={activeTab === "Groups"}
                              onClick={() => handleTabClick("Groups")}
                            >
                              Groups
                            </button>
                          </li>
                          <li className="mr-2" role="presentation">
                            <button
                              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent ${
                                activeTab !== "Projects"
                                  ? "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 dark:border-gray-700"
                                  : "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500"
                              }`}
                              id="Projects-tab"
                              data-tabs-target="#Projects"
                              type="button"
                              role="tab"
                              aria-controls="Projects"
                              aria-selected={activeTab === "Projects"}
                              onClick={() => handleTabClick("Projects")}
                            >
                              Projects
                            </button>
                          </li>
                          <li className="mr-2" role="presentation">
                            <button
                              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent ${
                                activeTab !== "Posts"
                                  ? "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 dark:border-gray-700"
                                  : "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500"
                              }`}
                              id="Posts-tab"
                              data-tabs-target="#Posts"
                              type="button"
                              role="tab"
                              aria-controls="Posts"
                              aria-selected={activeTab === "Posts"}
                              onClick={() => handleTabClick("Posts")}
                            >
                              Posts
                            </button>
                          </li>
                          <li role="presentation">
                            <button
                              className={`inline-block py-4 px-4 text-sm font-medium text-center rounded-t-lg border-b-2 border-transparent ${
                                activeTab !== "Settings"
                                  ? "text-gray-500 hover:text-gray-600 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 border-gray-100 dark:border-gray-700"
                                  : "text-blue-600 hover:text-blue-600 dark:text-blue-500 dark:hover:text-blue-400 border-blue-600 dark:border-blue-500"
                              }`}
                              id="Settings-tab"
                              data-tabs-target="#Settings"
                              type="button"
                              role="tab"
                              aria-controls="Settings"
                              aria-selected={activeTab === "Settings"}
                              onClick={() => handleTabClick("Settings")}
                            >
                              Settings
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="flex-auto p-4">
                      <h5 className="text-lg font-medium text-slate-700 dark:text-slate-300 mb-3">
                        About <FaMinus className="text-primary-500" />
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                        It is a long established fact that a reader will be
                        distracted by the readable content of a page when
                        looking at its layout.
                      </p>
                      <ul className="list-none">
                        <li className="mb-2">
                          {/* <i className="ti ti-gift text-xl text-slate-400 mr-2"></i> */}
                          <IoGiftOutline className="text-xl text-slate-400 mr-2" />
                          <span className="text-slate-500 text-sm">
                            06 June 1989
                          </span>
                        </li>
                        <li className="mb-2">
                          {/* <i className="ti ti-language-hiragana text-xl text-slate-400 mr-2"></i> */}
                          <TbLanguageHiragana className="text-xl text-slate-400 mr-2" />
                          <span className="text-slate-500 text-sm">
                            English, French, German
                          </span>
                        </li>
                        <li className="mb-2">
                          {/* <i className="ti ti-flag text-xl text-slate-400 mr-2"></i> */}
                          <FaRegFlag className="text-xl text-slate-400 mr-2" />
                          <span className="text-slate-500 text-sm">USA</span>
                        </li>
                        <li className="mb-2">
                          {/* <i className="ti ti-shield-checkered text-xl text-slate-400 mr-2"></i>\ */}
                          <TbShieldCheckered className="text-xl text-slate-400 mr-2" />
                          <span className="text-slate-500 text-sm">
                            Music, Reading, journey
                          </span>
                        </li>
                      </ul>
                      <h5 className="text-lg font-medium text-slate-700 dark:text-slate-300 my-3">
                        Skill <FaMinus className="text-primary-500" />
                      </h5>
                      <div className="">
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          Javascript
                        </span>
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          Python
                        </span>
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          React
                        </span>
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          Angular
                        </span>
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          Nodejs
                        </span>
                        <span className="inline-block  text-slate-600  hover:text-primary-500 bg-transparent border border-gray-200  dark:text-slate-400  dark:border-gray-700 mb-1   text-sm font-medium py-0.5 px-3 rounded-full">
                          Flutter
                        </span>
                      </div>
                      <h5 className="text-lg font-medium text-slate-700 dark:text-slate-300 my-3">
                        Experience <FaMinus className="text-primary-500" />
                      </h5>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium ">
                        University of Oxford
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                        Research university in Oxford, England 2014-2015
                      </p>
                      <h5 className="text-lg font-medium text-slate-700 dark:text-slate-300 my-3">
                        Follow Report <FaMinus className="text-primary-500" />
                      </h5>
                      <div className="flex justify-between">
                        <a
                          href="#"
                          className="text-slate-700 hover:text-primary-500 font-medium underline underline-offset-4 decoration-slate-500 decoration-1"
                        >
                          Followers 6.3k
                        </a>
                        <a
                          href="#"
                          className="text-slate-700 hover:text-primary-500 font-medium underline underline-offset-4 decoration-slate-500 decoration-1"
                        >
                          Following 1.1k
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                  <div className="w-full relative overflow-hidden">
                    <div className="p-0">
                      <div id="myTabContent">
                        {activeTab === "Groups" && (
                          <div
                            id="Groups"
                            role="tabpanel"
                            aria-labelledby="Groups-tab"
                          >
                            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG2}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Joseph Rust{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          Software Engineer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +6
                                        </a>
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Following
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG8}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Betty Jenkins{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          React Developer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +8
                                        </a>
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-white hover:bg-primary-500 hover:text-white bg-primary-500 border border-primary-200 dark:bg-primary-500 dark:text-primary-500 dark:hover:text-white dark:border-primary-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Follow
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Rolando Paloso{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          Web Developer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-white hover:bg-primary-500 hover:text-white bg-primary-500 border border-primary-200 dark:bg-primary-500 dark:text-primary-500 dark:hover:text-white dark:border-primary-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Follow
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG6}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Arthur Mann{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          Python Developer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +1
                                        </a>
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Following
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG5}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Maricel Villalon{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          UI Developer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +3
                                        </a>
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Following
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="sm:col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="flex items-center mb-4">
                                      <img
                                        src={IMG7}
                                        alt=""
                                        className="mr-3 h-12 inline-block rounded-full"
                                      />
                                      <div className="self-center">
                                        <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                                          Nicolas Wright{" "}
                                          <span className="bg-yellow-600/5 text-yellow-500 text-[11px] font-medium px-2.5 py-0.5 rounded h-5">
                                            3.6 <FaRegStar />
                                          </span>
                                        </h5>
                                        <span className="text-slate-500 mr-2 text-sm">
                                          Designer
                                        </span>
                                      </div>
                                    </div>
                                    <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                      Lorem Ipsum is simply dummy text of the
                                      printing and typesetting industry.
                                    </p>
                                    <div className="flex flex-wrap content-between mt-4">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-8 h-8 border-2 hover:z-1 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-8 h-8 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +2
                                        </a>
                                      </div>
                                      <div className="ml-0 lg:ml-auto self-center">
                                        <button className="inline-block focus:outline-none text-slate-600 hover:bg-slate-100 hover:text-slate-700 bg-slate-50 border border-gray-50 dark:bg-slate-700 dark:text-slate-400 dark:hover:text-white dark:hover:border-slate-700/50 dark:border-gray-700 dark:hover:bg-slate-800  text-xs font-medium py-1 px-3 rounded">
                                          View Details <FaArrowRight />
                                        </button>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-4 gap-4 mt-4">
                                      <div className="col-span-4 md:col-span-2 lg:col-span-4 xl:col-span-4">
                                        <button className="inline-block focus:outline-none text-white hover:bg-primary-500 hover:text-white bg-primary-500 border border-primary-200 dark:bg-primary-500 dark:text-primary-500 dark:hover:text-white dark:border-primary-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Follow
                                        </button>
                                        <button className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-xs font-medium py-1 px-3 rounded">
                                          Send Email
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "Projects" && (
                          <div
                            id="Projects"
                            role="tabpanel"
                            aria-labelledby="Projects-tab"
                          >
                            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                              <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="absolute -top-2 -left-0">
                                      <FaRegCircle className="text-green-500 text-xs" />
                                    </div>
                                    <p className="text-slate-400 text-sm float-right">
                                      <span className="text-slate-400">
                                        01:33
                                      </span>{" "}
                                      /
                                      <span className="text-slate-400">
                                        9:30
                                      </span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        {/* <i className="far fa-fw fa-clock"></i>  */}
                                        <FaRegClock />
                                        June 06
                                      </span>
                                    </p>
                                    <h5 className="font-medium mt-0 dark:text-slate-200">
                                      Organic Farming
                                    </h5>
                                    <p className="text-slate-400 mb-1">
                                      There are many variations of passages of
                                      Lorem Ipsum available, but the majority
                                      have suffered alteration in some form.
                                    </p>
                                    <div className="my-3">
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          T-Wind
                                        </span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          45% Complete
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                                        <div className="bg-blue-500 h-1 w-[45%] rounded-full"></div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG6}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG5}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG7}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +9
                                        </a>
                                      </div>
                                      <ul className="mb-0 self-center">
                                        <li className="inline-block mr-2">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-base"></i> */}
                                            <MdOutlineFormatListBulleted className="text-green-500 text-base" />
                                            <span className="text-slate-400 font-medium">
                                              15/100
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-comment-outline text-primary text-base"></i> */}
                                            <MdOutlineComment className="text-primary text-base" />
                                            <span className="text-slate-400 font-medium">
                                              3
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="ml-2" href="#">
                                            {/* <i className="mdi mdi-pencil-outline text-slate-400 font-18"></i> */}
                                            <HiOutlinePencil className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-trash-can-outline text-slate-400 font-18"></i> */}
                                            <FaRegTrashCan className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="absolute -top-2 -left-0">
                                      {/* <i className="fas fa-circle text-slate-400 text-xs"></i> */}
                                      <FaRegCircle className="text-slate-400 text-xs" />
                                    </div>
                                    <p className="text-slate-400 text-sm float-right">
                                      <span className="text-slate-400">
                                        01:33
                                      </span>{" "}
                                      /
                                      <span className="text-slate-400">
                                        9:30
                                      </span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        <FaRegClock /> June 06
                                      </span>
                                    </p>
                                    <h5 className="font-medium mt-0 dark:text-slate-200">
                                      Transfer Money
                                    </h5>
                                    <p className="text-slate-400 mb-1">
                                      There are many variations of passages of
                                      Lorem Ipsum available, but the majority
                                      have suffered alteration in some form.
                                    </p>
                                    <div className="my-3">
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          T-Wind
                                        </span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          45% Complete
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                                        <div className="bg-blue-500 h-1 w-[45%] rounded-full"></div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG4}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG3}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG8}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +9
                                        </a>
                                      </div>
                                      <ul className="mb-0 self-center">
                                        <li className="inline-block mr-2">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-base"></i> */}
                                            <MdOutlineFormatListBulleted className="text-green-500 text-base" />
                                            <span className="text-slate-400 font-medium">
                                              15/100
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-comment-outline text-primary text-base"></i> */}
                                            <MdOutlineComment className="text-primary text-base" />
                                            <span className="text-slate-400 font-medium">
                                              3
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="ml-2" href="#">
                                            {/* <i className="mdi mdi-pencil-outline text-slate-400 font-18"></i> */}
                                            <HiOutlinePencil className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-trash-can-outline text-slate-400 font-18"></i> */}
                                            <FaRegTrashCan className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="absolute -top-2 -left-0">
                                      <FaRegCircle className="text-green-500 text-xs" />
                                    </div>
                                    <p className="text-slate-400 text-sm float-right">
                                      <span className="text-slate-400">
                                        01:33
                                      </span>{" "}
                                      /
                                      <span className="text-slate-400">
                                        9:30
                                      </span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        <FaRegClock />
                                        June 06
                                      </span>
                                    </p>
                                    <h5 className="font-medium mt-0 dark:text-slate-200">
                                      Mobile Account Setting
                                    </h5>
                                    <p className="text-slate-400 mb-1">
                                      There are many variations of passages of
                                      Lorem Ipsum available, but the majority
                                      have suffered alteration in some form.
                                    </p>
                                    <div className="my-3">
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          T-Wind
                                        </span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          45% Complete
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                                        <div className="bg-blue-500 h-1 w-[45%] rounded-full"></div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG6}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +9
                                        </a>
                                      </div>
                                      <ul className="mb-0 self-center">
                                        <li className="inline-block mr-2">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-base"></i> */}
                                            <MdOutlineFormatListBulleted className="text-green-500 text-base" />
                                            <span className="text-slate-400 font-medium">
                                              15/100
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-comment-outline text-primary text-base"></i> */}
                                            <MdOutlineComment className="text-primary text-base" />
                                            <span className="text-slate-400 font-medium">
                                              3
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="ml-2" href="#">
                                            {/* <i className="mdi mdi-pencil-outline text-slate-400 font-18"></i> */}
                                            <HiOutlinePencil className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-trash-can-outline text-slate-400 font-18"></i> */}
                                            <FaRegTrashCan className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                  <div className="flex-auto p-4">
                                    <div className="absolute -top-2 -left-0">
                                      {/* <i className="fas fa-circle text-red-500 text-xs"></i> */}
                                      <FaRegCircle className="text-red-500 text-xs" />
                                    </div>
                                    <p className="text-slate-400 text-sm float-right">
                                      <span className="text-slate-400">
                                        01:33
                                      </span>{" "}
                                      /
                                      <span className="text-slate-400">
                                        9:30
                                      </span>
                                      <span className="mx-1">·</span>
                                      <span>
                                        <FaRegClock />
                                        June 06
                                      </span>
                                    </p>
                                    <h5 className="font-medium mt-0 dark:text-slate-200">
                                      Book My World
                                    </h5>
                                    <p className="text-slate-400 mb-1">
                                      There are many variations of passages of
                                      Lorem Ipsum available, but the majority
                                      have suffered alteration in some form.
                                    </p>
                                    <div className="my-3">
                                      <div className="flex justify-between mb-1">
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          T-Wind
                                        </span>
                                        <span className="text-sm font-medium text-slate-700 dark:text-white">
                                          45% Complete
                                        </span>
                                      </div>
                                      <div className="w-full bg-gray-200 rounded-full h-1 dark:bg-gray-700">
                                        <div className="bg-blue-500 h-1 w-[45%] rounded-full"></div>
                                      </div>
                                    </div>
                                    <div className="flex justify-between">
                                      <div className="flex -space-x-4">
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG1}
                                          alt=""
                                        />
                                        <img
                                          className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                                          src={IMG2}
                                          alt=""
                                        />
                                        <a
                                          className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                                          href="#"
                                        >
                                          +9
                                        </a>
                                      </div>
                                      <ul className="mb-0 self-center">
                                        <li className="inline-block mr-2">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-format-list-bulleted text-green-500 text-base"></i> */}
                                            <MdOutlineFormatListBulleted className="text-green-500 text-base" />
                                            <span className="text-slate-400 font-medium">
                                              15/100
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-comment-outline text-primary text-base"></i> */}
                                            <MdOutlineComment className="text-primary text-base" />
                                            <span className="text-slate-400 font-medium">
                                              3
                                            </span>
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="ml-2" href="#">
                                            {/* <i className="mdi mdi-pencil-outline text-slate-400 font-18"></i> */}
                                            <HiOutlinePencil className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                        <li className="inline-block">
                                          <a className="" href="#">
                                            {/* <i className="mdi mdi-trash-can-outline text-slate-400 font-18"></i> */}
                                            <FaRegTrashCan className="text-slate-400 font-18" />
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {activeTab === "Posts" && (
                          <>
                            <div
                              id="Posts"
                              role="tabpanel"
                              aria-labelledby="Posts-tab"
                            >
                              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <div className="flex sm:items-center justify-between ">
                                    <div className="relative flex items-center space-x-2">
                                      <div className="relative">
                                        <span className="absolute text-green-500 right-0 bottom-0">
                                          <svg width="10" height="10">
                                            <circle
                                              cx="4"
                                              cy="4"
                                              r="4"
                                              fill="currentColor"
                                            ></circle>
                                          </svg>
                                        </span>
                                        <img
                                          src={IMG6}
                                          alt=""
                                          className="w-8 h-8  rounded-full"
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="text-sm mt-1 flex items-center font-medium">
                                          <span className="text-gray-700 mr-3 dark:text-slate-200">
                                            Anderson Vanhron
                                          </span>
                                        </div>
                                        <span className="text-xs text-gray-500 -mt-1">
                                          online
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <button
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                                      >
                                        {/* <i className="far fa-image"></i> */}
                                        <FaRegImage />
                                      </button>
                                      <button
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                                      >
                                        {/* <i className="fas fa-video"></i> */}
                                        <IoVideocamSharp />
                                      </button>
                                      <button
                                        type="button"
                                        className="inline-flex items-center justify-center h-10 w-10 transition duration-500 ease-in-out text-gray-400 hover:text-gray-500 focus:outline-none"
                                      >
                                        {/* <i className="far fa-calendar"></i> */}
                                        <FaRegCalendar />
                                      </button>

                                      <div className="dropdown inline-block relative">
                                        <button
                                          data-dropdown-toggle="dropdown"
                                          className="dropdown-toggle px-3 py-1 text-sm font-medium text-gray-400 focus:outline-none hover:text-slate-800 focus:z-10 dark:text-gray-400 dark:hover:text-white"
                                          type="button"
                                        >
                                          {/* <i className="fas fa-ellipsis-vertical dark:text-slate-400"></i> */}
                                          <FaEllipsisVertical className="dark:text-slate-400" />
                                        </button>

                                        <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                          <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDefault"
                                          >
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Profile
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Add to archive
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Delete
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 text-red-500"
                                              >
                                                Block
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-auto p-4">
                                  <form>
                                    <textarea
                                      id="post-text"
                                      rows="4"
                                      className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                      placeholder="Start a post"
                                    ></textarea>
                                    <button
                                      type="submit"
                                      className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                    >
                                      Post
                                    </button>
                                  </form>
                                </div>
                              </div>
                              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <div className="flex sm:items-center justify-between ">
                                    <div className="relative flex items-center space-x-2">
                                      <div className="relative">
                                        <img
                                          src={IMG6}
                                          alt=""
                                          className="w-8 h-8  rounded-full"
                                        />
                                      </div>
                                      <div className="flex flex-col">
                                        <div className="text-[14px] mt-1 flex items-center font-medium">
                                          <a
                                            href="#"
                                            className="text-gray-700 mr-3 dark:text-slate-200 mb-1 hover:text-primary-400"
                                          >
                                            Anderson Vanhron
                                          </a>
                                        </div>
                                        <span className="text-xs text-gray-500 -mt-1">
                                          Yesterday at 11.45 pm
                                        </span>
                                      </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <div className="dropdown inline-block relative">
                                        <button
                                          data-dropdown-toggle="dropdown"
                                          className="dropdown-toggle px-3 py-1 text-sm font-medium text-gray-400 focus:outline-none hover:text-slate-800 focus:z-10 dark:text-gray-400 dark:hover:text-white"
                                          type="button"
                                        >
                                          {/* <i className="fas fa-ellipsis-vertical dark:text-slate-400"></i> */}
                                          <FaEllipsisVertical className="dark:text-slate-400" />
                                        </button>

                                        <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                          <ul
                                            className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                            aria-labelledby="dropdownDefault"
                                          >
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Profile
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Add to archive
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                              >
                                                Delete
                                              </a>
                                            </li>
                                            <li>
                                              <a
                                                href="#"
                                                className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 text-red-500"
                                              >
                                                Block
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex-auto p-4">
                                  <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry.
                                  </p>
                                  <img src={Post2} alt="" className="mb-3" />
                                  <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70" />
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-red-500 focus:outline-none"
                                  >
                                    {/* <i className="fas fa-heart text-2xl mr-1"></i>{" "} */}
                                    <FaHeart className="text-2xl mr-1" />
                                    <span>4.5k</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-primary-500 focus:outline-none ml-5"
                                  >
                                    {/* <i className="fas fa-comment text-2xl mr-1"></i>{" "} */}
                                    <FaComment className="text-2xl mr-1" />
                                    <span>291</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-primary-500 focus:outline-none ml-5"
                                  >
                                    {/* <i className="fas fa-share-nodes text-2xl mr-1"></i>{" "} */}
                                    <FaShareNodes className="text-2xl mr-1" />
                                    <span>Share</span>
                                  </button>
                                </div>
                                <div className="flex mt-4">
                                  <img
                                    src={IMG3}
                                    alt=""
                                    className="mr-2 h-8 inline-block rounded"
                                  />
                                  <div className="">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      Donald Gardner
                                    </h5>
                                    <span className="block  font-normal text-slate-500">
                                      It is a long established fact that a
                                      reader will be distracted by the readable
                                      content of a page when looking at its
                                      layout.
                                    </span>
                                  </div>
                                </div>
                                <form action="" className="mt-4">
                                  <textarea
                                    id="message"
                                    rows="2"
                                    className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                    placeholder="Write a comment and press enter"
                                  ></textarea>
                                </form>
                              </div>
                            </div>
                            <div className="bg-slate-800 dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12">
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-4 xl:col-span-4 self-center">
                                  <img
                                    src={Post3}
                                    alt=""
                                    className="inline-block rounded-l-md"
                                  />
                                </div>
                                <div className="sm:col-span-12  md:col-span-12 lg:col-span-8 xl:col-span-8 self-center">
                                  <div className="flex-auto p-4">
                                    <a
                                      href="#"
                                      className="block mb-3 text-[16px] font-medium tracking-tight text-white dark:text-white"
                                    >
                                      Popular admin template you can use for
                                      your business.
                                    </a>
                                    <p className="font-normal text-slate-300 text-sm dark:text-slate-400">
                                      Some quick example text the bulk of the
                                      card's content. It is a long will be
                                      distracted by the readable content.
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white dark:bg-slate-800 p-4 cursor-pointer">
                                <span className="block text-slate-600 dark:text-slate-400">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.
                                </span>
                                <a href="#" className="block text-primary-500">
                                  www.xyz.exemple.com
                                </a>
                              </div>
                            </div>
                            <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                              <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                <div className="flex sm:items-center justify-between ">
                                  <div className="relative flex items-center space-x-2">
                                    <div className="relative">
                                      <img
                                        src={IMG6}
                                        alt=""
                                        className="w-8 h-8  rounded-full"
                                      />
                                    </div>
                                    <div className="flex flex-col">
                                      <div className="text-[14px] mt-1 flex items-center font-medium">
                                        <a
                                          href="#"
                                          className="text-gray-700 mr-3 dark:text-slate-200 mb-1 hover:text-primary-400"
                                        >
                                          Anderson Vanhron
                                        </a>
                                      </div>
                                      <span className="text-xs text-gray-500 -mt-1">
                                        Yesterday at 11.45 pm
                                      </span>
                                    </div>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <div className="dropdown inline-block relative">
                                      <button
                                        data-dropdown-toggle="dropdown"
                                        className="dropdown-toggle px-3 py-1 text-sm font-medium text-gray-400 focus:outline-none hover:text-slate-800 focus:z-10 dark:text-gray-400 dark:hover:text-white"
                                        type="button"
                                      >
                                        {/* <i className="fas fa-ellipsis-vertical dark:text-slate-400"></i> */}
                                        <FaEllipsisVertical className="dark:text-slate-400" />
                                      </button>

                                      <div className="dropdown-menu right-auto md:right-0 hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700">
                                        <ul
                                          className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                          aria-labelledby="dropdownDefault"
                                        >
                                          <li>
                                            <a
                                              href="#"
                                              className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                              Profile
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                              Add to archive
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white"
                                            >
                                              Delete
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              href="#"
                                              className="block py-2 px-4 hover:bg-gray-50 dark:hover:bg-gray-600 text-red-500"
                                            >
                                              Block
                                            </a>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex-auto p-4">
                                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium mb-5">
                                  Lorem Ipsum is simply dummy text of the
                                  printing and typesetting industry.
                                </p>
                                <img src={Post1} alt="" className="mb-3" />
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-red-500 focus:outline-none"
                                  >
                                    {/* <i className="fas fa-heart text-2xl mr-1"></i>{" "} */}
                                    <FaHeart className="text-2xl mr-1" />
                                    <span>4.5k</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-primary-500 focus:outline-none ml-5"
                                  >
                                    {/* <i className="fas fa-comment text-2xl mr-1"></i>{" "} */}
                                    <FaComment className="text-2xl mr-1" />
                                    <span>291</span>
                                  </button>
                                  <button
                                    type="button"
                                    className="inline-flex items-center justify-center font-medium  transition duration-500 ease-in-out text-slate-400 hover:text-primary-500 focus:outline-none ml-5"
                                  >
                                    {/* <i className="fas fa-share-nodes text-2xl mr-1"></i>{" "} */}
                                    <FaShareNodes className="text-2xl mr-1" />
                                    <span>Share</span>
                                  </button>
                                </div>
                                <div className="flex mt-4">
                                  <img
                                    src={IMG5}
                                    alt=""
                                    className="mr-2 h-8 inline-block rounded"
                                  />
                                  <div className="">
                                    <h5 className="text-sm font-semibold text-slate-700 dark:text-gray-400">
                                      Donald Gardner
                                    </h5>
                                    <span className="block  font-normal text-slate-500">
                                      It is a long established fact that a
                                      reader will be distracted by the readable
                                      content of a page when looking at its
                                      layout.
                                    </span>
                                  </div>
                                </div>
                                <form action="" className="mt-4">
                                  <textarea
                                    id="message"
                                    rows="2"
                                    className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                    placeholder="Write a comment and press enter"
                                  ></textarea>
                                </form>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                      {activeTab === "Settings" && (
                        <div
                          // className="hidden"
                          id="Settings"
                          role="tabpanel"
                          aria-labelledby="Settings-tab"
                        >
                          <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4">
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <h4 className="font-medium">
                                    Personal Information
                                  </h4>
                                </div>
                                <div className="flex-auto p-4">
                                  <form>
                                    <div className="grid md:grid-cols-12 lg:grid-cols-12">
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="First_Name"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          First Name
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9 mb-2">
                                        <input
                                          type="text"
                                          id="First_Name"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="Rosa"
                                          placeholder="First name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Last_Name"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Last Name
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="text"
                                          id="Last_Name"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="Dodson"
                                          placeholder="Last name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Company_Name"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Company Name
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="text"
                                          id="Company_Name"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="Example Themes"
                                          placeholder="Last name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Contact_Phone"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Contact Phone
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="text"
                                          id="Contact_Phone"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="+1 23456 7890"
                                          placeholder="Last name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Your_Email"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Your email
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="email"
                                          id="Your_Email"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="example@example.com"
                                          placeholder="Last name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Contact_Phone"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Website Link
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="text"
                                          id="Contact_Phone"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          value="https://mannatthemes.com/"
                                          placeholder="Last name"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="countries"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Countries
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <select
                                          id="countries"
                                          className=" w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-[6.5px] focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                        >
                                          <option>United States</option>
                                          <option>Canada</option>
                                          <option>France</option>
                                          <option>Germany</option>
                                        </select>
                                      </div>
                                      <div className=" col-start-4 col-end-13  mb-2">
                                        <button
                                          type="submit"
                                          className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                        >
                                          Submit
                                        </button>
                                        <button
                                          type="submit"
                                          className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                            </div>
                            <div className="col-span-12 md:col-span-12 lg:col-span-12 xl:col-span-12">
                              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <h4 className="font-medium">
                                    Change Password
                                  </h4>
                                </div>
                                <div className="flex-auto p-4">
                                  <form>
                                    <div className="grid md:grid-cols-12 lg:grid-cols-12">
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Current_Password"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Current Password
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9 mb-2">
                                        <input
                                          type="password"
                                          id="Current_Password"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          placeholder="Current Password"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="New_Password"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          New Password
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="password"
                                          id="New_Password"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          placeholder="New Password"
                                          required
                                        />
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-3 self-center text-right mr-2">
                                        <label
                                          for="Confirm_Password"
                                          className="font-medium text-sm text-slate-600 dark:text-slate-400"
                                        >
                                          Confirm Password
                                        </label>
                                      </div>
                                      <div className="col-span-12 md:col-span-12 lg:col-span-9  mb-2">
                                        <input
                                          type="password"
                                          id="Confirm_Password"
                                          className="form-input w-full rounded-md mt-1 border border-slate-300/60 dark:border-slate-700 dark:text-slate-300 bg-transparent px-3 py-1 focus:outline-none focus:ring-0 placeholder:text-slate-400/70 placeholder:font-normal placeholder:text-sm hover:border-slate-400 focus:border-primary-500 dark:focus:border-primary-500  dark:hover:border-slate-700"
                                          placeholder="Confirm Password"
                                          required
                                        />
                                      </div>
                                      <div className=" col-start-4 col-end-13  mb-2">
                                        <button
                                          type="submit"
                                          className="inline-block focus:outline-none text-primary-500 hover:bg-primary-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-primary-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-primary-500  text-sm font-medium py-1 px-3 rounded"
                                        >
                                          Chang Password
                                        </button>
                                        <button
                                          type="submit"
                                          className="inline-block focus:outline-none text-red-500 hover:bg-red-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-red-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-red-500  text-sm font-medium py-1 px-3 rounded"
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </div>
                                  </form>
                                </div>
                              </div>
                              <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mt-4">
                                <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                                  <h4 className="font-medium">
                                    Other Settings
                                  </h4>
                                </div>
                                <div className="flex-auto p-4">
                                  <form>
                                    <label className="custom-label block mb-2 dark:text-slate-300">
                                      <div className="bg-white border border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                        <input
                                          type="checkbox"
                                          className="hidden"
                                        />
                                        {/* <i className="fas fa-check hidden text-xs text-slate-700 "></i> */}
                                        <FaCheck className="text-xs text-slate-700" />
                                      </div>
                                      Email Notifications{" "}
                                      <span className="text-slate-400">
                                        Do you need them?
                                      </span>
                                    </label>
                                    <label className="custom-label block dark:text-slate-300">
                                      <div className="bg-white border border-slate-200 rounded w-4 h-4  inline-block leading-4 text-center -mb-[3px]">
                                        <input
                                          type="checkbox"
                                          className="hidden"
                                        />
                                        {/* <i className="fas fa-check hidden text-xs text-slate-700"></i> */}
                                        <FaCheck className="text-xs text-slate-700" />
                                      </div>
                                      API Access{" "}
                                      <span className="text-slate-400">
                                        Enable/Disable access
                                      </span>
                                    </label>
                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-3 xl:col-span-3 ">
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative mb-4">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Keep in touch</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="flex items-center mb-4">
                        <img
                          src={IMG}
                          alt=""
                          className="mr-2 h-9 inline-block rounded-full"
                        />
                        <div className="self-center">
                          <a
                            href="#"
                            className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                          >
                            Nicolas Wright{" "}
                          </a>
                          <span className="text-slate-500 mr-2 text-[11px]">
                            Team Leader
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={IMG8}
                          alt=""
                          className="mr-2 h-9 inline-block rounded-full"
                        />
                        <div className="self-center">
                          <a
                            href="#"
                            className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                          >
                            Louise Baker{" "}
                          </a>
                          <span className="text-slate-500 mr-2 text-[11px]">
                            Designer
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={IMG5}
                          alt=""
                          className="mr-2 h-9 inline-block rounded-full"
                        />
                        <div className="self-center">
                          <a
                            href="#"
                            className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                          >
                            Thomas Jewell{" "}
                          </a>
                          <span className="text-slate-500 mr-2 text-[11px]">
                            Python Developer
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={IMG4}
                          alt=""
                          className="mr-2 h-9 inline-block rounded-full"
                        />
                        <div className="self-center">
                          <a
                            href="#"
                            className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                          >
                            Betty Jenkins{" "}
                          </a>
                          <span className="text-slate-500 mr-2 text-[11px]">
                            React Developer
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center mb-4">
                        <img
                          src={IMG2}
                          alt=""
                          className="mr-2 h-9 inline-block rounded-full"
                        />
                        <div className="self-center">
                          <a
                            href="#"
                            className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                          >
                            Arthur Mann{" "}
                          </a>
                          <span className="text-slate-500 mr-2 text-[11px]">
                            Tester
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative">
                    <div className="border-b border-dashed border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70">
                      <h4 className="font-medium">Twitter Feed</h4>
                    </div>
                    <div className="flex-auto p-4">
                      <div className=" mb-4">
                        <div className="flex items-center">
                          <img
                            src={IMG}
                            alt=""
                            className="mr-2 h-9 inline-block rounded-full"
                          />
                          <div className="self-center">
                            <a
                              href="#"
                              className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                            >
                              Nicolas Wright{" "}
                            </a>
                            <span className="text-slate-500 mr-2 text-[11px]">
                              @nicolas_wright
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          There are many variations of{" "}
                          <a href="#" className="text-cyan-500">
                            #Passages
                          </a>{" "}
                          of Lorem Ipsum available, but the majority ✨ have
                          suffered alteration in{" "}
                          <a href="#" className="text-cyan-500">
                            #Some
                          </a>{" "}
                          form.
                        </p>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center">
                          <img
                            src={IMG8}
                            alt=""
                            className="mr-2 h-9 inline-block rounded-full"
                          />
                          <div className="self-center">
                            <a
                              href="#"
                              className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                            >
                              Louise Baker{" "}
                            </a>
                            <span className="text-slate-500 mr-2 text-[11px]">
                              @louise-baker
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          There are many variations of{" "}
                          <a href="#" className="text-cyan-500">
                            #Passages
                          </a>{" "}
                          of Lorem Ipsum available,🎉 have suffered alteration
                          in{" "}
                          <a href="#" className="text-cyan-500">
                            #Some
                          </a>{" "}
                          form.
                        </p>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center">
                          <img
                            src={IMG5}
                            alt=""
                            className="mr-2 h-9 inline-block rounded-full"
                          />
                          <div className="self-center">
                            <a
                              href="#"
                              className="text-sm font-medium hover:text-primary-500 block text-slate-700 dark:text-gray-400 leading-[8px]"
                            >
                              Thomas Jewell{" "}
                            </a>
                            <span className="text-slate-500 mr-2 text-[11px]">
                              @thomas_jewell
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                          There are many variations of{" "}
                          <a href="#" className="text-cyan-500">
                            #Passages
                          </a>{" "}
                          ❤️ of Lorem Ipsum available, but the have suffered
                          alteration in{" "}
                          <a href="#" className="text-cyan-500">
                            #Some
                          </a>{" "}
                          form.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
    </>
  );
};

export default Profile;
