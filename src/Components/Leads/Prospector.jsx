/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { TbCircleLetterI, TbPlayerPlay } from "react-icons/tb";
import IMG from "../../Images/widgets/Start_Prospecting.png";
import IMG2 from "../../Images/widgets/LeadBooster_video.svg";
const Prospector = ({
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
                  <div className="">
                    <div className="flex flex-wrap justify-between">
                      <div className="items-center ">
                        <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">
                          Prospector
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
                            Prospector
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
                  <div className="text-center py-3 px-4 dark:text-slate-300/70 relative px-8">
                    <h4 className="font-medium text-3xl">Prospector</h4>
                    <p className="mb-4 flex items-center justify-center">
                      Find your next new business opportunity out of a global
                      database of 400 million profiles, then use credits{" "}
                      <span class="relative flex flex-col items-center group cursor-pointer mx-2">
                        <TbCircleLetterI className="text-2xl" />
                        <div class="absolute bottom-0 flex-col items-center hidden mb-5 group-hover:flex">
                          <span class="relative rounded-md z-10 p-3 text-xs leading-none text-white whitespace-no-wrap bg-black shadow-lg">
                            Inteoductory credits included, additional credits
                            can be purchased.
                          </span>
                          <div class="w-3 h-3 -mt-2 rotate-45 bg-black"></div>
                        </div>
                      </span>{" "}
                      to reveal their contact data.
                    </p>
                    <p>
                      <a
                        href="#Start_Prospecting"
                        data-modal-toggle="modal"
                        className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-full text-lg px-5 py-2 dark:bg-green-500 dark:hover:bg-green-600 mb-4 inline-flex items-center"
                      >
                        Start Prospecting
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
                              src={IMG2}
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

export default Prospector;
