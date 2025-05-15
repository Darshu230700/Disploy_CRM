/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { TbPlayerPlay } from "react-icons/tb";
import logo from "../../Images/logos/messaging_icon.svg"
import IMG1 from "../../Images/logos/context_icon.svg"
import IMG2 from "../../Images/logos/focus_sales_icon.svg"
import IMG3 from "../../Images/logos/seamless_sync_icon.svg"
import IMG4 from "../../Images/widgets/Booster_video.svg"
const Messenger = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark}) => {
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
                            Messenger
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
                              Messenger
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
                    <div className="dark:text-slate-300/70 relative text-center">
                      <div className="flex justify-center mb-2">
                        <img
                          src={logo}
                          alt="messaging"
                        />
                      </div>
                      <h4 className="font-medium text-3xl">Messenger</h4>
                      <h4 className="font-medium text-xl">
                        by Pipedrive{" "}
                        <button
                          type="button"
                          className="alert-hidden text-blue-700 bg-transparent border border-blue-700 hover:bg-blue-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1 text-center dark:border-blue-800 dark:text-blue-800 dark:hover:text-white"
                          data-dismiss-target="#alert-additional-content-1"
                          aria-label="Close"
                        >
                          FREE
                        </button>
                      </h4>
                      <p className="mb-4">
                        Manage Facebook business communication in Pipedrive and
                        convert new incoming conversations into contacts, leads
                        and deals.
                      </p>
                      <p className="mb-4">
                        <a
                          href="#Messenger_Connect_modals"
                          data-modal-toggle="modal"
                          className="focus:outline-none text-white bg-green-500 hover:bg-green-600 font-medium rounded-md text-lg px-3 py-1 dark:bg-green-500 dark:hover:bg-green-600 inline-flex items-center"
                        >
                          Connect
                        </a>
                      </p>
                    </div>
                    <div className="flex-auto p-4">
                      <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative border border-gray-300 pt-4">
                          <div className="flex-auto p-4 text-center">
                            <img
                              src={IMG2}
                              alt=""
                              className="inline-block mb-4"
                            />
                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                              Focus on sales{" "}
                            </h5>
                            <div className="mt-3 mb-2">
                              <p className="text-sm text-slate-500 font-medium block">
                                Organize all customer communications in one
                                place
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative border border-gray-300 pt-4">
                          <div className="flex-auto p-4 text-center">
                            <img
                              src={IMG1}
                              alt=""
                              className="inline-block mb-4"
                            />
                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                              Shared context
                            </h5>
                            <div className="mt-3 mb-2">
                              <p className="text-sm text-slate-500 font-medium block">
                                Manage messages as a team for better results
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative border border-gray-300 pt-4">
                          <div className="flex-auto p-4 text-center">
                            <img
                              src={IMG3}
                              alt=""
                              className="inline-block mb-4"
                            />
                            <h5 className="text-lg font-semibold text-slate-700 dark:text-gray-400 leading-3">
                              Seamless sync
                            </h5>

                            <div className="mt-3 mb-2">
                              <p className="text-sm text-slate-500 font-medium block">
                                Link conversations to contacts, leads and deals
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-auto px-4 border-t border-gray-300 pt-5">
                      <div className="grid md:grid-cols-12 lg:grid-cols-12 xl:grid-cols-12 gap-4 items-center">
                        <div className="sm:col-span-12  md:col-span-4 lg:col-span-3 xl:col-span-3 mb-4">
                          <div className="bg-white border border-gray-300 p-3 dark:bg-slate-800 shadow rounded-md w-full relative">
                            <a
                              href="#watch_video_pop"
                              data-modal-toggle="modal"
                              className="relative inline-block h-full"
                            >
                              <img
                                src={IMG4}
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
                            <p className="mt-3 text-center">
                              MESSENGER INTEGRATION Manage your Messenger
                              interactions within Pipedrive
                            </p>
                          </div>
                        </div>
                        <div className="sm:col-span-12  md:col-span-8 lg:col-span-9 xl:col-span-9 mb-4">
                          <div className="taxt">
                            <h3 className="font-medium text-3xl mb-2">
                              Learn more about Messenger integration
                            </h3>
                            <p>
                              Integrate with Messenger and communicate with your
                              prospects and customers directly from Pipedrive.
                            </p>
                            <p className="mt-4">
                              <a href="#" className="text-blue-700 text-2xl">
                                Learn how Messenger can elevate your business
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

export default Messenger;
