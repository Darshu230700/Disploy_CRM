/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaCheck, FaPlus } from "react-icons/fa6";
import IMG from "../../Images/automated-campaigns-img.svg";
const AutomatedCampaigns = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark, setIsDark
}) => {
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
                            {" "}
                            Automated campaigns
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
                            <li className="text-gray-500">Campaigns</li>
                            <li>
                              <span className="text-gray-500 mx-2">/</span>
                            </li>
                            <li className="text-blue-600 hover:text-blue-700">
                              Automated campaigns
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
                <div className="sm:col-span-12  md:col-span-12 lg:col-span-12 xl:col-span-12 ">
                  <div className="bg-white dark:bg-slate-800 shadow p-4 rounded-md w-full relative">
                    <div className="mb-4 block text-center">
                      <h3 className="font-medium text-3xl mb-2">
                        Automated campaigns
                      </h3>
                      <p className="mb-4 text-lg">
                        Create email campaigns, automate them and save time!
                      </p>
                      <p className="text-center">
                        <a
                          href="new-email_campaigns.html"
                          className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        >
                          <FaPlus className="text-2xl mr-2" />
                          Campaigns
                        </a>
                      </p>
                    </div>
                    <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 items-center my-8">
                      <div className="sm:col-span-12  md:col-span-3 lg:col-span-3 xl:col-span-3">
                        <img
                          className="rounded-lg"
                          src={IMG}
                          alt="Automated campaigns"
                        />
                      </div>
                      <div className="sm:col-span-12 md:col-span-9 lg:col-span-9 xl:col-span-9 pl-10">
                        <h4 className="text-3xl text-gray-800 font-bold mb-3">
                          Even more reasons to try Campaigns
                        </h4>
                        <ul className="mb-4">
                          <li className="flex items-center mb-2">
                            <FaCheck className="text-2xl mr-2" /> No more
                            imports and exports with your contact data stored in
                            Pipedrive CRM
                          </li>
                          <li className="flex items-center mb-2">
                            <FaCheck className="text-2xl mr-2" /> Get creative
                            with slick templates and a simple drag-and-drop
                            email builder
                          </li>
                          <li className="flex items-center mb-2">
                            <FaCheck className="text-2xl mr-2" /> Share campaign
                            engagement data with your sales team via automatic
                            notifications
                          </li>
                          <li className="flex items-center mb-2">
                            <FaCheck className="text-2xl mr-2" /> Start engaging
                            with your leads in just a few painless steps
                          </li>
                        </ul>
                        <p>
                          <a
                            href="#watch_video_pop"
                            data-modal-toggle="modal"
                            className="inline-block px-3 py-2 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                          >
                            Get started for free
                          </a>
                        </p>
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

export default AutomatedCampaigns;
