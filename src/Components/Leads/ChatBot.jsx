import React, { useState } from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import IMG from "../../Images/widgets/Booster_video.svg";
import { TbPlayerPlay } from "react-icons/tb";
import { LuArrowUpRight } from "react-icons/lu";
const ChatBot = ({ isVisible, setIsVisible, setSidebarOpen, sidebarOpen,isDark, setIsDark }) => {
  const [activeTab, setActiveTab] = useState("dashboard");

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
                            Chatbot
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
                            <li className="text-gray-500">Leads</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Chatbot
                            </li>
                          </ol>
                        </div>                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
              <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12">
                  <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative p-5">
                    <div className="dark:text-slate-300/70 relative">
                      <h4 className="font-medium text-3xl">Chatbot</h4>
                      <p>
                        Customize your own chatbot and start capturing leads
                        today
                      </p>
                    </div>
                    <div className="flex-auto">
                      <div className="border-b border-gray-200 dark:border-gray-700 mb-4">
                        <ul
                          className="flex flex-wrap -mb-px"
                          id="myTab"
                          role="tablist"
                        >
                          <li className="mr-2" role="presentation">
                            <button
                              className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                                activeTab === "dashboard"
                                  ? "border-gray-300"
                                  : ""
                              }`}
                              id="playbooks-tab"
                              onClick={() => handleTabClick("dashboard")}
                              type="button"
                              role="tab"
                              aria-controls="dashboard"
                              aria-selected={activeTab === "dashboard"}
                            >
                              Playbooks
                            </button>
                          </li>
                          <li className="mr-2" role="presentation">
                            <button
                              className={`inline-block text-gray-500 hover:text-gray-600 hover:border-gray-300 rounded-t-lg py-4 px-4 text-sm font-medium text-center border-transparent border-b-2 dark:text-gray-400 dark:hover:text-gray-300 ${
                                activeTab === "settings"
                                  ? "border-gray-300"
                                  : ""
                              }`}
                              id="settings-tab"
                              onClick={() => handleTabClick("settings")}
                              type="button"
                              role="tab"
                              aria-controls="settings"
                              aria-selected={activeTab === "settings"}
                            >
                              Settings
                            </button>
                          </li>
                        </ul>
                      </div>
                      {activeTab === "dashboard" && (
                        <div
                          className="bg-gray-50 rounded-lg dark:bg-gray-800"
                          id="dashboard"
                          role="tabpanel"
                          aria-labelledby="playbooks-tab"
                        >
                          <div className="relative scroll-inner shadow-md sm:rounded-lg mb-4">
                            <table className="w-full">
                              <thead className="bg-gray-50 dark:bg-slate-700/20">
                                <tr>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    ACTIVE PLAYBOOKS
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    VIEWED
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    CLICKED
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    QUALIFIED
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    DISQUALIFIED
                                  </th>
                                  <th
                                    scope="col"
                                    className="p-3 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                                  >
                                    STATUS
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <h3>
                                      <a href="" className="text-blue-500">
                                        Get more leads 2
                                      </a>
                                    </h3>
                                    <p>
                                      bhavesh <span className="mx-2"> | </span>{" "}
                                      Created on 19th of December 2023
                                    </p>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="flex items-center justify-between">
                                      <a href="#" className="mr-4">
                                        Active
                                      </a>
                                      <a
                                        href="#"
                                        className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500 py-0 px-1.5  rounded-full"
                                      >
                                        <BsThreeDots className="text-3xl" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <h3>
                                      <a href="" className="text-blue-500">
                                        Get more leads 2
                                      </a>
                                    </h3>
                                    <p>
                                      bhavesh <span className="mx-2"> | </span>{" "}
                                      Created on 19th of December 2023
                                    </p>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="flex items-center justify-between">
                                      <a href="#" className="mr-4">
                                        Active
                                      </a>
                                      <a
                                        href="#"
                                        className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500 py-0 px-1.5  rounded-full"
                                      >
                                        <BsThreeDots className="text-3xl" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>

                                <tr className="hover:bg-gray-100 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                  <td className="p-3 text-sm font-medium whitespace-nowrap dark:text-white">
                                    <h3>
                                      <a href="" className="text-blue-500">
                                        Get more leads 2
                                      </a>
                                    </h3>
                                    <p>
                                      bhavesh <span className="mx-2"> | </span>{" "}
                                      Created on 19th of December 2023
                                    </p>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    0<small className="text-gray-400">00</small>
                                  </td>
                                  <td className="p-3 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                                    <div className="flex items-center justify-between">
                                      <a href="#" className="mr-4">
                                        Active
                                      </a>
                                      <a
                                        href="#"
                                        className="tippy-btn inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500 py-0 px-1.5  rounded-full"
                                      >
                                        <BsThreeDots className="text-3xl" />
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="xl:w-full  min-h-[calc(100vh-138px)] relative border-t-2 border-solid border-gray-200 pt-5">
                            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 items-center">
                              <div className="sm:col-span-12  md:col-span-5 lg:col-span-4 xl:col-span-4 ">
                                <a
                                  href="#watch_video_pop"
                                  data-modal-toggle="modal"
                                  className="relative inline-block h-full"
                                >
                                  <img
                                    src={IMG}
                                    alt="existing-leads"
                                    className=" inline-block"
                                  />
                                  <span className="absolute w-20 h-20 top-10 top-2/4 left-1/2 rounded-full bg-red-500 flex items-center justify-center -ml-40">
                                    {/* <i className="ti ti-player-play text-white text-4xl"></i> */}
                                    <TbPlayerPlay className="text-white text-4xl" />
                                  </span>
                                  <span className="absolute right-3 bottom-4 p-2 bg-primary-500/10 text-primary-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded bg-white">
                                    01:43
                                  </span>
                                </a>
                              </div>
                              <div className="sm:col-span-12  md:col-span-7 lg:col-span-8 xl:col-span-8 ">
                                <div className="taxt">
                                  <h3 className="font-medium text-3xl mb-2">
                                    Generating leads with LeadBooster
                                  </h3>
                                  <p>
                                    Learn how a chatbot will engage visitors and
                                    automatically qualify leads on your website
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "settings" && (
                        <div
                          className="bg-gray-50 rounded-lg dark:bg-gray-800"
                          id="settings"
                          role="tabpanel"
                          aria-labelledby="settings-tab"
                        >
                          <div className="flex-auto p-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="switch-1"
                                className="hidden"
                              />
                              <label
                                for="switch-1"
                                id="switch_1"
                                className="custom-switch relative border border-slate-300 mr-2 w-8 h-4 rounded-full bg-slate-50 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                              ></label>
                              <label
                                for="switch-1"
                                className="dark:text-slate-400"
                              >
                                Track and save the chat conversion URL
                              </label>
                            </div>
                            <p>
                              You can track the specific page that your customer
                              was on when the lead converted. A new custom field
                              “Chat conversion URL” will be automatically added
                              to store this information.
                            </p>
                            <p>
                              <a href="#" className="text-blue-500 text-xl">
                                Learn more about custom fields Customize your
                                own chatbot and start capturing leads today
                                {/* Customize your own chatbot and start capturing leads today className="ti ti-arrow-up-right text-3xl"></i> */}
                                <LuArrowUpRight className="text-3xl" />
                              </a>
                            </p>
                          </div>
                          <div className="flex-auto p-4">
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="switch-2"
                                className="hidden"
                                checked=""
                              />
                              <label
                                for="switch-2"
                                id="switch_2"
                                className="custom-switch switch-green relative border  border-slate-300 mr-2 w-8 h-4 rounded-full bg-slate-50 dark:bg-slate-700 dark:border-slate-600 cursor-pointer"
                              ></label>
                              <label
                                for="switch-2"
                                className="dark:text-slate-400"
                              >
                                Capture unfinished conversation details
                              </label>
                            </div>
                            <p>
                              You can capture the provided contact details
                              (email and phone number) even when the
                              conversation hasn't been finished
                            </p>
                            <p>
                              Save location: Leads Owner: bhavesh ·{" "}
                              <a
                                href="#"
                                className="focus:outline-none text-[11px] bg-primary-500/10 text-primary-500 dark:text-primary-600 rounded font-medium py-[2px] px-2"
                              >
                                Edit
                              </a>
                            </p>
                          </div>
                        </div>
                      )}
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

export default ChatBot;
