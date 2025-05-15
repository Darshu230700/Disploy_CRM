/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import IMG from "../../Images/create_stunning_emails.svg";
import IMG1 from "../../Images/nurture_your_contacts.svg";
import IMG2 from "../../Images/boost_campaign_performance.svg";
import IMG3 from "../../Images/campaigns_reasons.svg";
import { FaCheck } from "react-icons/fa6";
const Campaigns = ({
  isVisible,
  setIsVisible,
  setSidebarOpen,
  sidebarOpen,
  isDark,
  setIsDark,
}) => {
  return (
    <>
      <Sidebar
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <Navbar
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        isDark={isDark}
        setIsDark={setIsDark}
      />
      <div className="flex flex-1 ">
        <div className="page-wrapper relative ml-auto w-[calc(100%-326px)] px-4 pt-[54px] duration-300">
          <div className="xl:w-full">
            <div className="flex flex-wrap">
              <div className="flex items-center py-4 w-full">
                <div className="w-full">
                  <div className="flex flex-wrap justify-between">
                    <div className="items-center ">
                      <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                        Campaigns
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
                        <li className="text-gray-500">CRM</li>
                        <li>
                          <span className="text-gray-500 mx-2">/</span>
                        </li>
                        <li className="text-blue-600 hover:text-blue-700">
                          Campaigns
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="xl:w-full  min-h-[calc(100vh-138px)] relative pb-14 ">
            <div className="block flex-wrap my-8">
              <p className="text-lg text-center mb-4">
                <span className="bg-blue-200 py-2 px-4 rounded-full">New</span>
              </p>
              <h3 className="text-4xl text-center mb-4">
                Send email marketing <b>Campaigns</b> that get clicks
              </h3>
              <p className="text-lg text-center mb-4">
                Bring marketing and sales under one roof with the Campaigns
                add-on.
              </p>
              <p className="text-lg text-center mb-4">
                <a
                  href="#watch_video_pop"
                  data-modal-toggle="modal"
                  className="relative group focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                >
                  Get started for free
                  <div className="absolute bottom-0 flex-col items-center hidden mb-10 group-hover:flex">
                    <span className="relative rounded-md z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                      Get started for free
                    </span>
                    <div className="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                  </div>
                </a>
              </p>
              <p className="text-lg text-center mb-4">
                Free during Pipedrive trial.{" "}
                <a href="#" className="text-blue-500 text-lg">
                  View pricing.{" "}
                </a>
              </p>
            </div>
            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4">
              <div className="sm:col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative overflow-hidden h-full">
                  <div className="flex-auto p-4 text-center">
                    <img src={IMG} alt="" className="h-48 inline-block mb-4" />
                    <h3>
                      <a
                        href="ecommerce-product-detail.html"
                        className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3"
                      >
                        Create stunning emails
                      </a>
                    </h3>
                    <p className="text-slate-500 text-sm block font-medium mb-1">
                      Choose from tons of pro, customizable email templates that
                      grab attention.
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative overflow-hidden h-full">
                  <div className="flex-auto p-4 text-center">
                    <img src={IMG1} alt="" className="h-48 inline-block mb-4" />
                    <h3>
                      <a
                        href="ecommerce-product-detail.html"
                        className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3"
                      >
                        Nurture your contacts{" "}
                      </a>
                    </h3>
                    <p className="text-slate-500 text-sm block font-medium mb-1">
                      Turn prospects into hot sales leads with perfectly timed{" "}
                      <b>automated messages.</b>
                    </p>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-4 ">
                <div className="bg-white dark:bg-slate-800 shadow  rounded-md w-full relative overflow-hidden h-full">
                  <div className="flex-auto p-4 text-center">
                    <img src={IMG2} alt="" className="h-48 inline-block mb-4" />
                    <h3>
                      <a
                        href="ecommerce-product-detail.html"
                        className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3"
                      >
                        Boost campaign performance{" "}
                      </a>
                    </h3>
                    <p className="text-slate-500 text-sm block font-medium mb-1">
                      Know which email wins the hearts of your audience with
                      real-time insights and comparative reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 mb-4 items-center my-8">
              <div className="sm:col-span-12  md:col-span-4 lg:col-span-4 xl:col-span-4">
                <img
                  className="rounded-lg"
                  src={IMG3}
                  alt="Even more reasons to try Campaigns"
                />
              </div>
              <div className="sm:col-span-12  md:col-span-8 lg:col-span-8 xl:col-span-8">
                <h4 className="text-3xl text-gray-800 font-bold mb-3">
                  Even more reasons to try Campaigns
                </h4>
                <ul>
                  <li className="flex items-center mb-2">
                    <FaCheck className="text-2xl mr-2" />
                    No more imports and exports with your contact data stored in
                    Pipedrive CRM
                  </li>
                  <li className="flex items-center mb-2">
                    <FaCheck className="text-2xl mr-2" /> Get creative with
                    slick templates and a simple drag-and-drop email builder
                  </li>
                  <li className="flex items-center mb-2">
                    <FaCheck className="text-2xl mr-2" /> Share campaign
                    engagement data with your sales team via automatic
                    notifications
                  </li>
                  <li className="flex items-center mb-2">
                    <FaCheck className="text-2xl mr-2" /> Start engaging with
                    your leads in just a few painless steps
                  </li>
                </ul>
                <a
                  href="#watch_video_pop"
                  data-modal-toggle="modal"
                  className="px-3 py-2 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  Get started for free
                </a>
              </div>
            </div>

            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Campaigns;
