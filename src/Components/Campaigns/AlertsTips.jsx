/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import Sidebar from "../Common/Sidebar";
import Navbar from "../Common/Navbar";
import Footer from "../Common/Footer";
import { FaChevronRight } from "react-icons/fa";

const AlertsTips = ({ isVisible, setIsVisible ,setSidebarOpen,sidebarOpen,isDark,setIsDark }) => {
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
                                            <h1 className="font-semibold text-xl mb-1 block dark:text-slate-100">Alerts and tips</h1>
                                            <ol className="list-reset flex text-sm">
                                                <li><a  href="#" className="text-gray-500">Disploy</a></li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-gray-500">Campaigns</li>
                                                <li><span className="text-gray-500 mx-2">/</span></li>
                                                <li className="text-blue-600 hover:text-blue-700">Alerts and tips</li>
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
                          <div className="bg-white dark:bg-slate-800 shadow rounded-md w-full relative">
                            <div className="flex-auto p-4 border-b border-gray-200">
                              <h3 className="font-medium text-3xl mb-2">Alerts and tips</h3>
                              <p>Follow the recommendations by our team to improve your email marketing practices and continue successfully using Campaigns.</p>
                            </div>
                            <div className="flex-auto p-4">
                              <ul>
                                <li className="bg-white rounded border border-gray-200 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 p-4 mb-4 flex items-center">
                                  <div className="mr-4">
                                    <img alt='' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZDMTIuMjY4IDYgNiAxMi4yNjggNiAyMEM2IDIzLjMzNCA3LjE2NTQyIDI2LjM5NTggOS4xMTExMSAyOC44MDAzTDkuMTExMTEgMzMuMDk3OUM5LjExMTExIDMzLjQ5MDYgOS41NDMwOCAzMy43MyA5Ljg3NjExIDMzLjUyMTlMMTIuNTQ2MyAzMS44NTNDMTQuNzA0NiAzMy4yMTMxIDE3LjI2MDQgMzQgMjAgMzRDMjcuNzMyIDM0IDM0IDI3LjczMiAzNCAyMEMzNCAxMi4yNjggMjcuNzMyIDYgMjAgNloiIGZpbGw9IiM5N0M0REYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC4wMDExIDI4QzE5LjQ0OTUgMjggMTkuMDAyMyAyNy41NTI4IDE5LjAwMjMgMjcuMDAxMUwxOS4wMDIzIDE4LjM5NDZDMTkuMDAyMyAxNy44NDMgMTkuNDQ5NSAxNy4zOTU3IDIwLjAwMTEgMTcuMzk1N0MyMC41NTI4IDE3LjM5NTcgMjEgMTcuODQzIDIxIDE4LjM5NDZMMjEgMjcuMDAxMUMyMSAyNy41NTI4IDIwLjU1MjggMjggMjAuMDAxMSAyOFpNMjEgMTQuMDEzN0MyMSAxNC41NjU0IDIwLjU1MjggMTUuMDEyNiAyMC4wMDExIDE1LjAxMjZMMTkuOTk4OSAxNS4wMTI2QzE5LjQ0NzIgMTUuMDEyNiAxOSAxNC41NjU0IDE5IDE0LjAxMzdDMTkgMTMuNDYyMSAxOS40NDcyIDEzLjAxNDggMTkuOTk4OSAxMy4wMTQ4TDIwLjAwMTEgMTMuMDE0OUMyMC41NTI4IDEzLjAxNDkgMjEgMTMuNDYyMSAyMSAxNC4wMTM3WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" className="deta-img"/>
                                  </div>
                                  <div className="text w-full mr-3">
                                    <h4 className="font-semibold text-2xl flex items-center justify-between mb-2">How to keep campaign sender reputation high</h4>
                                    <p className="mb-3">As you start sending out emails using Campaigns, email providers notice that your usual email marketing setup is changing. To keep up your good sender reputation, we advise you to follow a few simple steps, starting with cleaning up your email contact list.</p>
                                    <p><span className="bg-transparent border border-gray-500 text-gray-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded-full ">CAMPAIGNS ACCOUNT</span> Dec 29, 2023</p>
                                  </div>  
                                  <a href="#modalright" data-modal-toggle="modal" className=" inline-block focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500  text-sm font-medium py-1 px-3 rounded mb-1"><FaChevronRight className="text-2xl" /></a>                      
                                </li>
                                <li className="bg-white rounded border border-gray-200 focus:z-10 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 p-4 mb-4 flex items-center ">
                                  <div className="mr-4">
                                    <img alt='' src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDZDMTIuMjY4IDYgNiAxMi4yNjggNiAyMEM2IDIzLjMzNCA3LjE2NTQyIDI2LjM5NTggOS4xMTExMSAyOC44MDAzTDkuMTExMTEgMzMuMDk3OUM5LjExMTExIDMzLjQ5MDYgOS41NDMwOCAzMy43MyA5Ljg3NjExIDMzLjUyMTlMMTIuNTQ2MyAzMS44NTNDMTQuNzA0NiAzMy4yMTMxIDE3LjI2MDQgMzQgMjAgMzRDMjcuNzMyIDM0IDM0IDI3LjczMiAzNCAyMEMzNCAxMi4yNjggMjcuNzMyIDYgMjAgNloiIGZpbGw9IiM5N0M0REYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yMC4wMDExIDI4QzE5LjQ0OTUgMjggMTkuMDAyMyAyNy41NTI4IDE5LjAwMjMgMjcuMDAxMUwxOS4wMDIzIDE4LjM5NDZDMTkuMDAyMyAxNy44NDMgMTkuNDQ5NSAxNy4zOTU3IDIwLjAwMTEgMTcuMzk1N0MyMC41NTI4IDE3LjM5NTcgMjEgMTcuODQzIDIxIDE4LjM5NDZMMjEgMjcuMDAxMUMyMSAyNy41NTI4IDIwLjU1MjggMjggMjAuMDAxMSAyOFpNMjEgMTQuMDEzN0MyMSAxNC41NjU0IDIwLjU1MjggMTUuMDEyNiAyMC4wMDExIDE1LjAxMjZMMTkuOTk4OSAxNS4wMTI2QzE5LjQ0NzIgMTUuMDEyNiAxOSAxNC41NjU0IDE5IDE0LjAxMzdDMTkgMTMuNDYyMSAxOS40NDcyIDEzLjAxNDggMTkuOTk4OSAxMy4wMTQ4TDIwLjAwMTEgMTMuMDE0OUMyMC41NTI4IDEzLjAxNDkgMjEgMTMuNDYyMSAyMSAxNC4wMTM3WiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+Cg==" className="deta-img"/>
                                  </div>
                                  <div className="text w-full">
                                    <h4 className="font-semibold text-2xl flex items-center justify-between mb-2">How to ensure account approval</h4>
                                    <p className="mb-3">To ensure the best email delivery rates and your account approval, make sure you are using Campaigns in strict compliance with the applicable laws and regulations.</p>
                                    <p className=""><span className="bg-transparent border border-gray-500 text-gray-500 text-[11px] font-medium mr-1 px-2.5 py-0.5 rounded-full ">CAMPAIGNS ACCOUNT</span> Dec 29, 2023</p>
                                  </div> 
                                  <a href="#modalright" data-modal-toggle="modal" className="focus:outline-none text-slate-500 hover:bg-slate-500 hover:text-white bg-transparent border border-gray-200 dark:bg-transparent dark:text-slate-500 dark:hover:text-white dark:border-gray-700 dark:hover:bg-slate-500  text-sm font-medium py-1 px-3 rounded mb-1"><FaChevronRight className="text-2xl" /></a>                                   
                                </li>
                              </ul>
                            </div>
                          </div>
                      </div>            
                  </div>  
                  
                  <Footer/>
                </div>
          </div>
          </div>
   </>
  )
}

export default AlertsTips