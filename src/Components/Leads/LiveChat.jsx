/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import IMG from "../../Images/widgets/Configure_livechat.svg"
import IMG1 from "../../Images/widgets/LeadBooster_video.svg"
import { TbPlayerPlay } from "react-icons/tb";

const LiveChat = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
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
                            Live Chat
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
                              Live Chat
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
                    <div className="text-center py-3 px-4 dark:text-slate-300/70 relative">
                      <h4 className="font-medium text-3xl">Live Chat</h4>
                      <p className="mb-4">
                        Real-time help to your website visitors. Take over the
                        conversation from your chatbot and manage it live by
                        yourself!
                      </p>
                      <p>
                        <a
                          href="#Configure_livechat"
                          data-modal-toggle="modal"
                          className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        >
                          Configure Live Chat
                        </a>
                      </p>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="bg-white dark:bg-slate-800 w-full relative p-3 h-full text-center">
                        <div className="border-b border-solid border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70 mb-5">
                          <img
                            src={IMG}
                            alt="existing-leads"
                            className=" inline-block"
                          />
                          <div className="flex-auto p-4">
                            <h3 className="block mb-4 text-[16px] font-medium tracking-tight text-gray-800 dark:text-white">
                              Add your existing leads
                            </h3>
                            <p className="mb-4">
                              Create new leads manually or import your existing
                              leads from a spreadsheet
                            </p>
                            <a
                              href="#watch_video_pop"
                              data-modal-toggle="modal"
                              className="px-5 py-3 text-xl font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 mb-4"
                            >
                              Watch video (31:10)
                            </a>
                          </div>
                        </div>
                        <div className="border-b border-solid border-slate-200 dark:border-slate-700 py-3 px-4 dark:text-slate-300/70 mb-5">
                          <div className="flex-auto p-4">
                            <h3 className="font-medium text-3xl mb-4">
                              Get more leads with LeadBooster
                            </h3>
                            <a
                              href="#watch_video_pop"
                              data-modal-toggle="modal"
                              className="relative inline-block h-full"
                            >
                              <img
                                src={IMG1}
                                alt="existing-leads"
                                className=" inline-block"
                              />
                              <span className="absolute w-20 h-20 top-10 top-2/4 left-1/2 rounded-full bg-red-500 flex items-center justify-center -ml-40">
                                {/* <i className="ti ti-player-play text-white text-4xl"></i> */}
                                <TbPlayerPlay className="text-white text-4xl"/>
                              </span>
                              <span className="absolute right-3 bottom-4 p-2 bg-primary-500/10 text-primary-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded bg-white">
                                01:43
                              </span>
                            </a>
                            <p className="my-4">
                              <a href="#" className="text-blue-600 text-xl">
                                {" "}
                                Learn More
                              </a>
                            </p>
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

export default LiveChat;
